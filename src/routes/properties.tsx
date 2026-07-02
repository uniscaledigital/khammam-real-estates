import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { listProperties, listLocalities } from "@/lib/property.functions";
import { PropertyCard } from "@/components/site/PropertyCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

const SearchSchema = z.object({
  listing_type: z.enum(["sale", "rent"]).optional(),
  property_type: z.string().optional(),
  locality: z.string().optional(),
  min_bedrooms: z.coerce.number().optional(),
});

export const Route = createFileRoute("/properties")({
  head: () => ({
    meta: [
      { title: "All Properties — Khammam Real Estates" },
      { name: "description", content: "Browse all properties for sale and rent across Khammam: flats, villas, plots, offices and more." },
      { property: "og:title", content: "All Properties — Khammam Real Estates" },
      { property: "og:description", content: "Find your perfect property in Khammam." },
      { property: "og:url", content: "/properties" },
    ],
    links: [{ rel: "canonical", href: "/properties" }],
  }),
  validateSearch: (s) => SearchSchema.parse(s),
  component: Properties,
});

function Properties() {
  const search = Route.useSearch();
  const nav = useNavigate({ from: "/properties" });
  const { data, isLoading } = useQuery({
    queryKey: ["properties", "all", search],
    queryFn: () => listProperties({ data: search as any }),
  });
  const { data: locs } = useQuery({ queryKey: ["localities"], queryFn: () => listLocalities() });

  const update = (patch: Record<string, unknown>) => {
    nav({ search: (prev: any) => {
      const next = { ...prev, ...patch };
      Object.keys(next).forEach(k => (next[k] === "" || next[k] == null) && delete next[k]);
      return next;
    }});
  };

  return (
    <>
      <section className="bg-primary py-12 md:py-16 lg:py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold">All Properties</h1>
          <p className="mt-2 text-sm sm:text-base text-primary-foreground/80">Filter through every listing across Khammam.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-8 md:py-10">
        <div className="mb-8 rounded-2xl border bg-card p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary"><SlidersHorizontal className="h-4 w-4" /> Filters</div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <Select value={search.listing_type ?? "any"} onValueChange={(v) => update({ listing_type: v === "any" ? undefined : v })}>
              <SelectTrigger><SelectValue placeholder="Listing" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="sale">For Sale</SelectItem>
                <SelectItem value="rent">For Rent</SelectItem>
              </SelectContent>
            </Select>
            <Select value={search.property_type ?? "any"} onValueChange={(v) => update({ property_type: v === "any" ? undefined : v })}>
              <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Type</SelectItem>
                <SelectItem value="flat">Flat</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="plot">Plot</SelectItem>
                <SelectItem value="office">Office</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="penthouse">Penthouse</SelectItem>
              </SelectContent>
            </Select>
            <Select value={search.locality ?? "any"} onValueChange={(v) => update({ locality: v === "any" ? undefined : v })}>
              <SelectTrigger><SelectValue placeholder="Locality" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Locality</SelectItem>
                {(locs?.localities ?? []).map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={String(search.min_bedrooms ?? "any")} onValueChange={(v) => update({ min_bedrooms: v === "any" ? undefined : Number(v) })}>
              <SelectTrigger><SelectValue placeholder="Min Beds" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Beds</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => nav({ search: {} })}>Reset</Button>
          </div>
        </div>

        {isLoading ? (
          <div className="py-20 text-center text-muted-foreground">Loading properties…</div>
        ) : data?.properties.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground">No properties match your filters.</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {(data?.properties ?? []).map((p) => <PropertyCard key={p.id} p={p as any} />)}
          </div>
        )}
      </section>
    </>
  );
}
