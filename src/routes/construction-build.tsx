import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Section3DBackground } from "@/components/Section3DBackground";
import projectImg from "@/assets/project-prime.jpg";
import lucknowImg from "@/assets/lucknow-aerial.jpg";

export const Route = createFileRoute("/construction-build")({
  head: () => ({
    meta: [
      { title: "Construction & Build — TrustOn" },
      {
        name: "description",
        content:
          "From blueprint to reality, built the way you imagined. End-to-end construction with full accountability.",
      },
      { property: "og:title", content: "Construction & Build — TrustOn" },
    ],
  }),
  component: Page,
});

const processSteps = [
  {
    num: "01",
    title: "Strategic Brief",
    desc: "We begin by understanding what matters most to you — functional requirements, long-term goals, budget expectations, and the purpose behind every square foot.",
  },
  {
    num: "02",
    title: "Site Intelligence",
    desc: "Detailed evaluation of the land — orientation, access, levels, surroundings, sunlight, airflow, and environmental conditions that will shape every build decision.",
  },
  {
    num: "03",
    title: "Structural Execution",
    desc: "Foundation to finish — our skilled teams execute every phase with precision, using quality materials, proven methods, and rigorous quality control at every milestone.",
  },
  {
    num: "04",
    title: "Quality Handover",
    desc: "Thorough inspection, snag resolution, and formal handover with complete documentation, possession letter, and ongoing post-handover support.",
  },
];

const capabilities = [
  {
    icon: "🏗️",
    title: "Site Preparation & Foundation",
    desc: "Comprehensive site analysis, grading, and foundation engineering — ensuring your structure is built on the most solid base possible.",
  },
  {
    icon: "🔩",
    title: "Structural Engineering",
    desc: "Steel, concrete, and composite structural systems designed for strength, durability, and long-term performance across all load conditions.",
  },
  {
    icon: "⚡",
    title: "MEP Systems Installation",
    desc: "Full mechanical, electrical, and plumbing coordination — planned and installed with efficiency, safety, and future upgradability in mind.",
  },
  {
    icon: "🪟",
    title: "Interior Build-Out",
    desc: "Premium finishing works — flooring, ceilings, joinery, custom millwork, and surface treatments executed with the highest attention to craft.",
  },
  {
    icon: "📊",
    title: "Project Management",
    desc: "Dedicated project managers providing real-time milestone tracking, cost control, subcontractor coordination, and transparent client reporting.",
  },
  {
    icon: "🔍",
    title: "Quality Control",
    desc: "Multi-stage quality inspections at every critical phase — from sub-base to superstructure — with third-party verification where required.",
  },
];

const features = [
  {
    title: "Premium Materials",
    desc: "We source only grade-A materials from verified suppliers, ensuring structural integrity and a superior finish that lasts for generations.",
  },
  {
    title: "Skilled Craftsmanship",
    desc: "Our teams are composed of experienced artisans and technicians who take genuine pride in the precision of their work.",
  },
  {
    title: "Timely Delivery",
    desc: "Rigorous project scheduling and resource management ensure your project stays on track and is handed over exactly when promised.",
  },
  {
    title: "Full Accountability",
    desc: "One point of contact for everything. We manage all subcontractors and vendors, taking full responsibility for the final outcome.",
  },
];

function Page() {
  return (
    <div className="bg-[#04090f] text-white overflow-x-hidden selection:bg-[#00BFFF] selection:text-[#04090f]">

      {/* ── Hero ── */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-[100px]">
        <div className="absolute inset-0 z-0">
          <img
            src={projectImg}
            alt="Construction & Build"
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
            Construction
            <br />
            <em className="text-[#00BFFF] italic">&amp; Build</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-white/50 text-lg font-light max-w-2xl mx-auto leading-relaxed"
          >
            From blueprint to reality, built the way you imagined. Every phase, every
            detail, full accountability — start to finish.
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
            { val: "120+", label: "Projects Completed" },
            { val: "500K+", label: "Sqft Built" },
            { val: "100%", label: "On-Time Delivery" },
            { val: "98%", label: "Client Satisfaction" },
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
              Built Right.
              <br />
              <em className="text-[#00BFFF] italic">Built to Last.</em>
            </h2>
            <div className="space-y-6">
              {[
                "A great design is only as good as its execution. Our construction and build service brings together skilled professionals, quality materials, and proven project management to turn architectural plans into structures you can be proud of.",
                "We oversee every phase — from site preparation and foundation work to structural completion and finishing details — with full transparency on timelines, costs, and progress.",
                "Construction is where vision becomes reality, and we treat every brick, every beam, and every finishing detail as a direct reflection of the trust our clients place in us.",
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
                src={lucknowImg}
                alt="Construction & Build"
                className="relative rounded-[32px] border border-white/5 shadow-2xl w-full"
                style={{ filter: "saturate(0.85) brightness(0.7)" }}
              />
              <div className="absolute -bottom-6 -right-6 bg-[#060c16] border border-[#00BFFF]/30 rounded-2xl p-6 shadow-xl">
                <p className="font-serif text-2xl text-[#00BFFF]">Grade A</p>
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 mt-1 font-bold">
                  Build Quality
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
              Where Ideas Take Shape
              <br />
              <em className="text-[#00BFFF] italic">Through Expert Construction</em>
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

      {/* ── Features ── */}
      <section className="py-32 px-6 bg-[#04090f] relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.1}>
                <div className="flex flex-col gap-4">
                   <div className="w-12 h-px bg-[#00BFFF]" />
                   <h3 className="font-serif text-2xl text-white tracking-tight">{f.title}</h3>
                   <p className="text-white/40 text-sm leading-relaxed font-light">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section className="py-32 px-6 relative overflow-hidden bg-[#060c16]">
        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#00BFFF] font-bold mb-5 flex items-center gap-3">
              <span className="w-8 h-px bg-[#00BFFF]" />
              What We Deliver
            </p>
            <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-20">
              Our Build
              <br />
              <em className="text-[#00BFFF] italic">Capabilities</em>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((cap, i) => (
              <Reveal key={cap.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6, borderColor: "rgba(0,191,255,0.25)" }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="border border-white/5 bg-[#04090f] rounded-[28px] p-10 group cursor-default"
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
      <section className="py-32 px-6 relative overflow-hidden">
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
              <em className="text-[#00BFFF] italic">with their construction</em>
            </h2>
            {[
              "Our construction teams bring years of hands-on experience across residential, commercial, and mixed-use projects — combining technical skill with on-site discipline and a genuine pride in the work they deliver.",
              "We are not just contractors. We are your partners in creating a structure that is built right, built to last, and built to serve the life or business you are putting inside it.",
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

      {/* ── CTA ── */}
      <section className="py-32 px-6 text-center relative overflow-hidden bg-[#060c16]">
        <Section3DBackground opacity={0.15} />
        <div className="max-w-4xl mx-auto relative z-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#00BFFF] font-bold mb-6">
              Private Advisory Engagement
            </p>
            <h2 className="font-serif text-5xl md:text-7xl leading-tight mb-10">
              Start Building
              <br />
              <em className="text-[#00BFFF] italic">Your Dream</em>
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/contact"
                className="px-12 py-5 text-[12px] uppercase tracking-[0.15em] font-bold rounded-full transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,191,255,0.4)]"
                style={{ background: "#00BFFF", color: "#04090f" }}
              >
                Secure Consultation →
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
