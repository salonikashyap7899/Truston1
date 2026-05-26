import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import plotImg from "@/assets/plot-tracker.jpg";
import luxuryInteriorImg from "@/assets/luxury-interior.jpg";

export const Route = createFileRoute("/plot-selling")({
  head: () => ({
    meta: [
      { title: "Plot Selling — TrustOn Developers" },
      {
        name: "description",
        content:
          "Jila Panchayat approved plots in Lucknow's highest-growth corridors. Zero ambiguity. Complete documentation. Starting at ₹12 Lakhs.",
      },
    ],
  }),
  component: PlotSellingPage,
});

const tickerItems = [
  "Jila Panchayat Approved",
  "Dubagga, Lucknow",
  "Clear Title Deeds",
  "47 Plots Available Now",
  "Starting ₹12 Lakhs",
  "25% Annual Appreciation",
  "End-to-End Support",
  "Prime Estate · Phase I & II",
];

const plotTypes = ["All", "Residential", "Corner Plots", "Commercial"];

const plots = [
  {
    tag: "⭐ Featured · Best Value",
    tagColor: "text-[#00BFFF] border-[#00BFFF]/30 bg-[#00BFFF]/8",
    loc: "Prime Estate · Dubagga, Lucknow",
    name: "Plot A-07 — Corner Double-Front",
    area: "720 sq ft",
    dims: "30 × 24 m",
    facing: "North-East",
    road: "24 m",
    ownership: "Freehold",
    price: "₹ 21.6 L",
    sub: "₹ 3,000 / sq ft · JP Approved",
    type: "corner",
    featured: true,
  },
  {
    tag: "Available",
    tagColor: "text-white/60 border-white/15 bg-white/4",
    loc: "Phase I · Sector 8, Lucknow",
    name: "Plot B-03 — Standard Residential",
    area: "450 sq ft",
    dims: "25 × 18 m",
    facing: "North",
    road: "18 m",
    ownership: "Freehold",
    price: "₹ 13.5 L",
    sub: "₹ 2,400 / sq ft",
    type: "residential",
  },
  {
    tag: "Commercial",
    tagColor: "text-amber-400 border-amber-400/30 bg-amber-400/8",
    loc: "NH-19 Corridor · Lucknow",
    name: "Plot C-01 — Highway Commercial",
    area: "600 sq ft",
    dims: "30 × 20 m",
    facing: "East",
    road: "Highway",
    ownership: "Freehold",
    price: "₹ 19.2 L",
    sub: "₹ 3,200 / sq ft",
    type: "commercial",
  },
  {
    tag: "◎ Corner Plot",
    tagColor: "text-emerald-400 border-emerald-400/30 bg-emerald-400/8",
    loc: "Phase II · Green Township",
    name: "Plot D-11 — Corner Compact",
    area: "380 sq ft",
    dims: "20 × 19 m",
    facing: "South",
    road: "2 Roads",
    ownership: "Freehold",
    price: "₹ 12 L",
    sub: "₹ 2,500 / sq ft · Starter",
    type: "corner",
  },
  {
    tag: "Available",
    tagColor: "text-white/60 border-white/15 bg-white/4",
    loc: "Phase I · Central Block",
    name: "Plot E-05 — Wide Frontage",
    area: "540 sq ft",
    dims: "27 × 20 m",
    facing: "West",
    road: "20 m",
    ownership: "Freehold",
    price: "₹ 16.2 L",
    sub: "₹ 3,000 / sq ft",
    type: "residential",
  },
  {
    tag: "SOLD OUT",
    tagColor: "text-white/20 border-white/8 bg-white/2",
    loc: "Phase I · Prime Block",
    name: "Plot F-02 — Premium Corner",
    area: "860 sq ft",
    dims: "40 × 21.5 m",
    facing: "North-West",
    road: "30 m",
    ownership: "Freehold",
    price: "₹ 28 L",
    sub: "Sold",
    type: "corner",
    sold: true,
  },
];

