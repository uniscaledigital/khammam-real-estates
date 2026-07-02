import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { submitRequirement } from "@/lib/lead.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/requirements")({
  head: () => ({
    meta: [
      { title: "Post Your Requirement — Khammam Real Estates" },
      { name: "description", content: "Tell us what you're looking for and we'll send matching properties within 48 hours." },
      { property: "og:title", content: "Post Your Requirement" },
      { property: "og:description", content: "Get matching properties within 48 hours." },
      { property: "og:url", content: "/requirements" },
    ],
    links: [{ rel: "canonical", href: "/requirements" }],
  }),
  component: Requirements,
});

function Requirements() {
  const submit = useServerFn(submitRequirement);
  const [form, setForm] = useState({ name: "", phone: "", email: "", requirement_type: "buy" as "buy" | "rent" | "sell", budget: "", location: "", notes: "" });
  const mut = useMutation({
    mutationFn: (d: typeof form) => submit({ data: d }),
    onSuccess: () => { toast.success("Thanks! We'll reach out within 48 hours."); setForm({ name: "", phone: "", email: "", requirement_type: "buy", budget: "", location: "", notes: "" }); },
    onError: (e: any) => toast.error(e.message ?? "Could not submit"),
  });
  return (
    <>
      <section className="bg-primary py-12 md:py-16 lg:py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">Post Your Requirement</h1>
          <p className="mt-2 text-sm sm:text-base text-primary-foreground/80">Tell us what you need — our team will curate matches and call you within 48 hours.</p>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 sm:px-6 md:px-8 py-10 md:py-12 lg:py-16">
        <form
          onSubmit={(e) => { e.preventDefault(); mut.mutate(form); }}
          className="grid gap-4 rounded-2xl border bg-card p-4 sm:p-6 shadow-sm sm:grid-cols-2"
        >
          <Field label="Full Name *"><Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
          <Field label="Phone *"><Input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Field>
          <Field label="Email"><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
          <Field label="I want to">
            <Select value={form.requirement_type} onValueChange={(v: any) => setForm({ ...form, requirement_type: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="buy">Buy</SelectItem>
                <SelectItem value="rent">Rent</SelectItem>
                <SelectItem value="sell">Sell</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Budget"><Input placeholder="e.g. ₹80L - ₹1.2 Cr" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} /></Field>
          <Field label="Preferred Location"><Input placeholder="e.g. Gachibowli" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></Field>
          <div className="sm:col-span-2">
            <Field label="Tell us more"><Textarea rows={4} placeholder="Any specific needs — beds, parking, floor, etc." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></Field>
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" disabled={mut.isPending} className="w-full bg-brand text-brand-foreground hover:bg-brand/90">
              {mut.isPending ? "Submitting…" : "Submit Requirement"}
            </Button>
          </div>
        </form>
      </section>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
    </div>
  );
}
