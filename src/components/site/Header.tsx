import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, Menu, X, User as UserIcon, Youtube, Instagram } from "lucide-react";
import { useState, useEffect } from "react";
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
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  /* Keyboard escape handler */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const closeMobileMenu = () => setOpen(false);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ease-in-out ${
          scrolled
            ? "bg-[#FAF7EF]/90 backdrop-blur-[16px] border-b border-primary/20 shadow-sm"
            : "bg-[#FAF7EF]/60 backdrop-blur-md border-b border-primary/10"
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
              onClick={() => setOpen(true)}
              aria-label="Open navigation"
              aria-expanded={open}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={closeMobileMenu}
        />

        {/* Drawer Panel */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-[80%] max-w-[320px] bg-[#F8F5EF] shadow-[0_0_40px_rgba(0,0,0,0.3)] transition-transform duration-300 ease-in-out flex flex-col ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-label="Mobile Navigation"
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-primary/20 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A1A1A] p-1 shadow-md border border-primary/30">
                <img
                  src="/khammam_realestate_logo.png"
                  alt="Logo"
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <span className="font-display text-sm font-bold tracking-wide text-secondary">
                Khammam Real Estates
              </span>
            </div>
            <button
              onClick={closeMobileMenu}
              className="rounded-full p-2 text-secondary hover:bg-primary/20 hover:text-primary transition-colors"
              aria-label="Close navigation"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <ul className="flex flex-col gap-2">
              {NAV_KEYS.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    onClick={closeMobileMenu}
                    className="flex min-h-[48px] items-center rounded-xl px-4 text-base font-semibold text-secondary transition-colors hover:bg-primary/10 hover:text-primary"
                    activeProps={{ className: "text-primary bg-primary/10 border-l-4 border-primary rounded-l-none" }}
                  >
                    {n.defaultText}
                  </Link>
                </li>
              ))}

              <li className="my-2 border-t border-primary/10" />

              {user ? (
                <li>
                  <Link
                    to="/account"
                    onClick={closeMobileMenu}
                    className="flex min-h-[48px] items-center rounded-xl px-4 text-base font-bold text-primary transition-colors hover:bg-primary/10"
                  >
                    <UserIcon className="mr-3 h-5 w-5" /> Account
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    to="/auth"
                    onClick={closeMobileMenu}
                    className="flex min-h-[48px] items-center rounded-xl px-4 text-base font-bold text-primary transition-colors hover:bg-primary/10"
                  >
                    <UserIcon className="mr-3 h-5 w-5" /> Login / Register
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          {/* Drawer Footer / Contacts */}
          <div className="border-t border-primary/20 bg-[#FAF7EF] p-6">
            <div className="grid grid-cols-2 gap-3">
              <a
                href="tel:+918186871820"
                className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-primary bg-secondary px-2 text-sm font-bold text-primary hover:bg-primary hover:text-secondary transition-colors"
              >
                <Phone className="h-4 w-4" /> Call
              </a>
              <a
                href="https://wa.me/918186871820"
                target="_blank"
                rel="noreferrer"
                className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#25D366] px-2 text-sm font-bold text-white shadow-sm hover:bg-[#20bd5a] transition-colors"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <a
                href="https://www.youtube.com/@khammamrealestateofficial"
                target="_blank"
                rel="noreferrer"
                className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#FF0000] px-2 text-sm font-bold text-white shadow-sm hover:bg-[#cc0000] transition-colors"
              >
                <Youtube className="h-4 w-4" /> YouTube
              </a>
              <a
                href="https://www.instagram.com/khammam_realestates/"
                target="_blank"
                rel="noreferrer"
                className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] to-[#cc2366] px-2 text-sm font-bold text-white shadow-sm hover:brightness-110 transition-all"
              >
                <Instagram className="h-4 w-4" /> Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
