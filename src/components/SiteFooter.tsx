import { Link } from "@tanstack/react-router";

const services = [
  { label: "Plot Selling", to: "/plot-selling" },
  { label: "Architecture & Design", to: "/architecture-design" },
  { label: "Construction & Build", to: "/construction-build" },
  { label: "Investment Consulting", to: "/investment-consulting" },
] as const;

const company = [
  { label: "About Us", to: "/about-us" },
  { label: "Project", to: "/project" },
  { label: "Channel Partner", to: "/channel-partner" },
  { label: "Contact", to: "/contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-ink text-cream/85 mt-32">
      <div className="border-b border-cream/10">
        <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-bronze text-4xl font-serif italic">Trust</span>
              <span className="text-cream text-4xl font-serif">On</span>
            </div>
            <p className="font-display text-3xl text-cream/95 max-w-md leading-snug">
              Own the Ground. Build the <em className="text-bronze not-italic font-serif italic">Legacy.</em>
            </p>
            <p className="text-sm text-cream/60 mt-6 max-w-md leading-relaxed">
              Prime Estate by TrustOn Developers — a Jila Panchayat approved township in
              Lucknow, crafted for those who expect more from every square foot.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-luxe text-bronze mb-5">Services</p>
            <ul className="space-y-3 text-sm">
              {services.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-bronze transition">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-luxe text-bronze mb-5">Company</p>
            <ul className="space-y-3 text-sm">
              {company.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-bronze transition">{l.label}</Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 space-y-1 text-sm">
              <p className="text-bronze font-serif text-xl">+91 96160-61166</p>
              <p className="text-cream/70 text-xs break-all">trustondevelopers01@gmail.com</p>
              <p className="text-cream/60 text-xs leading-relaxed mt-2">
                UGF, Apple Plaza, Next To HDFC Bank,<br/>
                Hardoi Road, Lucknow — 226003
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-6 flex flex-wrap justify-between gap-3 text-[11px] uppercase tracking-luxe text-cream/50">
        <span>© {new Date().getFullYear()} TrustOn Developers</span>
        <span className="flex gap-5">
          <Link to="/admin/login" className="hover:text-bronze transition-colors">Admin</Link>
          <span>Crafted with luxury in mind</span>
        </span>
      </div>
    </footer>
  );
}
