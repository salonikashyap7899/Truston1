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
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const imageScale = useTransform(scrollYProgress, [0, 0.45, 1], [0.9, 1, 1.06]);
  const imageRotate = useTransform(scrollYProgress, [0, 0.55, 1], [4, 0, -1.5]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.35, 0.75], [0.72, 0.25, 0.1]);
  const badgeY = useTransform(scrollYProgress, [0.2, 0.7], [30, 0]);
  const badgeOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f5f0e8] overflow-hidden py-24 md:py-36"
    >
      {/* Subtle dot-grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #3a2e1a 1px, transparent 0)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">

          {/* ── Left: Scroll-animated image ── */}
          <div className="relative order-2 lg:order-1" ref={imageRef}>
            {/* Corner accent top-left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute -top-5 -left-5 w-20 h-20 border-t-2 border-l-2 border-[#8b6914]/40 rounded-tl-lg z-20"
            />
            {/* Corner accent bottom-right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-5 -right-5 w-20 h-20 border-b-2 border-r-2 border-[#8b6914]/40 rounded-br-lg z-20"
            />

            <motion.div
              style={{ y: imageY, scale: imageScale, rotateZ: imageRotate }}
              className="relative rounded-[20px] overflow-hidden shadow-[0_50px_140px_rgba(0,0,0,0.28)]"
            >
              <img
                src="https://truston.advrtisinguru.com/wp-content/uploads/2026/04/april-pethybridge-nN28PjFOOLI-unsplash-scaled.jpg"
                alt="Truston Developers — Architecture"
                className="w-full h-[500px] md:h-[640px] object-cover"
              />

              {/* Scroll-reactive dark overlay */}
              <motion.div
                className="absolute inset-0 bg-[#0a0d12]"
                style={{ opacity: overlayOpacity }}
              />

              {/* Floating badge */}
              <motion.div
                style={{ y: badgeY, opacity: badgeOpacity }}
                className="absolute bottom-8 left-6 right-6"
              >
                <div className="bg-black/30 backdrop-blur-2xl border border-white/15 rounded-2xl p-5">
                  <p className="text-[9px] uppercase tracking-[0.4em] text-[#c9a84c] mb-2 font-bold">
                    Prime Estate · 2025
                  </p>
                  <p className="font-serif text-white text-xl md:text-[1.35rem] leading-snug italic">
                    "We build the foundation.
                    <br />
                    You build the dream."
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* ── Right: Text content ── */}
          <div className="order-1 lg:order-2">
            {/* Eyebrow */}
            <Reveal>
              <div className="flex items-center gap-4 mb-7">
                <span className="w-10 h-px bg-[#8b6914]" />
                <p className="text-[10px] uppercase tracking-[0.5em] text-[#8b6914] font-bold">
                  Who We Are
                </p>
              </div>
            </Reveal>

            {/* Heading */}
            <Reveal delay={0.1}>
              <h2 className="font-serif text-5xl md:text-[4rem] lg:text-[4.5rem] text-[#1a1208] leading-[0.9] tracking-tight mb-8">
                Shaping{" "}
                <em className="italic text-[#8b6914] font-light">Legacies</em>
                <br />
                in Lucknow
              </h2>
            </Reveal>

            {/* Description */}
            <Reveal delay={0.2}>
              <p className="text-[#3a3228] text-[1.05rem] leading-relaxed mb-4 font-light">
                Truston Developers is a Lucknow-based property development company built on a
                single founding principle — that buying land should be simple, transparent, and
                deeply empowering for the buyer.
              </p>
              <p className="text-[#3a3228]/65 text-base leading-relaxed mb-10 font-light">
                We don't merely sell plots; we help you make one of the most significant decisions
                of your life with complete clarity, verified documentation, and a team that stands
                behind every commitment.
              </p>
            </Reveal>

            {/* Three pillars */}
            <div className="space-y-0">
              {pillars.map((p, i) => (
                <Reveal key={p.num} delay={0.3 + i * 0.1}>
                  <div className="flex gap-6 py-6 border-b border-[#1a1208]/10 last:border-0 group">
                    <span className="font-serif text-[2rem] text-[#8b6914]/20 font-light leading-none shrink-0 w-10 group-hover:text-[#8b6914]/40 transition-colors duration-500">
                      {p.num}
                    </span>
                    <div>
                      <p className="text-[#1a1208] font-semibold text-sm md:text-[0.95rem] mb-1.5 tracking-wide">
                        {p.title}
                      </p>
                      <p className="text-[#3a3228]/55 text-sm leading-relaxed font-light">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
