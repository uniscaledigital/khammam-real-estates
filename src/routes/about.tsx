import { createFileRoute } from "@tanstack/react-router";
import { Award, Building2, Users, Trophy } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Khammam Real Estates" },
      { name: "description", content: "Khammam Real Estates is Khammam's trusted real estate partner. Learn about our story, team and mission." },
      { property: "og:title", content: "About — Khammam Real Estates" },
      { property: "og:description", content: "Khammam's trusted real estate partner since 2010." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-sm uppercase tracking-widest text-brand">About Us</p>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">Building Trust, One Home at a Time</h1>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">Khammam Real Estates has helped 3000+ families find homes across Khammam since 2010.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold text-primary">Our Story</h2>
            <p className="mt-4 text-foreground/80">
              Founded in 2010, Khammam Real Estates began as a small family-run consultancy in Khammam with one promise — clear, honest advice for every client.
              Today, we are one of Khammam's most-recommended real estate firms, working across the city's fastest-growing corridors.
            </p>
            <p className="mt-3 text-foreground/80">
              We work with reputed developers, vet every project for legal hygiene, and walk you through every step — site visits, documentation, registration and beyond.
            </p>
          </div>
          <img className="rounded-2xl object-cover shadow-lg" src="https://images.unsplash.com/photo-1577760258779-e787a1733016?w=1200" alt="Team meeting" />
        </div>
      </section>

      <section className="bg-accent/40 py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 md:grid-cols-4">
          {[
            { icon: Building2, k: "1200+", v: "Properties Sold" },
            { icon: Users, k: "3000+", v: "Happy Families" },
            { icon: Trophy, k: "15+", v: "Years Experience" },
            { icon: Award, k: "50+", v: "Project Partners" },
          ].map((s) => (
            <div key={s.v} className="rounded-2xl border bg-card p-6 text-center shadow-sm">
              <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-xl bg-brand/10 text-brand"><s.icon className="h-6 w-6" /></div>
              <div className="font-display text-3xl font-bold text-primary">{s.k}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-8 text-center font-display text-3xl font-bold text-primary">Our Mission & Values</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { t: "Integrity", d: "We act in our clients' interest, always. No hidden fees, no inflated promises." },
            { t: "Expertise", d: "Deep, locality-level knowledge of Khammam's residential and commercial markets." },
            { t: "Care", d: "Real estate is personal. We listen, then we shortlist — never the other way around." },
          ].map((v) => (
            <div key={v.t} className="rounded-2xl border bg-card p-6 shadow-sm">
              <h3 className="font-display text-xl font-semibold text-primary">{v.t}</h3>
              <p className="mt-2 text-sm text-foreground/80">{v.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
