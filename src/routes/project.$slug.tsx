import { createFileRoute, notFound } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { MapPin, Phone, MessageCircle, Mail, CheckCircle2, Navigation, Image as ImageIcon } from "lucide-react";
import { getProject } from "@/lib/property.functions";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const qo = (slug: string) => queryOptions({
  queryKey: ["project", slug],
  queryFn: () => getProject({ data: { slug } }),
});

export const Route = createFileRoute("/project/$slug")({
  loader: async ({ context, params }) => {
    const res = await context.queryClient.ensureQueryData(qo(params.slug));
    if (!res.project) throw notFound();
  },
  head: () => {
    return {
      meta: [
        { title: `Project Details — Khammam Real Estates` },
        { name: "description", content: "View complete details of this premium real estate project." },
      ],
    };
  },
  component: ProjectDetails,
});

function ProjectDetails() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(qo(slug));
  const project = data.project;
  const [activeImage, setActiveImage] = useState(0);

  if (!project) return null;

  return (
    <div className="bg-background pb-20">
      {/* Hero Image Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full bg-secondary overflow-hidden">
         <img 
           src={project.images?.[activeImage] || "/images/east-facing.png"} 
           alt={project.name}
           className="h-full w-full object-cover transition-opacity duration-500 opacity-80"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent" />
         
         <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
            <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-end justify-between gap-6">
               <div className="text-white animate-fade-up">
                  <span className="mb-4 inline-block rounded-full bg-primary px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-secondary shadow-md">
                    {project.status === 'ready_to_move' ? 'DTCP Approved' : 'Under Construction'}
                  </span>
                  <h1 className="font-display text-4xl font-bold md:text-5xl lg:text-6xl text-white drop-shadow-md">
                    {project.name}
                  </h1>
                  <p className="mt-4 flex items-center gap-2 text-lg font-medium text-white/90">
                    <MapPin className="h-5 w-5 text-primary" /> {project.location}
                  </p>
               </div>
               
               <div className="flex shrink-0 flex-col items-start md:items-end bg-secondary/80 backdrop-blur-md p-6 rounded-2xl border border-primary/30 animate-fade-up animate-delay-100">
                 <p className="text-sm font-medium uppercase tracking-widest text-primary/80 mb-1">Pricing Overview</p>
                 {project.price ? (
                    <p className="font-display text-3xl font-bold text-white">
                      ₹{project.price.toLocaleString("en-IN")} <span className="text-base text-white/70">/ Sq. Yd</span>
                    </p>
                  ) : project.available_prices ? (
                    <div className="flex flex-col items-start md:items-end">
                       <span className="font-display text-2xl font-bold text-white mb-1">Starting at ₹{project.available_prices[0].toLocaleString("en-IN")}</span>
                       <span className="text-xs text-white/70">Available options: {project.available_prices.join(', ')}</span>
                    </div>
                  ) : (
                    <p className="font-display text-2xl font-bold text-white">Price on Request</p>
                  )}
               </div>
            </div>
         </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 lg:grid lg:grid-cols-3 lg:gap-12">
        <div className="lg:col-span-2 space-y-12">
           
           {/* Gallery Selection */}
           {project.images && project.images.length > 1 && (
             <section className="animate-fade-up">
               <h3 className="mb-4 flex items-center gap-2 font-display text-2xl font-bold text-secondary">
                  <ImageIcon className="h-6 w-6 text-primary" /> Project Gallery
               </h3>
               <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                 {project.images.map((img, idx) => (
                   <button 
                     key={idx} 
                     onClick={() => setActiveImage(idx)}
                     className={`relative h-24 w-32 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                       activeImage === idx ? "border-primary scale-105" : "border-transparent opacity-70 hover:opacity-100"
                     }`}
                   >
                     <img src={img} className="h-full w-full object-cover" alt={`${project.name} ${idx + 1}`} />
                   </button>
                 ))}
               </div>
             </section>
           )}

           {/* Description */}
           <section className="rounded-[20px] border border-primary/20 bg-[#FAF7EF] p-8 shadow-sm">
             <h3 className="mb-4 font-display text-2xl font-bold text-secondary">About the Project</h3>
             <p className="whitespace-pre-line leading-relaxed text-secondary/80 md:text-lg">
               {project.description}
             </p>
           </section>

           {/* Amenities */}
           {project.amenities && project.amenities.length > 0 && (
             <section>
               <h3 className="mb-6 font-display text-2xl font-bold text-secondary">Key Features & Amenities</h3>
               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                 {project.amenities.map((am, i) => (
                   <div key={i} className="flex items-center gap-4 rounded-xl border border-primary/10 bg-white p-4 shadow-sm">
                     <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                       <CheckCircle2 className="h-5 w-5" />
                     </div>
                     <span className="font-semibold text-secondary">{am}</span>
                   </div>
                 ))}
               </div>
             </section>
           )}

           {/* Location / Maps Placeholder */}
           <section className="overflow-hidden rounded-[20px] border border-primary/20 bg-white shadow-sm">
              <div className="border-b border-primary/10 bg-[#FAF7EF] p-6">
                 <h3 className="font-display text-2xl font-bold text-secondary">Location</h3>
              </div>
              <div className="h-[400px] w-full bg-muted relative flex items-center justify-center">
                 {/* In a real app, embed Google Map here if map_url exists */}
                 <div className="text-center text-muted-foreground flex flex-col items-center">
                    <Navigation className="h-12 w-12 text-primary/40 mb-3" />
                    <p className="font-medium text-lg text-secondary/60">Map view available on request</p>
                 </div>
              </div>
           </section>
        </div>

        {/* Sidebar */}
        <aside className="mt-12 lg:mt-0 space-y-6">
           <div className="sticky top-28 overflow-hidden rounded-[20px] border-[2px] border-primary bg-secondary p-8 shadow-[0_10px_40px_rgba(212,175,55,0.15)] text-white">
              <h3 className="font-display text-2xl font-bold text-primary mb-2">Interested?</h3>
              <p className="text-sm text-white/70 mb-8">
                 Contact our property experts today to schedule a site visit or request more information about this project.
              </p>

              <div className="space-y-4">
                <Button 
                  asChild
                  className="w-full rounded-full bg-primary text-secondary hover:bg-brand py-6 text-base font-bold shadow-md hover:scale-[1.02] transition-transform"
                >
                  <a href={`https://wa.me/${project.whatsapp || "918186871820"}?text=Hi, I would like to schedule a site visit for ${project.name}`}>
                    <MessageCircle className="mr-2 h-5 w-5" /> Schedule Site Visit
                  </a>
                </Button>

                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    asChild 
                    variant="outline" 
                    className="rounded-full border-primary/50 text-white hover:bg-primary hover:text-secondary py-6"
                  >
                    <a href={`https://wa.me/${project.whatsapp || "918186871820"}?text=Hi, I want more details about ${project.name}`}>
                      <MessageCircle className="mr-2 h-4 w-4 text-primary group-hover:text-secondary" /> WhatsApp
                    </a>
                  </Button>
                  <Button 
                    asChild 
                    variant="outline" 
                    className="rounded-full border-primary/50 text-white hover:bg-primary hover:text-secondary py-6"
                  >
                    <a href={`tel:+${project.phone || "918186871820"}`}>
                      <Phone className="mr-2 h-4 w-4 text-primary group-hover:text-secondary" /> Call
                    </a>
                  </Button>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                 <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Registration Support</h4>
                 <ul className="space-y-3 text-sm text-white/80">
                    <li className="flex items-start gap-2">
                       <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> 
                       <span>Complete legal verification included</span>
                    </li>
                    <li className="flex items-start gap-2">
                       <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> 
                       <span>Loan assistance available</span>
                    </li>
                 </ul>
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
}
