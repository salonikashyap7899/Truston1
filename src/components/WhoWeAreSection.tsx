import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "./Reveal";
import { ContainerScroll } from "./ui/container-scroll-animation";

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

  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#050b14] overflow-hidden"
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

      <ContainerScroll
        titleComponent={
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-start">
              {/* Left spacer on large screens */}
              <div className="hidden lg:block" />

              {/* Right: Text content */}
              <motion.div style={{ y: textY }}>
                <Reveal>
                  <div className="flex items-center gap-4 mb-7">
                    <span className="w-10 h-px bg-[#00BFFF]" />
                    <p className="text-[10px] uppercase tracking-[0.5em] text-[#00BFFF] font-bold">
                      Who We Are
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <h2 className="font-serif text-5xl md:text-[4rem] lg:text-[4.5rem] text-white leading-[0.9] tracking-tight mb-8 text-left">
                    Shaping{" "}
                    <em className="italic text-[#00BFFF] font-light">Legacies</em>
                    <br />
                    in Lucknow
                  </h2>
                </Reveal>

                <Reveal delay={0.2}>
                  <p className="text-white/65 text-[1.05rem] leading-relaxed mb-4 font-light text-left">
                    Truston Developers is a Lucknow-based property development company built on a
                    single founding principle — that buying land should be simple, transparent, and
                    deeply empowering for the buyer.
                  </p>
                  <p className="text-white/40 text-base leading-relaxed mb-10 font-light text-left">
                    We don't merely sell plots; we help you make one of the most significant decisions
                    of your life with complete clarity, verified documentation, and a team that stands
                    behind every commitment.
                  </p>
                </Reveal>

                <div className="space-y-0">
                  {pillars.map((p, i) => (
                    <Reveal key={p.num} delay={0.3 + i * 0.1}>
                      <div className="flex gap-6 py-6 border-b border-white/[0.07] last:border-0 group cursor-default">
                        <span className="font-serif text-[2rem] text-[#00BFFF]/18 font-light leading-none shrink-0 w-10 group-hover:text-[#00BFFF]/40 transition-colors duration-500">
                          {p.num}
                        </span>
                        <div className="text-left">
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
        }
      >
        {/* Image inside the 3D scroll card */}
        <div className="relative w-full h-full overflow-hidden rounded-2xl">
          {/* Corner accents */}
          <div className="absolute -top-3 -left-3 w-16 h-16 border-t border-l border-[#00BFFF]/40 rounded-tl-xl z-20 pointer-events-none" />
          <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b border-r border-[#00BFFF]/40 rounded-br-xl z-20 pointer-events-none" />

          <img
            src="https://truston.advrtisinguru.com/wp-content/uploads/2026/04/april-pethybridge-nN28PjFOOLI-unsplash-scaled.jpg"
            alt="Truston Developers — Architecture"
            className="w-full h-full object-cover"
          />

          {/* Scan-line shimmer */}
          <motion.div
            className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00BFFF]/60 to-transparent"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />

          {/* Quote badge */}
          <div className="absolute bottom-7 left-6 right-6">
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
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
