import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { usePageContent } from "@/hooks/usePageContent";
import { openConsultationModal } from "@/components/ConsultationModal";

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
  const cta = usePageContent("footer.cta", {
    eyebrow: "Begin Your Journey",
    title: "Own the Ground.",
    title_accent: "Build the Legacy.",
    cta_primary: "Enquire Now →",
    cta_phone: "+91 96160-61166",
  });

  const contact = usePageContent("footer.contact", {
    brand_name: "TrustOn",
    brand_tagline: "Premium Estate",
    brand_desc: "Prime Estate by TrustOn Developers — a Jila Panchayat approved luxury township in Lucknow, crafted for those who expect more from every square foot.",
    phone: "+91 96160-61166",
    email: "trustondevelopers01@gmail.com",
    address: "UGF, Apple Plaza, Next To HDFC Bank, Hardoi Road, Lucknow — 226003",
    copyright: "© 2025 TrustOn Developers. Billion Dollar Real Estate Empire.",
  });

  const phone = String(contact.phone || "+91 96160-61166");
  const email = String(contact.email || "trustondevelopers01@gmail.com");
  const address = String(contact.address || "UGF, Apple Plaza, Next To HDFC Bank, Hardoi Road, Lucknow — 226003");
  const copyright = String(contact.copyright || "© 2025 TrustOn Developers. Billion Dollar Real Estate Empire.");
  const ctaPhone = String(cta.cta_phone || "+91 96160-61166");
  const ctaPhoneHref = "tel:" + ctaPhone.replace(/[^+\d]/g, "");

  return (
    <footer style={{ background: "#04090f" }} className="text-white/70 border-t border-white/5">

      <div className="relative overflow-hidden border-b border-white/5 py-20 md:py-28 px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-1/3 right-0 w-[600px] h-[600px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(0,74,173,0.18) 0%, transparent 70%)", filter: "blur(80px)" }}
          />
          <div
            className="absolute -bottom-1/3 left-0 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(0,191,255,0.10) 0%, transparent 70%)", filter: "blur(100px)" }}
          />
        </div>

        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
          <div className="text-center md:text-left">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[11px] uppercase tracking-[0.5em] text-[#00BFFF] mb-5 font-bold"
            >
              {String(cta.eyebrow || "Begin Your Journey")}
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-[1] tracking-tight"
            >
              {String(cta.title || "Own the Ground.")}
              <br />
              Build the <span style={{ color: "#00BFFF" }}>{String(cta.title_accent || "Legacy.")}</span>
            </motion.h3>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-4 justify-center md:justify-start"
          >
            <button
              onClick={openConsultationModal}
              className="inline-flex items-center gap-3 px-8 py-4 text-[11px] uppercase tracking-widest font-bold rounded-full transition-all duration-500"
              style={{ background: "#00BFFF", color: "#04090f" }}
            >
              {String(cta.cta_primary || "Enquire Now →")}
            </button>
            <a
              href={ctaPhoneHref}
              className="inline-flex items-center gap-3 border border-white/10 text-white/60 px-8 py-4 text-[11px] uppercase tracking-widest hover:border-[#00BFFF] hover:text-[#00BFFF] transition-all duration-500 rounded-full font-bold"
            >
              {ctaPhone}
            </a>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 grid md:grid-cols-4 gap-12 md:gap-16">

        <div className="md:col-span-2">
          <div className="flex items-center gap-4 mb-8">
            <img
              src="/logo.png"
              alt="TrustOn Logo"
              className="h-14 w-auto object-contain brightness-125"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div>
              <span className="block text-white text-2xl font-serif tracking-tight leading-none">
                {String(contact.brand_name || "TrustOn")}
              </span>
              <span className="block text-[10px] uppercase tracking-[0.5em] text-[#00BFFF] font-bold mt-1.5">
                {String(contact.brand_tagline || "Premium Estate")}
              </span>
            </div>
          </div>
          <p className="text-white/45 text-base leading-relaxed max-w-sm mb-10 font-light">
            {String(contact.brand_desc || "Prime Estate by TrustOn Developers.")}
          </p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#00BFFF] mb-8 pb-3 border-b border-white/5 font-bold">
            Expertise
          </p>
          <ul className="space-y-3">
            {services.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-white/40 hover:text-white hover:translate-x-2 transition-all duration-400 inline-flex items-center gap-3 group"
                >
                  <span className="w-0 h-px bg-[#00BFFF] group-hover:w-5 transition-all duration-400" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#00BFFF] mb-8 pb-3 border-b border-white/5 font-bold">
            Company
          </p>
          <ul className="space-y-3 mb-10">
            {company.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-white/40 hover:text-white hover:translate-x-2 transition-all duration-400 inline-flex items-center gap-3 group"
                >
                  <span className="w-0 h-px bg-[#00BFFF] group-hover:w-5 transition-all duration-400" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="pt-8 border-t border-white/5 space-y-3">
            <a
              href={`tel:${phone.replace(/[^+\d]/g, "")}`}
              className="block text-white font-serif text-2xl hover:text-[#00BFFF] transition-colors duration-400"
            >
              {phone}
            </a>
            <a
              href={`mailto:${email}`}
              className="block text-white/35 text-xs hover:text-white/60 transition-colors break-all tracking-wide"
            >
              {email}
            </a>
            <p className="text-white/20 text-[10px] leading-relaxed mt-4 uppercase tracking-wider">
              {address}
            </p>
          </div>
        </div>
      </div>

      <div
        className="border-t border-white/5 px-6 py-8 flex flex-wrap items-center justify-between gap-4 text-[10px] uppercase tracking-[0.25em] text-white/20 font-bold max-w-7xl mx-auto"
      >
        <span>{copyright}</span>
        <span className="flex gap-8 items-center">
          <Link to="/admin/login" className="hover:text-[#00BFFF] transition-colors duration-400">
            Admin Portal
          </Link>
          <span className="text-white/10 italic normal-case tracking-normal">Pure Blue Luxury Architecture</span>
        </span>
      </div>
    </footer>
  );
}
