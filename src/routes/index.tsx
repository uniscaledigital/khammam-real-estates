import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { ArrowRight, MapPin, Search, ShieldCheck, Star, Building2, Quote, Award, CheckCircle2, Home, MessageCircle, Phone, Youtube, Instagram } from "lucide-react";
import { listProperties, listProjects } from "@/lib/property.functions";
import { PropertyCard } from "@/components/site/PropertyCard";
import { ProjectCard } from "@/components/site/ProjectCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const featuredQO = queryOptions({
  queryKey: ["properties", "featured"],
  queryFn: () => listProperties({ data: { featured: true, limit: 3 } }),
});
const projectsQO = queryOptions({ 
  queryKey: ["projects", "featured"], 
  queryFn: () => listProjects({ data: { featured: true, limit: 3 } }) 
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Khammam Real Estates | Verified Plots, Houses & Agricultural Lands in Khammam" },
      { name: "description", content: "Khammam Real Estates helps buyers find verified plots, independent houses, agricultural lands, villas, apartments, and investment properties across Khammam with trusted guidance, site visits, and transparent pricing." },
    ],
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(featuredQO),
      context.queryClient.ensureQueryData(projectsQO),
    ]);
  },
  component: Index,
});

function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    location: "",
    type: "",
    budget: "",
    purpose: "buy"
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/properties", search: { type: searchParams.type || undefined } as any });
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pb-8 pt-24">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&auto=format&q=80')" }}
      />
      <div className="absolute inset-0 bg-black/75" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent opacity-80" />
      
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 text-center animate-fade-up flex flex-col items-center">
        <div className="mb-5 flex items-center justify-center">
          <img src="/khammam_realestate_logo.png" alt="Khammam Real Estates Logo" className="h-28 md:h-36 w-auto drop-shadow-[0_4px_15px_rgba(0,0,0,0.5)]" 
             onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
             }}
          />
        </div>
        
        <h2 className="mb-6 font-sans text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-primary">
          Trusted Real Estate Partner in Khammam
        </h2>
        <h1 className="max-w-4xl font-display text-5xl font-bold leading-tight text-white md:text-7xl">
          YOUR DREAM PROPERTY<br/>
          <span className="text-primary text-4xl md:text-6xl italic">STARTS HERE</span>
        </h1>
        <p className="mt-7 max-w-[700px] font-sub text-lg text-white/90 md:text-xl">
          Helping families and investors find the perfect property with confidence.
        </p>
        
        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
           <Link to="/properties">
             <Button size="lg" className="h-12 rounded-full px-8 font-bold tracking-wide shadow-lg hover:shadow-primary/50">
               Explore Properties
             </Button>
           </Link>
           <a href="https://wa.me/918186871820" target="_blank" rel="noreferrer">
             <Button variant="outline" size="lg" className="h-12 rounded-full border-primary/50 bg-black/20 px-8 font-bold text-white backdrop-blur-sm transition-all hover:bg-primary hover:text-secondary">
               Schedule a Site Visit
             </Button>
           </a>
        </div>

        {/* Search Bar - Large Floating Card */}
        <div className="mt-8 w-full max-w-5xl rounded-[24px] bg-card p-4 shadow-2xl shadow-black/50 md:p-6">
           <form onSubmit={handleSearch} className="grid gap-4 md:grid-cols-5 items-end text-left">
              <div className="flex flex-col gap-2">
                 <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-2">{t('home.search_location')}</label>
                 <div className="relative">
                   <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                   <input 
                     type="text" 
                     placeholder={t('home.search_any_location')}
                     className="w-full rounded-full border-none bg-background py-3.5 pl-11 pr-4 text-sm font-medium outline-none ring-1 ring-border focus:ring-2 focus:ring-primary transition-all"
                     value={searchParams.location}
                     onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
                   />
                 </div>
              </div>
              <div className="flex flex-col gap-2">
                 <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-2">{t('home.search_type')}</label>
                 <select 
                   className="w-full appearance-none rounded-full border-none bg-background py-3.5 px-6 text-sm font-medium outline-none ring-1 ring-border focus:ring-2 focus:ring-primary transition-all"
                   value={searchParams.type}
                   onChange={(e) => setSearchParams({...searchParams, type: e.target.value})}
                 >
                    <option value="">{t('home.search_all_types')}</option>
                    <option value="villa">{t('home.search_villa')}</option>
                    <option value="plot">{t('home.search_plot')}</option>
                    <option value="flat">{t('home.search_flat')}</option>
                 </select>
              </div>
              <div className="flex flex-col gap-2">
                 <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-2">{t('home.search_budget')}</label>
                 <select className="w-full appearance-none rounded-full border-none bg-background py-3.5 px-6 text-sm font-medium outline-none ring-1 ring-border focus:ring-2 focus:ring-primary transition-all">
                    <option>{t('home.search_any_budget')}</option>
                    <option>Under ₹50L</option>
                    <option>₹50L - ₹1Cr</option>
                    <option>Above ₹1Cr</option>
                 </select>
              </div>
              <div className="flex flex-col gap-2">
                 <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-2">{t('home.search_purpose')}</label>
                 <select 
                   className="w-full appearance-none rounded-full border-none bg-background py-3.5 px-6 text-sm font-medium outline-none ring-1 ring-border focus:ring-2 focus:ring-primary transition-all"
                   value={searchParams.purpose}
                   onChange={(e) => setSearchParams({...searchParams, purpose: e.target.value})}
                 >
                    <option value="buy">{t('home.search_buy')}</option>
                    <option value="rent">{t('home.search_rent')}</option>
                 </select>
              </div>
              <Button type="submit" size="lg" className="h-12 w-full rounded-full bg-primary text-secondary hover:bg-gradient-to-r hover:from-primary hover:to-brand shadow-lg">
                 <Search className="mr-2 h-4 w-4" /> {t('home.search_btn')}
              </Button>
           </form>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex w-full flex-wrap justify-center gap-6 gap-y-4 font-sub text-sm font-semibold text-white/90">
           <div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-brand" /> {t('home.trust_verified')}</div>
           <div className="flex items-center gap-2"><Award className="h-5 w-5 text-brand" /> {t('home.trust_support')}</div>
           <div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-brand" /> {t('home.trust_clients')}</div>
           <div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-brand" /> {t('home.trust_genuine')}</div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ kicker, title, subtitle, light = false }: { kicker?: string; title: string; subtitle?: string, light?: boolean }) {
  return (
    <div className="mb-14 text-center">
      {kicker && <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">{kicker}</p>}
      <h2 className={`font-display text-4xl font-bold md:text-5xl ${light ? 'text-white' : 'text-secondary'}`}>{title}</h2>
      {subtitle && <p className={`mx-auto mt-5 max-w-2xl font-sub text-lg ${light ? 'text-white/70' : 'text-muted-foreground'}`}>{subtitle}</p>}
    </div>
  );
}

