import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Plus, Trash2, Pencil, X } from "lucide-react";
import {
  adminListContacts, adminListRequirements,
  deleteProperty, getMyRole, upsertProperty,
} from "@/lib/admin.functions";
import { listProperties } from "@/lib/property.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { formatINR } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — Khammam Real Estates" }] }),
  component: Admin,
});

type Form = {
  id?: string; title: string; slug: string;
  listing_type: "sale" | "rent"; property_type: string;
  status: "ready_to_move" | "under_construction" | "new_launch";
  price: number; area_sqft?: number; bedrooms?: number; bathrooms?: number;
  address?: string; locality?: string; pincode?: string;
  description?: string; amenities: string[]; images: string[]; featured: boolean;
};

const empty = (): Form => ({
  title: "", slug: "", listing_type: "sale", property_type: "flat", status: "ready_to_move",
  price: 0, area_sqft: undefined, bedrooms: 0, bathrooms: 0,
  address: "", locality: "", pincode: "", description: "",
  amenities: [], images: [], featured: false,
});

function Admin() {
  const getRole = useServerFn(getMyRole);
  const { data: role, isLoading: roleLoading } = useQuery({ queryKey: ["my-role"], queryFn: () => getRole() });

  if (roleLoading) return <div className="px-4 py-20 text-center text-muted-foreground">Checking permissions…</div>;
  if (!role?.isAdmin) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold">Admin access required</h1>
        <p className="mt-2 text-muted-foreground">Your account isn't an administrator.</p>
        <Link to="/account"><Button className="mt-4">Back to account</Button></Link>
      </div>
    );
  }
  return <AdminPanel />;
}

