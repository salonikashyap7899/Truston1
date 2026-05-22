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
  { label: "COMMUNITIES", to: "/project" },
  { label: "PROPERTIES", to: "/services" },
] as const;

const rightLinks = [
  { label: "LIFESTYLE", to: "/lifestyle" },
  { label: "CONTACT US", to: "/contact" },
] as const;

export function SobhaStyleNav() {
  const [open, setOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    setOpen(false);
    setSvcOpen(false);
    setMobileServicesOpen(false);
  }, [loc.pathname]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 bg-transparent`}
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className={`flex items-center justify-between transition-all duration-500 h-[140px]`}>
          {/* Left Nav */}
          <nav className="hidden lg:flex items-center gap-12 flex-1">
            {leftLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-[11px] font-bold tracking-[0.4em] transition-colors duration-300 relative group text-white/70 hover:text-luxe-cyan`}
              >
                {l.label}
                <span className="absolute -bottom-2 left-0 w-full h-px bg-luxe-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            ))}
          </nav>

          {/* Logo - Centered */}
          <div className="flex justify-center shrink-0 px-8">
            <Link to="/" className="flex flex-col items-center group">
              <img
                src="/logo.png"
                alt="Logo"
                className={`w-auto h-36 object-contain brightness-125 group-hover:scale-105 transition-transform duration-700`}
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
                <button
                  className={`flex items-center gap-2 text-[11px] font-bold tracking-[0.4em] transition-colors duration-300 relative group text-white/70 hover:text-luxe-cyan`}
                >
                  SERVICES
                  <svg
                    className={`w-3 h-3 transition-transform duration-300 ${
                      svcOpen ? "rotate-180" : ""
                    }`}
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
                  <span className="absolute -bottom-2 left-0 w-full h-px bg-luxe-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>

                <div
                  className={`absolute left-0 top-full w-64 bg-ink border border-white/10 shadow-luxe overflow-hidden transition-all duration-300 backdrop-blur-xl rounded-2xl ${
                    svcOpen
                      ? "opacity-100 translate-y-4 pointer-events-auto"
                      : "opacity-0 translate-y-0 pointer-events-none"
                  }`}
                >
                  <Link
                    to="/services"
                    className="block px-6 py-4 text-[11px] font-bold text-luxe-cyan border-b border-white/5 hover:bg-white/5 transition-colors uppercase tracking-widest"
                  >
                    All Expertise →
                  </Link>
                  {services.map((s) => (
                    <Link
                      key={s.to}
                      to={s.to}
                      className="block px-6 py-4 text-[13px] text-white/50 hover:text-white hover:bg-white/5 border-b border-white/5 transition-colors last:border-0 font-light"
                      activeProps={{
                        className: "text-luxe-cyan bg-white/5",
                      }}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>

              {rightLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`text-[11px] font-bold tracking-[0.4em] transition-colors duration-300 relative group text-white/70 hover:text-luxe-cyan`}
                >
                  {l.label}
                  <span className="absolute -bottom-2 left-0 w-full h-px bg-luxe-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
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
            <span
              className={`block w-8 h-[2px] transition-all duration-300 ${
                open ? "rotate-45 translate-y-[8px]" : ""
              } bg-white`}
            />
            <span
              className={`block w-5 h-[2px] transition-all duration-300 ${
                open ? "opacity-0" : ""
              } bg-white`}
            />
            <span
              className={`block w-8 h-[2px] transition-all duration-300 ${
                open ? "-rotate-45 -translate-y-[8px]" : ""
              } bg-white`}
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
        <nav className="flex flex-col px-10 py-12 gap-2">
          {leftLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="py-5 text-2xl font-display text-white border-b border-white/5 hover:text-luxe-cyan transition-colors"
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
              SERVICES
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${
                  mobileServicesOpen ? "rotate-180" : ""
                }`}
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
              className="overflow-hidden pl-6 flex flex-col gap-2"
            >
              <Link
                to="/services"
                className="py-3 text-[14px] text-luxe-cyan font-bold uppercase tracking-[0.4em]"
              >
                All Expertise →
              </Link>
              {services.map((s) => (
                <Link
                  key={s.to}
                  to={s.to}
                  className="py-3 text-[18px] text-white/40 hover:text-white transition-colors font-light"
                  activeProps={{ className: "text-white" }}
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
              className="py-5 text-2xl font-display text-white border-b border-white/5 last:border-0 hover:text-luxe-cyan transition-colors"
              activeProps={{ className: "text-luxe-cyan" }}
            >
              {l.label}
            </Link>
          ))}

          <Link to="/contact" className="mt-12 btn-magnetic btn-luxe py-5 rounded-2xl text-center">
            Enquire Now
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
