import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Section3DBackground } from "@/components/Section3DBackground";
import { WealthCalculator } from "@/components/WealthCalculator";
import lucknowImg from "@/assets/lucknow-aerial.jpg";
import heroImg from "@/assets/hero-estate.jpg";

export const Route = createFileRoute("/investment-consulting")({
  head: () => ({
    meta: [
      { title: "Investment Consulting — TrustOn" },
      {
        name: "description",
        content:
          "Buy smart. Invest smarter. Data-backed real-estate investment guidance focused on long-term value.",
      },
      { property: "og:title", content: "Investment Consulting — TrustOn" },
    ],
  }),
  component: Page,
});

const processSteps = [
  {
    num: "01",
    title: "Wealth Strategy",
    desc: "We start by understanding your financial objectives, investment horizon, risk tolerance, and the broader wealth-building vision behind your interest in real estate.",
  },
  {
    num: "02",
    title: "Market Intelligence",
    desc: "Thorough analysis of each opportunity — location, infrastructure, rental demand, price trends, and economic factors shaping each micro market.",
  },
  {
    num: "03",
    title: "Investment Planning",
    desc: "A structured, bespoke investment plan built around your capital, timeline, and goals — with clear ROI projections, risk analysis, and recommended entry points.",
  },
  {
    num: "04",
    title: "Portfolio Management",
    desc: "Ongoing advisory, performance tracking, exit strategy planning, and portfolio rebalancing to ensure your real estate investments continue to perform.",
  },
];

const capabilities = [
  {
    icon: "📊",
    title: "Market Analysis",
    desc: "Data-driven research into pricing trends, growth corridors, infrastructure developments, and macroeconomic factors affecting real estate values in your target markets.",
  },
  {
    icon: "🎯",
    title: "Portfolio Strategy",
    desc: "Bespoke portfolio construction aligned with your goals — balancing residential, commercial, and land-based assets for diversification and maximum appreciation.",
  },
  {
    icon: "⚖️",
    title: "Risk Assessment",
    desc: "Comprehensive evaluation of regulatory, market, and liquidity risks for every investment opportunity — with clear mitigation recommendations.",
  },
  {
    icon: "📈",
    title: "ROI Projections",
    desc: "Conservative, moderate, and optimistic return scenarios built on historical data, infrastructure timelines, and comparable transaction analysis.",
  },
  {
    icon: "📋",
    title: "Legal & Documentation",
    desc: "Complete legal due diligence on every property — title verification, encumbrance checks, JP approval status, and regulatory compliance review.",
  },
  {
    icon: "🤝",
    title: "End-to-End Transactions",
    desc: "From shortlisting to registration — we manage the complete transaction process, including negotiation, documentation, and post-purchase support.",
  },
];

