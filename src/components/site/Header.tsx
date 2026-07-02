import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, Menu, X, User as UserIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";



const NAV_KEYS = [
  { to: "/", labelKey: "nav.home", defaultText: "Home" },
  { to: "/about", labelKey: "nav.about", defaultText: "About" },
  { to: "/properties", labelKey: "nav.properties", defaultText: "Properties" },
  { to: "/projects", labelKey: "nav.projects", defaultText: "Projects" },
  { to: "/requirements", labelKey: "nav.post_requirement", defaultText: "Post Requirement" },
  { to: "/faq", labelKey: "nav.faq", defaultText: "FAQ" },
  { to: "/contact", labelKey: "nav.contact", defaultText: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Body scroll lock when mobile menu is open */
  useEffect(() => {
    if (open) {
      document.body.classList.add("nav-open");
    } else {
      document.body.classList.remove("nav-open");
    }
    return () => {
      document.body.classList.remove("nav-open");
    };
  }, [open]);

  const closeMobileMenu = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        scrolled
          ? "bg-[#FAF7EF]/85 backdrop-blur-[16px] border-b border-primary/30 shadow-sm"
          : "bg-[#FAF7EF]/40 backdrop-blur-sm border-b border-primary/10"
      }`}
    >
      <div className="mx-auto flex h-16 md:h-20 lg:h-24 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 md:px-8">
        <Link to="/" className="flex items-center group py-1">
          <div className="flex items-center justify-center rounded-full bg-[#1A1A1A] p-1.5 md:p-2 shadow-lg transition-transform duration-300 group-hover:scale-105 border border-primary/30">
            <img
              src="/khammam_realestate_logo.png"
              alt="Khammam Real Estates Logo"
              className="h-12 md:h-16 lg:h-20 w-auto object-contain scale-[1.1] ml-1 mr-1"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_KEYS.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="group relative px-4 py-2 text-sm font-semibold text-secondary transition-colors duration-300 hover:text-primary"
              activeProps={{ className: "!text-primary font-bold" }}
            >
              {n.defaultText}
              <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-primary transition-all duration-300 group-hover:w-full group-[.active]:w-full"></span>
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 xl:gap-5 lg:flex">
          <a href="tel:+918186871820" className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-primary bg-card px-5 text-sm font-semibold text-secondary transition-colors duration-300 hover:bg-primary hover:text-secondary">
            <Phone className="h-4 w-4" /> 8186871820
          </a>

          <a
            href="https://wa.me/918186871820"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:bg-[#20bd5a] hover:shadow-[0_0_15px_rgba(37,211,102,0.4)]"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>

          {user ? (
            <Link to="/account" className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-primary bg-secondary px-5 text-sm font-semibold text-primary transition-colors duration-300 hover:bg-primary hover:text-secondary">
              <UserIcon className="h-4 w-4" /> Account
            </Link>
          ) : (
            <Link to="/auth" className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-primary bg-secondary px-5 text-sm font-semibold text-primary transition-colors duration-300 hover:bg-primary hover:text-secondary">
              <UserIcon className="h-4 w-4" /> Login
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <button
            className="rounded-full p-2.5 text-secondary hover:bg-primary/20 transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu – full-height overlay with slide transition */}
      <div
        className="fixed inset-0 top-16 z-40 bg-[#FAF7EF]/98 backdrop-blur-lg overflow-y-auto lg:hidden"
        style={{
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: open ? "auto" : "none",
        }}
        aria-hidden={!open}
      >
        <nav className="mx-auto flex max-w-7xl flex-col px-4 sm:px-6 py-6 gap-2">
          {NAV_KEYS.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={closeMobileMenu}
              className="rounded-xl py-3.5 px-5 text-base font-semibold text-secondary hover:bg-primary/20 hover:text-primary transition-colors"
              activeProps={{ className: "text-primary bg-primary/10 border-l-4 border-primary" }}
            >
              {n.defaultText}
            </Link>
          ))}

          <div className="mt-4 flex flex-col gap-3 pt-4 border-t border-primary/20">
            <a href="tel:+918186871820" className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary bg-card py-3.5 px-5 text-sm font-bold text-secondary">
              <Phone className="h-4 w-4 text-primary" /> Call Us
            </a>
            <a href="https://wa.me/918186871820" className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3.5 px-5 text-sm font-bold text-white shadow-sm">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            {user ? (
              <Link to="/account" onClick={closeMobileMenu} className="rounded-xl border border-primary bg-secondary py-3.5 px-5 text-sm font-bold text-center text-primary hover:bg-primary hover:text-secondary">Account</Link>
            ) : (
              <Link to="/auth" onClick={closeMobileMenu} className="rounded-xl border border-primary bg-secondary py-3.5 px-5 text-center text-sm font-bold text-primary hover:bg-primary hover:text-secondary">Login</Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
