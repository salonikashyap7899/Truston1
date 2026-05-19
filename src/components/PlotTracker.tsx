import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Reveal, SectionEyebrow } from "./Reveal";
import plotImg from "@/assets/plot-tracker.jpg";

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
    { label: "Sold", value: sold, sub: "Exclusively Owned", color: "text-red-400" },
    { label: "Booked", value: booked, sub: "In Reservation", color: "text-sky-300" },
    { label: "Available", value: available, sub: "Awaiting Legacy", color: "text-[#2D6BC4]" },
  ];

  return (
    <section id="estate" className="relative py-32 px-6 overflow-hidden bg-[var(--ink)]">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionEyebrow light>Prime Estate</SectionEyebrow>
          <h2 className="font-display text-5xl md:text-7xl text-center text-white mb-4">
            Plot <em className="gradient-bronze-text not-italic">Tracker</em>
          </h2>
          <p className="text-center text-white/40 mb-20">
            Real-time availability status — updated for Phase 1 &amp; 2
          </p>
        </Reveal>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 mb-px">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="group bg-white/[0.02] hover:bg-white/[0.06] p-10 h-full transition-all duration-500 border-t-2 border-transparent hover:border-[var(--bronze)]">
                <p className="text-[10px] uppercase tracking-widest text-white/30 mb-5">
                  {s.label}
                </p>
                <p className={`font-display text-6xl font-bold ${s.color} mb-3`}>
                  <AnimatedNumber to={s.value} />
                </p>
                <p className="text-[10px] uppercase tracking-widest text-white/20">{s.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Progress card */}
        <Reveal>
          <div className="bg-white/[0.03] border border-white/5 p-10 relative overflow-hidden">
            <img
              src={plotImg}
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-[0.04]"
            />
            <div className="relative">
              <div className="flex flex-wrap items-baseline justify-between mb-6">
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-white/30 mb-1">
                    Overall Inventory Status
                  </p>
                  <p className="font-display text-4xl text-white">Phase 1 &amp; 2 Combined</p>
                </div>
                <p className="font-serif text-4xl gradient-bronze-text">{pct}% Reserved</p>
              </div>

              {/* Progress bar */}
              <div className="h-2 bg-white/5 overflow-hidden mb-3 relative">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  className="h-full"
                  style={{ background: "var(--gradient-bronze)" }}
                />
              </div>
              <div className="flex gap-6 mb-10 text-xs">
                <span className="flex items-center gap-2 text-white/30">
                  <span className="w-3 h-3 rounded-full bg-red-400/70" /> Sold ({sold})
                </span>
                <span className="flex items-center gap-2 text-white/30">
                  <span className="w-3 h-3 rounded-full bg-sky-300/70" /> Booked ({booked})
                </span>
                <span className="flex items-center gap-2 text-white/30">
                  <span className="w-3 h-3 rounded-full bg-white/20" /> Available ({available})
                </span>
              </div>

              <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <p className="font-serif text-2xl text-[var(--bronze)]">
                    Fast-selling inventory.
                  </p>
                  <p className="text-sm text-white/40 mt-1">
                    43% of Phase 1 is already reserved. Act now before it's gone.
                  </p>
                </div>
                <a
                  href="tel:+919616061166"
                  className="inline-flex items-center gap-3 bg-[var(--bronze)] text-white px-8 py-4 text-[11px] uppercase tracking-widest hover:opacity-90 transition-opacity shrink-0"
                >
                  Contact Sales →
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
