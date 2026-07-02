import { Link } from "@tanstack/react-router";
import { MapPin, Phone, MessageCircle, ChevronRight } from "lucide-react";
import { ExtendedProject } from "@/lib/mock-data";

export function ProjectCard({ project }: { project: ExtendedProject }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[20px] border border-primary/40 bg-[#FAF7EF] shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)]">
      <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
        <img 
          src={project.images?.[0] || "/images/east-facing.png"} 
          alt={project.name} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        <div className="absolute top-3 left-3 md:top-4 md:left-4">
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-secondary shadow-md">
            DTCP Approved
          </span>
        </div>
      </div>
      
      <div className="flex flex-1 flex-col p-4 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-lg md:text-xl font-bold text-secondary line-clamp-1">{project.name}</h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-secondary/70">
              <MapPin className="h-4 w-4 text-primary" /> {project.location}
            </p>
          </div>
        </div>

        <div className="mt-3 mb-4 md:mt-4 md:mb-5 border-l-2 border-primary pl-3">
          {project.price ? (
            <p className="font-display text-base md:text-lg font-bold text-primary">
              Starting From ₹{project.price.toLocaleString("en-IN")} <span className="text-sm font-medium text-secondary/60">/ Sq. Yard</span>
            </p>
          ) : project.available_prices ? (
            <div className="flex flex-wrap items-center gap-2">
               <span className="text-sm font-medium text-secondary/60">Available:</span>
               {project.available_prices.map((p, i) => (
                 <span key={i} className="font-display font-bold text-primary">₹{p.toLocaleString("en-IN")}{i < project.available_prices!.length - 1 ? "," : ""}</span>
               ))}
            </div>
          ) : null}
        </div>

        <div className="mb-4 md:mb-6 flex-1">
          <ul className="space-y-2 text-sm font-medium text-secondary/80">
            {project.amenities?.slice(0, 3).map((amenity, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/20 text-[10px] text-primary">✓</span>
                {amenity}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto flex flex-col gap-2 sm:gap-3 sm:flex-row">
          <Link 
            to="/project/$slug" 
            params={{ slug: project.slug }}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-3 md:px-4 py-2.5 text-xs md:text-sm font-bold text-secondary shadow-sm transition-all hover:bg-brand min-h-[44px]"
          >
            View Details <ChevronRight className="h-4 w-4" />
          </Link>
          <div className="flex gap-2">
            <a 
              href={`https://wa.me/${project.whatsapp || "918186871820"}?text=Hi, I am interested in ${project.name}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center rounded-full bg-[#25D366] p-2.5 text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md min-h-[44px] min-w-[44px]"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a 
              href={`tel:+${project.phone || "918186871820"}`}
              className="flex items-center justify-center rounded-full border border-primary bg-transparent p-2.5 text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-secondary min-h-[44px] min-w-[44px]"
              aria-label="Call"
            >
              <Phone className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
