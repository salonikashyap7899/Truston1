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
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about-us" },
  { label: "Projects", to: "/project" },
  { label: "Blog", to: "/blog" },
  { label: "Plot Selling", to: "/plot-selling" },
  { label: "Contact Us", to: "/contact" },
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
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const linkClass =
    "text-[11px] font-bold tracking-[0.4em] transition-colors duration-300 relative group text-[#004aad] hover:text-[#00BFFF]";
  const underline = (
    <span className="absolute -bottom-1 left-0 w-full h-px bg-[#00BFFF] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
  );

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-[0_2px_20px_rgba(0,74,173,0.12)] border-b border-[#004aad]/10"
          : "bg-white/95 backdrop-blur-md border-b border-[#004aad]/5"
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-12">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-[56px]" : "h-[70px]"
          }`}
        >
          {/* Left Nav — desktop only */}
          <nav className="hidden lg:flex items-center gap-10 flex-1">
            {leftLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={linkClass}
                activeProps={{ className: "text-[#00BFFF]" }}
              >
                {l.label}
                {underline}
              </Link>
            ))}
          </nav>

          {/* Logo — centered on desktop, left-aligned on mobile */}
          <div className="flex-1 lg:flex-none flex justify-start lg:justify-center">
            <Link to="/" className="flex items-center group shrink-0">
              <img
                src="/logo.png"
                alt="TrustOn Developers"
                className={`w-auto object-contain group-hover:scale-105 transition-all duration-300 ${
                  scrolled ? "h-10 sm:h-12" : "h-12 sm:h-14"
                }`}
                style={{ filter: "brightness(0.85) saturate(1.2)" }}
              />
            </Link>
          </div>

          {/* Right Nav — desktop only */}
          <div className="hidden lg:flex items-center justify-end gap-10 flex-1">
            {rightLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={linkClass}
                activeProps={{ className: "text-[#00BFFF]" }}
              >
                {l.label}
                {underline}
              </Link>
            ))}
            <Link
              to="/contact"
              className="ml-2 px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:opacity-90 hover:scale-105"
              style={{ background: "#004aad" }}
            >
              Enquire Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 shrink-0 ml-2"
          >
            <span
              className={`block h-[2px] bg-[#004aad] transition-all duration-300 ${
                open ? "w-6 rotate-45 translate-y-[7px]" : "w-6"
              }`}
            />
            <span
              className={`block h-[2px] bg-[#004aad] transition-all duration-300 ${
                open ? "w-0 opacity-0" : "w-4"
              }`}
            />
            <span
              className={`block h-[2px] bg-[#004aad] transition-all duration-300 ${
                open ? "w-6 -rotate-45 -translate-y-[7px]" : "w-6"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer — full screen overlay */}
      <div
        className={`lg:hidden fixed inset-0 top-0 z-[-1] bg-white transition-all duration-300 flex flex-col ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ paddingTop: scrolled ? "56px" : "70px" }}
      >
        {/* Header padding spacer */}
        <nav className="flex flex-col px-8 pt-10 pb-8 gap-1 overflow-y-auto flex-1">
          {mobileLinks.map((l, i) => (
            <Link
              key={l.to}
              to={l.to}
              className="flex items-center justify-between py-4 text-xl font-display text-[#004aad] border-b border-[#004aad]/8 last:border-0 hover:text-[#00BFFF] transition-colors duration-200"
              activeProps={{ className: "text-[#00BFFF]" }}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <span>{l.label}</span>
              <span className="text-[#004aad]/30 text-sm">→</span>
            </Link>
          ))}

          <div className="mt-8 space-y-3">
            <Link
              to="/contact"
              className="block py-4 rounded-2xl text-center text-[12px] font-bold uppercase tracking-[0.25em] text-white transition-all duration-300 active:scale-95"
              style={{ background: "#004aad" }}
            >
              Enquire Now
            </Link>
            <a
              href="tel:+919616061166"
              className="block py-4 rounded-2xl text-center text-[12px] font-bold uppercase tracking-[0.25em] text-[#004aad] border-2 border-[#004aad]/20 transition-all duration-300 active:scale-95"
            >
              +91 96160-61166
            </a>
          </div>
        </nav>

        {/* Footer in mobile menu */}
        <div className="px-8 py-6 border-t border-[#004aad]/8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#004aad]/40 text-center font-bold">
            TrustOn Developers · Lucknow
          </p>
        </div>
      </div>
    </header>
  );
}
