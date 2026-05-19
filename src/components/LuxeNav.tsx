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
      transition={{ duration: 0.9, delay: 3.0, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`flex items-center justify-between transition-all duration-500 ${scrolled ? "h-[68px]" : "h-[80px]"}`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
              src="/logo.png"
              alt="TrustOn Logo"
              className={`w-auto object-contain transition-all duration-500 ${scrolled ? "h-10" : "h-12 brightness-110"}`}
            />
            <div className="flex flex-col leading-tight">
              <span
                className={`text-lg font-bold tracking-widest uppercase transition-colors duration-500 ${isTransparent ? "text-white" : "text-[var(--bronze)]"}`}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                TrustOn
              </span>
              <span
                className={`text-[9px] uppercase tracking-[0.35em] font-medium transition-colors duration-500 ${isTransparent ? "text-white/50" : "text-gray-400"}`}
              >
                Premium Estate
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {[navLinks[0], navLinks[1], navLinks[2]].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-4 py-2 text-[13px] font-medium transition-colors duration-300 relative group ${
                  isTransparent
                    ? "text-white/85 hover:text-white"
                    : "text-gray-700 hover:text-[var(--bronze)]"
                }`}
                activeProps={{ className: isTransparent ? "text-white" : "text-[var(--bronze)]" }}
              >
                {l.label}
                <span
                  className={`absolute bottom-0 left-4 right-4 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${isTransparent ? "bg-white" : "bg-[var(--bronze)]"}`}
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
                className={`flex items-center gap-1 px-4 py-2 text-[13px] font-medium transition-colors duration-300 relative group ${
                  isTransparent
                    ? "text-white/85 hover:text-white"
                    : "text-gray-700 hover:text-[var(--bronze)]"
                }`}
                activeProps={{ className: isTransparent ? "text-white" : "text-[var(--bronze)]" }}
              >
                Services
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${svcOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 10 8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L5 6.5L9 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  className={`absolute bottom-0 left-4 right-4 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${isTransparent ? "bg-white" : "bg-[var(--bronze)]"}`}
                />
              </Link>

              <div
                className={`absolute left-0 top-full w-56 bg-white shadow-2xl border border-gray-100 overflow-hidden transition-all duration-200 ${
                  svcOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <Link
                  to="/services"
                  className="block px-5 py-3 text-[12px] font-semibold text-[var(--bronze)] border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  All Services →
                </Link>
                {services.map((s) => (
                  <Link
                    key={s.to}
                    to={s.to}
                    className="block px-5 py-3 text-[13px] text-gray-700 hover:text-[var(--bronze)] hover:bg-gray-50 border-b border-gray-50 transition-colors last:border-0"
                    activeProps={{ className: "text-[var(--bronze)] bg-gray-50" }}
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
                className={`px-4 py-2 text-[13px] font-medium transition-colors duration-300 relative group ${
                  isTransparent
                    ? "text-white/85 hover:text-white"
                    : "text-gray-700 hover:text-[var(--bronze)]"
                }`}
                activeProps={{ className: isTransparent ? "text-white" : "text-[var(--bronze)]" }}
              >
                {l.label}
                <span
                  className={`absolute bottom-0 left-4 right-4 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${isTransparent ? "bg-white" : "bg-[var(--bronze)]"}`}
                />
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <Link
            to="/contact"
            className={`hidden lg:inline-flex items-center gap-2 px-6 py-2.5 text-[12px] font-semibold uppercase tracking-widest transition-all duration-500 ${
              isTransparent
                ? "border border-white/50 text-white hover:bg-white hover:text-[var(--ink)]"
                : "bg-[var(--bronze)] text-white hover:opacity-90 shadow-sm"
            }`}
          >
            Enquire Now
          </Link>

          {/* Mobile hamburger */}
          <button
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden flex flex-col justify-center gap-[5px] w-9 h-9"
          >
            <span
              className={`block w-6 h-[2px] transition-all duration-300 ${open ? "rotate-45 translate-y-[7px]" : ""} ${isTransparent && !open ? "bg-white" : "bg-gray-800"}`}
            />
            <span
              className={`block w-6 h-[2px] transition-all duration-300 ${open ? "opacity-0" : ""} ${isTransparent && !open ? "bg-white" : "bg-gray-800"}`}
            />
            <span
              className={`block w-6 h-[2px] transition-all duration-300 ${open ? "-rotate-45 -translate-y-[7px]" : ""} ${isTransparent && !open ? "bg-white" : "bg-gray-800"}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-400 ${
          open
            ? "max-h-[85vh] opacity-100 overflow-y-auto"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col px-6 py-2">
          {navLinks.slice(0, 3).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="py-3.5 text-[14px] font-medium text-gray-800 hover:text-[var(--bronze)] border-b border-gray-100 transition-colors"
              activeProps={{ className: "text-[var(--bronze)]" }}
            >
              {l.label}
            </Link>
          ))}

          <div className="border-b border-gray-100">
            <button
              className="w-full flex items-center justify-between py-3.5 text-[14px] font-medium text-gray-800"
              onClick={() => setMobileServicesOpen((v) => !v)}
            >
              Services
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 10 8"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L5 6.5L9 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {mobileServicesOpen && (
              <div className="pb-2 pl-3 flex flex-col gap-1">
                <Link
                  to="/services"
                  className="py-2 text-[13px] text-[var(--bronze)] font-semibold"
                >
                  All Services →
                </Link>
                {services.map((s) => (
                  <Link
                    key={s.to}
                    to={s.to}
                    className="py-2 text-[13px] text-gray-600 hover:text-[var(--bronze)] transition-colors"
                    activeProps={{ className: "text-[var(--bronze)]" }}
                  >
                    — {s.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.slice(3).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="py-3.5 text-[14px] font-medium text-gray-800 hover:text-[var(--bronze)] border-b border-gray-100 last:border-0 transition-colors"
              activeProps={{ className: "text-[var(--bronze)]" }}
            >
              {l.label}
            </Link>
          ))}

          <Link
            to="/contact"
            className="mt-4 mb-4 inline-flex justify-center bg-[var(--bronze)] text-white px-6 py-3 text-[12px] font-semibold uppercase tracking-widest"
          >
            Enquire Now
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
