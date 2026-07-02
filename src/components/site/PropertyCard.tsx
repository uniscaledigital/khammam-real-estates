import { Link } from "@tanstack/react-router";
import { Bed, Bath, Square, MapPin, Heart, MessageCircle, ShieldCheck } from "lucide-react";
import { formatINR, statusLabel } from "@/lib/format";

export type PropertyCardData = {
  id: string;
  title: string;
  slug: string;
  listing_type: string;
  property_type: string;
  status: string;
  price: number;
  area_sqft: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  locality: string | null;
  city: string;
  images: string[];
};

export function PropertyCard({ p }: { p: PropertyCardData }) {
  const img = p.images?.[0] ?? "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200";
  
  return (
    <div className="group flex flex-col overflow-hidden rounded-[20px] border border-border bg-card shadow-sm transition-all duration-300 ease-out hover:-translate-y-[4px] hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50">
      <Link to="/property/$slug" params={{ slug: p.slug }} className="relative block aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={img}
          alt={p.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
        
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="flex items-center gap-1 rounded-full bg-brand px-2.5 py-1 text-xs font-semibold text-brand-foreground shadow-sm">
            <ShieldCheck className="h-3 w-3" /> Verified
          </span>
          <span className="rounded-full bg-secondary/90 px-2.5 py-1 text-xs font-medium text-primary capitalize backdrop-blur-sm shadow-sm">
            {p.property_type}
          </span>
        </div>

        <div className="absolute left-3 bottom-3 right-3 flex justify-between items-end">
           <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-secondary capitalize shadow-sm backdrop-blur-md">
            For {p.listing_type === "sale" ? "Sale" : "Rent"}
          </span>
        </div>
        
        <button
          aria-label="Save"
          className="absolute right-3 top-3 rounded-full bg-white/90 p-2.5 text-secondary opacity-0 transition-all duration-300 group-hover:opacity-100 hover:text-primary hover:scale-110 shadow-sm"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
        >
          <Heart className="h-4 w-4" />
        </button>
      </Link>
      
      <div className="flex flex-col flex-1 p-4 md:p-5 space-y-3 md:space-y-4">
        <div>
          <Link to="/property/$slug" params={{ slug: p.slug }} className="block">
            <h3 className="line-clamp-1 font-display text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {p.title}
            </h3>
          </Link>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" /> {p.locality ?? p.city}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground font-medium">
          {(p.bedrooms ?? 0) > 0 && (
            <span className="flex items-center gap-1.5"><Bed className="h-4 w-4 text-primary/70" /> {p.bedrooms} Beds</span>
          )}
          {(p.bathrooms ?? 0) > 0 && (
            <span className="flex items-center gap-1.5"><Bath className="h-4 w-4 text-primary/70" /> {p.bathrooms} Baths</span>
          )}
          {p.area_sqft && (
            <span className="flex items-center gap-1.5"><Square className="h-4 w-4 text-primary/70" /> {p.area_sqft} sqft</span>
          )}
        </div>
        
        <div className="flex items-end justify-between border-t border-border/60 pt-3 md:pt-4 mt-auto">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">Price</p>
            <div className="font-num text-lg md:text-xl font-bold text-primary">{formatINR(p.price)}</div>
          </div>
          <div className="text-xs font-semibold px-2.5 py-1 rounded-md bg-accent/50 text-secondary">{statusLabel(p.status)}</div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 md:gap-3 pt-2">
          <a href={`https://wa.me/918186871820?text=Hi%20Khammam%20Real%20Estates%2C%0A%0AI%20am%20interested%20in%3A%0A%0A${encodeURIComponent(p.title)}%0A%0APlease%20share%20complete%20details.`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1.5 md:gap-2 rounded-full bg-secondary px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm font-semibold text-primary hover:bg-primary hover:text-secondary transition-all shadow-sm min-h-[44px]">
            <MessageCircle className="h-3.5 w-3.5 md:h-4 md:w-4 shrink-0" /> <span className="truncate">WhatsApp</span>
          </a>
          <Link to="/property/$slug" params={{ slug: p.slug }} className="inline-flex items-center justify-center rounded-full border border-primary bg-transparent px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm font-semibold text-primary hover:bg-primary hover:text-secondary transition-all shadow-sm min-h-[44px]">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
