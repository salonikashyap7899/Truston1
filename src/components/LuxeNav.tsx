import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about-us" },
  { label: "Projects", to: "/project" },
  { label: "Plot Selling", to: "/plot-selling" },
  { label: "Partner", to: "/channel-partner" },
  { label: "Contact", to: "/contact" },
] as const;

export function LuxeNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [loc.pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isTransparent = !scrolled && !open;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#04090f]/98 shadow-[0_4px_32px_rgba(0,0,0,0.6)] border-b border-white/8 backdrop-blur-xl"
          : "bg-[#04090f]/70 backdrop-blur-md border-b border-white/5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? "h-[70px]" : "h-[90px]"}`}>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 shrink-0">
            <img
              src="/logo.png"
              alt="TrustOn Logo"
              className={`w-auto object-contain transition-all duration-500 ${scrolled ? "h-10" : "h-14 brightness-125"}`}
            />
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-display tracking-tight transition-colors duration-500 text-white">
                TrustOn
              </span>
              <span className={`text-[9px] uppercase tracking-[0.4em] font-bold transition-colors duration-500 ${isTransparent ? "text-luxe-cyan" : "text-luxe-cyan/60"}`}>
                Premium Estate
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-5 py-2 text-[12px] font-bold uppercase tracking-widest transition-colors duration-300 relative group text-white hover:text-luxe-cyan"
                activeProps={{ className: "text-luxe-cyan" }}
              >
                {l.label}
                <span className="absolute bottom-0 left-5 right-5 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-luxe-cyan" />
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <Link
            to="/contact"
            className="hidden lg:inline-flex btn-magnetic btn-luxe px-8 py-3 rounded-full"
          >
            Enquire Now
          </Link>

          {/* Mobile hamburger */}
          <button
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden flex flex-col justify-center gap-[6px] w-10 h-10 items-end"
          >
            <span className={`block w-8 h-[2px] transition-all duration-300 ${open ? "rotate-45 translate-y-[8px]" : ""} bg-white`} />
            <span className={`block w-6 h-[2px] transition-all duration-300 ${open ? "opacity-0" : ""} bg-white`} />
            <span className={`block w-8 h-[2px] transition-all duration-300 ${open ? "-rotate-45 -translate-y-[8px]" : ""} bg-white`} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden bg-ink border-t border-white/5 overflow-hidden transition-all duration-500 ${
          open ? "max-h-screen opacity-100 overflow-y-auto" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col px-8 py-10 gap-2">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="py-4 text-2xl font-display text-white border-b border-white/5 last:border-0 hover:text-luxe-cyan transition-colors"
              activeProps={{ className: "text-luxe-cyan" }}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/contact" className="mt-10 btn-magnetic btn-luxe py-5 text-center rounded-2xl">
            Enquire Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
