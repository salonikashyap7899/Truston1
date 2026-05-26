import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Section3DBackground } from "@/components/Section3DBackground";
import { GlowCard } from "@/components/ui/spotlight-card";
import lucknowAerialImg from "@/assets/lucknow-aerial.jpg";
import luxuryInteriorImg from "@/assets/luxury-interior.jpg";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "About Us — TrustOn Developers" },
      {
        name: "description",
        content: "TrustOn Developers — Own the Ground. Build the Legacy. A real estate company rooted in Lucknow's growth story.",
      },
    ],
  }),
  component: AboutPage,
});

const coreValues = [
  {
    num: "01",
    icon: "🤝",
    title: "Trust & Transparency",
    desc: "Every transaction at TrustOn is built on complete openness — clear pricing, full documentation, and no hidden clauses. Our name is our standard.",
  },
  {
    num: "02",
    icon: "⭐",
    title: "Uncompromising Quality",
    desc: "From land selection to infrastructure delivery, quality benchmarks are non-negotiable. We invest in the right materials, processes, and people to ensure it.",
  },
  {
    num: "03",
    icon: "🌱",
    title: "Long-Term Vision",
    desc: "We develop with decades in mind — selecting locations for growth potential, designing for the future, and building communities that thrive for generations.",
  },
  {
    num: "04",
    icon: "👥",
    title: "Client-First Philosophy",
    desc: "Our buyers are partners in growth. From first enquiry to final handover and beyond, we remain committed to every client's success and satisfaction.",
  },
  {
    num: "05",
    icon: "⚖️",
    title: "Legal Integrity",
    desc: "All projects undergo rigorous legal due diligence — Jila Panchayat approvals, clear title deeds, and full compliance with local development regulations.",
  },
  {
    num: "06",
    icon: "🚀",
    title: "Innovation & Growth",
    desc: "We continuously evolve — embracing new design thinking, sustainable development practices, and smarter ways to deliver value to every investor and homeowner.",
  },
];

const services = [
  {
    num: "01",
    icon: "🗺️",
    title: "Plot Selling",
    desc: "We offer Jila Panchayat approved residential plots in Prime Estate, Lucknow — with clear title deeds, transparent pricing, and full infrastructure support. Whether you're buying to build or investing for appreciation, our plots deliver unmatched value.",
    bullets: [
      "JP approved with clear title deeds",
      "Highway & metro connected locations",
      "Sizes from 1200 sq.ft — flexible options",
      "Phase 1 & Phase 2 available",
    ],
  },
  {
    num: "02",
    icon: "📐",
    title: "Architecture & Design",
    desc: "Our architecture and design team transforms your vision into a practical, beautiful, and approved blueprint. From concept to construction drawings, we ensure every design reflects your lifestyle, maximises your plot, and meets all regulatory standards.",
    bullets: [
      "Custom home design & layout planning",
      "Regulatory & approval-compliant drawings",
      "3D visualisation & walkthroughs",
      "Vastu & modern design integration",
    ],
  },
  {
    num: "03",
    icon: "🏗️",
    title: "Construction & Build",
    desc: "From foundation to finish, our construction team delivers high-quality residential buildings on schedule and within budget. We manage every aspect of the build process, using proven materials and skilled contractors to turn your approved design into your dream home.",
    bullets: [
      "End-to-end construction management",
      "Quality materials & skilled workforce",
      "Transparent cost breakdowns",
      "Timely delivery with milestone tracking",
    ],
  },
  {
    num: "04",
    icon: "📈",
    title: "Investment Consulting",
    desc: "Real estate is one of the most powerful wealth-building tools — but only when you make the right decisions. Our investment consulting service gives you data-driven insights, location analysis, and long-term strategy to maximise your property portfolio in Lucknow and beyond.",
    bullets: [
      "Location & growth potential analysis",
      "Portfolio strategy & diversification",
      "ROI projections & market insights",
      "First-time buyer guidance",
    ],
  },
];

const processSteps = [
  { num: "01", title: "Site Visit & Consultation", desc: "We start by understanding your needs and showing you the plot in person. Complete transparency from the very first meeting." },
  { num: "02", title: "Legal Review & Approval", desc: "Our legal team reviews all documents — title deeds, JP approvals, and compliance certificates — before any commitment is made." },
  { num: "03", title: "Documentation & Registration", desc: "We handle the complete paperwork process — from registry to mutation — ensuring your ownership is clean and undisputed." },
  { num: "04", title: "Handover & After-Sales", desc: "Plot handover with full boundary marking, possession letter, and continued support for construction planning if needed." },
];

