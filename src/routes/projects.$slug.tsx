import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Reveal } from "@/components/Reveal";
import { PROJECTS, STATUS_COLOR } from "@/data/projects";
import { getPrimeEstatePhases } from "@/lib/content.functions";
import { usePageContent } from "@/hooks/usePageContent";

export const Route = createFileRoute("/projects/$slug")({
  head: ({ params }) => {
    const project = PROJECTS.find((p) => p.id === params.slug);
    return {
      meta: [
        { title: project ? `${project.name} — ${project.city} | TrustOn` : "Project — TrustOn" },
        { name: "description", content: project?.blurb ?? "TrustOn premium real estate development." },
      ],
    };
  },
  component: ProjectDetailPage,
});

const FALLBACK_PHASES = [
  {
    active: true,
    badge: "Now Available",
    num: "01",
    title: "Phase One",
    desc: "Ready for possession with complete plot demarcation, road leveling, and drainage planning. Buyers can begin construction immediately with Jila Panchayat approval in hand.",
    items: ["Fully demarcated plots", "Road leveling complete", "Drainage infrastructure ready", "Electricity & water connections live", "Clear title deeds available"],
  },
  {
    active: false,
    badge: "Coming Soon",
    num: "02",
    title: "Phase Two",
    desc: "In active development, expanding the colony with additional plots and enhanced amenities. Register interest now to secure priority booking at launch pricing.",
    items: ["Extended plot sizes available", "Landscaped green zones", "Enhanced security systems", "Community park & walkways", "Pre-booking open now"],
  },
];

const FALLBACK_LOCATIONS = [
  { num: "01", title: "Highway Connectivity", desc: "Direct access to the major highway ensures fast, smooth connectivity to central Lucknow and beyond — making daily commutes completely effortless." },
  { num: "02", title: "Metro Corridor", desc: "Close proximity to the metro corridor connects residents seamlessly to the city's commercial, educational, and healthcare districts." },
  { num: "03", title: "Green Surroundings", desc: "Enveloped by lush greenery — offering clean air and a peaceful environment away from urban congestion. A rare luxury in today's cities." },
  { num: "04", title: "Growth Corridor", desc: "Located in a rapidly developing zone with rising infrastructure investment and proven land appreciation trends — your wealth grows alongside the city." },
];

const FALLBACK_REASONS = [
  { num: "01", title: "High Growth Location", desc: "Situated in Lucknow's rapidly expanding development corridor, Prime Estate benefits from strong land appreciation driven by proximity to highways and the metro." },
  { num: "02", title: "Transparent Documentation", desc: "Clear title deeds, Jila Panchayat approval, and no hidden charges — every document provided upfront. Zero ambiguity at every stage of the transaction." },
  { num: "03", title: "Planned Infrastructure", desc: "Wide roads, drainage, water, and electricity — developed in phases for consistent quality. Master-planned for long-term livability and value appreciation." },
  { num: "04", title: "Build on Your Own Terms", desc: "With full construction approval, you design and build exactly as you envision. No forced packages, no builder lock-ins — your land, your freedom, your timeline." },
  { num: "05", title: "Strong Investment Potential", desc: "Highway and metro proximity make Prime Estate a smart long-term investment with high resale value. Both hold-and-appreciate and build-immediately strategies are fully supported." },
];

const FALLBACK_FAQS = [
  { q: "Are the plots in Prime Estate legally approved?", a: "Yes — all plots are Jila Panchayat approved with clear title deeds and proper documentation. Every stage is handled with complete transparency. No hidden conditions, no fine print." },
  { q: "Can I get construction approval to build my home?", a: "Yes. With proper construction approval, you can design and build exactly as you envision. TrustOn also offers in-house architecture and construction services if you'd like guidance through the process." },
  { q: "What is the starting price of plots?", a: "Plots start from ₹12 Lakhs+ depending on size and phase. Pricing is fully transparent with no hidden costs. Contact our team for current availability and the latest pricing sheet." },
  { q: "Is Phase 2 available for booking now?", a: "Phase 2 is in active development. Early buyers can register interest now to secure priority booking at launch pricing — locking in below-market rates before the public announcement." },
  { q: "How well connected is Prime Estate to Lucknow?", a: "Prime Estate at Dubagga offers direct highway connectivity and close proximity to the metro corridor — ensuring seamless access to central Lucknow, airports, schools, and commercial hubs." },
];

