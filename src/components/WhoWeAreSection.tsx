import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "./Reveal";

const pillars = [
  {
    num: "01",
    title: "Transparent Documentation",
    desc: "Clear title deeds, Jila Panchayat approvals, and zero hidden conditions at every stage of the transaction.",
  },
  {
    num: "02",
    title: "High-Growth Locations",
    desc: "Projects placed in proven growth corridors with verified infrastructure readiness and long-term appreciation potential.",
  },
  {
    num: "03",
    title: "End-to-End Partnership",
    desc: "From plot acquisition to construction and architectural design — one trusted team, start to finish.",
  },
];

export function WhoWeAreSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* ── Scroll-driven image reveal ── */
  const imageY      = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const imageScale  = useTransform(scrollYProgress, [0, 0.4, 1], [0.88, 1, 1.06]);
  const imageRotate = useTransform(scrollYProgress, [0, 0.5, 1], [4, 0, -2]);

  /* Dark overlay lifts as section enters viewport */
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.82, 0.2, 0.08, 0.25]
  );

  /* Badge slides in */
  const badgeY       = useTransform(scrollYProgress, [0.25, 0.65], [40, 0]);
  const badgeOpacity = useTransform(scrollYProgress, [0.25, 0.55], [0, 1]);

  /* Subtle left-panel parallax */
  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#050b14] overflow-hidden py-24 md:py-36"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,191,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,191,255,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient glow top-right */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#00BFFF]/[0.04] blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">

          {/* ── Left: Scroll-animated image ── */}
          <div className="relative order-2 lg:order-1">
            {/* Corner accents */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="absolute -top-5 -left-5 w-20 h-20 border-t border-l border-[#00BFFF]/30 rounded-tl-xl z-20"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.35 }}
              className="absolute -bottom-5 -right-5 w-20 h-20 border-b border-r border-[#00BFFF]/30 rounded-br-xl z-20"
            />

            {/* Image with 3-D scroll effect */}
            <motion.div
              style={{ y: imageY, scale: imageScale, rotateZ: imageRotate }}
              className="relative rounded-[20px] overflow-hidden
                         shadow-[0_40px_120px_rgba(0,0,0,0.55),0_0_60px_rgba(0,191,255,0.06)]
                         border border-white/[0.06]"
            >
              <img
                src="https://truston.advrtisinguru.com/wp-content/uploads/2026/04/april-pethybridge-nN28PjFOOLI-unsplash-scaled.jpg"
                alt="Truston Developers — Architecture"
                className="w-full h-[500px] md:h-[640px] object-cover"
              />

              {/* Scroll-reactive overlay */}
              <motion.div
                className="absolute inset-0 bg-[#050b14]"
                style={{ opacity: overlayOpacity }}
              />

              {/* Cyan scan-line shimmer */}
              <motion.div
                className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00BFFF]/60 to-transparent"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />

              {/* Quote badge */}
              <motion.div
                style={{ y: badgeY, opacity: badgeOpacity }}
                className="absolute bottom-7 left-6 right-6"
              >
                <div className="bg-[#04090f]/70 backdrop-blur-2xl border border-[#00BFFF]/20 rounded-2xl p-5">
                  <p className="text-[9px] uppercase tracking-[0.4em] text-[#00BFFF] mb-2.5 font-bold">
                    Prime Estate · 2025
                  </p>
                  <p className="font-serif text-white/90 text-xl leading-snug italic">
                    "We build the foundation.
                    <br />
                    You build the dream."
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* ── Right: Text content ── */}
          <motion.div className="order-1 lg:order-2" style={{ y: textY }}>
            {/* Eyebrow */}
            <Reveal>
              <div className="flex items-center gap-4 mb-7">
                <span className="w-10 h-px bg-[#00BFFF]" />
                <p className="text-[10px] uppercase tracking-[0.5em] text-[#00BFFF] font-bold">
                  Who We Are
                </p>
              </div>
            </Reveal>

            {/* Heading */}
            <Reveal delay={0.1}>
              <h2 className="font-serif text-5xl md:text-[4rem] lg:text-[4.5rem] text-white leading-[0.9] tracking-tight mb-8">
                Shaping{" "}
                <em className="italic text-[#00BFFF] font-light">Legacies</em>
                <br />
                in Lucknow
              </h2>
            </Reveal>

            {/* Description */}
            <Reveal delay={0.2}>
              <p className="text-white/65 text-[1.05rem] leading-relaxed mb-4 font-light">
                Truston Developers is a Lucknow-based property development company built on a
                single founding principle — that buying land should be simple, transparent, and
                deeply empowering for the buyer.
              </p>
              <p className="text-white/40 text-base leading-relaxed mb-10 font-light">
                We don't merely sell plots; we help you make one of the most significant decisions
                of your life with complete clarity, verified documentation, and a team that stands
                behind every commitment.
              </p>
            </Reveal>

            {/* Three pillars */}
            <div className="space-y-0">
              {pillars.map((p, i) => (
                <Reveal key={p.num} delay={0.3 + i * 0.1}>
                  <div className="flex gap-6 py-6 border-b border-white/[0.07] last:border-0 group cursor-default">
                    <span className="font-serif text-[2rem] text-[#00BFFF]/18 font-light leading-none shrink-0 w-10 group-hover:text-[#00BFFF]/40 transition-colors duration-500">
                      {p.num}
                    </span>
                    <div>
                      <p className="text-white font-semibold text-sm md:text-[0.95rem] mb-1.5 tracking-wide group-hover:text-[#00BFFF] transition-colors duration-500">
                        {p.title}
                      </p>
                      <p className="text-white/40 text-sm leading-relaxed font-light">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
