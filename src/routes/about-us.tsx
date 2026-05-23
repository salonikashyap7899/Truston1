import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Section3DBackground } from "@/components/Section3DBackground";
import { GlowCard } from "@/components/ui/spotlight-card";
import { CountUp } from "@/components/Reveal";
import lucknowAerialImg from "@/assets/lucknow-aerial.jpg";
import luxuryInteriorImg from "@/assets/luxury-interior.jpg";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "About Us — TrustOn Premium Estate" },
      {
        name: "description",
        content: "Discover Prime Estate by TrustOn — Redefining luxury living in Lucknow.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: "◉",
    title: "Radical Transparency",
    desc: "Every document, every rupee, every clause — explained clearly. No hidden conditions, ever.",
  },
  {
    icon: "◆",
    title: "Enduring Quality",
    desc: "We select only Jila Panchayat approved land in proven growth corridors, built to last generations.",
  },
  {
    icon: "◎",
    title: "Client-First Culture",
    desc: "Your vision drives every decision. We don't close deals — we open futures.",
  },
  {
    icon: "◈",
    title: "Innovation in Design",
    desc: "3D-rendered walkthroughs, precision architecture, and cutting-edge construction technology.",
  },
  {
    icon: "❖",
    title: "Community Legacy",
    desc: "Building neighbourhoods that appreciate in value — and in spirit — for decades ahead.",
  },
  {
    icon: "✦",
    title: "Trusted Partnerships",
    desc: "200+ channel partners who trust our brand enough to stake their own reputation on it.",
  },
];

const milestones = [
  { year: "2019", event: "TrustOn Founded", detail: "Established in Lucknow with a single promise: transparent land transactions." },
  { year: "2020", event: "First Project Launch", detail: "Phase 1 of Prime Estate sold out within 60 days of launch." },
  { year: "2021", event: "Architecture Division", detail: "Launched in-house architectural design studio offering 3D renders." },
  { year: "2022", event: "Construction Excellence", detail: "Full turnkey construction service launched — plot to possession." },
  { year: "2023", event: "200+ Partners Network", detail: "Channel partner program expanded across UP and neighbouring states." },
  { year: "2024", event: "Billion Dollar Vision", detail: "Phase 2 launched with premium plots and smart infrastructure planning." },
];

const stats = [
  { num: 150, suffix: "+", label: "Premium Plots" },
  { num: 200, suffix: "+", label: "Channel Partners" },
  { num: 5, suffix: "+", label: "Years of Excellence" },
  { num: 100, suffix: "%", label: "Legal Clearance" },
];

const buildingImg = lucknowAerialImg;

