import { useMemo, useState, useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { Reveal, SectionEyebrow } from "./Reveal";

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));

function AnimatedValue({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 60, damping: 18 });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);
  useEffect(() => spring.on("change", (v) => setDisplay(Math.round(v))), [spring]);

  return <span>₹{inr(display)}</span>;
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
          <p className="text-[11px] uppercase tracking-widest text-white/35 font-medium group-hover:text-luxe-cyan transition-colors duration-300">
            {label}
          </p>
          {sublabel && <p className="text-[10px] text-white/20 mt-0.5">{sublabel}</p>}
        </div>
        <motion.p
          key={displayValue}
          initial={{ opacity: 0.5, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-2xl text-luxe-cyan font-light"
        >
          {displayValue}
        </motion.p>
      </div>

      {/* Track */}
      <div className="relative h-1 bg-white/5 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full rounded-full transition-all duration-300 ease-out"
          style={{
            width: `${pct}%`,
            background: "var(--gradient-luxe)", // Now blue-cyan
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full z-10"
          style={{ margin: 0 }}
        />
      </div>

      {/* Visual Thumb */}
      <div className="relative mt-[-4px]">
        <motion.div
          className="absolute w-3 h-3 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] pointer-events-none border border-luxe-cyan"
          animate={{ left: `${pct}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ x: "-50%" }}
        />
      </div>

      {/* Min/Max labels */}
      <div className="flex justify-between mt-4">
        <span className="text-[9px] text-white/15 uppercase tracking-widest">Min</span>
        <span className="text-[9px] text-white/15 uppercase tracking-widest">Max</span>
      </div>
    </div>
  );
}

function GrowthBar({
  years,
  investment,
  rate,
}: {
  years: number;
  investment: number;
  rate: number;
}) {
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
    <div className="flex items-end gap-2 h-32">
      {/* Investment baseline */}
      <div className="flex flex-col items-center gap-2 flex-1">
        <div
          className="w-full rounded-sm bg-white/5 border border-white/5"
          style={{ height: `${(investment / maxVal) * 100}%`, minHeight: 8 }}
        />
        <span className="text-[8px] text-white/20 uppercase tracking-wider">Now</span>
      </div>
      {milestones.map((m, i) => {
        const heightPct = (m.val / maxVal) * 100;
        return (
          <div key={m.yr} className="flex flex-col items-center gap-2 flex-1 group/bar">
            <motion.div
              className="w-full rounded-sm relative overflow-hidden group-hover/bar:brightness-125 transition-all duration-300"
              style={{
                height: `${heightPct}%`,
                minHeight: 8,
                background: `linear-gradient(to top, var(--luxe-blue), var(--luxe-cyan))`,
                opacity: 0.3 + (i / milestones.length) * 0.7,
              }}
              initial={{ scaleY: 0, originY: "bottom" }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/bar:opacity-100 transition-opacity" />
            </motion.div>
            <span className="text-[8px] text-white/20 uppercase tracking-wider group-hover/bar:text-luxe-cyan transition-colors">
              {m.yr}y
            </span>
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

  const maturity = useMemo(
    () => investment * Math.pow(1 + rate / 100, years),
    [investment, years, rate],
  );
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
    <section id="wealth" className="relative py-0 overflow-hidden bg-ink">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 left-1/4 w-[800px] h-[800px] rounded-full opacity-[0.1]"
          style={{ background: "radial-gradient(circle, var(--luxe-blue), transparent 70%)" }}
        />
        <div
          className="absolute -bottom-40 right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.08]"
          style={{
            background: "radial-gradient(circle, var(--luxe-cyan), transparent 70%)",
          }}
        />
      </div>

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-32">
        <Reveal>
          <SectionEyebrow light>Wealth Architecture</SectionEyebrow>
          <h2 className="font-display text-5xl md:text-8xl text-center text-white mb-6 tracking-tight">
            Predict Your <em className="gradient-luxe-text not-italic">Legacy</em>
          </h2>
          <p className="text-center text-white/40 mb-20 max-w-2xl mx-auto font-light text-lg">
            Experience the power of compounding in India's most prestigious real estate markets.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          {/* Input Section */}
          <div className="lg:col-span-3 bg-white/[0.01] backdrop-blur-xl p-10 md:p-16 flex flex-col justify-between gap-16">
            <div className="space-y-16">
              <LuxurySlider
                label="Strategic Investment"
                sublabel="Minimum allocation: ₹5 Lakh"
                value={investment}
                displayValue={`₹${inr(investment)}`}
                min={500000}
                max={20000000}
                step={100000}
                onChange={setInvestment}
              />
              <LuxurySlider
                label="Investment Horizon"
                sublabel="Time in years"
                value={years}
                displayValue={`${years} Years`}
                min={1}
                max={25}
                step={1}
                onChange={setYears}
              />
              <LuxurySlider
                label="Target Appreciation"
                sublabel="Historical average: 12% – 18%"
                value={rate}
                displayValue={`${rate}% p.a.`}
                min={5}
                max={25}
                step={1}
                onChange={setRate}
              />
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 mb-6 font-bold">
                Projected Appreciation Timeline
              </p>
              <GrowthBar years={years} investment={investment} rate={rate} />
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 bg-white/[0.03] backdrop-blur-2xl p-10 md:p-16 flex flex-col gap-12 relative overflow-hidden border-l border-white/5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-luxe-cyan/10 blur-[100px] -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10">
              <p className="text-[11px] uppercase tracking-[0.4em] text-luxe-cyan mb-4 font-bold">
                Maturity Valuation
              </p>
              <div className="font-display text-5xl md:text-7xl text-white font-light leading-none tracking-tighter">
                <AnimatedValue value={maturity} />
              </div>
              <div className="flex items-center gap-3 mt-6">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-luxe-cyan opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-luxe-cyan"></span>
                </div>
                <p className="text-[10px] text-luxe-cyan/80 uppercase tracking-widest font-bold">
                  Real-time Data Processing
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 relative z-10">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="bg-white/[0.03] border border-white/5 p-6 rounded-2xl hover:bg-white/[0.06] transition-all duration-500 group"
                >
                  <p className="text-[9px] uppercase tracking-widest text-white/30 mb-3 group-hover:text-luxe-cyan transition-colors">
                    {s.label}
                  </p>
                  <p
                    className={`font-display text-xl ${s.highlight ? "text-luxe-cyan" : "text-white/80"}`}
                  >
                    {s.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-10 border-t border-white/10 relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="space-y-1">
                  <p className="text-[11px] text-white/40 uppercase tracking-widest">
                    Portfolio Growth
                  </p>
                  <p className="font-serif italic text-2xl text-white/80">
                    {multiplier.toFixed(1)}
                    <span className="text-luxe-cyan">x</span> Yield
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-white/40 uppercase tracking-widest">Efficiency</p>
                  <p className="font-serif italic text-2xl text-white/80">High</p>
                </div>
              </div>

              <a
                href="tel:+919616061166"
                className="btn-magnetic btn-luxe w-full py-5 rounded-2xl shadow-luxe group overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Secure Consultation
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <path
                      d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 opacity-40 grayscale group hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
          <div className="flex gap-12">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white mb-2">
                Assets Managed
              </p>
              <p className="font-display text-2xl text-luxe-cyan">₹500Cr+</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white mb-2">Annual Growth</p>
              <p className="font-display text-2xl text-luxe-cyan">18.4%</p>
            </div>
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white max-w-xs text-center md:text-right leading-relaxed">
            Truston Wealth Management Systems <br /> © 2024 Proprietary Algorithm
          </p>
        </div>
      </div>
    </section>
  );
}