const teamMembers = [
  {
    name: "Meraj Husain Rizvi",
    role: "Lead Architect",
    roleTag: "ARCHITECTURE & DESIGN",
    desc: "Meraj leads TrustOn's architecture and design division, bringing a meticulous eye for detail and deep expertise in residential planning. His work ensures every plot and structure meets the highest standards of design and regulatory compliance.",
  },
  {
    name: "TrustOn Founders",
    role: "Development & Operations",
    roleTag: "DEVELOPMENT & OPERATIONS",
    desc: "The founding team behind TrustOn brings together decades of combined experience in land acquisition, infrastructure development, and real estate investment across Uttar Pradesh.",
  },
];

const buildingImg = lucknowAerialImg;

function AboutPage() {
  return (
    <div className="bg-[#04090f] text-white overflow-x-hidden selection:bg-[#00BFFF] selection:text-[#04090f]">

      {/* ── Cinematic Hero ── */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-[100px]">
        <div className="absolute inset-0 z-0">
          <img
            src={buildingImg}
            alt="TrustOn — About Us"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.28) saturate(0.7)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#04090f]/60 via-transparent to-[#04090f]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04090f]/40 to-transparent" />
        </div>

        {/* Animated cyan orb */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,191,255,0.06) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.45em" }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-[10px] md:text-xs text-[#00BFFF] uppercase font-bold mb-6 tracking-[0.4em] flex items-center justify-center gap-3"
          >
            <span className="w-8 h-px bg-[#00BFFF]" />
            About Truston Developers
            <span className="w-8 h-px bg-[#00BFFF]" />
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl font-serif tracking-tighter leading-none mb-6"
          >
            Own the Ground.
            <br />
            <em className="text-[#00BFFF] italic">Build the Legacy.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-white/50 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed"
          >
            A real estate company rooted in Lucknow's growth story — building trust,
            one plot at a time since 2025.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-white/25 text-sm uppercase tracking-[0.3em] mt-8"
          >
            Scroll Down
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ opacity: { delay: 1.5, duration: 1 }, y: { duration: 2, repeat: Infinity } }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/30"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="border-y border-white/5 bg-[#060c16]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {[
            { val: "1+", label: "Active Projects" },
            { val: "4", label: "Core Services" },
            { val: "100%", label: "JP Approved Plots" },
            { val: "2025", label: "Established" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="group flex flex-col items-center py-12 px-6 text-center border-r border-white/5 last:border-0 cursor-default">
                <p className="font-serif text-4xl md:text-6xl text-white font-light leading-none tracking-tight">
                  {s.val}
                </p>
                <div className="w-6 h-px bg-[#00BFFF]/30 my-4 group-hover:w-12 group-hover:bg-[#00BFFF] transition-all duration-500" />
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/35 group-hover:text-[#00BFFF] transition-colors duration-500 font-bold">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── About Our Company ── */}
      <section className="py-32 px-6 relative overflow-hidden">
        <Section3DBackground opacity={0.08} />
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 md:gap-20 items-start relative z-10">
          {/* Left — image */}
          <Reveal direction="left">
            <div className="relative">
              <div className="absolute -inset-6 bg-[#00BFFF]/5 blur-3xl rounded-3xl" />
              <img
                src={luxuryInteriorImg}
                alt="TrustOn — Our Company"
                className="relative rounded-[32px] border border-white/5 shadow-2xl w-full"
                style={{ filter: "saturate(0.85) brightness(0.8)" }}
              />
              {/* Price badge */}
              <div className="absolute -bottom-6 -right-6 bg-[#060c16] border border-[#00BFFF]/30 rounded-2xl p-6 shadow-xl">
                <p className="font-serif text-2xl text-[#00BFFF]">₹1L+</p>
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 mt-1 font-bold">
                  Starting Plot Price
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right — content */}
          <Reveal direction="right">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#00BFFF] mb-5 flex items-center gap-3">
                <span className="w-8 h-px bg-[#00BFFF]" />
                About Our Company
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight mb-3 text-white">
                We Don&apos;t Just Sell Land
              </h2>
              <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight mb-8 text-white">
                <em className="text-[#00BFFF] italic">We Craft Opportunities</em>
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-4 font-light">
                TrustOn Developers is a trusted name in real estate development, built on a
                foundation of transparency, quality, and long-term vision. Our flagship project,
                Prime Estate, is a Jila Panchayat approved township that combines legal security,
                prime location, and future-ready infrastructure — setting a new standard for
                residential plot development in Lucknow.
              </p>
              <p className="text-white/45 text-base leading-relaxed mb-10 font-light">
                From land acquisition to final delivery, we follow a structured, transparent
                process that keeps you informed and in control at every stage.
              </p>

              {/* 4 feature pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { t: "Strategic Development", d: "Every project planned with long-term vision, focusing on location intelligence and future value appreciation." },
                  { t: "Execution Excellence", d: "Structured process from land acquisition to delivery — quality construction, on-time handover, regulatory compliance." },
                  { t: "Legal Transparency", d: "All projects are JP approved with clear title deeds. Zero hidden charges, complete documentation from day one." },
                  { t: "Investor-First Approach", d: "We structure projects to deliver strong appreciation potential alongside the freedom to build your dream home." },
                ].map((f, i) => (
                  <motion.div
                    key={f.t}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="border border-white/8 rounded-2xl p-5 bg-[#060c16]/60 hover:border-[#00BFFF]/20 transition-all duration-500"
                  >
                    <h4 className="text-white text-sm font-medium mb-2">{f.t}</h4>
                    <p className="text-white/40 text-xs leading-relaxed">{f.d}</p>
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-4 mt-10">
                <Link
                  to="/projects"
                  className="px-8 py-3 text-[11px] uppercase tracking-[0.2em] font-bold rounded-full transition-all duration-500"
                  style={{ background: "#00BFFF", color: "#04090f" }}
                >
                  View Projects
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-3 border border-white/20 text-white/60 text-[11px] uppercase tracking-[0.2em] font-bold rounded-full hover:border-[#00BFFF] hover:text-[#00BFFF] transition-all duration-500"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Mission / Vision / Commitment ── */}
      <section className="py-24 px-6 bg-[#060c16] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,191,255,0.07) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#00BFFF] mb-16 text-center">
              — Purpose & Direction —
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                eyebrow: "Our Mission",
                title: "Delivering Real Value, Every Time",
                desc: "To make property ownership in Lucknow accessible, transparent, and rewarding — by developing legally sound, infrastructure-ready plots that appreciate in value and serve as the foundation for lasting legacies.",
                icon: "🧭",
              },
              {
                eyebrow: "Our Vision",
                title: "Shaping Lucknow's Residential Future",
                desc: "To become the most trusted real estate developer in Uttar Pradesh — known for planned townships, premium plot developments, and a client-first philosophy that delivers beyond expectations in every project we undertake.",
                icon: "🔭",
              },
              {
                eyebrow: "Our Commitment",
                title: "Built on Trust. Driven by Integrity.",
                desc: "Every project undergoes rigorous regulatory compliance, transparent documentation, and structured infrastructure delivery. We commit to quality at every stage — from the first site survey to the final plot handover.",
                icon: "⚖️",
              },
            ].map((card, i) => (
              <Reveal key={card.eyebrow} delay={i * 0.1}>
                <div className="relative rounded-[32px] p-8 md:p-10 border border-white/5 bg-[#04090f] overflow-hidden group hover:border-[#00BFFF]/20 transition-all duration-700 h-full">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00BFFF]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div
                    className="absolute -top-16 -right-16 w-36 h-36 rounded-full opacity-[0.06]"
                    style={{ background: "radial-gradient(circle, #00BFFF, transparent)" }}
                  />
                  <span className="text-3xl mb-5 block">{card.icon}</span>
                  <p className="text-[#00BFFF] text-[10px] uppercase tracking-[0.4em] font-bold mb-4">
                    {card.eyebrow}
                  </p>
                  <h3 className="font-serif text-2xl md:text-3xl text-white mb-5 leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-white/50 text-sm font-light leading-relaxed">
                    {card.desc}
                  </p>
                  <div className="mt-8 flex items-center gap-3">
                    <div className="w-10 h-px bg-[#00BFFF]/30" />
                    <span className="text-[#00BFFF] text-[9px] uppercase tracking-[0.3em] font-bold">
                      TrustOn Developers
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Four Services ── */}
      <section className="py-32 px-6 relative overflow-hidden">
        <Section3DBackground opacity={0.07} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-8 mb-16 items-end">
            <Reveal>
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#00BFFF] mb-4 flex items-center gap-3">
                <span className="w-6 h-px bg-[#00BFFF]" />
                What We Do
              </p>
              <h2 className="font-serif text-4xl md:text-6xl text-white tracking-tight leading-tight">
                Four Services.
                <br />
                <em className="text-[#00BFFF] italic">One Complete Solution.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-white/45 text-base md:text-lg leading-relaxed font-light">
                From finding the right plot to designing, building, and advising on your
                investment — TrustOn Developers is your single trusted partner across every
                step of the real estate journey.
              </p>
              <p className="text-[#00BFFF]/50 text-sm uppercase tracking-[0.2em] font-bold mt-4">
                04 Expert Services
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((svc, i) => (
              <Reveal key={svc.num} delay={i * 0.1}>
                <div className="border border-white/5 rounded-[28px] p-8 bg-[#060c16] hover:border-[#00BFFF]/20 transition-all duration-500 group h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 border border-[#00BFFF]/20 rounded-full flex items-center justify-center text-xl group-hover:border-[#00BFFF]/50 transition-all duration-500">
                      {svc.icon}
                    </div>
                    <span className="font-serif text-5xl text-white/5 leading-none select-none">
                      {svc.num}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-white mb-4">{svc.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-6 font-light">
                    {svc.desc}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {svc.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-3 text-white/40 text-xs">
                        <span className="text-[#00BFFF]">→</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-[#00BFFF] font-medium group-hover:gap-4 transition-all duration-300">
                    Explore Service <span>→</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── How We Deliver Excellence (Process) ── */}
      <section className="py-32 px-6 bg-[#060c16] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-15"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0,191,255,0.08) 0%, transparent 70%)" }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#00BFFF] mb-4 text-center flex items-center justify-center gap-3">
              <span className="w-6 h-px bg-[#00BFFF]" />
              Our Process
              <span className="w-6 h-px bg-[#00BFFF]" />
            </p>
            <h2 className="text-4xl md:text-6xl font-serif text-white text-center mb-4 tracking-tight">
              How We <em className="text-[#00BFFF] italic">Deliver Excellence</em>
            </h2>
            <p className="text-white/40 text-center text-base font-light mb-20 max-w-xl mx-auto">
              A proven four-step process that ensures every project is delivered with
              transparency, quality, and complete client satisfaction.
            </p>
          </Reveal>

          {/* Steps with connecting line */}
          <div className="relative">
            <div className="absolute top-10 left-0 right-0 h-px bg-white/5 hidden md:block" />
            <div className="grid md:grid-cols-4 gap-8">
              {processSteps.map((step, i) => (
                <Reveal key={step.num} delay={i * 0.12}>
                  <div className="relative group text-center md:text-left">
                    <div className="w-20 h-20 rounded-full border border-[#00BFFF]/20 flex items-center justify-center mx-auto md:mx-0 mb-6 relative bg-[#060c16] group-hover:border-[#00BFFF]/50 transition-all duration-500">
                      <span className="font-serif text-2xl text-[#00BFFF]/60 group-hover:text-[#00BFFF] transition-colors duration-500">
                        {step.num}
                      </span>
                    </div>
                    <h3 className="text-white font-serif text-xl mb-3">{step.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed font-light">{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values (GlowCards) ── */}
      <section className="py-32 px-6 relative overflow-hidden">
        <Section3DBackground opacity={0.07} />
        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#00BFFF] mb-3 text-center flex items-center justify-center gap-3">
              <span className="w-6 h-px bg-[#00BFFF]" />
              What Drives Us
              <span className="w-6 h-px bg-[#00BFFF]" />
            </p>
            <h2 className="text-4xl md:text-6xl font-serif text-white text-center mb-4 tracking-tight">
              Our Core <em className="text-[#00BFFF] italic">Values</em>
            </h2>
            <p className="text-white/40 text-center text-lg font-light mb-16 max-w-xl mx-auto">
              Six principles that govern every plot we sell, every home we design, every promise we make.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {coreValues.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.07}>
                <GlowCard glowColor="blue" customSize className="p-8 md:p-10 min-h-[240px] flex flex-col">
                  <div className="flex items-start justify-between mb-5">
                    <span className="text-3xl">{v.icon}</span>
                    <span className="font-serif text-4xl text-white/5">{v.num}</span>
                  </div>
                  <h3 className="text-white font-serif text-xl md:text-2xl mb-3 leading-snug">
                    {v.title}
                  </h3>
                  <p className="text-white/45 text-sm leading-relaxed font-light flex-1">{v.desc}</p>
                  <div className="mt-6 w-8 h-px bg-[#00BFFF]/25" />
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-32 px-6 bg-[#060c16] relative overflow-hidden">
        <Section3DBackground opacity={0.06} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 mb-16 items-end">
            <Reveal>
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#00BFFF] mb-4 flex items-center gap-3">
                <span className="w-6 h-px bg-[#00BFFF]" />
                Our Leaders
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">
                The People Leading{" "}
                <em className="text-[#00BFFF] italic">Our Vision</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-white/45 text-base leading-relaxed font-light">
                Every great development begins with a great team. TrustOn's founders bring
                together expertise in architecture, construction, and investment to deliver
                projects that stand the test of time.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 mt-6 px-8 py-3 border border-[#00BFFF]/30 text-[#00BFFF] text-[11px] uppercase tracking-[0.2em] font-bold rounded-full hover:border-[#00BFFF] hover:bg-[#00BFFF]/5 transition-all duration-500"
              >
                Work With Us →
              </Link>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {teamMembers.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.1}>
                <div className="border border-white/5 rounded-[28px] overflow-hidden bg-[#04090f] hover:border-[#00BFFF]/20 transition-all duration-500 group">
                  {/* Placeholder image area */}
                  <div className="h-52 bg-gradient-to-br from-[#0d1e30] to-[#070d18] relative overflow-hidden">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(0,191,255,0.03) 40px, rgba(0,191,255,0.03) 41px)",
                      }}
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-20 h-20 rounded-full border-2 border-[#00BFFF]/20 bg-[#00BFFF]/5 flex items-center justify-center text-2xl group-hover:border-[#00BFFF]/40 transition-all duration-500">
                        👤
                      </div>
                    </div>
                  </div>
                  <div className="p-7">
                    <p className="text-[#00BFFF] text-[9px] uppercase tracking-[0.25em] font-bold mb-2">
                      {member.roleTag}
                    </p>
                    <h3 className="font-serif text-xl text-white mb-1">{member.name}</h3>
                    <p className="text-white/30 text-xs uppercase tracking-[0.15em] mb-4">
                      {member.role}
                    </p>
                    <div className="w-8 h-px bg-[#00BFFF]/25 mb-4" />
                    <p className="text-white/45 text-sm leading-relaxed font-light">{member.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}

            {/* Join team card */}
            <Reveal delay={0.25}>
              <div className="border border-white/5 rounded-[28px] overflow-hidden bg-[#04090f] hover:border-[#00BFFF]/20 transition-all duration-500 group flex flex-col">
                <div className="h-52 bg-gradient-to-br from-[#060c16] to-[#04090f] relative overflow-hidden flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-[#00BFFF]/20 flex items-center justify-center text-2xl text-[#00BFFF]/40 group-hover:border-[#00BFFF]/50 group-hover:text-[#00BFFF]/70 transition-all duration-500">
                    +
                  </div>
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <h3 className="font-serif text-xl text-white mb-3">Join Our Growing Team</h3>
                  <p className="text-white/40 text-sm leading-relaxed font-light flex-1">
                    We are always looking for passionate professionals in real estate, design,
                    and project management to join TrustOn's journey.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-[#00BFFF] text-[10px] uppercase tracking-[0.2em] font-bold mt-6 hover:gap-4 transition-all duration-300"
                  >
                    Get In Touch →
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-40 px-6 bg-[#04090f] text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,30,80,0.4) 0%, transparent 70%)" }}
        />
        <Section3DBackground opacity={0.12} />

        {/* Concentric rings */}
        {[400, 320, 240, 160].map((size, i) => (
          <motion.div
            key={size}
            className="absolute rounded-full border left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              width: size,
              height: size,
              borderColor: `rgba(0,191,255,${0.06 - i * 0.01})`,
            }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 20 + i * 10, repeat: Infinity, ease: "linear" }}
          />
        ))}

        <div className="mx-auto max-w-4xl relative z-10">
          <Reveal>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#00BFFF] mb-6 flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-[#00BFFF]" />
              Ready to Begin?
              <span className="w-8 h-px bg-[#00BFFF]" />
            </p>
            <blockquote className="font-serif text-3xl md:text-5xl text-white mb-8 leading-tight tracking-tight">
              &ldquo;The best time to invest in land was yesterday.
              <br />
              The second best time is today.&rdquo;
            </blockquote>
            <p className="text-white/40 text-base font-light mb-14 max-w-md mx-auto leading-relaxed">
              Talk to TrustOn Developers and take the first step toward owning your plot
              in Prime Estate, Lucknow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/projects"
                className="px-12 py-5 rounded-full text-[11px] uppercase tracking-[0.3em] font-bold transition-all duration-500 hover:scale-105 border border-white/20 text-white hover:border-[#00BFFF] hover:text-[#00BFFF]"
              >
                View Prime Estate
              </Link>
              <a
                href="tel:+919616061166"
                className="px-12 py-5 rounded-full text-[11px] uppercase tracking-[0.3em] font-bold transition-all duration-500 hover:scale-105"
                style={{ background: "#00BFFF", color: "#04090f" }}
              >
                +91 96160-61166
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
