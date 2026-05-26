import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Reveal } from "./Reveal";
import { Section3DBackground } from "./Section3DBackground";
import { Link } from "@tanstack/react-router";

function AnimatedNumber({ to, duration = 1800 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to, duration]);

  return <span ref={ref}>{current}</span>;
}

function AnimatedProgress({ value, color }: { value: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ width: 0 }}
      animate={inView ? { width: `${value}%` } : { width: 0 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className="h-full rounded-full"
      style={{ background: color }}
    />
  );
}

export function PlotTracker() {
  const total = 150;
  const sold = 45;
  const booked = 20;
  const available = 85;
  const reservedPct = Math.round(((sold + booked) / total) * 100);
  const soldPct = Math.round((sold / total) * 100);
  const bookedPct = Math.round((booked / total) * 100);

  const stats = [
    { 
      label: "TOTAL PLOTS", 
      value: total, 
      sub: "Full Inventory", 
      color: "text-white",
      bgColor: "bg-white/[0.02]",
      borderColor: "border-white/10"
    },
    { 
      label: "SOLD", 
      value: sold, 
      sub: "30% Complete", 
      color: "text-[#00BFFF]",
      bgColor: "bg-[#00BFFF]/[0.03]",
      borderColor: "border-[#00BFFF]/20"
    },
    { 
      label: "BOOKED", 
      value: booked, 
      sub: "Processing", 
      color: "text-amber-400",
      bgColor: "bg-amber-400/[0.03]",
      borderColor: "border-amber-400/20"
    },
    { 
      label: "AVAILABLE", 
      value: available, 
      sub: "Ready to Book", 
      color: "text-emerald-400",
      bgColor: "bg-emerald-400/[0.03]",
      borderColor: "border-emerald-400/20"
    },
  ];

  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden bg-[#060c16]">
      <Section3DBackground opacity={0.08} />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-5xl z-10">
        {/* Header */}
        <Reveal>
          <div className="mb-4">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-2">
              Prime Estate — <span className="text-[#00BFFF]">Plot Tracker</span>
            </h2>
            <p className="text-white/40 text-sm font-light">
              Real-time availability status updated for Phase 1 & 2
            </p>
          </div>
        </Reveal>

        {/* Stats Cards Grid - Matching reference design */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 mt-8">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4, borderColor: s.color === "text-white" ? "rgba(255,255,255,0.2)" : undefined }}
                className={`${s.bgColor} border ${s.borderColor} rounded-2xl p-6 transition-all duration-500`}
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3 font-medium">
                  {s.label}
                </p>
                <p className={`font-serif text-4xl md:text-5xl ${s.color} mb-2 tracking-tight`}>
                  <AnimatedNumber to={s.value} />
                </p>
                <p className="text-[11px] text-white/30 font-light">
                  {s.sub}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Overall Status Progress Bar */}
        <Reveal delay={0.3}>
          <div className="bg-[#04090f] border border-white/5 rounded-2xl p-6 md:p-8 mb-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-white/60 text-sm font-medium">Overall Status</p>
              <p className="text-white font-serif text-lg">
                {reservedPct}% <span className="text-[#00BFFF]">Reserved</span>
              </p>
            </div>

            {/* Progress bar container */}
            <div className="h-3 bg-white/5 rounded-full overflow-hidden flex">
              <AnimatedProgress value={soldPct} color="#00BFFF" />
              <AnimatedProgress value={bookedPct} color="#fbbf24" />
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-6 mt-4 text-[11px] font-medium">
              <span className="flex items-center gap-2 text-white/50">
                <span className="w-3 h-3 rounded-full bg-[#00BFFF]" />
                Sold ({sold})
              </span>
              <span className="flex items-center gap-2 text-white/50">
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                Booked ({booked})
              </span>
              <span className="flex items-center gap-2 text-white/50">
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                Available ({available})
              </span>
            </div>
          </div>
        </Reveal>

        {/* Alert Banner */}
        <Reveal delay={0.4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5 flex items-start gap-4"
          >
            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
              <span className="text-red-400 text-lg font-bold">!</span>
            </div>
            <div>
              <p className="text-red-400 font-medium text-sm mb-1">Fast-selling inventory!</p>
              <p className="text-white/50 text-sm font-light">
                {reservedPct}% of Phase 1 is already reserved. Contact sales team now.
              </p>
            </div>
          </motion.div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={0.5}>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-[#00BFFF] text-[#04090f] text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:scale-105 transition-all text-center"
            >
              Check Availability
            </Link>
            <Link
              to="/project"
              className="px-8 py-4 border border-white/20 text-white/60 text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:border-[#00BFFF] hover:text-[#00BFFF] transition-all text-center"
            >
              View Full Layout
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// Simpler version for the investment page inline usage
export function PlotTrackerCompact() {
  const total = 150;
  const sold = 45;
  const booked = 20;
  const available = 85;
  const reservedPct = Math.round(((sold + booked) / total) * 100);
  const soldPct = Math.round((sold / total) * 100);
  const bookedPct = Math.round((booked / total) * 100);

  const stats = [
    { label: "TOTAL PLOTS", value: total, sub: "Full Inventory", color: "text-white" },
    { label: "SOLD", value: sold, sub: "30% Complete", color: "text-[#00BFFF]" },
    { label: "BOOKED", value: booked, sub: "Processing", color: "text-amber-400" },
    { label: "AVAILABLE", value: available, sub: "Ready to Book", color: "text-emerald-400" },
  ];

  return (
    <div className="bg-[#060c16] p-8 md:p-10 rounded-[32px] border border-white/5">
      {/* Header */}
      <div className="mb-6">
        <h3 className="font-serif text-2xl md:text-3xl text-white mb-2">
          Prime Estate — <span className="text-[#00BFFF]">Plot Tracker</span>
        </h3>
        <p className="text-white/40 text-sm font-light">
          Real-time availability status updated for Phase 1 & 2
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-[#04090f] border border-white/5 rounded-xl p-4 text-center"
          >
            <p className="text-[9px] uppercase tracking-[0.15em] text-white/40 mb-2 font-medium">
              {s.label}
            </p>
            <p className={`font-serif text-3xl ${s.color} mb-1`}>
              <AnimatedNumber to={s.value} />
            </p>
            <p className="text-[10px] text-white/25 font-light">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Progress Section */}
      <div className="bg-[#04090f] border border-white/5 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-white/50 text-sm">Overall Status</p>
          <p className="text-white font-serif">
            {reservedPct}% <span className="text-[#00BFFF]">Reserved</span>
          </p>
        </div>

        <div className="h-2.5 bg-white/5 rounded-full overflow-hidden flex mb-3">
          <AnimatedProgress value={soldPct} color="#00BFFF" />
          <AnimatedProgress value={bookedPct} color="#fbbf24" />
        </div>

        <div className="flex flex-wrap gap-4 text-[10px] font-medium">
          <span className="flex items-center gap-2 text-white/40">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00BFFF]" />
            Sold ({sold})
          </span>
          <span className="flex items-center gap-2 text-white/40">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            Booked ({booked})
          </span>
          <span className="flex items-center gap-2 text-white/40">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            Available ({available})
          </span>
        </div>
      </div>

      {/* Alert */}
      <div className="mt-5 bg-red-500/5 border border-red-500/15 rounded-xl p-4 flex items-start gap-3">
        <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
          <span className="text-red-400 text-sm font-bold">!</span>
        </div>
        <div>
          <p className="text-red-400 font-medium text-sm">Fast-selling inventory!</p>
          <p className="text-white/40 text-xs font-light">
            {reservedPct}% of Phase 1 is already reserved. Contact sales team now.
          </p>
        </div>
      </div>
    </div>
  );
}
