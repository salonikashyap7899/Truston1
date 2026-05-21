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
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500 bg-transparent"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="flex items-center justify-between transition-all duration-500 h-[140px]">
          <nav className="hidden lg:flex items-center gap-8 flex-1">
            {leftLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-[12px] font-semibold tracking-[0.15em] transition-colors duration-300 relative group text-white/90 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex justify-center shrink-0 px-4">
            <Link to="/" className="flex flex-col items-center">
              <img
                src="/logo.png"
                alt="TrustOn Logo"
                className="w-auto h-32 object-contain brightness-110"
              />
            </Link>
          </div>

          <div className="hidden lg:flex items-center justify-end gap-8 flex-1">
            <nav className="flex items-center gap-8">
              <div
                className="relative"
                onMouseEnter={() => setSvcOpen(true)}
                onMouseLeave={() => setSvcOpen(false)}
              >
                <button className="flex items-center gap-1 text-[12px] font-semibold tracking-[0.15em] transition-colors duration-300 relative group text-white/90 hover:text-white">
                  SERVICES
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
                </button>

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
                    All Services
                  </Link>
                  {services.map((service) => (
                    <Link
                      key={service.to}
                      to={service.to}
                      className="block px-5 py-3 text-[13px] text-gray-700 hover:text-[var(--bronze)] hover:bg-gray-50 border-b border-gray-50 transition-colors last:border-0"
                      activeProps={{
                        className: "text-[var(--bronze)] bg-gray-50",
                      }}
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              </div>

              {rightLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-[12px] font-semibold tracking-[0.15em] transition-colors duration-300 relative group text-white/90 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <button
            aria-label="Open menu"
            onClick={() => setOpen((value) => !value)}
            className="lg:hidden flex flex-col justify-center gap-[5px] w-9 h-9"
          >
            <span
              className={`block w-6 h-[2px] transition-all duration-300 ${open ? "rotate-45 translate-y-[7px]" : ""} bg-white`}
            />
            <span
              className={`block w-6 h-[2px] transition-all duration-300 ${open ? "opacity-0" : ""} bg-white`}
            />
            <span
              className={`block w-6 h-[2px] transition-all duration-300 ${open ? "-rotate-45 -translate-y-[7px]" : ""} bg-white`}
            />
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-400 ${
          open
            ? "max-h-[85vh] opacity-100 overflow-y-auto"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col px-6 py-4">
          {leftLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="py-4 text-[13px] font-bold tracking-widest text-gray-800 hover:text-[var(--bronze)] border-b border-gray-50 transition-colors"
              activeProps={{ className: "text-[var(--bronze)]" }}
            >
              {link.label}
            </Link>
          ))}

          <div className="border-b border-gray-100">
            <button
              className="w-full flex items-center justify-between py-4 text-[13px] font-bold tracking-widest text-gray-800"
              onClick={() => setMobileServicesOpen((value) => !value)}
            >
              SERVICES
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
                  All Services
                </Link>
                {services.map((service) => (
                  <Link
                    key={service.to}
                    to={service.to}
                    className="py-2 text-[13px] text-gray-600 hover:text-[var(--bronze)] transition-colors"
                    activeProps={{ className: "text-[var(--bronze)]" }}
                  >
                    - {service.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {rightLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="py-4 text-[13px] font-bold tracking-widest text-gray-800 hover:text-[var(--bronze)] border-b border-gray-50 last:border-0 transition-colors"
              activeProps={{ className: "text-[var(--bronze)]" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
