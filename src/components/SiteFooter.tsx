import { Link } from "@tanstack/react-router";

const services = [
  { label: "Plot Selling", to: "/plot-selling" },
  { label: "Architecture & Design", to: "/architecture-design" },
  { label: "Construction & Build", to: "/construction-build" },
  { label: "Investment Consulting", to: "/investment-consulting" },
] as const;

const company = [
  { label: "About Us", to: "/about-us" },
  { label: "Projects", to: "/project" },
  { label: "Channel Partner", to: "/channel-partner" },
  { label: "Contact", to: "/contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-[var(--ink)] text-white/70">
      {/* Top CTA strip */}
      <div className="border-b border-white/5 py-14 px-6">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-[var(--bronze)] mb-2">Ready to invest?</p>
            <h3 className="font-display text-4xl md:text-5xl text-white leading-tight">
              Own the Ground.<br />Build the{" "}
              <em className="gradient-bronze-text not-italic">Legacy.</em>
            </h3>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-[var(--bronze)] text-white px-8 py-4 text-[11px] uppercase tracking-widest hover:opacity-90 transition-opacity duration-300"
            >
              Enquire Now →
            </Link>
            <a
              href="tel:+919616061166"
              className="inline-flex items-center gap-3 border border-white/20 text-white/70 px-8 py-4 text-[11px] uppercase tracking-widest hover:border-[var(--bronze)] hover:text-[var(--bronze)] transition-all duration-300"
            >
              +91 96160-61166
            </a>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-4 gap-12">
        {/* Brand column */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-4 mb-8">
            <img
              src="/logo.png" alt="TrustOn Logo"
              className="h-12 w-auto object-contain brightness-125"
            />
            <div>
              <span className="block text-[var(--bronze)] text-xl font-bold tracking-widest uppercase">TrustOn</span>
              <span className="block text-[9px] uppercase tracking-[0.4em] text-white/30">Premium Estate</span>
            </div>
          </div>
          <p className="text-white/50 text-sm leading-relaxed max-w-sm mb-8">
            Prime Estate by TrustOn Developers — a Jila Panchayat approved luxury township
            in Lucknow, crafted for those who expect more from every square foot.
          </p>
          {/* Social icons */}
          <div className="flex gap-4">
            {["FB", "IG", "YT", "WA"].map((s) => (
              <button
                key={s}
                className="w-9 h-9 border border-white/10 text-[10px] text-white/40 hover:border-[var(--bronze)] hover:text-[var(--bronze)] transition-all duration-300 flex items-center justify-center"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <p className="text-[11px] uppercase tracking-widest text-[var(--bronze)] mb-6 pb-3 border-b border-white/5">Services</p>
          <ul className="space-y-3">
            {services.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-white/50 hover:text-white hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2 group"
                >
                  <span className="w-0 h-px bg-[var(--bronze)] group-hover:w-4 transition-all duration-300" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company + Contact */}
        <div>
          <p className="text-[11px] uppercase tracking-widest text-[var(--bronze)] mb-6 pb-3 border-b border-white/5">Company</p>
          <ul className="space-y-3 mb-8">
            {company.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-white/50 hover:text-white hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2 group"
                >
                  <span className="w-0 h-px bg-[var(--bronze)] group-hover:w-4 transition-all duration-300" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="pt-6 border-t border-white/5 space-y-2">
            <a href="tel:+919616061166" className="block text-[var(--bronze)] font-serif text-xl hover:underline">
              +91 96160-61166
            </a>
            <a href="mailto:trustondevelopers01@gmail.com" className="block text-white/40 text-xs hover:text-white/70 transition-colors break-all">
              trustondevelopers01@gmail.com
            </a>
            <p className="text-white/30 text-xs leading-relaxed mt-3">
              UGF, Apple Plaza, Next To HDFC Bank,<br />
              Hardoi Road, Lucknow — 226003
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 mx-auto max-w-7xl px-6 py-6 flex flex-wrap justify-between gap-3 text-[11px] uppercase tracking-widest text-white/25">
        <span>© 2025 TrustOn Developers. All Rights Reserved.</span>
        <span className="flex gap-6">
          <Link to="/admin/login" className="hover:text-[var(--bronze)] transition-colors">Admin</Link>
          <span>Crafted with luxury in mind</span>
        </span>
      </div>
    </footer>
  );
}