function AboutPage() {
  return (
    <div className="bg-[#04090f] text-white overflow-x-hidden selection:bg-[#00BFFF] selection:text-[#04090f]">

      {/* ── Cinematic Hero ── */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-[100px]">
        <div className="absolute inset-0 z-0">
          <img
            src={buildingImg}
            alt="TrustOn — About Us"
            className="w-full h-full object-cover brightness-[0.3]"
            style={{ filter: "brightness(0.3) saturate(0.8)" }}
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
            className="text-[10px] md:text-xs text-[#00BFFF] uppercase font-bold mb-6 tracking-[0.4em]"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl font-serif tracking-tighter leading-none mb-6"
          >
            Built on{" "}
            <em className="text-[#00BFFF] italic">Trust.</em>
            <br />
            Shaped by{" "}
            <em className="text-[#00BFFF] italic">Vision.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-white/50 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed"
          >
            From a single plot in Lucknow to a billion-dollar legacy — TrustOn was founded
            on one belief: that buying land should be the most empowering decision of your life.
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
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="group flex flex-col items-center py-12 px-6 text-center border-r border-white/5 last:border-0 cursor-default">
                <p className="font-serif text-4xl md:text-6xl text-white font-light leading-none tracking-tight">
                  <CountUp to={s.num} suffix={s.suffix} />
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

      {/* ── Our Story ── */}
      <section className="py-32 px-6 relative overflow-hidden">
        <Section3DBackground opacity={0.08} />
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center relative z-10">
          <Reveal direction="left">
            <div className="relative">
              <div className="absolute -inset-6 bg-[#00BFFF]/5 blur-3xl rounded-3xl" />
              <img
                src={buildingImg}
                alt="TrustOn — Our Story"
                className="relative rounded-[32px] border border-white/5 shadow-2xl w-full"
                style={{ filter: "saturate(0.9) brightness(0.85)" }}
              />
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 bg-[#060c16] border border-[#00BFFF]/30 rounded-2xl p-6 shadow-xl">
                <p className="font-serif text-3xl text-[#00BFFF]">2019</p>
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 mt-1 font-bold">
                  Founded
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#00BFFF] mb-5 flex items-center gap-3">
                <span className="w-8 h-px bg-[#00BFFF]" />
                Our Foundation
              </p>
              <h2 className="font-serif text-4xl md:text-6xl font-light leading-tight mb-8 text-white">
                Shaping <em className="text-[#00BFFF] italic">Legacies</em><br />in Lucknow
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-6 font-light">
                TrustOn Developers was born out of frustration with an industry riddled with opacity.
                Our founders — seasoned professionals in real estate and construction — set out to build
                a company where every client felt as informed as the developer.
              </p>
              <p className="text-white/50 text-lg leading-relaxed mb-10 font-light">
                We don't merely sell plots; we help you make one of the most significant decisions of
                your life with complete clarity, verified documentation, and a team that stands behind
                every commitment — before, during, and after your purchase.
              </p>

              <div className="grid grid-cols-3 gap-6">
                {[
                  { num: "120+", label: "Total Plots" },
                  { num: "₹12L+", label: "Starting Price" },
                  { num: "47", label: "Still Available" },
                ].map((s) => (
                  <div key={s.label} className="border-l border-[#00BFFF]/20 pl-5">
                    <p className="font-serif text-2xl text-[#00BFFF]">{s.num}</p>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-white/30 mt-1 font-bold">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
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
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#00BFFF] mb-3 text-center">
              Purpose & Direction
            </p>
            <h2 className="text-4xl md:text-6xl font-serif text-white text-center mb-16 tracking-tight">
              Mission &{" "}
              <em className="text-[#00BFFF] italic">Vision</em>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <Reveal delay={0.1}>
              <div className="relative rounded-[40px] p-10 md:p-14 border border-white/5 bg-[#04090f] overflow-hidden group hover:border-[#00BFFF]/20 transition-all duration-700">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00BFFF]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div
                  className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-[0.06]"
                  style={{ background: "radial-gradient(circle, #00BFFF, transparent)" }}
                />
                <p className="text-[#00BFFF] text-[10px] uppercase tracking-[0.4em] font-bold mb-6">
                  Our Mission
                </p>
                <h3 className="font-serif text-3xl md:text-4xl text-white mb-6 leading-tight">
                  "To make land ownership the most empowering decision of every Indian family's life."
                </h3>
                <p className="text-white/50 text-lg font-light leading-relaxed">
                  We exist to eliminate the fear, confusion, and opacity that has long defined
                  real estate in India. Every TrustOn transaction is a promise — of clarity,
                  quality, and lasting value.
                </p>
                <div className="mt-10 flex items-center gap-4">
                  <div className="w-12 h-px bg-[#00BFFF]/30" />
                  <span className="text-[#00BFFF] text-[10px] uppercase tracking-[0.3em] font-bold">
                    Prime Estate by TrustOn
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Vision */}
            <Reveal delay={0.2}>
              <div className="relative rounded-[40px] p-10 md:p-14 border border-white/5 bg-[#04090f] overflow-hidden group hover:border-[#00BFFF]/20 transition-all duration-700">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00BFFF]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div
                  className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full opacity-[0.06]"
                  style={{ background: "radial-gradient(circle, #00BFFF, transparent)" }}
                />
                <p className="text-[#00BFFF] text-[10px] uppercase tracking-[0.4em] font-bold mb-6">
                  Our Vision
                </p>
                <h3 className="font-serif text-3xl md:text-4xl text-white mb-6 leading-tight">
                  "To build Lucknow's most celebrated residential legacy — one plot at a time."
                </h3>
                <p className="text-white/50 text-lg font-light leading-relaxed">
                  By 2030, we aim to have shaped 1,000+ family legacies across Lucknow's finest
                  corridors — each built on the twin pillars of architectural beauty and
                  uncompromising documentation integrity.
                </p>
                <div className="mt-10 flex items-center gap-4">
                  <div className="w-12 h-px bg-[#00BFFF]/30" />
                  <span className="text-[#00BFFF] text-[10px] uppercase tracking-[0.3em] font-bold">
                    The Billion Dollar Legacy
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Core Values (GlowCards) ── */}
      <section className="py-32 px-6 relative overflow-hidden">
        <Section3DBackground opacity={0.07} />
        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#00BFFF] mb-3 text-center">
              What Drives Us
            </p>
            <h2 className="text-4xl md:text-6xl font-serif text-white text-center mb-4 tracking-tight">
              Our Core <em className="text-[#00BFFF] italic">Values</em>
            </h2>
            <p className="text-white/40 text-center text-lg font-light mb-16 max-w-xl mx-auto">
              Six principles that govern every plot we sell, every home we design, every promise we make.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.07}>
                <GlowCard glowColor="blue" customSize className="p-8 md:p-10 min-h-[240px] flex flex-col">
                  <motion.span
                    className="text-[#00BFFF]/40 text-3xl mb-5 block"
                    whileInView={{ opacity: [0, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    {v.icon}
                  </motion.span>
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

      {/* ── Journey / Timeline ── */}
      <section className="py-32 px-6 bg-[#060c16] relative overflow-hidden">
        <div
          className="absolute left-0 top-0 bottom-0 w-px opacity-10"
          style={{ background: "linear-gradient(to bottom, transparent, #00BFFF, transparent)", left: "50%" }}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <Reveal>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#00BFFF] mb-3 text-center">
              Our Journey
            </p>
            <h2 className="text-4xl md:text-6xl font-serif text-white text-center mb-20 tracking-tight">
              The <em className="text-[#00BFFF] italic">Milestones</em>
            </h2>
          </Reveal>

          <div className="relative">
            {/* Centre line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/5 hidden md:block" />

            <div className="space-y-12">
              {milestones.map((m, i) => (
                <Reveal key={m.year} delay={i * 0.1}>
                  <div
                    className={`flex flex-col md:flex-row gap-8 items-start ${
                      i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Content side */}
                    <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                      <div
                        className={`inline-block p-8 rounded-[28px] border border-white/5 bg-[#04090f] hover:border-[#00BFFF]/20 transition-all duration-500 w-full md:max-w-sm ${
                          i % 2 === 0 ? "md:ml-auto" : ""
                        }`}
                      >
                        <p className="text-[#00BFFF] font-serif text-3xl mb-2">{m.year}</p>
                        <h3 className="text-white font-serif text-xl mb-3">{m.event}</h3>
                        <p className="text-white/40 text-sm font-light leading-relaxed">{m.detail}</p>
                      </div>
                    </div>

                    {/* Centre dot */}
                    <div className="hidden md:flex w-12 flex-shrink-0 items-start justify-center pt-10">
                      <div className="w-4 h-4 rounded-full bg-[#00BFFF]/30 border-2 border-[#00BFFF] shadow-lg shadow-[#00BFFF]/20" />
                    </div>

                    {/* Empty side */}
                    <div className="flex-1 hidden md:block" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3D Visual Excellence ── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse 100% 60% at 0% 50%, rgba(0,191,255,0.08) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <Reveal direction="left">
            <div>
              <p className="text-[#00BFFF] text-[10px] uppercase tracking-[0.4em] font-bold mb-5 flex items-center gap-3">
                <span className="w-8 h-px bg-[#00BFFF]" />
                Visual Excellence
              </p>
              <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-8">
                Experience Your Future{" "}
                <em className="text-[#00BFFF] italic">Before It's Built</em>
              </h2>
              <p className="text-white/55 text-lg leading-relaxed mb-6 font-light">
                Our advanced 3D architectural renderings provide a hyper-realistic preview of your
                legacy. Walk through your future home before a single brick is laid — adjusting
                every detail to match your vision.
              </p>
              <p className="text-white/40 text-lg leading-relaxed mb-10 font-light">
                From plot layout to interior finishes, our design team brings your dream into
                focus with cinematic clarity and precision.
              </p>
              <div className="flex gap-8">
                {[
                  { n: "50+", l: "3D Projects" },
                  { n: "98%", l: "Client Satisfaction" },
                  { n: "30", l: "Days avg. Design" },
                ].map((s) => (
                  <div key={s.l} className="border-l border-[#00BFFF]/20 pl-5">
                    <p className="font-serif text-2xl text-[#00BFFF]">{s.n}</p>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-white/30 mt-1 font-bold">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal direction="right">
            <div className="relative">
              <div className="absolute -inset-6 bg-[#00BFFF]/5 blur-3xl rounded-3xl" />
              <img
                src={buildingImg}
                alt="3D Visual Excellence"
                className="relative rounded-[32px] border border-[#00BFFF]/10 shadow-2xl w-full"
                style={{ filter: "brightness(0.85) saturate(0.9)" }}
              />
              <div className="absolute -bottom-4 -left-4 bg-[#060c16] border border-[#00BFFF]/20 rounded-2xl p-5">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#00BFFF] animate-pulse" />
                  <p className="text-white/70 text-xs font-bold uppercase tracking-widest">
                    3D Ready
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-40 px-6 bg-[#060c16] text-center relative overflow-hidden">
        <Section3DBackground opacity={0.25} />

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
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#00BFFF] mb-5 flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-[#00BFFF]" />
              Get In Touch
              <span className="w-8 h-px bg-[#00BFFF]" />
            </p>
            <h2 className="font-serif text-5xl md:text-8xl text-white mb-6 tracking-tighter leading-none">
              Join Our <em className="text-[#00BFFF] italic">Legacy</em>
            </h2>
            <p className="text-white/40 text-xl font-light mb-14 max-w-xl mx-auto">
              Ready to own the ground and build the legacy? Our advisors respond within 2 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/contact"
                className="px-12 py-5 rounded-full text-[11px] uppercase tracking-[0.3em] font-bold transition-all duration-500 hover:scale-105"
                style={{ background: "#00BFFF", color: "#04090f" }}
              >
                Enquire Now →
              </Link>
              <a
                href="tel:+919616061166"
                className="px-12 py-5 border border-white/15 text-white/60 text-[11px] uppercase tracking-[0.3em] font-bold rounded-full hover:border-[#00BFFF] hover:text-[#00BFFF] transition-all duration-500"
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
