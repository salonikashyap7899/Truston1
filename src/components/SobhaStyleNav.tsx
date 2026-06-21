import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";

const leftLinks = [
  { label: "ABOUT", to: "/about-us" },
  { label: "PROJECTS", to: "/project" },
  { label: "BLOG", to: "/blog" },
] as const;

const rightLinks = [
  { label: "PLOT SELLING", to: "/plot-selling" },
  { label: "CONTACT US", to: "/contact" },
] as const;

const mobileLinks = [
  { label: "ABOUT", to: "/about-us" },
  { label: "PROJECTS", to: "/project" },
  { label: "BLOG", to: "/blog" },
  { label: "PLOT SELLING", to: "/plot-selling" },
  { label: "CONTACT US", to: "/contact" },
] as const;

export function SobhaStyleNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [loc.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = "text-[11px] font-bold tracking-[0.4em] transition-colors duration-300 relative group text-[#004aad] hover:text-[#00BFFF]";
  const underline = <span className="absolute -bottom-2 left-0 w-full h-px bg-[#00BFFF] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white shadow-[0_4px_24px_rgba(0,74,173,0.10)] border-b border-[#004aad]/10"
          : "bg-white/95 backdrop-blur-md border-b border-[#004aad]/5"
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? "h-[60px]" : "h-[80px]"}`}>

          {/* Left Nav */}
          <nav className="hidden lg:flex items-center gap-12 flex-1">
            {leftLinks.map((l) => (
              <Link key={l.to} to={l.to} className={linkClass} activeProps={{ className: "text-[#00BFFF]" }}>
                {l.label}
                {underline}
              </Link>
            ))}
          </nav>

          {/* Logo - Centered */}
          <div className="flex justify-center shrink-0 px-8">
            <Link to="/" className="flex flex-col items-center group">
              <img
                src="/logo.png"
                alt="Logo"
                className={`w-auto object-contain group-hover:scale-105 transition-all duration-700 ${scrolled ? "h-24" : "h-32"}`}
                style={{ filter: "brightness(0.85) saturate(1.2)" }}
              />
            </Link>
          </div>

          {/* Right Nav */}
          <div className="hidden lg:flex items-center justify-end gap-12 flex-1">
            <nav className="flex items-center gap-12">
              {rightLinks.map((l) => (
                <Link key={l.to} to={l.to} className={linkClass} activeProps={{ className: "text-[#00BFFF]" }}>
                  {l.label}
                  {underline}
                </Link>
              ))}
            </nav>
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden flex flex-col justify-center gap-[6px] w-10 h-10 items-end"
          >
            <span className={`block w-8 h-[2px] transition-all duration-300 ${open ? "rotate-45 translate-y-[8px]" : ""} bg-[#004aad]`} />
            <span className={`block w-5 h-[2px] transition-all duration-300 ${open ? "opacity-0" : ""} bg-[#004aad]`} />
            <span className={`block w-8 h-[2px] transition-all duration-300 ${open ? "-rotate-45 -translate-y-[8px]" : ""} bg-[#004aad]`} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden bg-white border-t border-[#004aad]/10 overflow-hidden transition-all duration-500 ${
          open ? "max-h-screen opacity-100 overflow-y-auto" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col px-10 py-12 gap-2">
          {mobileLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="py-5 text-2xl font-display text-[#004aad] border-b border-[#004aad]/8 last:border-0 hover:text-[#00BFFF] transition-colors"
              activeProps={{ className: "text-[#00BFFF]" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="mt-12 py-4 rounded-2xl text-center text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-300"
            style={{ background: "#004aad" }}
          >
            Enquire Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
