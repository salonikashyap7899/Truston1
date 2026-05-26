import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import heroImg from "@/assets/hero-estate.jpg";
import luxuryInteriorImg from "@/assets/luxury-interior.jpg";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/project")({
  head: () => ({
    meta: [
      { title: "Prime Estate — Projects | TrustOn" },
      {
        name: "description",
        content:
          "Prime Estate — Jila Panchayat approved residential plots in Lucknow. Phase 1 & 2 now selling. Highway & metro connected.",
      },
    ],
  }),
  component: ProjectPage,
});

const faqs: { q: string; a: string }[] = [
  {
    q: "Are the plots in Prime Estate legally approved?",
    a: "Yes — all plots are Jila Panchayat approved with clear title deeds and proper documentation. Every stage is handled with complete transparency. No hidden conditions, no fine print.",
  },
  {
    q: "Can I get construction approval to build my home?",
    a: "Yes. With proper construction approval, you can design and build exactly as you envision. TrustOn also offers in-house architecture and construction services if you'd like guidance through the process.",
  },
  {
    q: "What is the starting price of plots?",
    a: "Plots start from ₹12 Lakhs+ depending on size and phase. Pricing is fully transparent with no hidden costs. Contact our team for current availability and the latest pricing sheet.",
  },
  {
    q: "Is Phase 2 available for booking now?",
    a: "Phase 2 is in active development. Early buyers can register interest now to secure priority booking at launch pricing — locking in below-market rates before the public announcement.",
  },
  {
    q: "How well connected is Prime Estate to Lucknow?",
    a: "Prime Estate at Dubagga offers direct highway connectivity and close proximity to the metro corridor — ensuring seamless access to central Lucknow, airports, schools, and commercial hubs.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/8 last:border-b-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-7 text-left gap-6 group"
      >
        <span className="font-serif text-lg text-white group-hover:text-[#00BFFF] transition-colors duration-300 leading-snug">
          {q}
        </span>
        <span
          className={`w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-[#00BFFF] text-lg font-light shrink-0 transition-all duration-400 ${
            open ? "bg-[#00BFFF]/15 border-[#00BFFF]/50 rotate-45" : "group-hover:border-[#00BFFF]/40"
          }`}
        >
          +
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <p className="text-white/45 text-sm leading-[2] font-light pb-7 pr-12">{a}</p>
      </motion.div>
    </div>
  );
}

