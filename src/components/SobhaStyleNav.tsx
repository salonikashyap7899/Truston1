import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "@tanstack/react-router";

const services = [
  { label: "Plot Selling", to: "/plot-selling" },
  { label: "Architecture & Design", to: "/architecture-design" },
  { label: "Construction & Build", to: "/construction-build" },
  { label: "Investment Consulting", to: "/investment-consulting" },
] as const;

const leftLinks = [
  { label: "ABOUT", to: "/about-us" },
  { label: "COMMUNITIES", to: "/project" },
  { label: "PROPERTIES", to: "/services" },
] as const;

const rightLinks = [
  { label: "LIFESTYLE", to: "/lifestyle" },
  { label: "CONTACT US", to: "/contact" },
] as const;

export function SobhaStyleNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    setOpen(false);
    setSvcOpen(false);
    setMobileServicesOpen(false);
  }, [loc.pathname]);

  // Scroll detection
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isTransparent = !scrolled && !open;

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-white shadow-lg" 
          : "bg-gradient-to-b from-black/40 to-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className={`flex items-center justify-between transition-all duration-500 ${
          scrolled ? "h-[80px]" : "h-[100px] md:h-[120px]"
        }`}>
          {/* Left Nav */}
          <nav className="hidden lg:flex items-center gap-8 flex-1">
            {leftLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-[11px] font-semibold tracking-[0.18em] transition-all duration-300 relative group ${
                  isTransparent
                    ? "text-white/90 hover:text-white"
                    : "text-[var(--ink)] hover:text-[var(--bronze)]"
                }`}
              >
                {l.label}
                <span className={`absolute -bottom-1 left-0 right-0 h-[1px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                  isTransparent ? "bg-white" : "bg-[var(--bronze)]"
                }`} />
              </Link>
            ))}
          </nav>

          {/* Logo - Centered */}
          <div className="flex justify-center shrink-0 px-4 md:px-8">
            <Link to="/" className="flex flex-col items-center group">
              <img
                src="/logo.png"
                alt="Logo"
                className={`w-auto object-contain transition-all duration-500 ${
                  scrolled 
                    ? "h-12 md:h-14" 
                    : "h-16 md:h-20 lg:h-24 brightness-110"
                }`}
              />
              {/* Brand text under logo */}
              <AnimatePresence>
                {!scrolled && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="hidden md:flex flex-col items-center mt-1"
                  >
                    <span className="text-[10px] tracking-[0.35em] text-white/60 uppercase">
                      Premium Estate
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
          </div>

          {/* Right Nav */}
          <div className="hidden lg:flex items-center justify-end gap-8 flex-1">
            <nav className="flex items-center gap-8">
              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setSvcOpen(true)}
                onMouseLeave={() => setSvcOpen(false)}
              >
                <button
                  className={`flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.18em] transition-all duration-300 relative group ${
                    isTransparent
                      ? "text-white/90 hover:text-white"
                      : "text-[var(--ink)] hover:text-[var(--bronze)]"
                  }`}
                >
                  SERVICES
                  <motion.svg
                    animate={{ rotate: svcOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 10 8"
                  >
                    <path
                      d="M1 2L5 6L9 2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {svcOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full pt-2"
                    >
                      <div className="w-60 bg-white shadow-2xl border border-gray-100 overflow-hidden">
                        <Link
                          to="/services"
                          className="flex items-center justify-between px-5 py-4 text-[11px] font-bold tracking-[0.15em] text-[var(--bronze)] border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          ALL SERVICES
                          <span>&rarr;</span>
                        </Link>
                        {services.map((s) => (
                          <Link
                            key={s.to}
                            to={s.to}
                            className="block px-5 py-3.5 text-[12px] text-gray-700 hover:text-[var(--bronze)] hover:bg-gray-50 border-b border-gray-50 transition-colors last:border-0"
                            activeProps={{
                              className: "text-[var(--bronze)] bg-gray-50",
                            }}
                          >
                            {s.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {rightLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`text-[11px] font-semibold tracking-[0.18em] transition-all duration-300 relative group ${
                    isTransparent
                      ? "text-white/90 hover:text-white"
                      : "text-[var(--ink)] hover:text-[var(--bronze)]"
                  }`}
                >
                  {l.label}
                  <span className={`absolute -bottom-1 left-0 right-0 h-[1px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                    isTransparent ? "bg-white" : "bg-[var(--bronze)]"
                  }`} />
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-4 ml-4">
              {/* Search Icon */}
              <button
                className={`w-10 h-10 flex items-center justify-center transition-colors duration-300 ${
                  isTransparent ? "text-white/80 hover:text-white" : "text-[var(--ink)] hover:text-[var(--bronze)]"
                }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden flex flex-col justify-center gap-[5px] w-10 h-10"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className={`block w-6 h-[2px] transition-colors duration-300 ${
                isTransparent && !open ? "bg-white" : "bg-[var(--ink)]"
              }`}
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className={`block w-6 h-[2px] transition-colors duration-300 ${
                isTransparent && !open ? "bg-white" : "bg-[var(--ink)]"
              }`}
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className={`block w-6 h-[2px] transition-colors duration-300 ${
                isTransparent && !open ? "bg-white" : "bg-[var(--ink)]"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-6 max-h-[80vh] overflow-y-auto">
              {leftLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="py-4 text-[12px] font-bold tracking-[0.15em] text-[var(--ink)] hover:text-[var(--bronze)] border-b border-gray-100 transition-colors"
                  activeProps={{ className: "text-[var(--bronze)]" }}
                >
                  {l.label}
                </Link>
              ))}

              {/* Services Accordion */}
              <div className="border-b border-gray-100">
                <button
                  className="w-full flex items-center justify-between py-4 text-[12px] font-bold tracking-[0.15em] text-[var(--ink)]"
                  onClick={() => setMobileServicesOpen((v) => !v)}
                >
                  SERVICES
                  <motion.svg
                    animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 10 8"
                  >
                    <path
                      d="M1 2L5 6L9 2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-4 pl-4 flex flex-col gap-2">
                        <Link
                          to="/services"
                          className="py-2 text-[12px] text-[var(--bronze)] font-semibold"
                        >
                          All Services &rarr;
                        </Link>
                        {services.map((s) => (
                          <Link
                            key={s.to}
                            to={s.to}
                            className="py-2 text-[12px] text-gray-600 hover:text-[var(--bronze)] transition-colors"
                            activeProps={{ className: "text-[var(--bronze)]" }}
                          >
                            {s.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {rightLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="py-4 text-[12px] font-bold tracking-[0.15em] text-[var(--ink)] hover:text-[var(--bronze)] border-b border-gray-100 last:border-0 transition-colors"
                  activeProps={{ className: "text-[var(--bronze)]" }}
                >
                  {l.label}
                </Link>
              ))}

              {/* Mobile CTA */}
              <Link
                to="/contact"
                className="mt-6 inline-flex justify-center bg-[var(--bronze)] text-white px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.2em]"
              >
                Enquire Now
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
