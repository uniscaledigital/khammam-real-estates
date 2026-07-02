import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Instagram, Youtube, User as UserIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t-[3px] border-primary bg-[#121212] text-white pt-10 md:pt-16">
      <div className="mx-auto grid max-w-7xl gap-8 md:gap-12 px-4 sm:px-6 md:px-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        
        <div className="space-y-6 lg:col-span-1 text-center md:text-left">
          <Link to="/" className="inline-block group mx-auto md:mx-0">
             <img src="/khammam_realestate_logo.png" alt="Khammam Real Estates Logo" className="h-16 md:h-20 w-auto opacity-90 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100" />
          </Link>
            Khammam Real Estates helps you discover verified plots, residential properties, agricultural lands, and investment opportunities with transparent information on location, facing, plot size, pricing, and legal details.
          
          <div className="pt-2">
            <h5 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Popular Searches</h5>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 text-xs font-medium text-white/60">
               <span>#KhammamRealEstate</span>
               <span>#KhammamPlots</span>
               <span>#HouseForSaleKhammam</span>
               <span>#TelanganaRealEstate</span>
            </div>
          </div>
        </div>

        <div className="text-center md:text-left">
          <h4 className="mb-6 font-display text-lg font-bold tracking-wider text-primary">Quick Links</h4>
          <ul className="space-y-3 text-sm font-medium text-white/80">
            <li><Link to="/" className="transition-colors hover:text-primary">Home</Link></li>
            <li><Link to="/about" className="transition-colors hover:text-primary">About</Link></li>
            <li><Link to="/properties" className="transition-colors hover:text-primary">Properties</Link></li>
            <li><Link to="/projects" className="transition-colors hover:text-primary">Projects</Link></li>
            <li><Link to="/requirements" className="transition-colors hover:text-primary">Post Requirement</Link></li>
            <li><Link to="/faq" className="transition-colors hover:text-primary">FAQ</Link></li>
            <li><Link to="/contact" className="transition-colors hover:text-primary">Contact</Link></li>
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h4 className="mb-6 font-display text-lg font-bold tracking-wider text-primary">Contact Us</h4>
          <ul className="space-y-4 text-sm font-medium text-white/80">
            <li className="flex items-center justify-center md:justify-start gap-3">
              <UserIcon className="h-5 w-5 shrink-0 text-primary" />
              <span className="leading-relaxed font-bold text-white">Rajesh Gudepu <span className="font-normal text-white/70 text-xs ml-1">(Property Consultant)</span></span>
            </li>
            <li className="flex items-start justify-center md:justify-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span className="leading-relaxed">Khammam, Telangana</span>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-3">
              <Phone className="h-5 w-5 shrink-0 text-primary" />
              <a href="tel:+918186871820" className="transition-colors hover:text-primary">+91 8186871820</a>
            </li>
            <li className="flex items-start justify-center md:justify-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div className="flex flex-col gap-1">
                <a href="mailto:gudepurajesh20@gmail.com" className="transition-colors hover:text-primary">gudepurajesh20@gmail.com</a>
                <a href="mailto:gudepurealestate@gmail.com" className="transition-colors hover:text-primary">gudepurealestate@gmail.com</a>
              </div>
            </li>
          </ul>
          
          <div className="mt-6 flex justify-center md:justify-start gap-3">
            <a href="https://www.instagram.com/khammam_realestates/" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white transition-all duration-300 hover:scale-105 shadow-lg">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://www.youtube.com/@khammamrealestateofficial" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF0000] text-white transition-all duration-300 hover:scale-105 shadow-lg">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="mx-auto mt-10 md:mt-16 max-w-7xl px-4 sm:px-6 md:px-8">
         <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 md:gap-4 px-4 sm:px-6 md:px-8 py-6 md:py-8 text-xs font-medium text-white/60 md:flex-row">
        <p suppressHydrationWarning>© {new Date().getFullYear()} Khammam Real Estates. All rights reserved.</p>
        <div className="flex flex-col items-center gap-1 text-center md:items-end md:text-right mt-2 md:mt-0">
          <p>
            Developed by{" "}
            <a href="https://uniscale-flame.vercel.app/" target="_blank" rel="noreferrer" className="text-primary hover:text-brand transition-colors font-bold tracking-wide">
              Uni Scale Digital
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
