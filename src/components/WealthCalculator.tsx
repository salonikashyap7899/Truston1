import { useMemo, useState, useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { Reveal, SectionEyebrow } from "./Reveal";

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));

function AnimatedValue({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 60, damping: 18 });
  const [display, setDisplay] = useState(value);

  useEffect(() => { spring.set(value); }, [value, spring]);
  useEffect(() => spring.on("change", (v) => setDisplay(Math.round(v))), [spring]);

  return <span>₹{inr(display)}</span>;
}

function AnimatedPercent({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 60, damping: 18 });
  const [display, setDisplay] = useState(value);

  useEffect(() => { spring.set(value); }, [value, spring]);
  useEffect(() => spring.on("change", (v) => setDisplay(Math.round(v))), [spring]);

  return <span>+{display}%</span>;
}

function LuxurySlider({
  label,
  sublabel,
  value,
  displayValue,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  sublabel?: string;
  value: number;
  displayValue: string;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="group">
      <div className="flex items-end justify-between mb-4">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-white/35">{label}</p>
          {sublabel && <p className="text-[10px] text-white/20 mt-0.5">{sublabel}</p>}
        </div>
        <motion.p
          key={displayValue}
          initial={{ opacity: 0.5, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-2xl text-[var(--bronze)] font-light"
        >
          {displayValue}
        </motion.p>
      </div>

      {/* Track */}
      <div className="relative h-1 bg-white/8 rounded-full">
        <div
          className="absolute top-0 left-0 h-full rounded-full transition-all duration-100"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg, oklch(0.42 0.16 250), oklch(0.60 0.14 245))",
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
          style={{ margin: 0 }}
        />
        {/* Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[var(--bronze)] shadow-lg shadow-[var(--bronze)]/40 pointer-events-none transition-all duration-100 border-2 border-white/20"
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>

      {/* Min/Max labels */}
      <div className="flex justify-between mt-2">
        <span className="text-[9px] text-white/15 uppercase tracking-widest">Min</span>
        <span className="text-[9px] text-white/15 uppercase tracking-widest">Max</span>
      </div>
    </div>
  );
}

function GrowthBar({ years, investment, rate }: { years: number; investment: number; rate: number }) {
  const milestones = useMemo(() => {
    const pts: { yr: number; val: number }[] = [];
    const step = Math.max(1, Math.floor(years / 5));
    for (let y = step; y <= years; y += step) {
      pts.push({ yr: y, val: investment * Math.pow(1 + rate / 100, y) });
    }
    if (pts[pts.length - 1]?.yr !== years) {
      pts.push({ yr: years, val: investment * Math.pow(1 + rate / 100, years) });
    }
    return pts;
  }, [years, investment, rate]);

  const maxVal = milestones[milestones.length - 1]?.val || 1;

  return (
    <div className="flex items-end gap-2 h-24">
      {/* Investment baseline */}
      <div className="flex flex-col items-center gap-1 flex-1">
        <div
          className="w-full rounded-sm bg-white/10"
          style={{ height: `${(investment / maxVal) * 100}%`, minHeight: 8 }}
        />
        <span className="text-[8px] text-white/20 uppercase tracking-wider">Now</span>
      </div>
      {milestones.map((m, i) => {
        const heightPct = (m.val / maxVal) * 100;
        return (
          <div key={m.yr} className="flex flex-col items-center gap-1 flex-1 group/bar">
            <motion.div
              className="w-full rounded-sm relative overflow-hidden"
              style={{
                height: `${heightPct}%`,
                minHeight: 8,
                background: `linear-gradient(to top, oklch(0.50 0.155 245), oklch(0.65 0.12 240 / 0.7))`,
                opacity: 0.4 + (i / milestones.length) * 0.6,
              }}
              initial={{ scaleY: 0, originY: "bottom" }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute inset-0 shimmer opacity-50" />
            </motion.div>
            <span className="text-[8px] text-white/20 uppercase tracking-wider">{m.yr}y</span>
          </div>
        );
      })}
    </div>
  );
}

export function WealthCalculator() {
  const [investment, setInvestment] = useState(2500000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);

  const maturity = useMemo(() => investment * Math.pow(1 + rate / 100, years), [investment, years, rate]);
  const profit = maturity - investment;
  const totalReturn = (profit / investment) * 100;
  const multiplier = maturity / investment;

  const stats = [
    { label: "Total Investment", value: `₹${inr(investment)}`, highlight: false },
    { label: "Net Profit", value: `+₹${inr(profit)}`, highlight: true },
    { label: "Total Return", value: `+${totalReturn.toFixed(0)}%`, highlight: true },
    { label: "Money Multiplier", value: `${multiplier.toFixed(1)}×`, highlight: true },
  ];

  return (
    <section id="wealth" className="relative py-0 overflow-hidden">
      {/* Full-bleed dark section */}
      <div className="bg-[var(--ink)] relative">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.07]"
            style={{ background: "radial-gradient(circle, var(--bronze), transparent 70%)" }}
          />
          <div
            className="absolute -bottom-40 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.05]"
            style={{ background: "radial-gradient(circle, oklch(0.50 0.155 245), transparent 70%)" }}
          />
        </div>

        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-32">
          {/* Header */}
          <Reveal>
            <SectionEyebrow light>Wealth Planner</SectionEyebrow>
            <h2 className="font-display text-5xl md:text-7xl text-center text-white mb-4">
              Calculate your{" "}
              <em className="gradient-bronze-text not-italic">returns</em>
            </h2>
            <p className="text-center text-white/35 mb-20 max-w-xl mx-auto">
              See how your investment in Prime Estate compounds over time.
            </p>
          </Reveal>

          {/* Main calculator grid */}
          <div className="grid lg:grid-cols-5 gap-px bg-white/5 mb-px">
            {/* Left: Sliders — 3 cols */}
            <Reveal className="lg:col-span-3" direction="left">
              <div className="bg-white/[0.02] p-10 md:p-14 h-full flex flex-col justify-between gap-14">
                <div className="space-y-12">
                  <LuxurySlider
                    label="Initial Investment"
                    sublabel="Minimum ₹5 Lakh"
                    value={investment}
                    displayValue={`₹${inr(investment)}`}
                    min={500000}
                    max={20000000}
                    step={100000}
                    onChange={setInvestment}
                  />
                  <LuxurySlider
                    label="Holding Period"
                    sublabel="In years"
                    value={years}
                    displayValue={`${years} Years`}
                    min={1}
                    max={25}
                    step={1}
                    onChange={setYears}
                  />
                  <LuxurySlider
                    label="Expected Annual Growth"
                    sublabel="Lucknow prime avg: 12–18%"
                    value={rate}
                    displayValue={`${rate}% / yr`}
                    min={5}
                    max={25}
                    step={1}
                    onChange={setRate}
                  />
                </div>

                {/* Growth bar chart */}
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/20 mb-4">
                    Projected Growth Milestones
                  </p>
                  <GrowthBar years={years} investment={investment} rate={rate} />
                </div>
              </div>
            </Reveal>

            {/* Right: Results — 2 cols */}
            <Reveal className="lg:col-span-2" direction="right" delay={0.1}>
              <div className="relative bg-white/[0.04] p-10 md:p-14 h-full flex flex-col gap-10 overflow-hidden">
                {/* Watermark logo */}
                <div className="absolute bottom-6 right-6 opacity-[0.06] pointer-events-none">
                  <img src="/logo.png" alt="" className="w-28 h-28 object-contain grayscale brightness-200" />
                </div>

                {/* Main output */}
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/30 mb-3">
                    Estimated Maturity Value
                  </p>
                  <div className="font-display text-4xl md:text-5xl gradient-bronze-text font-light leading-tight">
                    <AnimatedValue value={maturity} />
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <p className="text-[10px] text-green-400/70 uppercase tracking-widest">
                      Live projection
                    </p>
                  </div>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-2 gap-px bg-white/5">
                  {stats.map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07, duration: 0.5 }}
                      className="bg-white/[0.03] hover:bg-white/[0.07] p-5 transition-all duration-300 group"
                    >
                      <p className="text-[9px] uppercase tracking-widest text-white/25 mb-2">{s.label}</p>
                      <p className={`font-serif text-lg font-medium ${s.highlight ? "text-[var(--bronze)]" : "text-white/70"}`}>
                        {s.value}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Summary line */}
                <div className="border-t border-white/5 pt-8 mt-auto">
                  <p className="font-serif italic text-lg text-white/60 leading-relaxed">
                    ₹{(investment / 100000).toFixed(0)}L →{" "}
                    <span className="text-[var(--bronze)]">₹{(maturity / 100000).toFixed(0)}L</span>{" "}
                    in {years} years
                  </p>
                  <p className="text-[9px] uppercase tracking-widest text-white/20 mt-3">
                    Based on Lucknow prime land historical appreciation
                  </p>
                  <a
                    href="tel:+919616061166"
                    className="inline-flex items-center gap-3 mt-8 bg-[var(--bronze)] text-white px-7 py-3.5 text-[11px] uppercase tracking-widest hover:opacity-90 transition-opacity w-full justify-center"
                  >
                    Book a Consultation →
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Bottom strip */}
          <Reveal>
            <div className="bg-white/[0.02] px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5">
              <div className="flex items-center gap-6">
                <span className="text-[10px] uppercase tracking-widest text-white/20">Disclaimer:</span>
                <span className="text-[11px] text-white/25">Conservative estimate. Actual returns may vary based on market conditions.</span>
              </div>
              <div className="flex gap-8">
                {[
                  { n: "₹50Cr+", l: "Land Value Managed" },
                  { n: "150+", l: "Plots Developed" },
                ].map((b) => (
                  <div key={b.l} className="text-center">
                    <p className="font-display text-xl gradient-bronze-text">{b.n}</p>
                    <p className="text-[9px] uppercase tracking-widest text-white/25 mt-1">{b.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