const processSteps = [
  {
    num: "01",
    title: "Site Visit & Consultation",
    desc: "We start by showing you the plot in person. Complete transparency from the very first meeting — location, boundaries, and documentation.",
    tag: "Zero Commitment",
  },
  {
    num: "02",
    title: "Legal Review & Verification",
    desc: "Our legal team reviews all documents — title deeds, JP approvals, and compliance certificates — before any commitment is made.",
    tag: "100% Verified",
  },
  {
    num: "03",
    title: "Documentation & Registration",
    desc: "We handle the complete paperwork process — from registry to mutation — ensuring your ownership is clean and undisputed.",
    tag: "End-to-End Support",
  },
  {
    num: "04",
    title: "Handover & After-Sales",
    desc: "Plot handover with full boundary marking, possession letter, and continued support for construction planning if needed.",
    tag: "Lifetime Support",
  },
];

const whyPoints = [
  {
    icon: "🏛️",
    title: "Government Certified",
    desc: "Every plot in Prime Estate carries full Jila Panchayat approval — giving you complete legal security and peace of mind from day one.",
  },
  {
    icon: "📋",
    title: "Transparent Pricing",
    desc: "No hidden charges, no surprise fees. Our pricing is straightforward with complete cost breakdowns available at any stage.",
  },
  {
    icon: "📍",
    title: "Prime Location",
    desc: "Strategically located in Dubagga — connected to Lucknow Metro, NH-19, and within reach of the city's major business and commercial hubs.",
  },
  {
    icon: "🤝",
    title: "Dedicated Relationship Manager",
    desc: "From first enquiry to final handover, you have one point of contact who knows your file and is always available.",
  },
];

const faqs = [
  {
    q: "Are all plots Jila Panchayat approved?",
    a: "Yes. Every plot in Prime Estate carries full Jila Panchayat approval and comes with clear title deeds verified by our legal team.",
  },
  {
    q: "What is the minimum plot size available?",
    a: "Our plots start from 380 sq ft, going up to 860+ sq ft. We have options for first-time buyers as well as larger investors.",
  },
  {
    q: "Can I get home loan financing for these plots?",
    a: "Yes. Our plots are eligible for bank financing. We have tie-ups with leading lenders and can facilitate the loan process on your behalf.",
  },
  {
    q: "How long does the registration process take?",
    a: "Once documents are in order, registration typically completes within 7–10 working days. We guide you through every step.",
  },
  {
    q: "Is the plot available for NRI buyers?",
    a: "Absolutely. NRIs can purchase residential plots in India under FEMA guidelines. We have dedicated support for NRI documentation and power-of-attorney arrangements.",
  },
  {
    q: "What infrastructure is currently available at the site?",
    a: "Phase I has wide internal roads, boundary walls, electricity connection points, and water supply infrastructure already in place.",
  },
];

function PlotSellingPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredPlots =
    activeFilter === "All"
      ? plots
      : plots.filter((p) =>
          activeFilter === "Corner Plots"
            ? p.type === "corner"
            : p.type === activeFilter.toLowerCase()
        );

  return (
    <div className="bg-[#04090f] text-white min-h-screen overflow-x-hidden selection:bg-[#00BFFF] selection:text-[#04090f]">

      {/* ── HERO with bg image ── */}
      <section className="relative min-h-screen flex items-end overflow-hidden pt-[88px]">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={plotImg}
            alt="Prime Estate"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.2) saturate(0.5)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#04090f]/70 via-[#04090f]/30 to-[#04090f]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04090f]/60 to-transparent" />
          {/* Blue glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 70% 60% at 60% 40%, rgba(0,100,191,0.15) 0%, transparent 70%)" }}
          />
          {/* Grid lines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-20 w-full grid md:grid-cols-2 gap-12 items-end">
          {/* Left — content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-[#00BFFF]" />
              <span className="text-[#00BFFF] text-[11px] uppercase tracking-[0.3em] font-bold">
                Asset Acquisition · Prime Estate
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight text-white mb-6">
              Own <em className="text-[#00BFFF] italic">Land</em>
              <br />
              That Builds
              <br />
              a Legacy
            </h1>
            <p className="text-white/55 text-base md:text-lg leading-relaxed max-w-md mb-8 font-light">
              Jila Panchayat approved plots in Lucknow's highest-growth corridors.
              Zero ambiguity. Complete documentation. Prices starting at ₹12 Lakhs.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#plots"
                className="px-8 py-4 text-[12px] uppercase tracking-[0.12em] font-bold rounded-lg transition-all duration-500 hover:scale-105"
                style={{ background: "#00BFFF", color: "#04090f" }}
              >
                View Available Plots
              </a>
              <a
                href="tel:+919616061166"
                className="px-8 py-4 border border-white/20 text-white/70 text-[12px] uppercase tracking-[0.12em] font-medium rounded-lg hover:border-[#00BFFF] hover:text-[#00BFFF] transition-all duration-500"
              >
                Call Us Now
              </a>
            </div>
          </motion.div>

          {/* Right — stats card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block"
          >
            <div className="border border-white/8 rounded-2xl overflow-hidden bg-[#060c16]/80 backdrop-blur-sm">
              <div className="grid grid-cols-2">
                {[
                  { num: "120+", label: "Total Plots" },
                  { num: "47", label: "Still Available" },
                  { num: "₹12L+", label: "Starting Price" },
                  { num: "25%", label: "Avg. Annual Growth" },
                ].map((s, i) => (
                  <div key={s.label} className={`p-7 border border-white/5 ${i < 2 ? "border-b" : ""} ${i % 2 === 0 ? "border-r" : ""}`}>
                    <p className="font-serif text-4xl text-[#00BFFF] leading-none mb-2">{s.num}</p>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-white/35 font-bold">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 flex items-center gap-3 border-t border-white/5">
                <span className="text-xl">🏛️</span>
                <div>
                  <p className="text-[#00BFFF] text-[10px] uppercase tracking-[0.12em] font-bold mb-0.5">Government Approved</p>
                  <p className="text-white/40 text-xs font-light">Jila Panchayat certified. Clear title deeds. Fully compliant.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Ticker ── */}
      <div className="border-y border-[#00BFFF]/15 bg-[#00BFFF]/5 py-3 overflow-hidden">
        <div
          className="flex gap-12 whitespace-nowrap"
          style={{ animation: "plot-ticker 28s linear infinite" }}
        >
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <div key={i} className="flex items-center gap-3 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00BFFF] shrink-0" />
              <span className="text-[#00BFFF] text-[11px] uppercase tracking-[0.12em] font-medium">{item}</span>
            </div>
          ))}
        </div>
        <style>{`@keyframes plot-ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </div>

      {/* ── Available Plots ── */}
      <section className="py-20 px-6 md:px-12 bg-[#060c16]" id="plots">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <Reveal>
              <div>
                <p className="text-[#00BFFF] text-[11px] uppercase tracking-[0.2em] font-bold mb-2 flex items-center gap-2">
                  <span className="w-6 h-px bg-[#00BFFF]" /> Available Inventory
                </p>
                <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">
                  Select Your <em className="text-[#00BFFF] italic">Plot</em>
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex gap-0 border border-white/10 rounded-lg overflow-hidden">
                {plotTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveFilter(t)}
                    className={`px-4 py-2.5 text-[11px] uppercase tracking-[0.1em] font-medium border-r border-white/10 last:border-r-0 transition-all duration-300 ${
                      activeFilter === t
                        ? "bg-[#00BFFF]/15 text-[#00BFFF]"
                        : "text-white/35 hover:text-white/70 hover:bg-white/5"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-xl overflow-hidden">
            {filteredPlots.map((plot, i) => (
              <Reveal key={plot.name} delay={i * 0.07}>
                <div
                  className={`bg-[#060c16] hover:bg-[#080d1a] transition-colors duration-300 flex flex-col relative group ${
                    plot.featured ? "md:col-span-2" : ""
                  } ${plot.sold ? "pointer-events-none" : "cursor-pointer"}`}
                >
                  {plot.sold && (
                    <div className="absolute inset-0 bg-[#04090f]/65 flex items-center justify-center z-10 rounded">
                      <span className="text-[11px] uppercase tracking-[0.2em] text-white/25 border border-white/10 px-4 py-2 rounded bg-[#060c16]">
                        Sold Out
                      </span>
                    </div>
                  )}
                  {/* Plot visual placeholder */}
                  <div
                    className={`w-full bg-[#080d1a] flex items-center justify-center border-b border-white/5 relative overflow-hidden ${
                      plot.featured ? "h-48" : "h-36"
                    }`}
                  >
                    <div
                      className="absolute inset-0 pointer-events-none opacity-50"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-20"
                      style={{ background: "radial-gradient(ellipse 60% 60% at 40% 50%, rgba(0,191,255,0.3) 0%, transparent 70%)" }} />
                    <div className="relative z-10 text-center">
                      <p className="font-serif text-2xl text-[#00BFFF]/50 italic">{plot.name.split("—")[0].trim()}</p>
                      <p className="text-white/20 text-[10px] uppercase tracking-[0.2em] mt-1">{plot.area}</p>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <span className={`inline-block text-[10px] uppercase tracking-[0.12em] font-bold px-3 py-1 border rounded-full mb-3 w-fit ${plot.tagColor}`}>
                      {plot.tag}
                    </span>
                    <p className="text-white/30 text-[10px] uppercase tracking-[0.1em] mb-1">{plot.loc}</p>
                    <h3 className={`font-serif text-white leading-snug mb-4 ${plot.featured ? "text-2xl" : "text-xl"}`}>
                      {plot.name}
                    </h3>
                    <div className="flex flex-wrap gap-x-5 gap-y-2 pb-4 mb-4 border-b border-white/6">
                      {[
                        { l: "Area", v: plot.area },
                        { l: "Dimensions", v: plot.dims },
                        { l: "Facing", v: plot.facing },
                        { l: "Road", v: plot.road },
                      ].map((s) => (
                        <div key={s.l}>
                          <p className="text-white text-sm font-medium">{s.v}</p>
                          <p className="text-white/30 text-[10px] uppercase tracking-[0.08em]">{s.l}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-auto flex-wrap gap-3">
                      <div>
                        <p className={`font-serif text-[#00BFFF] leading-none ${plot.featured ? "text-4xl" : "text-2xl"}`}>{plot.price}</p>
                        <p className="text-white/30 text-[10px] mt-1">{plot.sub}</p>
                      </div>
                      {!plot.sold && (
                        <a
                          href="tel:+919616061166"
                          className="px-5 py-2.5 bg-[#00BFFF]/15 border border-[#00BFFF]/30 text-[#00BFFF] text-[11px] uppercase tracking-[0.1em] font-medium rounded-lg hover:bg-[#00BFFF]/25 transition-all duration-300 group-hover:border-[#00BFFF]/60"
                        >
                          Enquire Now →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-20 px-6 md:px-12 bg-[#04090f]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-[#00BFFF] text-[11px] uppercase tracking-[0.2em] font-bold mb-3 text-center flex items-center justify-center gap-3">
              <span className="w-6 h-px bg-[#00BFFF]" /> Our Process <span className="w-6 h-px bg-[#00BFFF]" />
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-white text-center mb-4 leading-tight">
              From <em className="text-[#00BFFF] italic">Enquiry</em> to Ownership
            </h2>
            <p className="text-white/40 text-center text-sm font-light mb-16 max-w-md mx-auto leading-relaxed">
              A proven four-step process ensuring every transaction is transparent, legal, and stress-free.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-xl overflow-hidden">
            {processSteps.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.1}>
                <div className="bg-[#060c16] p-8 hover:bg-[#080d1a] transition-colors duration-300 group h-full">
                  <p className="font-serif text-5xl text-white/5 group-hover:text-[#00BFFF]/15 transition-colors duration-500 leading-none mb-5 pb-5 border-b border-white/5">
                    {step.num}
                  </p>
                  <h3 className="font-serif text-lg text-white mb-3">{step.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed font-light mb-5">{step.desc}</p>
                  <p className="text-[#00BFFF] text-[10px] uppercase tracking-[0.1em] font-bold">{step.tag}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why TrustOn ── */}
      <section className="py-20 px-6 md:px-12 bg-[#060c16]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Left — visual */}
          <Reveal direction="left">
            <div className="relative">
              <div className="absolute -inset-4 bg-[#00BFFF]/5 blur-3xl rounded-3xl" />
              <div className="relative border border-white/8 rounded-2xl overflow-hidden">
                <img
                  src={luxuryInteriorImg}
                  alt="Why TrustOn"
                  className="w-full object-cover"
                  style={{ filter: "brightness(0.7) saturate(0.8)", aspectRatio: "4/3" }}
                  loading="lazy"
                />
              </div>
              {/* Stats overlay card */}
              <div className="absolute -bottom-5 -right-5 border border-white/10 rounded-2xl p-6 bg-[#060c16]">
                <p className="font-serif text-5xl text-[#00BFFF] leading-none">73</p>
                <p className="text-white/30 text-[10px] uppercase tracking-[0.12em] mt-1">Families Already Invested</p>
              </div>
            </div>
          </Reveal>

          {/* Right — content */}
          <Reveal direction="right" delay={0.1}>
            <div>
              <p className="text-[#00BFFF] text-[11px] uppercase tracking-[0.2em] font-bold mb-5 flex items-center gap-3">
                <span className="w-6 h-px bg-[#00BFFF]" /> Why Choose TrustOn
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-6">
                The <em className="text-[#00BFFF] italic">Trusted</em> Choice
                <br />in Lucknow
              </h2>
              <p className="text-white/50 text-sm leading-relaxed mb-10 font-light">
                With 73 families already invested in Prime Estate, TrustOn has built its
                reputation on one principle: complete transparency at every step.
              </p>
              <div className="space-y-5">
                {whyPoints.map((pt, i) => (
                  <motion.div
                    key={pt.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 pb-5 border-b border-white/5 last:border-b-0 last:pb-0"
                  >
                    <div className="w-10 h-10 shrink-0 rounded-lg bg-[#00BFFF]/10 border border-[#00BFFF]/20 flex items-center justify-center text-lg mt-0.5">
                      {pt.icon}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium mb-1">{pt.title}</p>
                      <p className="text-white/40 text-sm leading-relaxed font-light">{pt.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-6 md:px-12 bg-[#04090f]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-[#00BFFF] text-[11px] uppercase tracking-[0.2em] font-bold mb-3 text-center flex items-center justify-center gap-3">
              <span className="w-6 h-px bg-[#00BFFF]" /> FAQ <span className="w-6 h-px bg-[#00BFFF]" />
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-white text-center mb-16 leading-tight">
              Common <em className="text-[#00BFFF] italic">Questions</em>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-xl overflow-hidden">
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 0.07}>
                <div className="bg-[#060c16] p-7 hover:bg-[#080d1a] transition-colors duration-300 cursor-pointer group h-full">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <p className="text-white text-base font-medium leading-snug">{faq.q}</p>
                    <span className="text-[#00BFFF] text-xl shrink-0 mt-0.5 font-light group-hover:rotate-45 transition-transform duration-300">+</span>
                  </div>
                  <p className="text-white/45 text-sm leading-relaxed font-light">{faq.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Strip ── */}
      <section className="py-20 px-6 md:px-12 bg-[#00BFFF]/10 border-y border-[#00BFFF]/20 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 100% at 50% 50%, rgba(0,191,255,0.08) 0%, transparent 70%)" }}
        />
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[#00BFFF] text-[11px] uppercase tracking-[0.2em] font-bold mb-3 flex items-center gap-2">
              <span className="w-6 h-px bg-[#00BFFF]" /> Start Your Journey
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight">
              Your Plot in Prime Estate is{" "}
              <em className="text-[#00BFFF] italic">Waiting</em>
            </h2>
          </div>
          <div className="flex flex-col gap-4 min-w-[260px]">
            <a
              href="tel:+919616061166"
              className="flex items-center gap-3 text-white hover:text-[#00BFFF] transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-lg">📞</div>
              <span className="font-serif text-2xl">+91 96160-61166</span>
            </a>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter your number"
                className="flex-1 bg-white/8 border border-white/15 text-white text-sm px-4 py-3 rounded-lg outline-none focus:border-[#00BFFF] transition-colors duration-300 placeholder:text-white/35"
              />
              <button
                className="px-5 py-3 text-[11px] uppercase tracking-[0.1em] font-bold rounded-lg transition-all duration-300 whitespace-nowrap"
                style={{ background: "#00BFFF", color: "#04090f" }}
              >
                Call Back
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
