import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Instagram, Youtube, User as UserIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="mt-auto border-t-[3px] border-primary bg-[#121212] text-white pt-16">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:grid-cols-2 lg:grid-cols-3">
        
        <div className="space-y-6 lg:col-span-1">
          <Link to="/" className="inline-block group">
             <img src="/khammam_realestate_logo.png" alt="Khammam Real Estates Logo" className="h-20 w-auto opacity-90 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100" />
          </Link>
          <p className="text-sm leading-relaxed text-white/70">
            {t('footer.description')}
          </p>
          
          <div className="pt-2">
            <h5 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">{t('footer.popular_searches')}</h5>
            <div className="flex flex-wrap gap-2 text-xs font-medium text-white/60">
               <span>#KhammamRealEstate</span>
               <span>#KhammamPlots</span>
               <span>#HouseForSaleKhammam</span>
               <span>#TelanganaRealEstate</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="mb-6 font-display text-lg font-bold tracking-wider text-primary">{t('footer.quick_links')}</h4>
          <ul className="space-y-3 text-sm font-medium text-white/80">
            <li><Link to="/" className="transition-colors hover:text-primary">{t('nav.home')}</Link></li>
            <li><Link to="/about" className="transition-colors hover:text-primary">{t('nav.about')}</Link></li>
            <li><Link to="/properties" className="transition-colors hover:text-primary">{t('nav.properties')}</Link></li>
            <li><Link to="/projects" className="transition-colors hover:text-primary">{t('nav.projects')}</Link></li>
            <li><Link to="/requirements" className="transition-colors hover:text-primary">{t('nav.post_requirement')}</Link></li>
            <li><Link to="/faq" className="transition-colors hover:text-primary">{t('nav.faq')}</Link></li>
            <li><Link to="/contact" className="transition-colors hover:text-primary">{t('nav.contact')}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-6 font-display text-lg font-bold tracking-wider text-primary">{t('footer.contact_us')}</h4>
          <ul className="space-y-4 text-sm font-medium text-white/80">
            <li className="flex items-center gap-3">
              <UserIcon className="h-5 w-5 shrink-0 text-primary" />
              <span className="leading-relaxed font-bold text-white">Rajesh Gudepu <span className="font-normal text-white/70 text-xs ml-1">({t('footer.property_consultant')})</span></span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span className="leading-relaxed">{t('footer.description').includes('Khammam') ? 'Khammam, Telangana' : 'ఖమ్మం, తెలంగాణ'}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 shrink-0 text-primary" />
              <a href="tel:+918186871820" className="transition-colors hover:text-primary">+91 8186871820</a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div className="flex flex-col gap-1">
                <a href="mailto:gudepurajesh20@gmail.com" className="transition-colors hover:text-primary">gudepurajesh20@gmail.com</a>
                <a href="mailto:gudepurealestate@gmail.com" className="transition-colors hover:text-primary">gudepurealestate@gmail.com</a>
              </div>
            </li>
          </ul>
          
          <div className="mt-6 flex gap-3">
            <a href="https://www.instagram.com/khammam_realestates/" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white transition-all duration-300 hover:scale-105 shadow-lg">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://www.youtube.com/@khammamrealestateofficial" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF0000] text-white transition-all duration-300 hover:scale-105 shadow-lg">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="mx-auto mt-16 max-w-7xl px-6">
         <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs font-medium text-white/60 md:flex-row">
        <p suppressHydrationWarning>© {new Date().getFullYear()} Khammam Real Estates. {t('footer.all_rights_reserved')}</p>
        <div className="flex flex-col items-center gap-1 text-center md:items-end md:text-right mt-2 md:mt-0">
          <p>
            {t('footer.developed_by')}{" "}
            <a href="https://uniscale-flame.vercel.app/" target="_blank" rel="noreferrer" className="text-primary hover:text-brand transition-colors font-bold tracking-wide">
              Uni Scale Digital
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