function ProjectPage() {
  return (
    <div
      className="bg-[#04090f] text-white overflow-x-hidden selection:bg-[#00BFFF] selection:text-[#04090f]"
      style={{ paddingTop: "140px" }}
    >

      {/* ── HERO — split layout ── */}
      <section className="min-h-[90vh] grid lg:grid-cols-2 overflow-hidden">

        {/* Left — text */}
        <div className="flex flex-col justify-center px-8 md:px-16 py-16 bg-[#04090f] relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00BFFF] animate-pulse" />
              <span className="text-[#00BFFF] text-[11px] uppercase tracking-[0.3em] font-bold">
                Now Selling — Phase 1 &amp; 2
              </span>
            </div>
            <p className="text-white/40 text-[11px] uppercase tracking-[0.25em] font-bold mb-4">
              Flagship Project &nbsp;·&nbsp; Dubagga, Lucknow
            </p>
            <h1 className="font-serif text-6xl md:text-8xl font-light leading-none tracking-tight text-white mb-8">
              Prime<br />
              <em className="text-[#00BFFF] italic">Estate</em>
            </h1>
            <p className="text-white/50 text-base leading-[1.95] font-light max-w-md mb-10">
              Residential plots in Lucknow's fastest-growing corridor — highway &amp; metro connected,
              Jila Panchayat approved, with clear title deeds at every stage.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+919616061166"
                className="px-8 py-4 text-[12px] uppercase tracking-[0.12em] font-bold rounded-lg transition-all duration-500"
                style={{ background: "#00BFFF", color: "#04090f" }}
              >
                Book a Site Visit
              </a>
              <a
                href="#overview"
                className="px-8 py-4 border border-white/20 text-white/70 text-[12px] uppercase tracking-[0.12em] font-medium rounded-lg hover:border-[#00BFFF]/50 hover:text-[#00BFFF] transition-all duration-500"
              >
                Explore Project ↓
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right — image with stats bar */}
        <div className="relative overflow-hidden min-h-[50vh] lg:min-h-full">
          <img
            src={heroImg}
            alt="Prime Estate"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.55) saturate(0.7)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04090f]/60 via-transparent to-transparent" />
          {/* Stats bar at bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-[#04090f]/85 backdrop-blur-sm grid grid-cols-4 border-t border-white/8">
            {[
              { num: "120+", label: "Premium Plots" },
              { num: "47", label: "Available Now" },
              { num: "₹12L+", label: "Starting Price" },
              { num: "2", label: "Project Phases" },
            ].map((s, i) => (
              <div key={s.label} className={`py-5 px-5 ${i < 3 ? "border-r border-white/8" : ""}`}>
                <p className="font-serif text-2xl text-white leading-none mb-1">{s.num}</p>
                <p className="text-[10px] uppercase tracking-[0.12em] text-white/40">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Overview ── */}
      <section className="py-20 px-6 md:px-16 bg-[#060c16]" id="overview">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-16 items-start">
          {/* Left — text */}
          <div className="lg:col-span-3">
            <Reveal>
              <p className="text-[#00BFFF] text-[11px] uppercase tracking-[0.25em] font-bold mb-4 flex items-center gap-3">
                <span className="w-6 h-px bg-[#00BFFF]" /> Project Overview
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-8">
                Premium Residential Plots{" "}
                <em className="text-[#00BFFF] italic">Crafted for Modern Living</em>
              </h2>
              <p className="text-white/50 text-sm leading-[2] mb-5 font-light">
                Prime Estate is a thoughtfully planned residential plots colony designed for those who want
                the freedom to build on their own terms. Located in a promising growth corridor of Lucknow,
                the project offers well-defined plots, proper road connectivity, and essential infrastructure
                to support long-term development.
              </p>
              <p className="text-white/50 text-sm leading-[2] mb-8 font-light">
                An ideal choice for buyers looking to secure land in a high-potential area — whether for future
                construction or investment. With clear planning and a focus on value appreciation, Prime Estate
                gives you the foundation to create a space that truly reflects your vision.
              </p>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00BFFF]/10 border border-[#00BFFF]/25 text-[#00BFFF] text-[11px] uppercase tracking-[0.15em] font-medium rounded-full">
                ✓ &nbsp; Jila Panchayat Approved &nbsp;· &nbsp; Clear Title Deeds
              </div>
            </Reveal>
          </div>

          {/* Right — specs table */}
          <div className="lg:col-span-2">
            <Reveal delay={0.1}>
              <div className="border border-white/8 rounded-2xl overflow-hidden">
                {[
                  ["Project Type", "Residential Plots"],
                  ["Target Buyers", "Investors & End Users"],
                  ["Launch Date", "5 January 2025"],
                  ["Location", "Dubagga, Lucknow U.P."],
                  ["Plot Range", "1,200+ Sq. Ft."],
                  ["Starting Price", "₹12 Lakhs onwards"],
                  ["Approval", "Jila Panchayat ✓"],
                  ["Contact", "+91 96160-61166"],
                ].map(([k, v], i) => (
                  <div key={k} className={`flex items-center ${i % 2 === 0 ? "bg-[#060c16]" : "bg-[#080d1a]"} px-6 py-4 border-b border-white/5 last:border-b-0`}>
                    <span className="text-white/35 text-[10px] uppercase tracking-[0.15em] font-bold w-40 shrink-0">{k}</span>
                    <span className={`text-sm font-light ${k === "Approval" ? "text-[#00BFFF]" : "text-white/80"}`}>{v}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Photo Break ── */}
      <div className="relative h-[60vh] overflow-hidden group">
        <img
          src={luxuryInteriorImg}
          alt="Prime Estate"
          className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
          style={{ filter: "brightness(0.45) saturate(0.6)" }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04090f]/70 via-transparent to-[#04090f]/30" />
        <div className="absolute bottom-12 left-8 md:left-16 right-8 md:right-16">
          <p className="font-serif italic text-3xl md:text-4xl text-white/90 font-light leading-tight max-w-2xl">
            "We don't merely sell plots — we help you make one of the most significant decisions of your life."
          </p>
          <p className="text-white/40 text-[11px] uppercase tracking-[0.2em] mt-4">— Truston Developers, Lucknow</p>
        </div>
      </div>

      {/* ── Location Advantage ── */}
      <section className="py-20 px-6 md:px-16 bg-[#04090f]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-[#00BFFF] text-[11px] uppercase tracking-[0.25em] font-bold mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-[#00BFFF]" /> Location Advantage
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-16">
              Well Connected to{" "}
              <em className="text-[#00BFFF] italic">Every Corner of Lucknow</em>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
            {[
              { num: "01", title: "Highway Connectivity", desc: "Direct access to the major highway ensures fast, smooth connectivity to central Lucknow and beyond — making daily commutes completely effortless." },
              { num: "02", title: "Metro Corridor", desc: "Close proximity to the metro corridor connects residents seamlessly to the city's commercial, educational, and healthcare districts." },
              { num: "03", title: "Green Surroundings", desc: "Enveloped by lush greenery — offering clean air and a peaceful environment away from urban congestion. A rare luxury in today's cities." },
              { num: "04", title: "Growth Corridor", desc: "Located in a rapidly developing zone with rising infrastructure investment and proven land appreciation trends — your wealth grows alongside the city." },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 0.08}>
                <div className="bg-[#060c16] hover:bg-[#080d1a] transition-colors duration-300 p-10 md:p-12 h-full group cursor-pointer relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00BFFF]/0 to-[#00BFFF]/0 group-hover:from-[#00BFFF]/3 transition-all duration-700" />
                  <p className="font-serif text-4xl text-white/6 group-hover:text-[#00BFFF]/12 leading-none mb-6 transition-colors duration-500">{item.num}</p>
                  <h3 className="font-serif text-xl text-white mb-3 leading-snug">{item.title}</h3>
                  <p className="text-white/40 text-sm leading-[1.9] font-light">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Amenities ── */}
      <section className="py-20 px-6 md:px-16 bg-[#060c16]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-[#00BFFF] text-[11px] uppercase tracking-[0.25em] font-bold mb-4 text-center flex items-center justify-center gap-3">
              <span className="w-6 h-px bg-[#00BFFF]" /> Amenities <span className="w-6 h-px bg-[#00BFFF]" />
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-16 text-center">
              Everything You Need{" "}
              <em className="text-[#00BFFF] italic">Is Already Here</em>
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
            {[
              { icon: "🛤️", name: "Wide Internal Roads" },
              { icon: "🔒", name: "24/7 Security Guard" },
              { icon: "💧", name: "Piped Water Supply" },
              { icon: "⚡", name: "Electricity Connection" },
              { icon: "🌳", name: "Landscaped Parks" },
              { icon: "🔧", name: "Underground Drainage" },
            ].map((a, i) => (
              <Reveal key={a.name} delay={i * 0.07}>
                <div className="bg-[#060c16] hover:bg-[#080d1a] transition-colors duration-300 p-10 flex flex-col items-center text-center gap-4 group cursor-pointer">
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-400">{a.icon}</span>
                  <p className="text-[12px] uppercase tracking-[0.18em] text-white/60 font-medium group-hover:text-[#00BFFF] transition-colors duration-300">{a.name}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Development Phases ── */}
      <section className="py-20 px-6 md:px-16 bg-[#04090f]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-[#00BFFF] text-[11px] uppercase tracking-[0.25em] font-bold mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-[#00BFFF]" /> Development Phases
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-16">
              Structured in <em className="text-[#00BFFF] italic">Two Phases</em>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Phase 1 */}
            <Reveal delay={0.05}>
              <div className="border-t-2 border-[#00BFFF] pt-8 bg-[#060c16] p-8 md:p-10 rounded-2xl border border-[#00BFFF]/20 relative overflow-hidden hover:border-[#00BFFF]/40 transition-colors duration-500">
                <p className="absolute top-8 right-8 font-serif text-6xl text-[#00BFFF]/8 leading-none">01</p>
                <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-[#00BFFF] border border-[#00BFFF]/30 bg-[#00BFFF]/8 px-3 py-1.5 rounded-full mb-6 font-bold">
                  Now Available
                </span>
                <h3 className="font-serif text-3xl text-white mb-5">Phase One</h3>
                <p className="text-white/45 text-sm leading-[1.95] mb-8 font-light">
                  Ready for possession with complete plot demarcation, road leveling, and drainage planning.
                  Buyers can begin construction immediately with Jila Panchayat approval in hand.
                </p>
                <ul className="space-y-3">
                  {["Fully demarcated plots", "Road leveling complete", "Drainage infrastructure ready", "Electricity & water connections live", "Clear title deeds available"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white/55 text-sm">
                      <span className="w-px h-3 bg-[#00BFFF]/60 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Phase 2 */}
            <Reveal delay={0.1}>
              <div className="border-t-2 border-white/15 pt-8 bg-[#060c16] p-8 md:p-10 rounded-2xl border border-white/8 relative overflow-hidden hover:border-white/15 transition-colors duration-500">
                <p className="absolute top-8 right-8 font-serif text-6xl text-white/6 leading-none">02</p>
                <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-white/40 border border-white/12 bg-white/4 px-3 py-1.5 rounded-full mb-6 font-bold">
                  Coming Soon
                </span>
                <h3 className="font-serif text-3xl text-white mb-5">Phase Two</h3>
                <p className="text-white/45 text-sm leading-[1.95] mb-8 font-light">
                  In active development, expanding the colony with additional plots and enhanced amenities.
                  Register interest now to secure priority booking at launch pricing.
                </p>
                <ul className="space-y-3">
                  {["Extended plot sizes available", "Landscaped green zones", "Enhanced security systems", "Community park & walkways", "Pre-booking open now"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white/35 text-sm">
                      <span className="w-px h-3 bg-white/20 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Why Prime Estate ── */}
      <section className="py-20 px-6 md:px-16 bg-[#060c16]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-[#00BFFF] text-[11px] uppercase tracking-[0.25em] font-bold mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-[#00BFFF]" /> Why Prime Estate
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-16">
              Invest with <em className="text-[#00BFFF] italic">Clarity &amp; Confidence</em>
            </h2>
          </Reveal>
          <div className="border-t border-white/8">
            {[
              { num: "01", title: "High Growth Location", desc: "Situated in Lucknow's rapidly expanding development corridor, Prime Estate benefits from strong land appreciation driven by proximity to highways and the metro." },
              { num: "02", title: "Transparent Documentation", desc: "Clear title deeds, Jila Panchayat approval, and no hidden charges — every document provided upfront. Zero ambiguity at every stage of the transaction." },
              { num: "03", title: "Planned Infrastructure", desc: "Wide roads, drainage, water, and electricity — developed in phases for consistent quality. Master-planned for long-term livability and value appreciation." },
              { num: "04", title: "Build on Your Own Terms", desc: "With full construction approval, you design and build exactly as you envision. No forced packages, no builder lock-ins — your land, your freedom, your timeline." },
              { num: "05", title: "Strong Investment Potential", desc: "Highway and metro proximity make Prime Estate a smart long-term investment with high resale value. Both hold-and-appreciate and build-immediately strategies are fully supported." },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 0.07}>
                <div className="grid grid-cols-[4rem_1fr] gap-8 py-8 border-b border-white/8 last:border-b-0 hover:pl-3 transition-all duration-400 group cursor-pointer">
                  <p className="font-serif italic text-4xl text-white/8 group-hover:text-[#00BFFF]/20 leading-none transition-colors duration-500 text-right pt-1">{item.num}</p>
                  <div>
                    <h3 className="font-serif text-xl text-white mb-2 group-hover:text-[#00BFFF] transition-colors duration-300">{item.title}</h3>
                    <p className="text-white/40 text-sm leading-[1.95] font-light">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-6 md:px-16 bg-[#04090f]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-[#00BFFF] text-[11px] uppercase tracking-[0.25em] font-bold mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-[#00BFFF]" /> Frequently Asked
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-12">
              Common Questions About{" "}
              <em className="text-[#00BFFF] italic">Prime Estate</em>
            </h2>
          </Reveal>
          <div className="border border-white/8 rounded-2xl px-8 md:px-12 overflow-hidden bg-[#060c16]">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 md:px-16 bg-[#060c16] text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 100% at 50% 50%, rgba(0,191,255,0.06) 0%, transparent 70%)" }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <Reveal>
            <p className="text-[#00BFFF] text-[11px] uppercase tracking-[0.25em] font-bold mb-6 flex items-center justify-center gap-3">
              <span className="w-6 h-px bg-[#00BFFF]" /> 47 Plots Still Available · Prime Estate · Dubagga, Lucknow <span className="w-6 h-px bg-[#00BFFF]" />
            </p>
            <h2 className="font-serif text-4xl md:text-6xl text-white leading-tight mb-6">
              Ready to Claim<br />
              Your <em className="text-[#00BFFF] italic">Plot?</em>
            </h2>
            <p className="text-white/45 text-sm leading-relaxed mb-10 font-light max-w-md mx-auto">
              Prices starting at ₹12 Lakhs. Talk to our team today — no obligations, just complete clarity about your investment.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+919616061166"
                className="px-10 py-4 text-[12px] uppercase tracking-[0.12em] font-bold rounded-full transition-all duration-500 hover:scale-105"
                style={{ background: "#00BFFF", color: "#04090f" }}
              >
                +91 96160-61166
              </a>
              <Link
                to="/contact"
                className="px-10 py-4 border border-white/20 text-white/70 text-[12px] uppercase tracking-[0.12em] font-medium rounded-full hover:border-[#00BFFF]/50 hover:text-[#00BFFF] transition-all duration-500"
              >
                Email Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
