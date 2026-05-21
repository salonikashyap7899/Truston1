import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

const services = [
  { label: "Plot Selling", to: "/plot-selling" },
  { label: "Architecture & Design", to: "/architecture-design" },
  { label: "Construction & Build", to: "/construction-build" },
  { label: "Investment Consulting", to: "/investment-consulting" },
] as const;

const properties = [
  { label: "Prime Estate", to: "/projects/prime-estate" },
  { label: "Vista Gardens", to: "/projects/vista-gardens" },
  { label: "Horizon Heights", to: "/projects/horizon-heights" },
  { label: "Emerald Park", to: "/projects/emerald-park" },
] as const;

const company = [
  { label: "About Us", to: "/about-us" },
  { label: "Our Projects", to: "/project" },
  { label: "Channel Partner", to: "/channel-partner" },
  { label: "Contact", to: "/contact" },
] as const;

const quickLinks = [
  { label: "Careers", to: "/contact" },
  { label: "FAQ", to: "/contact" },
  { label: "Privacy Policy", to: "/contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-white">
      {/* Pre-Footer CTA Section */}
      <div className="bg-[var(--ink)] py-20 px-6">
        <div className="mx-auto max-w-[1400px] flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="text-center lg:text-left">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--bronze)] mb-4 font-semibold">
              Ready to invest?
            </p>
            <h3 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1]">
              Own the Ground.
              <br />
              <span className="text-[var(--bronze)]">Build the Legacy.</span>
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 bg-white text-[var(--ink)] px-10 py-5 text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-[var(--bronze)] hover:text-white transition-all duration-500"
            >
              Enquire Now
              <span>&rarr;</span>
            </Link>
            <a
              href="tel:+919616061166"
              className="inline-flex items-center justify-center gap-3 border border-white/30 text-white px-10 py-5 text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-white/10 hover:border-white transition-all duration-500"
            >
              +91 96160-61166
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer - Mega Footer Style */}
      <div className="border-t border-gray-100">
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          {/* Logo Section */}
          <div className="flex flex-col items-center mb-16">
            <Link to="/" className="flex flex-col items-center group">
              <img
                src="/logo.png"
                alt="TrustOn Logo"
                className="h-20 md:h-24 w-auto object-contain mb-4"
              />
              <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400">
                Premium Estate
              </span>
            </Link>
          </div>

          {/* Links Grid - Sobha Style */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
            {/* Properties Column */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--bronze)] mb-6 font-semibold">
                Properties
              </p>
              <ul className="space-y-3">
                {properties.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-gray-600 hover:text-[var(--bronze)] transition-colors duration-300"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Column */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--bronze)] mb-6 font-semibold">
                Services
              </p>
              <ul className="space-y-3">
                {services.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-gray-600 hover:text-[var(--bronze)] transition-colors duration-300"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--bronze)] mb-6 font-semibold">
                Company
              </p>
              <ul className="space-y-3">
                {company.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-gray-600 hover:text-[var(--bronze)] transition-colors duration-300"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links Column */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--bronze)] mb-6 font-semibold">
                Quick Links
              </p>
              <ul className="space-y-3">
                {quickLinks.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-gray-600 hover:text-[var(--bronze)] transition-colors duration-300"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--bronze)] mb-6 font-semibold">
                Contact Us
              </p>
              <div className="space-y-4">
                <a
                  href="tel:+919616061166"
                  className="block text-xl md:text-2xl font-display text-[var(--ink)] hover:text-[var(--bronze)] transition-colors"
                >
                  +91 96160-61166
                </a>
                <a
                  href="mailto:trustondevelopers01@gmail.com"
                  className="block text-sm text-gray-600 hover:text-[var(--bronze)] transition-colors break-all"
                >
                  trustondevelopers01@gmail.com
                </a>
                <p className="text-sm text-gray-500 leading-relaxed">
                  UGF, Apple Plaza, Next To HDFC Bank,
                  <br />
                  Hardoi Road, Lucknow — 226003
                </p>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-4 mb-12">
            {[
              { label: "Facebook", icon: "FB" },
              { label: "Instagram", icon: "IG" },
              { label: "YouTube", icon: "YT" },
              { label: "LinkedIn", icon: "IN" },
              { label: "Twitter", icon: "X" },
              { label: "WhatsApp", icon: "WA" },
            ].map((social) => (
              <motion.button
                key={social.label}
                whileHover={{ y: -3, backgroundColor: "var(--bronze)", color: "white" }}
                className="w-10 h-10 border border-gray-200 text-[10px] font-semibold text-gray-500 flex items-center justify-center transition-all duration-300"
                aria-label={social.label}
              >
                {social.icon}
              </motion.button>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 mb-8" />

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] uppercase tracking-[0.15em] text-gray-400">
            <span>&copy; 2026 TrustOn Developers. All Rights Reserved.</span>
            <div className="flex items-center gap-6">
              <Link to="/admin/login" className="hover:text-[var(--bronze)] transition-colors">
                Admin
              </Link>
              <span className="text-gray-300">|</span>
              <a href="#" className="hover:text-[var(--bronze)] transition-colors">
                Privacy Policy
              </a>
              <span className="text-gray-300">|</span>
              <a href="#" className="hover:text-[var(--bronze)] transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
