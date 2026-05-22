import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Reveal, SectionEyebrow } from "./Reveal";
import { Section3DBackground } from "./Section3DBackground";

function AnimatedNumber({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);

  return <span ref={ref}>{current}</span>;
}

export function PlotTracker() {
  const total = 150,
    sold = 45,
    booked = 20,
    available = 85;
  const pct = Math.round(((sold + booked) / total) * 100);

  const stats = [
    { label: "Total Plots", value: total, sub: "Exquisite Inventory", color: "text-white" },
    { label: "Sold", value: sold, sub: "Exclusively Owned", color: "text-red-500/80" },
    { label: "Booked", value: booked, sub: "In Reservation", color: "text-luxe-cyan" },
    { label: "Available", value: available, sub: "Awaiting Legacy", color: "text-luxe-blue" },
  ];

  return (
    <section id="estate" className="relative py-32 px-6 overflow-hidden bg-ink">
      <Section3DBackground opacity={0.15} />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative mx-auto max-w-7xl z-10">
        <Reveal>
          <SectionEyebrow light>Inventory Real-Time</SectionEyebrow>
          <h2 className="font-display text-5xl md:text-8xl text-center text-white mb-6 tracking-tighter">
            Plot <em className="gradient-luxe-text not-italic">Intelligence</em>
          </h2>
          <p className="text-center text-white/40 mb-20 font-light text-lg">
            Live availability status — meticulously tracked for Phase 1 &amp; 2.
          </p>
        </Reveal>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 mb-px rounded-3xl overflow-hidden border border-white/5">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="group bg-white/[0.01] hover:bg-white/[0.04] p-12 h-full transition-all duration-700 border-t-2 border-transparent hover:border-luxe-cyan">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-8 font-bold">
                  {s.label}
                </p>
                <p
                  className={`font-display text-7xl font-bold ${s.color} mb-4 tracking-tighter group-hover:scale-110 transition-transform duration-500 origin-left`}
                >
                  <AnimatedNumber to={s.value} />
                </p>
                <p className="text-[10px] uppercase tracking-widest text-white/20 font-medium">
                  {s.sub}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Progress card */}
        <Reveal>
          <div className="glass-premium border border-white/5 p-12 md:p-16 relative overflow-hidden mt-8 rounded-[40px] shadow-luxe">
            <div className="relative z-10">
              <div className="flex flex-wrap items-baseline justify-between mb-10 gap-6">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.4em] text-luxe-cyan mb-4 font-bold">
                    Portfolio Absorption
                  </p>
                  <p className="font-display text-4xl md:text-5xl text-white tracking-tight">
                    Phase 1 &amp; 2 Status
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-display text-5xl text-white">
                    {pct}% <span className="text-luxe-cyan font-serif italic">Reserved</span>
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-2 bg-white/5 overflow-hidden mb-8 relative rounded-full">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  className="h-full rounded-full shadow-[0_0_20px_rgba(100,200,255,0.4)]"
                  style={{ background: "var(--gradient-luxe)" }}
                />
              </div>

              <div className="flex flex-wrap gap-10 mb-12 text-[10px] uppercase tracking-[0.2em] font-bold">
                <span className="flex items-center gap-3 text-white/40 group">
                  <span className="w-3 h-3 rounded-full bg-red-500/50 group-hover:bg-red-500 transition-colors" />{" "}
                  Sold ({sold})
                </span>
                <span className="flex items-center gap-3 text-white/40 group">
                  <span className="w-3 h-3 rounded-full bg-luxe-cyan/50 group-hover:bg-luxe-cyan transition-colors" />{" "}
                  Booked ({booked})
                </span>
                <span className="flex items-center gap-3 text-white/40 group">
                  <span className="w-3 h-3 rounded-full bg-white/10 group-hover:bg-white/30 transition-colors" />{" "}
                  Available ({available})
                </span>
              </div>

              <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-10">
                <div>
                  <p className="font-display text-3xl text-white">
                    Limited <em className="text-luxe-cyan italic font-serif">Luxury</em> Inventory.
                  </p>
                  <p className="text-base text-white/40 mt-2 font-light">
                    Accelerated absorption in Phase 1. Secure your position in Lucknow's future.
                  </p>
                </div>
                <button className="btn-magnetic btn-luxe px-12 py-5">Request Availability →</button>
              </div>
            </div>

            {/* Background Light Effect */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-luxe-cyan/5 blur-[120px] -translate-y-1/2 translate-x-1/2" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
