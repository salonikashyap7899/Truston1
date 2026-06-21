import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "@tanstack/react-router";

const services = [
  { label: "Plot Selling", to: "/plot-selling" },
  { label: "Architecture & Design", to: "/architecture-design" },
  { label: "Construction & Build", to: "/construction-build" },
  { label: "Investment Consulting", to: "/investment-consulting" },
] as const;

const leftLinks = [
  { label: "ABOUT", to: "/about-us" },
  { label: "PROJECTS", to: "/project" },
  { label: "BLOG", to: "/blog" },
] as const;

const rightLinks = [
  { label: "CONTACT US", to: "/contact" },
] as const;

export function SobhaStyleNav() {
  const [open, setOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    setOpen(false);
    setSvcOpen(false);
    setMobileServicesOpen(false);
  }, [loc.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = "text-[11px] font-bold tracking-[0.4em] transition-colors duration-300 relative group text-[#004aad] hover:text-[#00BFFF]";
  const underline = <span className="absolute -bottom-2 left-0 w-full h-px bg-[#00BFFF] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
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
              <Link key={l.to} to={l.to} className={linkClass}>
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
              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setSvcOpen(true)}
                onMouseLeave={() => setSvcOpen(false)}
              >
                <button className={`flex items-center gap-2 ${linkClass}`}>
                  PLOT SELLING
                  <svg
                    className={`w-3 h-3 transition-transform duration-300 ${svcOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 10 8"
                  >
                    <path d="M1 1L5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {underline}
                </button>

                <div className="absolute left-0 right-0 top-full h-3 z-40" />

                <div
                  className={`absolute left-0 top-[calc(100%+12px)] w-64 bg-white border border-[#004aad]/10 shadow-xl overflow-hidden transition-all duration-300 rounded-2xl ${
                    svcOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <Link
                    to="/plot-selling"
                    className="block px-6 py-4 text-[11px] font-bold text-[#00BFFF] border-b border-[#004aad]/8 hover:bg-[#004aad]/5 transition-colors uppercase tracking-widest"
                  >
                    Prime Estate →
                  </Link>
                  {services.map((s) => (
                    <Link
                      key={s.to}
                      to={s.to}
                      className="block px-6 py-4 text-[13px] text-[#004aad]/70 hover:text-[#004aad] hover:bg-[#004aad]/5 border-b border-[#004aad]/5 transition-colors last:border-0 font-light"
                      activeProps={{ className: "text-[#00BFFF] bg-[#004aad]/5" }}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>

              {rightLinks.map((l) => (
                <Link key={l.to} to={l.to} className={linkClass}>
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
          {leftLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="py-5 text-2xl font-display text-[#004aad] border-b border-[#004aad]/8 hover:text-[#00BFFF] transition-colors"
              activeProps={{ className: "text-[#00BFFF]" }}
            >
              {l.label}
            </Link>
          ))}

          <div className="border-b border-[#004aad]/8">
            <button
              className="w-full flex items-center justify-between py-6 text-2xl font-display text-[#004aad]"
              onClick={() => setMobileServicesOpen((v) => !v)}
            >
              PLOT SELLING
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 10 8"
              >
                <path d="M1 1L5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <motion.div
              initial={false}
              animate={{ height: mobileServicesOpen ? "auto" : 0, opacity: mobileServicesOpen ? 1 : 0 }}
              className="overflow-hidden pl-6 flex flex-col gap-2"
            >
              <Link to="/plot-selling" className="py-3 text-[14px] text-[#00BFFF] font-bold uppercase tracking-[0.4em]">
                Prime Estate →
              </Link>
              {services.map((s) => (
                <Link
                  key={s.to}
                  to={s.to}
                  className="py-3 text-[18px] text-[#004aad]/50 hover:text-[#004aad] transition-colors font-light"
                  activeProps={{ className: "text-[#004aad]" }}
                >
                  — {s.label}
                </Link>
              ))}
            </motion.div>
          </div>

          {rightLinks.map((l) => (
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
    </motion.header>
  );
}