function AdminPanel() {
  const qc = useQueryClient();
  const list = useServerFn(listProperties);
  const upsert = useServerFn(upsertProperty);
  const del = useServerFn(deleteProperty);
  const reqs = useServerFn(adminListRequirements);
  const cons = useServerFn(adminListContacts);

  const { data: props } = useQuery({ queryKey: ["admin", "properties"], queryFn: () => list({ data: {} }) });
  const { data: reqList } = useQuery({ queryKey: ["admin", "requirements"], queryFn: () => reqs() });
  const { data: conList } = useQuery({ queryKey: ["admin", "contacts"], queryFn: () => cons() });

  const [form, setForm] = useState<Form | null>(null);
  const [amenityStr, setAmenityStr] = useState("");
  const [imageStr, setImageStr] = useState("");

  const save = useMutation({
    mutationFn: (data: Form) => upsert({ data: {
      ...data,
      price: Number(data.price),
      area_sqft: data.area_sqft ? Number(data.area_sqft) : undefined,
      bedrooms: data.bedrooms ? Number(data.bedrooms) : 0,
      bathrooms: data.bathrooms ? Number(data.bathrooms) : 0,
    } as any }),
    onSuccess: () => { toast.success("Saved"); setForm(null); qc.invalidateQueries({ queryKey: ["admin", "properties"] }); qc.invalidateQueries({ queryKey: ["properties"] }); },
    onError: (e: any) => toast.error(e.message),
  });
  const remove = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: () => { toast.success("Deleted"); qc.invalidateQueries({ queryKey: ["admin", "properties"] }); qc.invalidateQueries({ queryKey: ["properties"] }); },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-primary">Admin Dashboard</h1>
        <Button onClick={() => { setForm(empty()); setAmenityStr(""); setImageStr(""); }} className="gap-2 bg-brand text-brand-foreground hover:bg-brand/90"><Plus className="h-4 w-4" /> New Property</Button>
      </div>

      <Tabs defaultValue="props">
        <TabsList>
          <TabsTrigger value="props">Properties ({props?.properties.length ?? 0})</TabsTrigger>
          <TabsTrigger value="reqs">Requirements ({reqList?.items.length ?? 0})</TabsTrigger>
          <TabsTrigger value="cons">Messages ({conList?.items.length ?? 0})</TabsTrigger>
        </TabsList>

        <TabsContent value="props" className="mt-4">
          <div className="overflow-x-auto rounded-2xl border bg-card shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-muted text-left text-xs uppercase text-muted-foreground">
                <tr><th className="p-3">Title</th><th className="p-3">Type</th><th className="p-3">Locality</th><th className="p-3">Price</th><th className="p-3">Featured</th><th className="p-3"></th></tr>
              </thead>
              <tbody>
                {(props?.properties ?? []).map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="p-3 font-medium">{p.title}</td>
                    <td className="p-3 capitalize">{p.listing_type} / {p.property_type}</td>
                    <td className="p-3">{p.locality}</td>
                    <td className="p-3">{formatINR(Number(p.price))}</td>
                    <td className="p-3">{p.featured ? "Yes" : "—"}</td>
                    <td className="p-3 text-right">
                      <Button size="sm" variant="ghost" onClick={() => { setForm({ ...(p as any), price: Number(p.price), amenities: p.amenities ?? [], images: p.images ?? [] }); setAmenityStr(""); setImageStr(""); }}><Pencil className="h-4 w-4" /></Button>
                      <Button size="sm" variant="ghost" onClick={() => { if (confirm("Delete this property?")) remove.mutate(p.id); }}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="reqs" className="mt-4">
          <div className="space-y-3">
            {(reqList?.items ?? []).map((r) => (
              <div key={r.id} className="rounded-xl border bg-card p-4 text-sm">
                <div className="flex justify-between"><div className="font-semibold">{r.name} · {r.phone}</div><div suppressHydrationWarning className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString()}</div></div>
                <div className="text-muted-foreground">Wants to {r.requirement_type} in {r.location || "—"} · Budget {r.budget || "—"}</div>
                {r.notes && <p className="mt-2">{r.notes}</p>}
              </div>
            ))}
            {(reqList?.items ?? []).length === 0 && <p className="py-10 text-center text-muted-foreground">No requirements yet.</p>}
          </div>
        </TabsContent>

        <TabsContent value="cons" className="mt-4">
          <div className="space-y-3">
            {(conList?.items ?? []).map((c) => (
              <div key={c.id} className="rounded-xl border bg-card p-4 text-sm">
                <div className="flex justify-between"><div className="font-semibold">{c.name} {c.email && <span className="text-muted-foreground">· {c.email}</span>}</div><div suppressHydrationWarning className="text-xs text-muted-foreground">{new Date(c.created_at).toLocaleString()}</div></div>
                {c.subject && <div className="mt-1 font-medium">{c.subject}</div>}
                <p className="mt-1 whitespace-pre-line">{c.message}</p>
              </div>
            ))}
            {(conList?.items ?? []).length === 0 && <p className="py-10 text-center text-muted-foreground">No messages yet.</p>}
          </div>
        </TabsContent>
      </Tabs>

      {form && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" onClick={() => setForm(null)}>
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-background p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">{form.id ? "Edit" : "New"} Property</h2>
              <button onClick={() => setForm(null)}><X className="h-5 w-5" /></button>
            </div>
            <form className="grid gap-3 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); save.mutate(form); }}>
              <FF label="Title *"><Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></FF>
              <FF label="Slug *"><Input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") })} /></FF>
              <FF label="Listing">
                <Select value={form.listing_type} onValueChange={(v: any) => setForm({ ...form, listing_type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="sale">Sale</SelectItem><SelectItem value="rent">Rent</SelectItem></SelectContent>
                </Select>
              </FF>
              <FF label="Type"><Input value={form.property_type} onChange={(e) => setForm({ ...form, property_type: e.target.value })} /></FF>
              <FF label="Status">
                <Select value={form.status} onValueChange={(v: any) => setForm({ ...form, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="ready_to_move">Ready to Move</SelectItem><SelectItem value="under_construction">Under Construction</SelectItem><SelectItem value="new_launch">New Launch</SelectItem></SelectContent>
                </Select>
              </FF>
              <FF label="Price (₹)"><Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} /></FF>
              <FF label="Area (sqft)"><Input type="number" value={form.area_sqft ?? ""} onChange={(e) => setForm({ ...form, area_sqft: e.target.value ? Number(e.target.value) : undefined })} /></FF>
              <FF label="Bedrooms"><Input type="number" value={form.bedrooms ?? 0} onChange={(e) => setForm({ ...form, bedrooms: Number(e.target.value) })} /></FF>
              <FF label="Bathrooms"><Input type="number" value={form.bathrooms ?? 0} onChange={(e) => setForm({ ...form, bathrooms: Number(e.target.value) })} /></FF>
              <FF label="Locality"><Input value={form.locality ?? ""} onChange={(e) => setForm({ ...form, locality: e.target.value })} /></FF>
              <FF label="Pincode"><Input value={form.pincode ?? ""} onChange={(e) => setForm({ ...form, pincode: e.target.value })} /></FF>
              <FF label="Address"><Input value={form.address ?? ""} onChange={(e) => setForm({ ...form, address: e.target.value })} /></FF>
              <div className="sm:col-span-2"><FF label="Description"><Textarea rows={4} value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} /></FF></div>
              <div className="sm:col-span-2">
                <FF label="Amenities">
                  <div className="flex gap-2">
                    <Input value={amenityStr} onChange={(e) => setAmenityStr(e.target.value)} placeholder="e.g. Swimming Pool" />
                    <Button type="button" variant="outline" onClick={() => { if (amenityStr.trim()) { setForm({ ...form, amenities: [...form.amenities, amenityStr.trim()] }); setAmenityStr(""); } }}>Add</Button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {form.amenities.map((a, i) => (
                      <span key={i} className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs">
                        {a} <button type="button" onClick={() => setForm({ ...form, amenities: form.amenities.filter((_, j) => j !== i) })}><X className="h-3 w-3" /></button>
                      </span>
                    ))}
                  </div>
                </FF>
              </div>
              <div className="sm:col-span-2">
                <FF label="Image URLs">
                  <div className="flex gap-2">
                    <Input value={imageStr} onChange={(e) => setImageStr(e.target.value)} placeholder="https://…" />
                    <Button type="button" variant="outline" onClick={() => { if (imageStr.trim()) { setForm({ ...form, images: [...form.images, imageStr.trim()] }); setImageStr(""); } }}>Add</Button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {form.images.map((src, i) => (
                      <span key={i} className="inline-flex items-center gap-2 rounded-md border bg-card p-1 pr-2 text-xs">
                        <img src={src} className="h-8 w-8 rounded object-cover" alt="" />
                        <button type="button" onClick={() => setForm({ ...form, images: form.images.filter((_, j) => j !== i) })}><X className="h-3 w-3" /></button>
                      </span>
                    ))}
                  </div>
                </FF>
              </div>
              <label className="flex items-center gap-2 sm:col-span-2">
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
                <span className="text-sm">Featured property</span>
              </label>
              <div className="sm:col-span-2 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setForm(null)}>Cancel</Button>
                <Button type="submit" disabled={save.isPending} className="bg-brand text-brand-foreground hover:bg-brand/90">{save.isPending ? "Saving…" : "Save Property"}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

function FF({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1.5"><Label className="text-sm font-medium">{label}</Label>{children}</div>;
}
