import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "@tanstack/react-router";

const services = [
  { label: "Plot Selling", to: "/plot-selling" },
  { label: "Architecture & Design", to: "/architecture-design" },
  { label: "Construction & Build", to: "/construction-build" },
  { label: "Investment Consulting", to: "/investment-consulting" },
] as const;

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about-us" },
  { label: "Projects", to: "/project" },
  { label: "Partner", to: "/channel-partner" },
  { label: "Contact", to: "/contact" },
] as const;

export function LuxeNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    setOpen(false);
    setSvcOpen(false);
    setMobileServicesOpen(false);
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
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-ink shadow-luxe border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`flex items-center justify-between transition-all duration-500 ${scrolled ? "h-[70px]" : "h-[90px]"}`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 shrink-0">
            <img
              src="/logo.png"
              alt="TrustOn Logo"
              className={`w-auto object-contain transition-all duration-500 ${scrolled ? "h-10" : "h-14 brightness-125"}`}
            />
            <div className="flex flex-col leading-tight">
              <span
                className={`text-xl font-display tracking-tight transition-colors duration-500 text-white`}
              >
                TrustOn
              </span>
              <span
                className={`text-[9px] uppercase tracking-[0.4em] font-bold transition-colors duration-500 ${isTransparent ? "text-luxe-cyan" : "text-luxe-cyan/60"}`}
              >
                Premium Estate
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-2">
            {[navLinks[0], navLinks[1], navLinks[2]].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-5 py-2 text-[12px] font-bold uppercase tracking-widest transition-colors duration-300 relative group text-white/70 hover:text-white`}
                activeProps={{ className: "text-white" }}
              >
                {l.label}
                <span
                  className={`absolute bottom-0 left-5 right-5 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-luxe-cyan`}
                />
              </Link>
            ))}

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSvcOpen(true)}
              onMouseLeave={() => setSvcOpen(false)}
            >
              <Link
                to="/services"
                className={`flex items-center gap-2 px-5 py-2 text-[12px] font-bold uppercase tracking-widest transition-colors duration-300 relative group text-white/70 hover:text-white`}
                activeProps={{ className: "text-white" }}
              >
                Services
                <svg
                  className={`w-3 h-3 transition-transform duration-300 ${svcOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 10 8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L5 6.5L9 1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  className={`absolute bottom-0 left-5 right-5 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-luxe-cyan`}
                />
              </Link>

              <div
                className={`absolute left-0 top-full w-64 bg-ink border border-white/10 rounded-2xl shadow-luxe overflow-hidden transition-all duration-300 backdrop-blur-xl ${
                  svcOpen
                    ? "opacity-100 translate-y-2 pointer-events-auto"
                    : "opacity-0 translate-y-0 pointer-events-none"
                }`}
              >
                <Link
                  to="/services"
                  className="block px-6 py-4 text-[11px] font-bold text-luxe-cyan uppercase tracking-widest border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  All Expertise →
                </Link>
                {services.map((s) => (
                  <Link
                    key={s.to}
                    to={s.to}
                    className="block px-6 py-4 text-[13px] text-white/60 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 font-light"
                    activeProps={{ className: "text-luxe-cyan bg-white/5" }}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>

            {navLinks.slice(3).map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-5 py-2 text-[12px] font-bold uppercase tracking-widest transition-colors duration-300 relative group text-white/70 hover:text-white`}
                activeProps={{ className: "text-white" }}
              >
                {l.label}
                <span
                  className={`absolute bottom-0 left-5 right-5 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-luxe-cyan`}
                />
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
            <span
              className={`block w-8 h-[2px] transition-all duration-300 ${open ? "rotate-45 translate-y-[8px]" : ""} bg-white`}
            />
            <span
              className={`block w-6 h-[2px] transition-all duration-300 ${open ? "opacity-0" : ""} bg-white`}
            />
            <span
              className={`block w-8 h-[2px] transition-all duration-300 ${open ? "-rotate-45 -translate-y-[8px]" : ""} bg-white`}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden bg-ink border-t border-white/5 overflow-hidden transition-all duration-500 ${
          open
            ? "max-h-screen opacity-100 overflow-y-auto"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col px-8 py-10 gap-2">
          {navLinks.slice(0, 3).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="py-4 text-2xl font-display text-white border-b border-white/5 hover:text-luxe-cyan transition-colors"
              activeProps={{ className: "text-luxe-cyan" }}
            >
              {l.label}
            </Link>
          ))}

          <div className="border-b border-white/5">
            <button
              className="w-full flex items-center justify-between py-6 text-2xl font-display text-white"
              onClick={() => setMobileServicesOpen((v) => !v)}
            >
              Expertise
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 10 8"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L5 6.5L9 1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <motion.div
              initial={false}
              animate={{
                height: mobileServicesOpen ? "auto" : 0,
                opacity: mobileServicesOpen ? 1 : 0,
              }}
              className="overflow-hidden pl-4 flex flex-col gap-2"
            >
              <Link
                to="/services"
                className="py-3 text-[14px] text-luxe-cyan font-bold uppercase tracking-widest"
              >
                All Services →
              </Link>
              {services.map((s) => (
                <Link
                  key={s.to}
                  to={s.to}
                  className="py-3 text-[16px] text-white/50 hover:text-white transition-colors font-light"
                  activeProps={{ className: "text-white" }}
                >
                  — {s.label}
                </Link>
              ))}
            </motion.div>
          </div>

          {navLinks.slice(3).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="py-6 text-2xl font-display text-white border-b border-white/5 last:border-0 hover:text-luxe-cyan transition-colors"
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
    </motion.header>
  );
}