function PrimeEstateExtra() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const fetchPhases = useServerFn(getPrimeEstatePhases);
  const [phases, setPhases] = useState(FALLBACK_PHASES);

  useEffect(() => {
    fetchPhases().then((data) => {
      if (data?.phases && data.phases.length > 0) setPhases(data.phases);
    }).catch(() => {});
  }, []);

  const quoteC = usePageContent("prime_estate.quote", {
    quote: "We don't merely sell plots — we help you make one of the most significant decisions of your life.",
    attribution: "— Truston Developers, Lucknow",
  });

  const locationC = usePageContent("prime_estate.location_advantage", {
    eyebrow: "Location Advantage",
    heading: "Well Connected to",
    heading_em: "Every Corner of Lucknow",
    locations: FALLBACK_LOCATIONS,
  });

  const whyC = usePageContent("prime_estate.why", {
    eyebrow: "Why Prime Estate",
    heading: "Invest with",
    heading_em: "Clarity & Confidence",
    reasons: FALLBACK_REASONS,
  });

  const faqC = usePageContent("prime_estate.faq", {
    eyebrow: "Frequently Asked",
    heading: "Common Questions About",
    heading_em: "Prime Estate",
    faqs: FALLBACK_FAQS,
  });

  const primeCta = usePageContent("prime_estate.prime_cta", {
    eyebrow: "47 Plots Still Available · Prime Estate · Dubagga, Lucknow",
    title: "Ready to Claim",
    title_em: "Plot?",
    subtitle: "Prices starting at ₹12 Lakhs. Talk to our team today — no obligations, just complete clarity about your investment.",
    phone: "+91 96160-61166",
    email: "trustondevelopers01@gmail.com",
  });

  const locations = Array.isArray(locationC.locations) ? (locationC.locations as {num:string;title:string;desc:string}[]) : FALLBACK_LOCATIONS;
  const reasons = Array.isArray(whyC.reasons) ? (whyC.reasons as {num:string;title:string;desc:string}[]) : FALLBACK_REASONS;
  const faqs = Array.isArray(faqC.faqs) ? (faqC.faqs as {q:string;a:string}[]) : FALLBACK_FAQS;

  return (
    <>
      {/* ── PHOTO BREAK ── */}
      <div className="relative overflow-hidden" style={{ height: "60vh" }}>
        <div
          className="absolute inset-0 transition-transform duration-[10s] hover:scale-105"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            filter: "brightness(0.65)",
          }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(4,9,15,0.75) 0%, transparent 55%)" }} />
        <div className="absolute bottom-12 left-6 md:left-16 right-6 md:right-16">
          <p className="font-serif italic text-white leading-relaxed" style={{ fontSize: "clamp(1.3rem,2.4vw,1.9rem)", maxWidth: "600px" }}>
            <span className="text-[#00BFFF]">"</span>{String(quoteC.quote || "We don't merely sell plots — we help you make one of the most significant decisions of your life.")}<span className="text-[#00BFFF]">"</span>
          </p>
          <p className="mt-4 text-[11px] tracking-[0.2em] uppercase text-white/40 font-semibold">{String(quoteC.attribution || "— Truston Developers, Lucknow")}</p>
        </div>
      </div>

      {/* ── LOCATION ADVANTAGE ── */}
      <section className="py-20 px-6 md:px-16 border-b border-white/8">
        <div className="max-w-[1180px] mx-auto">
          <Reveal>
            <p className="text-[#00BFFF] text-[11px] font-bold tracking-[0.25em] uppercase mb-3 flex items-center gap-3">
              <span className="w-6 h-px bg-[#00BFFF]" /> {String(locationC.eyebrow || "Location Advantage")}
            </p>
            <h2 className="font-serif text-[clamp(26px,3.4vw,36px)] font-semibold text-white mb-10">
              {String(locationC.heading || "Well Connected to")} <em className="italic text-[#00BFFF]">{String(locationC.heading_em || "Every Corner of Lucknow")}</em>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
            {locations.map((loc, i) => (
              <Reveal key={loc.num} delay={i * 0.07}>
                <div className="bg-[#060c16] hover:bg-[#080d1a] transition-colors duration-300 p-8">
                  <p className="font-serif italic text-[#00BFFF]/50 text-sm mb-4 tracking-wider">{loc.num}</p>
                  <h3 className="font-serif text-xl font-semibold text-white mb-3">{loc.title}</h3>
                  <p className="text-[13.5px] text-white/45 leading-[1.7]">{loc.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEVELOPMENT PHASES ── */}
      <section className="py-20 px-6 md:px-16 border-b border-white/8 bg-[#060c16]">
        <div className="max-w-[1180px] mx-auto">
          <Reveal>
            <p className="text-[#00BFFF] text-[11px] font-bold tracking-[0.25em] uppercase mb-3 flex items-center gap-3">
              <span className="w-6 h-px bg-[#00BFFF]" /> Development Phases
            </p>
            <h2 className="font-serif text-[clamp(26px,3.4vw,36px)] font-semibold text-white mb-10">
              Structured in <em className="italic text-[#00BFFF]">Two Phases</em>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-7">
            {phases.map((ph, i) => (
              <Reveal key={ph.num} delay={i * 0.1}>
                <div
                  className="rounded-2xl p-8 border relative overflow-hidden"
                  style={{
                    borderColor: ph.active ? "rgba(0,191,255,0.35)" : "rgba(255,255,255,0.08)",
                    background: ph.active ? "rgba(0,191,255,0.04)" : "#04090f",
                  }}
                >
                  <p
                    className="absolute top-6 right-6 font-serif text-[6rem] font-semibold leading-none select-none pointer-events-none"
                    style={{ color: ph.active ? "rgba(0,191,255,0.06)" : "rgba(255,255,255,0.04)" }}
                  >
                    {ph.num}
                  </p>
                  <span
                    className="inline-block text-[10px] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full mb-5"
                    style={
                      ph.active
                        ? { background: "rgba(0,191,255,0.12)", color: "#00BFFF" }
                        : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }
                    }
                  >
                    {ph.badge}
                  </span>
                  <h3 className="font-serif text-2xl font-semibold text-white mb-3">{ph.title}</h3>
                  <p className="text-[13.5px] text-white/45 leading-[1.7] mb-6">{ph.desc}</p>
                  <ul className="space-y-2.5">
                    {ph.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-[13px] text-white/55">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ph.active ? "#00BFFF" : "rgba(255,255,255,0.25)" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY PRIME ESTATE ── */}
      <section className="py-20 px-6 md:px-16 border-b border-white/8">
        <div className="max-w-[1180px] mx-auto">
          <Reveal>
            <p className="text-[#00BFFF] text-[11px] font-bold tracking-[0.25em] uppercase mb-3 flex items-center gap-3">
              <span className="w-6 h-px bg-[#00BFFF]" /> {String(whyC.eyebrow || "Why Prime Estate")}
            </p>
            <h2 className="font-serif text-[clamp(26px,3.4vw,36px)] font-semibold text-white mb-10">
              {String(whyC.heading || "Invest with")} <em className="italic text-[#00BFFF]">{String(whyC.heading_em || "Clarity & Confidence")}</em>
            </h2>
          </Reveal>
          <div className="divide-y divide-white/8 border-y border-white/8">
            {reasons.map((r, i) => (
              <Reveal key={r.num} delay={i * 0.06}>
                <div className="grid grid-cols-[4rem_1fr] gap-8 py-8 items-start group hover:pl-2 transition-all duration-300">
                  <p className="font-serif italic text-[2.2rem] text-[#00BFFF]/20 leading-none text-right pt-1 group-hover:text-[#00BFFF]/40 transition-colors">{r.num}</p>
                  <div>
                    <h3 className="font-serif text-[1.25rem] font-semibold text-white mb-2">{r.title}</h3>
                    <p className="text-[13.5px] text-white/45 leading-[1.7]">{r.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-6 md:px-16 border-b border-white/8 bg-[#060c16]">
        <div className="max-w-[1180px] mx-auto">
          <Reveal>
            <p className="text-[#00BFFF] text-[11px] font-bold tracking-[0.25em] uppercase mb-3 flex items-center gap-3">
              <span className="w-6 h-px bg-[#00BFFF]" /> {String(faqC.eyebrow || "Frequently Asked")}
            </p>
            <h2 className="font-serif text-[clamp(26px,3.4vw,36px)] font-semibold text-white mb-10">
              {String(faqC.heading || "Common Questions About")} <em className="italic text-[#00BFFF]">{String(faqC.heading_em || "Prime Estate")}</em>
            </h2>
          </Reveal>
          <div className="divide-y divide-white/8 border-y border-white/8">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  className="w-full flex items-center justify-between gap-6 py-6 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-serif text-[1.05rem] font-medium text-white leading-snug">{faq.q}</span>
                  <span
                    className="w-7 h-7 rounded-full border flex items-center justify-center shrink-0 text-lg font-light transition-all duration-300"
                    style={{
                      borderColor: openFaq === i ? "#00BFFF" : "rgba(255,255,255,0.15)",
                      color: openFaq === i ? "#00BFFF" : "rgba(255,255,255,0.4)",
                      background: openFaq === i ? "rgba(0,191,255,0.08)" : "transparent",
                      transform: openFaq === i ? "rotate(45deg)" : "none",
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-400"
                  style={{ maxHeight: openFaq === i ? "200px" : "0px" }}
                >
                  <p className="pb-6 text-[13.5px] text-white/45 leading-[1.9]">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRIME ESTATE CTA ── */}
      <section
        className="py-24 px-6 md:px-16 text-center relative overflow-hidden"
        style={{ background: "#060c16" }}
      >
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,191,255,0.1) 0%, transparent 70%)" }}
        />
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-[#00BFFF] text-[10px] font-bold tracking-[0.3em] uppercase mb-5">{String(primeCta.eyebrow || "47 Plots Still Available · Prime Estate · Dubagga, Lucknow")}</p>
          <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.6rem)] font-semibold text-white leading-[1.1] mb-4">
            {String(primeCta.title || "Ready to Claim")}<br />Your <em className="italic text-[#00BFFF]">{String(primeCta.title_em || "Plot?")}</em>
          </h2>
          <p className="text-white/45 text-[15px] leading-[1.8] mb-10">
            {String(primeCta.subtitle || "Prices starting at ₹12 Lakhs. Talk to our team today — no obligations, just complete clarity about your investment.")}
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href={`tel:${String(primeCta.phone || "+919616061166").replace(/\s/g, "")}`}
              className="px-8 py-3.5 text-[12px] font-bold tracking-[0.1em] uppercase transition-all duration-200 hover:opacity-85 hover:scale-105"
              style={{ background: "#00BFFF", color: "#04090f" }}
            >
              {String(primeCta.phone || "+91 96160-61166")}
            </a>
            <a
              href={`mailto:${String(primeCta.email || "trustondevelopers01@gmail.com")}`}
              className="px-8 py-3.5 text-[12px] font-bold tracking-[0.1em] uppercase border border-white/20 text-white/65 hover:border-[#00BFFF]/50 hover:text-[#00BFFF] transition-all duration-200"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function ProjectDetailPage() {
  const { slug } = Route.useParams();
  const project = PROJECTS.find((p) => p.id === slug);
  const [activeImage, setActiveImage] = useState(0);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });

  if (!project) {
    return (
      <div className="min-h-screen bg-[#04090f] flex items-center justify-center" style={{ paddingTop: "140px" }}>
        <div className="text-center">
          <p className="font-serif italic text-6xl text-[#00BFFF] mb-4">404</p>
          <h1 className="font-serif text-3xl text-white mb-4">Project not found</h1>
          <Link to="/project" className="text-[#00BFFF] text-sm uppercase tracking-widest hover:opacity-70 transition-opacity">
            ← Back to all projects
          </Link>
        </div>
      </div>
    );
  }

  const statusColor = STATUS_COLOR[project.status] || "#00BFFF";
  const isPrimeEstate = slug === "prime-estate";

  const specs = [
    ["Location", `${project.flag} ${project.city}, ${project.country}`],
    ["Type", project.type],
    ["Status", project.status],
    ["Starting Price", project.startingPrice],
    ["Area Range", project.area],
    ["Total Units", project.units],
    ["Possession", project.possession],
    ...(isPrimeEstate ? [["Approval", "Jila Panchayat ✓"]] : []),
  ];

  return (
    <div className="bg-[#04090f] text-white overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative h-[85vh] min-h-[520px] overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.5) saturate(0.8)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04090f] via-[#04090f]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#04090f]/60 via-transparent to-transparent" />

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-40"
          style={{ background: "radial-gradient(circle, rgba(0,191,255,0.12) 0%, transparent 70%)" }}
        />

        <div className="absolute bottom-12 left-6 md:left-16 right-6 md:right-16">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            <Link
              to="/project"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/40 hover:text-[#00BFFF] transition-colors mb-5 font-semibold"
            >
              ← All Projects
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full border"
                style={{ borderColor: `${statusColor}55`, color: statusColor, background: `${statusColor}18` }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor }} />
                {project.status}
              </span>
              <span className="text-[11px] font-bold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full border border-white/15 text-white/45">
                {project.type}
              </span>
              {isPrimeEstate && (
                <span className="text-[11px] font-bold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full border border-[#00BFFF]/30 text-[#00BFFF]/70 bg-[#00BFFF]/05">
                  Now Selling — Phase 1 &amp; 2
                </span>
              )}
            </div>
            {isPrimeEstate && (
              <p className="text-white/35 text-[11px] uppercase tracking-[0.18em] font-semibold mb-2">
                Flagship Project · Dubagga, Lucknow
              </p>
            )}
            <h1 className="font-serif text-[clamp(36px,5.5vw,72px)] font-semibold text-white leading-[1.0] tracking-tight mb-4">
              {project.name}
            </h1>
            <p className="text-white/55 text-base md:text-lg max-w-xl leading-relaxed">
              {project.flag} {project.city}, {project.country} · {project.startingPrice}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── OVERVIEW + SPECS ── */}
      <section className="py-20 px-6 md:px-16 border-b border-white/8">
        <div className="max-w-[1180px] mx-auto grid lg:grid-cols-[1.3fr_1fr] gap-16 items-start">
          <Reveal>
            <p className="text-[#00BFFF] text-[11px] font-bold tracking-[0.25em] uppercase mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-[#00BFFF]" /> Project Overview
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight mb-6">
              About <em className="italic text-[#00BFFF]">{project.name}</em>
            </h2>
            <p className="text-white/50 text-base leading-[1.9] mb-8 font-light">{project.overview}</p>
            {isPrimeEstate && (
              <div
                className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.12em] uppercase px-4 py-2 mb-6"
                style={{ background: "rgba(0,191,255,0.08)", color: "#00BFFF", border: "1px solid rgba(0,191,255,0.2)" }}
              >
                ✓ &nbsp; Jila Panchayat Approved · Clear Title Deeds
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              {project.highlights.map((h) => (
                <div key={h} className="flex items-center gap-3 text-white/60 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00BFFF]/70 shrink-0" />
                  {h}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="border border-white/8 rounded-2xl overflow-hidden">
              {specs.map(([k, v], i) => (
                <div
                  key={k}
                  className={`flex items-center px-6 py-4 border-b border-white/5 last:border-b-0 ${i % 2 === 0 ? "bg-[#060c16]" : "bg-[#080d1a]"}`}
                >
                  <span className="text-white/30 text-[10px] uppercase tracking-[0.15em] font-bold w-36 shrink-0">{k}</span>
                  <span
                    className="text-sm font-light"
                    style={
                      k === "Status"
                        ? { color: statusColor }
                        : k === "Approval"
                        ? { color: "#00BFFF" }
                        : { color: "rgba(255,255,255,0.8)" }
                    }
                  >
                    {v}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+919616061166"
                className="flex-1 text-center py-3.5 rounded-full text-[12px] font-bold tracking-[0.1em] uppercase transition-all duration-300 hover:scale-105"
                style={{ background: "#00BFFF", color: "#04090f" }}
              >
                Book a Site Visit
              </a>
              <a
                href="#enquire"
                className="flex-1 text-center py-3.5 rounded-full text-[12px] font-bold tracking-[0.1em] uppercase border border-white/20 text-white/70 hover:border-[#00BFFF]/50 hover:text-[#00BFFF] transition-all duration-300"
              >
                Enquire Now
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="py-20 px-6 md:px-16 border-b border-white/8 bg-[#060c16]">
        <div className="max-w-[1180px] mx-auto">
          <Reveal>
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/30 mb-3">Project Gallery</p>
            <h2 className="font-serif text-[clamp(26px,3.4vw,36px)] font-semibold text-white mb-10">
              Inside <em className="italic text-[#00BFFF]">{project.name}</em>
            </h2>
          </Reveal>

          <Reveal>
            <div className="relative rounded-2xl overflow-hidden aspect-[16/7] mb-4 border border-white/8 group cursor-pointer">
              <img
                src={project.gallery[activeImage]}
                alt={`${project.name} gallery`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ filter: "brightness(0.85)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060c16]/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 text-[11px] uppercase tracking-[0.2em] text-white/50 font-semibold">
                {activeImage + 1} / {project.gallery.length}
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-6 gap-2">
            {project.gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`relative rounded-lg overflow-hidden aspect-square border-2 transition-all duration-200 ${
                  activeImage === i ? "border-[#00BFFF]" : "border-transparent hover:border-white/30"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" style={{ filter: "brightness(0.7)" }} />
                {activeImage === i && (
                  <div className="absolute inset-0 bg-[#00BFFF]/15" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── AMENITIES ── */}
      <section className="py-20 px-6 md:px-16 border-b border-white/8">
        <div className="max-w-[1180px] mx-auto">
          <Reveal>
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/30 mb-3">Amenities</p>
            <h2 className="font-serif text-[clamp(26px,3.4vw,36px)] font-semibold text-white mb-10">
              Everything <em className="italic text-[#00BFFF]">Included</em>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
            {project.amenities.map((a, i) => (
              <Reveal key={a} delay={i * 0.06}>
                <div className="bg-[#060c16] hover:bg-[#080d1a] transition-colors duration-300 p-8 flex items-center gap-5 group cursor-pointer">
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#00BFFF] shrink-0 border border-[#00BFFF]/20 group-hover:border-[#00BFFF]/60 transition-colors"
                    style={{ background: "rgba(0,191,255,0.08)" }}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-[12px] uppercase tracking-[0.15em] text-white/60 font-medium group-hover:text-[#00BFFF] transition-colors duration-300">
                    {a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRIME ESTATE EXTRA SECTIONS ── */}
      {isPrimeEstate && <PrimeEstateExtra />}

      {/* ── ENQUIRY CTA ── */}
      <section className="py-20 px-6 md:px-16 bg-[#060c16] relative overflow-hidden" id="enquire">
        <div
          className="absolute bottom-[-160px] right-[-100px] w-[420px] h-[420px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,191,255,0.1) 0%, rgba(0,191,255,0) 70%)" }}
        />
        <div className="max-w-[1180px] mx-auto grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-center relative">
          <Reveal>
            <p className="text-[#00BFFF] text-[11px] font-bold tracking-[0.25em] uppercase mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-[#00BFFF]" /> Reserve Your Unit
            </p>
            <h2 className="font-serif text-[clamp(28px,3.6vw,40px)] font-semibold text-white leading-[1.15]">
              Interested in <em className="italic text-[#00BFFF]">{project.name}?</em>
            </h2>
            <p className="mt-4 text-white/45 text-[15px] leading-relaxed max-w-[440px]">
              Leave your details and our team will get back to you within 24 hours with full pricing, availability, and documentation.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <a href="tel:+919616061166" className="text-[#00BFFF] text-sm font-semibold hover:opacity-70 transition-opacity">
                +91 96160-61166
              </a>
              <span className="text-white/20">·</span>
              <span className="text-white/35 text-sm">info@trustonadvertising.com</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              className="bg-[#04090f] border border-white/8 rounded-2xl p-7"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thanks — our team will be in touch within 24 hours.");
              }}
            >
              <p className="text-white/60 text-xs uppercase tracking-widest mb-5 font-bold">Enquiry for: <span className="text-[#00BFFF]">{project.name}</span></p>
              <div className="mb-4">
                <label className="block text-[11px] font-bold tracking-[0.08em] uppercase text-white/30 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                  className="w-full bg-[#060c16] border border-white/8 rounded-lg px-3.5 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#00BFFF]/60 transition-colors"
                />
              </div>
              <div className="mb-4">
                <label className="block text-[11px] font-bold tracking-[0.08em] uppercase text-white/30 mb-2">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 00000 00000"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full bg-[#060c16] border border-white/8 rounded-lg px-3.5 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#00BFFF]/60 transition-colors"
                />
              </div>
              <div className="mb-5">
                <label className="block text-[11px] font-bold tracking-[0.08em] uppercase text-white/30 mb-2">Message (Optional)</label>
                <textarea
                  placeholder="Any specific questions or requirements..."
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
                  className="w-full bg-[#060c16] border border-white/8 rounded-lg px-3.5 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#00BFFF]/60 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-full text-[12px] font-bold tracking-[0.1em] uppercase transition-opacity duration-200 hover:opacity-85"
                style={{ background: "#00BFFF", color: "#04090f" }}
              >
                Send Enquiry
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ── More Projects ── */}
      <section className="py-16 px-6 md:px-16 border-t border-white/8">
        <div className="max-w-[1180px] mx-auto flex items-center justify-between flex-wrap gap-6">
          <div>
            <p className="text-white/30 text-[11px] uppercase tracking-[0.2em] font-bold mb-1">Explore More</p>
            <p className="font-serif text-xl text-white">Browse the full TrustOn portfolio</p>
          </div>
          <Link
            to="/project"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/20 text-white/70 text-[12px] uppercase tracking-[0.1em] font-semibold hover:border-[#00BFFF]/50 hover:text-[#00BFFF] transition-all duration-300"
          >
            View All Projects →
          </Link>
        </div>
      </section>

    </div>
  );
}
