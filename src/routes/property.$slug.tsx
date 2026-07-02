import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { Bed, Bath, Square, MapPin, Phone, MessageCircle, Mail, CheckCircle2 } from "lucide-react";
import { getProperty } from "@/lib/property.functions";
import { PropertyCard } from "@/components/site/PropertyCard";
import { formatINR, statusLabel } from "@/lib/format";
import { Button } from "@/components/ui/button";

const qo = (slug: string) => queryOptions({
  queryKey: ["property", slug],
  queryFn: () => getProperty({ data: { slug } }),
});

export const Route = createFileRoute("/property/$slug")({
  loader: async ({ context, params }) => {
    const res = await context.queryClient.ensureQueryData(qo(params.slug));
    if (!res.property) throw notFound();
  },
  head: ({ loaderData, params }) => {
    // loaderData is void here; rely on a fresh fetch in head via Route context isn't easy. Use slug-derived title fallback.
    return {
      meta: [
        { title: `Property in Khammam — Khammam Real Estates` },
        { name: "description", content: "View this property's full details, gallery and amenities on Khammam Real Estates." },
        { property: "og:title", content: "Property — Khammam Real Estates" },
        { property: "og:description", content: "Full property details, photos and amenities." },
        { property: "og:url", content: `/property/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/property/${params.slug}` }],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold text-primary">Property not found</h1>
      <p className="mt-2 text-muted-foreground">This listing may have been removed or the URL is incorrect.</p>
      <Link to="/properties"><Button className="mt-6">Back to all properties</Button></Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-2xl font-bold">Couldn't load this property</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      <Button onClick={reset} className="mt-6">Try again</Button>
    </div>
  ),
  component: PropertyPage,
});

function PropertyPage() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(qo(slug));
  const p = data.property!;
  const main = p.images?.[0] ?? "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600";

  return (
    <>
      <section className="bg-secondary py-4 sm:py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 text-xs sm:text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/properties" className="hover:text-primary">Properties</Link> / <span className="text-foreground">{p.title}</span>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-6 sm:py-8">
        <div className={`grid gap-2 sm:gap-3 ${p.images?.length > 1 ? 'md:grid-cols-3' : 'md:grid-cols-1'}`}>
          <img src={main} alt={p.title} className={`${p.images?.length > 1 ? 'md:col-span-2' : 'w-full'} aspect-[16/10] rounded-xl sm:rounded-2xl object-cover`} />
          {p.images?.length > 1 && (
            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-1">
              {p.images.slice(1, 4).map((src, i) => (
                <img key={i} src={src} alt="" className="aspect-[4/3] w-full rounded-xl sm:rounded-2xl object-cover" />
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 sm:mt-8 grid gap-6 sm:gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-brand px-3 py-1 text-xs font-semibold text-brand-foreground">For {p.listing_type === "sale" ? "Sale" : "Rent"}</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary capitalize">{p.property_type}</span>
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">{statusLabel(p.status)}</span>
                </div>
                <h1 className="mt-2 sm:mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
                  {p.title} {p.title_te && <span className="opacity-80">| {p.title_te}</span>}
                </h1>
                <p className="mt-2 flex items-center gap-1 text-sm sm:text-base text-muted-foreground"><MapPin className="h-4 w-4 shrink-0" /> {p.address ? `${p.address}, ` : ""}{p.locality}, {p.city} {p.pincode}</p>
              </div>
              <div className="text-right">
                <div className="font-display text-2xl sm:text-3xl font-bold text-primary">{formatINR(p.price)}{p.listing_type === "rent" && <span className="text-sm sm:text-base font-medium text-muted-foreground">/mo</span>}</div>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border bg-card p-3 sm:p-4 sm:grid-cols-4">
              {(p.bedrooms ?? 0) > 0 && <Stat icon={Bed} label="Bedrooms" value={String(p.bedrooms)} />}
              {(p.bathrooms ?? 0) > 0 && <Stat icon={Bath} label="Bathrooms" value={String(p.bathrooms)} />}
              {p.area_sqft && <Stat icon={Square} label="Area" value={`${p.area_sqft} sqft`} />}
              <Stat icon={MapPin} label="Locality" value={p.locality ?? p.city} />
            </div>

            <div className="mt-8">
              <h2 className="font-display text-lg sm:text-xl font-bold text-primary">About this property</h2>
              <p className="mt-2 sm:mt-3 whitespace-pre-line text-sm sm:text-base text-foreground/80">{p.description}</p>
              {p.description_te && <p className="mt-4 whitespace-pre-line text-foreground/80">{p.description_te}</p>}
            </div>

            {p.amenities?.length > 0 && (
              <div className="mt-8">
                <h2 className="font-display text-lg sm:text-xl font-bold text-primary">Amenities / Features</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {p.amenities.map((a, i) => (
                    <div key={a} className="flex flex-col gap-1 rounded-lg bg-accent/40 px-3 py-2.5 sm:py-2 text-sm min-h-[44px] justify-center">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-brand" /> {a}
                      </div>
                      {p.amenities_te?.[i] && <div className="pl-6 text-xs text-muted-foreground">{p.amenities_te[i]}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {p.video_url && (
              <div className="mt-8">
                <h2 className="font-display text-lg sm:text-xl font-bold text-primary mb-3 sm:mb-4">Property Video</h2>
                <div className="aspect-video w-full">
                  <iframe 
                    src={p.video_url.replace("youtube.com/shorts/", "youtube.com/embed/").split("?")[0]} 
                    className="w-full h-full rounded-2xl" 
                    allowFullScreen 
                  />
                </div>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl sm:rounded-2xl border bg-card p-4 sm:p-6 shadow-sm">
              <h3 className="font-display text-base sm:text-lg font-semibold text-primary">Interested in this property?</h3>
              <p className="mt-1 text-sm text-muted-foreground">Get in touch with our team — we usually respond within an hour.</p>
              <div className="mt-4 space-y-2">
                <a href="tel:+917680861521" className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 sm:py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 min-h-[44px]"><Phone className="h-4 w-4" /> Call Now</a>
                <a href={`https://wa.me/917680861521?text=Hi%20Sri%20Bhadrakali%20Real%20Estates%2C%0A%0AI%20am%20interested%20in%3A%0A%0A${encodeURIComponent(p.title)}%0A%0APlease%20share%20complete%20details.`} target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-2 rounded-md bg-green-600 px-4 py-3 sm:py-2.5 text-sm font-semibold text-white hover:bg-green-700 min-h-[44px]"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
                {p.map_url && (
                  <a href={p.map_url} target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-2 rounded-md border px-4 py-3 sm:py-2.5 text-sm font-semibold hover:bg-accent min-h-[44px]"><MapPin className="h-4 w-4" /> View on Map</a>
                )}
              </div>
            </div>
          </aside>
        </div>

        {data.similar.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-4 sm:mb-6 font-display text-xl sm:text-2xl font-bold text-primary">Similar Properties</h2>
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data.similar.map((s) => <PropertyCard key={s.id} p={s as any} />)}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="text-center">
      <Icon className="mx-auto h-5 w-5 text-brand" />
      <div className="mt-1 text-sm font-semibold text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
