import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { PROJECTS, STATUS_COLOR } from "@/data/projects";
import { usePageContent } from "@/hooks/usePageContent";

export const Route = createFileRoute("/project")({
  head: () => ({
    meta: [
      { title: "Projects — TrustOn" },
      {
        name: "description",
        content:
          "TrustOn projects across India, UAE, UK and Singapore — transparent ownership, verified documentation, long-term value.",
      },
    ],
  }),
  component: ProjectPage,
});

const COUNTRIES = [
  { name: "India", flag: "🇮🇳", count: 12, image: "https://images.unsplash.com/photo-1597211833712-5e41faa202ea?q=80&w=900&auto=format&fit=crop" },
  { name: "UAE", flag: "🇦🇪", count: 9, image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=900&auto=format&fit=crop" },
  { name: "UK", flag: "🇬🇧", count: 5, image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=900&auto=format&fit=crop" },
  { name: "Singapore", flag: "🇸🇬", count: 3, image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=900&auto=format&fit=crop" },
];

function countByCountry() {
  const counts: Record<string, number> = {};
  PROJECTS.forEach((p) => { counts[p.country] = (counts[p.country] || 0) + 1; });
  return counts;
}

function ProjectPage() {
  const [activeCountry, setActiveCountry] = useState("All");
  const [formData, setFormData] = useState({ name: "", phone: "", country: "India" });

  const heroC = usePageContent("projects_page.hero", {
    eyebrow: "Our Portfolio",
    title: "Projects across",
    title_em: "four countries",
    title_suffix: ", one standard.",
    subtitle: "From Lucknow to Dubai, every TrustOn development is built on the same foundation — transparent ownership, verified documentation, and long-term value.",
  });

  const statsC = usePageContent("projects_page.stats", {
    items: [
      { num: "48", label: "Live Projects" },
      { num: "4", label: "Countries" },
      { num: "11", label: "Cities" },
      { num: "₹2,400Cr+", label: "Assets Delivered" },
    ],
  });

  const spotlightC = usePageContent("projects_page.spotlight", {
    eyebrow: "Where We Build",
    heading: "Four markets,",
    heading_em: "one investment thesis.",
    subtitle: "Tap a market below to jump straight to its projects in the portfolio grid.",
    portfolio_eyebrow: "The Portfolio",
    portfolio_heading: "Every project,",
    portfolio_heading_em: "filtered by country.",
  });

  const processC = usePageContent("projects_page.process", {
    eyebrow: "How We Work",
    heading: "The same process,",
    heading_em: "in every market.",
    subtitle: "A consistent four-stage path from site selection to handover, regardless of geography.",
    steps: [
      { num: "01", title: "Site Diligence", copy: "Legal title, zoning, and market demand are verified before a single brick is laid." },
      { num: "02", title: "Design & Approvals", copy: "Local architects and planning authorities sign off before construction begins." },
      { num: "03", title: "Construction", copy: "Independent quantity surveyors track progress against a public milestone schedule." },
      { num: "04", title: "Handover", copy: "Full documentation, title transfer, and after-sales support, wherever you bought from." },
    ],
  });

  const testimonialC = usePageContent("projects_page.testimonial", {
    quote: "We bought into the Dubai project from Mumbai without a single site visit. The documentation alone made the decision easy.",
    name: "Anjali Mehta",
    designation: "NRI Investor, Marina Azure, Dubai",
    image_url: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=900&auto=format&fit=crop",
  });

  const ctaC = usePageContent("projects_page.cta", {
    heading: "Find your next",
    heading_em: "investment",
    heading_suffix: ", wherever it is.",
    subtitle: "Tell us what you're looking for and which market interests you. Our team will share a shortlist within 24 hours.",
  });

  const statsItems = Array.isArray(statsC.items) ? (statsC.items as {num:string;label:string}[]) : [
    { num: "48", label: "Live Projects" },
    { num: "4", label: "Countries" },
    { num: "11", label: "Cities" },
    { num: "₹2,400Cr+", label: "Assets Delivered" },
  ];

  const processSteps = Array.isArray(processC.steps) ? (processC.steps as {num:string;title:string;copy:string}[]) : [
    { num: "01", title: "Site Diligence", copy: "Legal title, zoning, and market demand are verified before a single brick is laid." },
    { num: "02", title: "Design & Approvals", copy: "Local architects and planning authorities sign off before construction begins." },
    { num: "03", title: "Construction", copy: "Independent quantity surveyors track progress against a public milestone schedule." },
    { num: "04", title: "Handover", copy: "Full documentation, title transfer, and after-sales support, wherever you bought from." },
  ];

  const counts = countByCountry();
  const countryKeys = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);

  const filtered = activeCountry === "All" ? PROJECTS : PROJECTS.filter((p) => p.country === activeCountry);

  function handleSpotlight(name: string) {
    const map: Record<string, string> = { "United Kingdom": "UK" };
    setActiveCountry(map[name] || name);
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="bg-[#04090f] text-white overflow-x-hidden selection:bg-[#00BFFF]/20 selection:text-white" style={{ paddingTop: "140px" }}>

      {/* ── HERO ── */}
      <header className="px-6 md:px-16 pb-16 pt-12 border-b border-white/8 relative overflow-hidden">
        <div
          className="absolute top-[-200px] right-[-160px] w-[520px] h-[520px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,191,255,0.13) 0%, rgba(0,191,255,0) 70%)" }}
        />
        <div className="max-w-[1180px] mx-auto grid lg:grid-cols-[1.3fr_1fr] gap-12 items-end relative">
          <div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
              <p className="text-[#00BFFF] text-[11px] font-bold tracking-[0.18em] uppercase mb-4">{String(heroC.eyebrow || "Our Portfolio")}</p>
              <h1 className="font-serif text-[clamp(34px,5vw,56px)] font-semibold leading-[1.06] tracking-tight text-white">
                {String(heroC.title || "Projects across")}{" "}
                <em className="italic text-[#00BFFF]">{String(heroC.title_em || "four countries")}</em>{String(heroC.title_suffix || ", one standard.")}
              </h1>
            </motion.div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/50 text-base leading-[1.65] max-w-[460px]"
          >
            {String(heroC.subtitle || "From Lucknow to Dubai, every TrustOn development is built on the same foundation — transparent ownership, verified documentation, and long-term value.")}
          </motion.p>
        </div>
      </header>

      {/* ── STATS BAND ── */}
      <section className="border-b border-white/8 bg-[#060c16]">
        <div className="max-w-[1180px] mx-auto grid grid-cols-2 md:grid-cols-4">
          {statsItems.map((s, i) => (
            <div key={s.label} className={`py-9 px-6 text-center ${i > 0 ? "border-l border-white/8" : ""}`}>
              <p className="font-serif italic text-[clamp(28px,3.4vw,38px)] text-[#00BFFF] leading-none">{s.num}</p>
              <p className="mt-2.5 text-[11.5px] font-bold tracking-[0.1em] uppercase text-white/30">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── COUNTRY SPOTLIGHT ── */}
      <section className="py-20 px-6 md:px-16 border-b border-white/8">
        <div className="max-w-[1180px] mx-auto">
          <Reveal>
            <div className="flex items-end justify-between gap-6 mb-10 flex-wrap">
              <div>
                <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/30 mb-3">{String(spotlightC.eyebrow || "Where We Build")}</p>
                <h2 className="font-serif text-[clamp(26px,3.4vw,36px)] font-semibold text-white">
                  {String(spotlightC.heading || "Four markets,")} <em className="italic text-[#00BFFF]">{String(spotlightC.heading_em || "one investment thesis.")}</em>
                </h2>
              </div>
              <p className="text-white/45 text-sm max-w-xs">{String(spotlightC.subtitle || "Tap a market below to jump straight to its projects in the portfolio grid.")}</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {COUNTRIES.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.08}>
                <button
                  onClick={() => handleSpotlight(c.name)}
                  className="relative rounded-2xl overflow-hidden border border-white/8 cursor-pointer text-left w-full group"
                  style={{ aspectRatio: "3/4" }}
                >
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-5"
                    style={{ background: "linear-gradient(180deg, rgba(4,9,15,0.1) 30%, rgba(4,9,15,0.92) 100%)" }}
                  >
                    <span className="text-2xl mb-2">{c.flag}</span>
                    <p className="font-serif text-xl font-semibold text-white">{c.name}</p>
                    <p className="text-[12px] text-[#00BFFF] font-semibold tracking-wide mt-1">{c.count} Projects</p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO GRID ── */}
      <section className="py-20 px-6 md:px-16 border-b border-white/8" id="portfolio">
        <div className="max-w-[1180px] mx-auto">
          <Reveal>
            <div className="mb-10">
              <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/30 mb-3">{String(spotlightC.portfolio_eyebrow || "The Portfolio")}</p>
              <h2 className="font-serif text-[clamp(26px,3.4vw,36px)] font-semibold text-white">
                {String(spotlightC.portfolio_heading || "Every project,")} <em className="italic text-[#00BFFF]">{String(spotlightC.portfolio_heading_em || "filtered by country.")}</em>
              </h2>
            </div>
          </Reveal>

          {/* Filter Pills */}
          <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/30 mb-4">Filter by Country</p>
          <div className="flex flex-wrap gap-2.5 mb-10">
            <button
              onClick={() => setActiveCountry("All")}
              className={`px-5 py-2.5 rounded-full border text-[13px] font-semibold tracking-[0.06em] uppercase transition-all duration-200 ${
                activeCountry === "All"
                  ? "border-[#00BFFF] text-[#00BFFF] bg-[#00BFFF]/10"
                  : "border-white/15 text-white/50 hover:border-[#00BFFF]/60 hover:text-white"
              }`}
            >
              All <span className="text-[11px] font-bold opacity-60 ml-1">{PROJECTS.length}</span>
            </button>
            {countryKeys.map((c) => {
              const proj = PROJECTS.find((p) => p.country === c);
              return (
                <button
                  key={c}
                  onClick={() => setActiveCountry(c)}
                  className={`px-5 py-2.5 rounded-full border text-[13px] font-semibold tracking-[0.06em] uppercase transition-all duration-200 flex items-center gap-2 ${
                    activeCountry === c
                      ? "border-[#00BFFF] text-[#00BFFF] bg-[#00BFFF]/10"
                      : "border-white/15 text-white/50 hover:border-[#00BFFF]/60 hover:text-white"
                  }`}
                >
                  <span className="text-sm">{proj?.flag}</span>
                  {c}
                  <span className="text-[11px] font-bold opacity-60">{counts[c]}</span>
                </button>
              );
            })}
          </div>

          {/* Results bar */}
          <div className="flex items-baseline justify-between pb-4 border-b border-white/8 mb-8">
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/30">
              {activeCountry === "All" ? "All Projects" : activeCountry}
            </span>
            <span className="font-serif italic text-sm text-white/45">
              <b className="text-white not-italic font-semibold">{filtered.length}</b> {filtered.length === 1 ? "project" : "projects"}
            </span>
          </div>

          {/* Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.length === 0 ? (
              <div className="col-span-full text-center py-20 text-white/40">
                <p className="font-serif text-xl text-white mb-2">No projects here yet</p>
                <p>Check back soon, or explore another country above.</p>
              </div>
            ) : (
              filtered.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: Math.min(i, 8) * 0.06 }}
                >
                  <Link
                    to="/projects/$slug"
                    params={{ slug: p.id }}
                    className="block bg-[#060c16] border border-white/8 rounded-2xl overflow-hidden hover:border-[#00BFFF]/35 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#080d1a]">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(4,9,15,0) 40%, rgba(4,9,15,0.85) 100%)" }} />
                      <span className="absolute top-3.5 left-3.5 border border-[#00BFFF]/55 text-[#00BFFF] bg-[#04090f]/55 backdrop-blur-sm text-[11px] font-semibold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full">
                        {p.type}
                      </span>
                      <span className="absolute bottom-3.5 left-3.5 text-[13px] font-semibold text-white drop-shadow-lg">
                        {p.flag} {p.city}, {p.country}
                      </span>
                    </div>
                    <div className="p-5 pb-5">
                      <h3 className="font-serif text-xl font-semibold text-white mb-2 leading-snug">{p.name}</h3>
                      <p className="text-[13.5px] text-white/45 leading-[1.55] mb-4 min-h-[42px]">{p.blurb}</p>
                      <div className="flex items-center justify-between pt-3.5 border-t border-white/8 mb-3.5">
                        <span className="flex items-center text-[11.5px] font-semibold tracking-wide uppercase text-white/45">
                          <span
                            className="w-1.5 h-1.5 rounded-full mr-2 shrink-0"
                            style={{ background: STATUS_COLOR[p.status] || "#00BFFF" }}
                          />
                          {p.status}
                        </span>
                        <span className="text-[13px] font-bold text-white">{p.stat}</span>
                      </div>
                      <span className="text-[12.5px] font-semibold tracking-[0.06em] uppercase text-[#00BFFF] inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200">
                        View Project <span>→</span>
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-20 px-6 md:px-16 border-b border-white/8">
        <div className="max-w-[1180px] mx-auto">
          <Reveal>
            <div className="flex items-end justify-between gap-6 mb-10 flex-wrap">
              <div>
                <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/30 mb-3">{String(processC.eyebrow || "How We Work")}</p>
                <h2 className="font-serif text-[clamp(26px,3.4vw,36px)] font-semibold text-white">
                  {String(processC.heading || "The same process,")} <em className="italic text-[#00BFFF]">{String(processC.heading_em || "in every market.")}</em>
                </h2>
              </div>
              <p className="text-white/45 text-sm max-w-xs">{String(processC.subtitle || "A consistent four-stage path from site selection to handover, regardless of geography.")}</p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/8 border border-white/8 rounded-2xl overflow-hidden">
            {processSteps.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.07}>
                <div className="bg-[#060c16] p-8">
                  <p className="font-serif italic text-3xl text-[#00BFFF] mb-4">{step.num}</p>
                  <p className="text-[15.5px] font-bold text-white mb-2.5">{step.title}</p>
                  <p className="text-[13.5px] text-white/45 leading-[1.6]">{step.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section className="py-20 px-6 md:px-16 border-b border-white/8">
        <div className="max-w-[1180px] mx-auto grid md:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
          <Reveal>
            <div className="rounded-2xl overflow-hidden border border-white/8" style={{ aspectRatio: "5/4" }}>
              <img
                src={String(testimonialC.image_url || "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=900&auto=format&fit=crop")}
                alt="Investor portrait"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-serif italic text-[clamp(22px,2.6vw,30px)] text-white leading-[1.42]">
              <span className="text-[#00BFFF]">"</span>{String(testimonialC.quote || "We bought into the Dubai project from Mumbai without a single site visit. The documentation alone made the decision easy.")}<span className="text-[#00BFFF]">"</span>
            </p>
            <p className="mt-6 text-[13.5px] text-white/45">
              <b className="text-white">{String(testimonialC.name || "Anjali Mehta")}</b> — {String(testimonialC.designation || "NRI Investor, Marina Azure, Dubai")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── CTA / ENQUIRY ── */}
      <section className="py-20 px-6 md:px-16 bg-[#060c16] relative overflow-hidden" id="enquire">
        <div
          className="absolute bottom-[-180px] left-[-120px] w-[460px] h-[460px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,191,255,0.11) 0%, rgba(0,191,255,0) 70%)" }}
        />
        <div className="max-w-[1180px] mx-auto grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-center relative">
          <Reveal>
            <h2 className="font-serif text-[clamp(28px,3.6vw,40px)] font-semibold text-white leading-[1.15]">
              {String(ctaC.heading || "Find your next")} <em className="italic text-[#00BFFF]">{String(ctaC.heading_em || "investment")}</em>{String(ctaC.heading_suffix || ", wherever it is.")}
            </h2>
            <p className="mt-4 text-[15px] text-white/45 max-w-[440px] leading-relaxed">
              {String(ctaC.subtitle || "Tell us what you're looking for and which market interests you. Our team will share a shortlist within 24 hours.")}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <form
              className="bg-[#04090f] border border-white/8 rounded-2xl p-7"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thanks — we will be in touch shortly.");
              }}
            >
              <div className="mb-4">
                <label className="block text-[11.5px] font-bold tracking-[0.08em] uppercase text-white/30 mb-2">Full Name</label>
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
                <label className="block text-[11.5px] font-bold tracking-[0.08em] uppercase text-white/30 mb-2">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 00000 00000"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full bg-[#060c16] border border-white/8 rounded-lg px-3.5 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#00BFFF]/60 transition-colors"
                />
              </div>
              <div className="mb-4">
                <label className="block text-[11.5px] font-bold tracking-[0.08em] uppercase text-white/30 mb-2">Interested Country</label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData((f) => ({ ...f, country: e.target.value }))}
                  className="w-full bg-[#060c16] border border-white/8 rounded-lg px-3.5 py-3 text-white text-sm focus:outline-none focus:border-[#00BFFF]/60 transition-colors"
                >
                  <option>India</option>
                  <option>UAE</option>
                  <option>United Kingdom</option>
                  <option>Singapore</option>
                  <option>Not sure yet</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full mt-1.5 py-3.5 rounded-full text-[13px] font-bold tracking-[0.06em] uppercase transition-opacity duration-200 hover:opacity-85"
                style={{ background: "#00BFFF", color: "#04090f" }}
              >
                Request Callback
              </button>
            </form>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
