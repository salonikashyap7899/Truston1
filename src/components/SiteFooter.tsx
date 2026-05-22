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
    <footer className="bg-ink text-white/70">
      {/* Top CTA strip */}
      <div className="border-b border-white/5 py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-luxe-blue rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-luxe-cyan rounded-full blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          <div className="text-center md:text-left">
            <p className="text-[12px] uppercase tracking-[0.5em] text-luxe-cyan mb-6 font-bold">
              Begin Your Journey
            </p>
            <h3 className="font-display text-5xl md:text-8xl text-white leading-[0.95] mb-2 tracking-tighter">
              Own the Ground.
              <br />
              Build the <em className="gradient-luxe-text not-italic">Legacy.</em>
            </h3>
          </div>
          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            <Link to="/contact" className="btn-magnetic btn-luxe px-10 py-5">
              Enquire Now →
            </Link>
            <a
              href="tel:+919616061166"
              className="inline-flex items-center gap-3 border border-white/10 text-white/70 px-10 py-5 text-[11px] uppercase tracking-widest hover:border-luxe-cyan hover:text-luxe-cyan transition-all duration-500 rounded-full font-bold"
            >
              +91 96160-61166
            </a>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="mx-auto max-w-7xl px-6 py-24 grid md:grid-cols-4 gap-16">
        {/* Brand column */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-5 mb-12">
            <img
              src="/logo.png"
              alt="TrustOn Logo"
              className="h-20 w-auto object-contain brightness-125"
            />
            <div>
              <span className="block text-white text-3xl font-display tracking-tight leading-none">
                TrustOn
              </span>
              <span className="block text-[10px] uppercase tracking-[0.6em] text-luxe-cyan font-bold mt-2">
                Premium Estate
              </span>
            </div>
          </div>
          <p className="text-white/40 text-lg leading-relaxed max-w-md mb-12 font-light">
            Prime Estate by TrustOn Developers — a Jila Panchayat approved luxury township in
            Lucknow, crafted for those who expect more from every square foot.
          </p>
          {/* Social icons */}
          <div className="flex gap-4">
            {["FB", "IG", "YT", "WA"].map((s) => (
              <button
                key={s}
                className="w-12 h-12 border border-white/5 text-[10px] text-white/40 hover:border-luxe-cyan hover:text-luxe-cyan transition-all duration-500 flex items-center justify-center rounded-full font-bold"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-luxe-cyan mb-10 pb-4 border-b border-white/5 font-bold">
            Expertise
          </p>
          <ul className="space-y-4">
            {services.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-base text-white/30 hover:text-white hover:translate-x-2 transition-all duration-500 inline-flex items-center gap-3 group"
                >
                  <span className="w-0 h-px bg-luxe-cyan group-hover:w-6 transition-all duration-500" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company + Contact */}
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-luxe-cyan mb-10 pb-4 border-b border-white/5 font-bold">
            Architecture
          </p>
          <ul className="space-y-4 mb-12">
            {company.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-base text-white/30 hover:text-white hover:translate-x-2 transition-all duration-500 inline-flex items-center gap-3 group"
                >
                  <span className="w-0 h-px bg-luxe-cyan group-hover:w-6 transition-all duration-500" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="pt-10 border-t border-white/5 space-y-4">
            <a
              href="tel:+919616061166"
              className="block text-white font-display text-3xl hover:text-luxe-cyan transition-colors"
            >
              +91 96160-61166
            </a>
            <a
              href="mailto:trustondevelopers01@gmail.com"
              className="block text-white/30 text-xs hover:text-white/60 transition-colors break-all tracking-widest font-bold"
            >
              trustondevelopers01@gmail.com
            </a>
            <p className="text-white/20 text-[11px] leading-relaxed mt-6 font-medium uppercase tracking-wider">
              UGF, Apple Plaza, Next To HDFC Bank,
              <br />
              Hardoi Road, Lucknow — 226003
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 mx-auto max-w-7xl px-6 py-10 flex flex-wrap justify-between gap-6 text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold">
        <span>© 2025 TrustOn Developers. Billion Dollar Real Estate Empire.</span>
        <span className="flex gap-10">
          <Link to="/admin/login" className="hover:text-luxe-cyan transition-colors">
            Admin Portal
          </Link>
          <span className="text-white/10 italic">Pure Blue Luxury Architecture</span>
        </span>
      </div>
    </footer>
  );
}
