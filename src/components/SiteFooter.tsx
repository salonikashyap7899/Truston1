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
          <p className="text-white/45 text-base leading-relaxed max-w-sm mb-6 font-light">
            {String(contact.brand_desc || "Prime Estate by TrustOn Developers.")}
          </p>
          <div className="flex gap-3">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-white/10 text-white/40 hover:border-[#00BFFF] hover:text-[#00BFFF] transition-all duration-400 flex items-center justify-center rounded-full"
              aria-label="Facebook"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-white/10 text-white/40 hover:border-[#00BFFF] hover:text-[#00BFFF] transition-all duration-400 flex items-center justify-center rounded-full"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-white/10 text-white/40 hover:border-[#00BFFF] hover:text-[#00BFFF] transition-all duration-400 flex items-center justify-center rounded-full"
              aria-label="YouTube"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a
              href={`https://wa.me/${phone.replace(/[^+\d]/g, "").replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-white/10 text-white/40 hover:border-[#00BFFF] hover:text-[#00BFFF] transition-all duration-400 flex items-center justify-center rounded-full"
              aria-label="WhatsApp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
          </div>
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
