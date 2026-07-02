import { MapPin, Phone, MessageCircle } from "lucide-react";
import { useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function FloatingActions() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const pathname = router.state.location.pathname;

  // Don't show on admin or auth pages
  const hiddenPaths = ["/auth", "/admin", "/account"];
  const shouldHide = hiddenPaths.some(p => pathname.startsWith(p));

  // Entrance animation trigger
  useEffect(() => {
    if (shouldHide) {
      setIsVisible(false);
      return;
    }
    
    // Small delay to ensure it enters smoothly after page load
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [shouldHide, pathname]);

  if (shouldHide) return null;

  return (
    <div 
      className={`fixed bottom-4 right-4 z-50 flex flex-col gap-3 pb-[env(safe-area-inset-bottom)] transition-all duration-300 ease-in-out md:bottom-6 md:right-6 md:gap-4 lg:bottom-8 lg:right-8 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <a
        href="https://maps.google.com/?q=Khammam+Real+Estates"
        target="_blank"
        rel="noreferrer"
        aria-label="View Location"
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-[#D4AF37] text-white shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-all duration-300 ease-in-out hover:scale-[1.08] hover:shadow-[0_15px_35px_rgba(212,175,55,0.4)] md:h-14 md:w-14"
      >
        <MapPin className="h-5 w-5 md:h-6 md:w-6" />
        <span className="pointer-events-none absolute right-full mr-4 w-max translate-x-4 rounded-md bg-[#D4AF37] px-3 py-1.5 text-sm font-semibold text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 hidden md:block">
          View Location
        </span>
      </a>

      <a
        href="tel:8186871820"
        aria-label="Call Now"
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-[#2563EB] text-white shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-all duration-300 ease-in-out hover:scale-[1.08] hover:shadow-[0_15px_35px_rgba(37,99,235,0.4)] md:h-14 md:w-14"
      >
        <Phone className="h-5 w-5 md:h-6 md:w-6" />
        <span className="pointer-events-none absolute right-full mr-4 w-max translate-x-4 rounded-md bg-[#2563EB] px-3 py-1.5 text-sm font-semibold text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 hidden md:block">
          Call Now
        </span>
      </a>

      <a
        href="https://wa.me/918186871820"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-all duration-300 ease-in-out hover:scale-[1.08] hover:shadow-[0_15px_35px_rgba(37,211,102,0.4)] md:h-14 md:w-14"
      >
        <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
        <span className="pointer-events-none absolute right-full mr-4 w-max translate-x-4 rounded-md bg-[#25D366] px-3 py-1.5 text-sm font-semibold text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 hidden md:block">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