function Page() {
  return (
    <div className="bg-[#04090f] text-white overflow-x-hidden selection:bg-[#00BFFF] selection:text-[#04090f]">

      {/* ── Hero ── */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-[100px]">
        <div className="absolute inset-0 z-0">
          <img
            src={lucknowImg}
            alt="Investment Consulting"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.28) saturate(0.7)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#04090f]/60 via-transparent to-[#04090f]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04090f]/40 to-transparent" />
        </div>
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
            TrustOn Services
            <span className="w-8 h-px bg-[#00BFFF]" />
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl font-serif tracking-tighter leading-none mb-6"
          >
            Investment
            <br />
            <em className="text-[#00BFFF] italic">Consulting</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-white/50 text-lg font-light max-w-2xl mx-auto leading-relaxed"
          >
            Buy smart. Invest smarter. Data-backed real-estate guidance focused on
            long-term wealth creation and informed decision-making.
          </motion.p>
        </div>
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
            { val: "25%+", label: "Avg Annual Appreciation" },
            { val: "100+", label: "Investors Advised" },
            { val: "100%", label: "Legal Due Diligence" },
            { val: "₹1L+", label: "Starting Investment" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="group flex flex-col items-center py-12 px-6 text-center border-r border-white/5 last:border-0 cursor-default">
                <p className="font-serif text-4xl md:text-5xl text-white font-light leading-none tracking-tight">
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

      {/* ── Overview ── */}
      <section className="relative py-32 px-6">
        <Section3DBackground opacity={0.08} />
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#00BFFF] font-bold mb-5 flex items-center gap-3">
              <span className="w-8 h-px bg-[#00BFFF]" />
              Overview
            </p>
            <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-8">
              Smarter Investments,
              <br />
              <em className="text-[#00BFFF] italic">Guided by Expertise</em>
            </h2>
            <div className="space-y-6">
              {[
                "Real estate remains one of the most reliable tools for building long-term wealth, but success depends on informed decision-making, market timing, and a clear strategy.",
                "Our investment consulting service is focused entirely on real estate — providing structured, data-backed insights so you can identify the right opportunities, avoid common pitfalls, and align every decision with current conditions.",
                "Our recommendations are not driven by sales targets, but by objective market analysis and long-term value creation for every client.",
              ].map((p, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <p className="text-white/55 text-lg leading-relaxed font-light">{p}</p>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="relative">
              <div className="absolute -inset-6 bg-[#00BFFF]/5 blur-3xl rounded-3xl" />
              <img
                src={heroImg}
                alt="Investment Consulting"
                className="relative rounded-[32px] border border-white/5 shadow-2xl w-full"
                style={{ filter: "saturate(0.85) brightness(0.7)" }}
              />
              <div className="absolute -bottom-6 -right-6 bg-[#060c16] border border-[#00BFFF]/30 rounded-2xl p-6 shadow-xl">
                <p className="font-serif text-2xl text-[#00BFFF]">25%+</p>
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 mt-1 font-bold">
                  Annual Appreciation
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-32 px-6 bg-[#060c16] relative overflow-hidden">
        <Section3DBackground opacity={0.12} />
        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#00BFFF] font-bold mb-5 flex items-center gap-3">
              <span className="w-8 h-px bg-[#00BFFF]" />
              Our Process
            </p>
            <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-20">
              Where Every Smart Investment
              <br />
              <em className="text-[#00BFFF] italic">Finds Its Direction</em>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8, borderColor: "rgba(0,191,255,0.4)" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative bg-[#04090f] border border-white/5 rounded-[32px] p-10 group cursor-default"
                >
                  <span className="absolute top-6 right-8 font-serif text-7xl text-white/[0.03] group-hover:text-[#00BFFF]/10 transition-colors duration-700 leading-none select-none">
                    {step.num}
                  </span>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#00BFFF] mb-4 font-bold">
                    Phase {step.num}
                  </p>
                  <h3 className="font-serif text-2xl text-white mb-4 leading-tight">{step.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed font-light">{step.desc}</p>
                  <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-[#00BFFF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#00BFFF] font-bold mb-5 flex items-center gap-3">
              <span className="w-8 h-px bg-[#00BFFF]" />
              Our Services
            </p>
            <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-20">
              Investment
              <br />
              <em className="text-[#00BFFF] italic">Advisory Services</em>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((cap, i) => (
              <Reveal key={cap.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6, borderColor: "rgba(0,191,255,0.25)" }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="border border-white/5 bg-[#060c16] rounded-[28px] p-10 group cursor-default"
                >
                  <span className="text-3xl mb-6 block">{cap.icon}</span>
                  <h3 className="font-serif text-xl text-white mb-3 group-hover:text-[#00BFFF] transition-colors duration-300 leading-tight">
                    {cap.title}
                  </h3>
                  <p className="text-white/45 text-sm leading-relaxed font-light">{cap.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Trust ── */}
      <section className="py-32 px-6 bg-[#060c16] relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#00BFFF] font-bold mb-5 flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-[#00BFFF]" />
              The TrustOn Standard
              <span className="w-8 h-px bg-[#00BFFF]" />
            </p>
            <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-12">
              Why clients trust TrustOn
              <br />
              <em className="text-[#00BFFF] italic">with their investment</em>
            </h2>
            {[
              "Our investment consultants bring years of hands-on experience across residential, commercial, and land-based transactions — combining deep market knowledge with a genuine understanding of what each investor needs to achieve.",
              "We are not just advisors. We are your partners in building a real estate portfolio that performs with purpose and stands on a foundation of well-informed decisions.",
            ].map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className="text-white/40 text-xl md:text-2xl leading-relaxed font-serif italic mb-8 max-w-4xl mx-auto">
                  {p}
                </p>
              </Reveal>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Predict Your Legacy — Wealth Calculator ── */}
      <WealthCalculator />

      {/* ── CTA ── */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <Section3DBackground opacity={0.15} />
        <div className="max-w-4xl mx-auto relative z-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#00BFFF] font-bold mb-6">
              Private Advisory Engagement
            </p>
            <h2 className="font-serif text-5xl md:text-7xl leading-tight mb-10">
              Invest Smarter,
              <br />
              <em className="text-[#00BFFF] italic">Start Today</em>
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/contact"
                className="px-12 py-5 text-[12px] uppercase tracking-[0.15em] font-bold rounded-full transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,191,255,0.4)]"
                style={{ background: "#00BFFF", color: "#04090f" }}
              >
                Book a Consultation →
              </Link>
              <a
                href="tel:+919616061166"
                className="px-12 py-5 border border-white/20 text-white/70 text-[12px] uppercase tracking-[0.15em] font-bold rounded-full hover:border-[#00BFFF] hover:text-[#00BFFF] transition-all duration-500"
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
