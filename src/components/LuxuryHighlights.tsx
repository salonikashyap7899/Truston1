import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Reveal, SectionEyebrow } from "./Reveal";
import { Section3DBackground } from "./Section3DBackground";

function AnimatedNumber({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {current}
      {suffix}
    </span>
  );
}

const highlights = [
  {
    number: 150,
    suffix: "+",
    label: "Premium Plots",
    description: "Jila Panchayat approved residential plots in Lucknow's fastest-growing corridor",
    icon: "🏡",
    delay: 0,
  },
  {
    number: 500,
    suffix: "+",
    label: "Happy Families",
    description: "Trusted by hundreds of homeowners and investors across Uttar Pradesh",
    icon: "👨‍👩‍👧‍👦",
    delay: 0.1,
  },
  {
    number: 10,
    suffix: "+",
    label: "Years of Trust",
    description: "A decade of delivering transparent, high-quality real estate solutions",
    icon: "🏆",
    delay: 0.2,
  },
  {
    number: 100,
    suffix: "%",
    label: "Clear Title Deeds",
    description: "Every plot comes with verified documentation and zero hidden conditions",
    icon: "📜",
    delay: 0.3,
  },
];

export function LuxuryHighlights() {
  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden bg-background">
      <Section3DBackground opacity={0.2} />

      {/* Background luxury blue glow orbs */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.1]"
        style={{ background: "radial-gradient(circle, var(--luxe-cyan), transparent)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.08]"
        style={{ background: "radial-gradient(circle, var(--luxe-blue), transparent)" }}
      />

      <div className="relative mx-auto max-w-7xl z-10">
        {/* Section Header */}
        <Reveal>
          <SectionEyebrow>Billion Dollar Standards</SectionEyebrow>
          <h2 className="font-display text-5xl md:text-7xl text-center leading-none mb-6 max-w-4xl mx-auto text-white tracking-tight">
            Built on <em className="text-luxe-cyan italic font-serif">Trust & Excellence</em>
          </h2>
          <p className="text-center text-white/40 max-w-2xl mx-auto mb-20 text-lg leading-relaxed font-light">
            Prime Estate by TrustOn — where every number tells a story of commitment, quality, and
            lasting value.
          </p>
        </Reveal>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, idx) => (
            <Reveal key={item.label} delay={item.delay}>
              <motion.div
                whileHover={{
                  y: -12,
                  scale: 1.03,
                }}
                animate={{ y: [0, -6, 0] }}
                transition={{
                  y: {
                    duration: 4 + idx * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.4,
                  },
                  hover: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] },
                }}
                className="group relative glass-premium rounded-[32px] p-10 border border-white/5 hover:border-luxe-cyan/30 transition-all duration-500 cursor-default overflow-hidden h-full"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Blue gradient top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: "var(--gradient-luxe)",
                  }}
                />

                {/* Icon */}
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500 origin-left">
                  {item.icon}
                </div>

                {/* Number */}
                <div className="font-display text-5xl md:text-6xl font-bold mb-4 gradient-luxe-text tracking-tighter">
                  <AnimatedNumber to={item.number} suffix={item.suffix} />
                </div>

                {/* Label */}
                <p className="font-display text-2xl text-white mb-4 group-hover:text-luxe-cyan transition-colors duration-300">
                  {item.label}
                </p>

                {/* Description */}
                <p className="text-sm text-white/40 leading-relaxed font-light">
                  {item.description}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left bg-luxe-cyan" />
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <Reveal delay={0.4}>
          <div className="mt-24 text-center">
            <button className="btn-magnetic btn-luxe px-12 py-5">
              Explore Prime Estate
              <span className="ml-3">→</span>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