function Index() {
  const { t } = useTranslation();
  const { data: featured } = useSuspenseQuery(featuredQO);
  const { data: projects } = useSuspenseQuery(projectsQO);

  return (
    <>
      <Hero />

      {/* FEATURED PROJECTS SECTION */}
      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading 
             kicker="OUR PROJECT PORTFOLIO"
             title="Featured Projects"
             subtitle="Discover our signature DTCP-approved layouts, premium townships, and investment projects carefully selected across Khammam."
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.projects.map((pr) => (
              <ProjectCard key={pr.id} project={pr as any} />
            ))}
          </div>
          <div className="mt-12 text-center animate-fade-up">
            <Link to="/projects">
               <Button size="lg" className="rounded-full bg-primary text-secondary hover:bg-brand px-10 font-bold tracking-wide shadow-md hover:scale-105 transition-transform">
                 View More <ArrowRight className="ml-2 h-5 w-5" />
               </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES SECTION */}
      <section className="bg-[#FAF7EF] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            kicker="OUR FEATURED PROPERTIES"
            title="Featured Properties"
            subtitle="Explore a handpicked selection of verified plots, independent houses, agricultural lands, and premium investment opportunities across Khammam."
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featured.properties.map((p) => <PropertyCard key={p.id} p={p as any} />)}
          </div>
          <div className="mt-12 text-center animate-fade-up">
            <Link to="/properties">
               <Button size="lg" className="rounded-full bg-primary text-secondary hover:bg-brand px-10 font-bold tracking-wide shadow-md hover:scale-105 transition-transform">
                 View More <ArrowRight className="ml-2 h-5 w-5" />
               </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* IVORY BACKGROUND - Why Choose Us */}
      <section className="bg-background px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading kicker={t('home.why_kicker')} title={t('home.why_title')} />
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: ShieldCheck, title: t('home.why_integrity_title'), text: t('home.why_integrity_txt') },
              { icon: Award, title: t('home.why_service_title'), text: t('home.why_service_txt') },
              { icon: Home, title: t('home.why_curation_title'), text: t('home.why_curation_txt') },
            ].map((f, i) => (
              <div key={i} className="group relative overflow-hidden rounded-[24px] bg-card p-10 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5 border border-transparent hover:border-primary/20">
                <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-transparent text-primary">
                  <f.icon className="h-8 w-8 stroke-[1.5]" />
                </div>
                <h3 className="mb-4 font-display text-2xl font-bold text-secondary">{f.title}</h3>
                <p className="font-sub text-muted-foreground leading-relaxed">{f.text}</p>
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <f.icon className="h-32 w-32" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CREAM BACKGROUND - Testimonials */}
      <section className="bg-card px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading kicker={t('home.voices_kicker')} title={t('home.voices_title')} />
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { name: "Rajesh V.", role: "Property Investor", text: "Khammam Real Estates operates on a different level of professionalism. The transaction for my commercial plot was exceptionally transparent." },
              { name: "Sneha Reddy", role: "Homeowner", text: "They curated a selection of villas that perfectly matched our aesthetic preferences. A truly white-glove experience from start to finish." },
              { name: "K. Sharma", role: "Business Owner", text: "Their market knowledge and exclusive listings make them the only real estate consultancy I trust in the region." },
            ].map((t, i) => (
              <div key={i} className="relative rounded-[24px] border border-border bg-background p-10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <Quote className="absolute right-8 top-8 h-12 w-12 text-primary/10" />
                <div className="flex gap-1 mb-6">
                  {[0,1,2,3,4].map(star => <Star key={star} className="h-5 w-5 fill-primary text-primary" />)}
                </div>
                <p className="font-sub text-lg italic text-secondary leading-relaxed">"{t.text}"</p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-brand flex items-center justify-center text-secondary font-bold text-xl shadow-inner">
                     {t.name[0]}
                  </div>
                  <div>
                    <p className="font-display font-bold text-secondary">{t.name}</p>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DARK CALL TO ACTION */}
      <section className="relative overflow-hidden bg-secondary px-6 py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-8 text-center animate-fade-up">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-4">{t('home.cta_kicker')}</p>
            <h2 className="font-display text-4xl font-bold text-white md:text-5xl">{t('home.cta_title')}</h2>
            <p className="mx-auto mt-6 max-w-2xl font-sub text-lg text-white/70">
              {t('home.cta_sub')}
            </p>
          </div>
          <Link to="/requirements">
             <Button size="lg" className="h-14 rounded-full px-10 text-lg font-bold shadow-lg hover:shadow-primary/50">
               {t('home.cta_btn')} <ArrowRight className="ml-2 h-5 w-5" />
             </Button>
          </Link>
          
          <div className="mt-12 w-full pt-12 border-t border-white/10">
             <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/50 mb-8">{t('home.connections')}</p>
             <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
               <a href="https://wa.me/918186871820" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 p-5 rounded-[20px] bg-[#25D366] text-white hover:bg-[#20bd5a] transition-all shadow-lg hover:-translate-y-1">
                 <div className="bg-white/20 p-2 rounded-full"><MessageCircle className="h-6 w-6" /></div>
                 <span className="font-bold text-lg tracking-wide">WhatsApp</span>
               </a>
               <a href="tel:8186871820" className="flex items-center justify-center gap-3 p-5 rounded-[20px] bg-primary text-secondary hover:bg-brand transition-all shadow-lg hover:-translate-y-1">
                 <div className="bg-secondary/10 p-2 rounded-full"><Phone className="h-6 w-6" /></div>
                 <span className="font-bold text-lg tracking-wide">Call Now</span>
               </a>
               <a href="https://www.youtube.com/@khammamrealestateofficial" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 p-5 rounded-[20px] bg-[#FF0000] text-white hover:bg-[#cc0000] transition-all duration-300 shadow-lg hover:-translate-y-1 hover:scale-105">
                 <div className="bg-white/20 p-2 rounded-full"><Youtube className="h-6 w-6" /></div>
                 <span className="font-bold text-lg tracking-wide">YouTube</span>
               </a>
               <a href="https://www.instagram.com/khammam_realestates/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 p-5 rounded-[20px] bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] to-[#cc2366] text-white transition-all duration-300 shadow-lg hover:-translate-y-1 hover:scale-105 hover:brightness-110">
                 <div className="bg-white/20 p-2 rounded-full"><Instagram className="h-6 w-6" /></div>
                 <span className="font-bold text-lg tracking-wide">Instagram</span>
               </a>
             </div>
          </div>
        </div>
      </section>
    </>
  );
}
