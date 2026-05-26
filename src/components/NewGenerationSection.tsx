import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "./Reveal";

const features = [
  {
    icon: "◈",
    title: "Smart Plot Technology",
    desc: "Every plot is geo-tagged, digitally mapped, and traceable on a live dashboard — ownership you can verify in seconds.",
  },
  {
    icon: "◎",
    title: "Zero-Paper Documentation",
    desc: "From registry to handover, fully digitised legal documentation with e-signatures and cloud-stored title deeds.",
  },
  {
    icon: "◆",
    title: "AI-Assisted Site Selection",
    desc: "Data-driven location analysis — growth index, connectivity score, and appreciation forecast for every plot we offer.",
  },
  {
    icon: "◉",
    title: "Modern Construction Standards",
    desc: "Grade-A build quality using sustainable materials, engineered drainage, and BIS-certified construction practices.",
  },
];

export function NewGenerationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY    = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const lineW  = useTransform(scrollYProgress, [0, 0.6], ["0%", "100%"]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], [60, 0]);
  const titleO = useTransform(scrollYProgress, [0, 0.35], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#04090f] py-28 md:py-40"
    >
      {/* ── Parallax full-bleed image ── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY, willChange: "transform" }}
      >
        <img
          src="/assets/photo_3.jpg"
          alt="Prime Estate — Wide Internal Roads"
          className="w-full h-full object-cover scale-110"
        />
        {/* Multi-layer overlay */}
        <div className="absolute inset-0 bg-[#04090f]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04090f] via-transparent to-[#04090f]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#04090f]/70 via-transparent to-[#04090f]/70" />
      </motion.div>

      {/* Cyan scan lines */}
      <div
        className="absolute inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,191,255,0.8) 40px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">

        {/* ── Header ── */}
        <div className="mb-20 md:mb-28">
          {/* Animated horizontal rule */}
          <div className="overflow-hidden mb-8 h-px bg-white/5">
            <motion.div
              className="h-full bg-[#00BFFF]"
              style={{ width: lineW }}
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <motion.div style={{ y: titleY, opacity: titleO }}>
              <p className="text-[10px] uppercase tracking-[0.55em] text-[#00BFFF] font-bold mb-5 flex items-center gap-3">
                <span className="w-6 h-px bg-[#00BFFF]" /> New Generation
              </p>
              <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[0.88] tracking-tighter">
                Redefining{" "}
                <br />
                <em className="italic text-[#00BFFF] font-light">Luxury</em>{" "}Real Estate
              </h2>
            </motion.div>

            <Reveal delay={0.3}>
              <p className="max-w-sm text-white/45 text-base leading-relaxed font-light md:text-right">
                We harness technology, data, and design thinking to make land ownership the most
                empowering decision of your life — not the most stressful one.
              </p>
            </Reveal>
          </div>
        </div>

        {/* ── Feature grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04] border border-white/[0.04]">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <motion.div
                className="group relative bg-[#04090f] p-8 md:p-10 flex flex-col gap-6 h-full cursor-default overflow-hidden"
                whileHover={{ backgroundColor: "rgba(0,191,255,0.04)" }}
                transition={{ duration: 0.4 }}
              >
                {/* Hover top border */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px] bg-[#00BFFF]"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: "left" }}
                />

                {/* Icon */}
                <motion.span
                  className="text-3xl text-[#00BFFF]/30 group-hover:text-[#00BFFF] transition-colors duration-500"
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {f.icon}
                </motion.span>

                {/* Content */}
                <div className="flex-1">
                  <p className="text-white font-semibold text-base mb-3 group-hover:text-[#00BFFF] transition-colors duration-400">
                    {f.title}
                  </p>
                  <p className="text-white/35 text-sm leading-relaxed font-light group-hover:text-white/55 transition-colors duration-400">
                    {f.desc}
                  </p>
                </div>

                {/* Number */}
                <p className="font-serif text-[4rem] text-white/[0.03] leading-none select-none group-hover:text-white/[0.05] transition-colors duration-500">
                  0{i + 1}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* ── Bottom CTA strip ── */}
        <Reveal delay={0.4}>
          <div className="mt-16 md:mt-20 flex flex-col md:flex-row items-center justify-between gap-8 border border-white/[0.06] p-8 md:p-10 bg-white/[0.02]">
            <div>
              <p className="text-white/25 text-[10px] uppercase tracking-[0.4em] font-bold mb-2">
                The Truston Promise
              </p>
              <p className="font-serif text-2xl md:text-3xl text-white font-light">
                Where legacy meets <em className="text-[#00BFFF] italic">innovation.</em>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <a
                href="/about-us"
                className="px-8 py-3.5 bg-[#00BFFF] text-[#04090f] text-[11px] uppercase tracking-[0.2em] font-bold rounded-full hover:bg-white transition-colors duration-400"
              >
                Our Story →
              </a>
              <a
                href="/contact"
                className="px-8 py-3.5 border border-white/15 text-white/60 text-[11px] uppercase tracking-[0.2em] font-bold rounded-full hover:border-[#00BFFF] hover:text-[#00BFFF] transition-all duration-400"
              >
                Talk to Us
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
