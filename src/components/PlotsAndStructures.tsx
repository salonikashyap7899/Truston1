import { motion } from "framer-motion";
import { Reveal, SectionEyebrow } from "./Reveal";
import { Section3DBackground } from "./Section3DBackground";

const BUILDINGS = [
  { h: 55, w: 14, delay: 0.0, accent: false, windows: [[1,0,1],[0,1,1],[1,0,0]] },
  { h: 80, w: 18, delay: 0.1, accent: true,  windows: [[1,1,0],[1,0,1],[0,1,1]] },
  { h: 100, w: 22, delay: 0.2, accent: false, windows: [[0,1,1,0],[1,0,0,1],[1,1,0,1],[0,1,1,0]] },
  { h: 68, w: 16, delay: 0.15, accent: false, windows: [[1,0,1],[0,1,0],[1,1,0]] },
  { h: 42, w: 12, delay: 0.25, accent: true,  windows: [[1,0],[0,1],[1,1]] },
  { h: 88, w: 20, delay: 0.05, accent: false, windows: [[1,0,1,0],[0,1,0,1],[1,1,0,1],[0,0,1,0]] },
  { h: 52, w: 14, delay: 0.3,  accent: false, windows: [[0,1,1],[1,0,1],[0,1,0]] },
] as const;

function CssBuildingScene() {
  const maxH = 100;

  return (
    <div
      className="relative w-full h-full flex items-end justify-center overflow-hidden rounded-2xl border border-white/5"
      style={{ background: "linear-gradient(180deg, #020810 0%, #050f1c 60%, #071422 100%)" }}
    >
      {/* Stars */}
      {[
        { top: "15%", left: "10%", size: 1.5, delay: 0 },
        { top: "25%", left: "30%", size: 1, delay: 0.5 },
        { top: "10%", left: "55%", size: 2, delay: 1 },
        { top: "20%", left: "75%", size: 1.5, delay: 0.3 },
        { top: "35%", left: "88%", size: 1, delay: 0.8 },
        { top: "8%",  left: "42%", size: 1, delay: 1.2 },
      ].map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{ top: star.top, left: star.left, width: star.size, height: star.size }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 2 + i * 0.7, repeat: Infinity, delay: star.delay, ease: "easeInOut" }}
        />
      ))}

      {/* Glow from city below */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-24 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(0,191,255,0.08) 0%, transparent 70%)", filter: "blur(10px)" }}
      />

      {/* Ground line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#00BFFF]/15" />

      {/* Buildings */}
      <div className="relative flex items-end h-[85%] px-6 pb-0 gap-1.5">
        {BUILDINGS.map((b, bi) => {
          const heightPct = (b.h / maxH) * 100;
          return (
            <motion.div
              key={bi}
              className="relative flex-shrink-0 rounded-t-sm"
              style={{ width: b.w, height: `${heightPct}%` }}
              initial={{ scaleY: 0, originY: "bottom" }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: b.delay, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Building body */}
              <div
                className="w-full h-full rounded-t-sm flex flex-col p-1 gap-1"
                style={{
                  background: b.accent
                    ? "linear-gradient(180deg, #003a5c 0%, #001828 100%)"
                    : "linear-gradient(180deg, #081624 0%, #020a12 100%)",
                  borderTop: b.accent ? "1px solid rgba(0,191,255,0.25)" : "1px solid rgba(255,255,255,0.04)",
                  borderLeft: b.accent ? "1px solid rgba(0,191,255,0.25)" : "1px solid rgba(255,255,255,0.04)",
                  borderRight: b.accent ? "1px solid rgba(0,191,255,0.25)" : "1px solid rgba(255,255,255,0.04)",
                  borderBottom: "none",
                  boxShadow: b.accent ? "0 0 16px rgba(0,191,255,0.08), inset 0 0 20px rgba(0,191,255,0.04)" : "none",
                }}
              >
                {/* Window rows — deterministic, no Math.random() */}
                {b.windows.map((row, ri) => (
                  <div key={ri} className="flex gap-[2px] justify-center">
                    {row.map((lit, ci) => (
                      <motion.div
                        key={ci}
                        className="rounded-sm flex-shrink-0"
                        style={{
                          width: 2,
                          height: 3,
                          background: lit
                            ? (b.accent ? "rgba(0,191,255,0.65)" : "rgba(200,230,255,0.22)")
                            : "transparent",
                        }}
                        animate={lit ? { opacity: [1, 0.5, 1] } : {}}
                        transition={lit ? {
                          duration: 3 + ci * 0.5 + ri * 0.3,
                          repeat: Infinity,
                          delay: bi * 0.3 + ci * 0.2,
                        } : {}}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* Antenna on accent buildings */}
              {b.accent && (
                <motion.div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-px bg-[#00BFFF]/50"
                  style={{ height: 12 }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: bi * 0.4 }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,191,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,191,255,1) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Label */}
      <div className="absolute top-4 left-4 text-[8px] uppercase tracking-[0.3em] text-[#00BFFF]/35 font-bold">
        Prime Estate · Lucknow
      </div>
    </div>
  );
}

export function PlotsAndStructures() {
  return (
    <section className="relative py-32 px-6 bg-[#060c16] overflow-hidden">
      <Section3DBackground opacity={0.15} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <div className="order-2 lg:order-1">
            <SectionEyebrow>Strategic Masterpieces</SectionEyebrow>
            <Reveal>
              <h2 className="text-5xl md:text-7xl font-serif text-white mt-4 mb-8">
                Building <em className="text-[#00BFFF] italic">Plots & Structures</em>
              </h2>
            </Reveal>

            <div className="space-y-8 text-white/60 text-lg font-light leading-relaxed">
              <Reveal delay={0.2}>
                <p>
                  Discover the ultimate foundation for your architectural dreams. Our premium building
                  plots are strategically located in Lucknow&apos;s most promising corridors, offering
                  100% legal clearance and Jila Panchayat approval.
                </p>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="flex gap-12 pt-6">
                  <div className="border-l-2 border-[#00BFFF]/40 pl-6">
                    <p className="text-3xl font-serif text-white mb-1">150+</p>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-white/40">Premium Plots</p>
                  </div>
                  <div className="border-l-2 border-[#00BFFF]/40 pl-6">
                    <p className="text-3xl font-serif text-white mb-1">Elite</p>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-white/40">Architectural Support</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* CSS 3D Building Scene */}
          <div className="order-1 lg:order-2 h-[380px] md:h-[480px] relative">
            <CssBuildingScene />
          </div>
        </div>
      </div>
    </section>
  );
}
