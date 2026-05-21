import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Reveal, SectionEyebrow } from "@/components/Reveal";

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
    <section className="relative py-24 md:py-32 px-6 overflow-hidden bg-gradient-to-b from-[var(--cream)] via-white to-[var(--sand)]">
      {/* Background warm luxury glow orbs */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none opacity-[0.06]"
        style={{ background: "radial-gradient(circle, var(--gold), transparent)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none opacity-[0.05]"
        style={{ background: "radial-gradient(circle, var(--bronze), transparent)" }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <Reveal>
          <SectionEyebrow>Why Choose TrustOn</SectionEyebrow>
          <h2 className="font-display text-4xl md:text-6xl text-center leading-tight mb-4 max-w-3xl mx-auto">
            Built on <em className="gradient-bronze-text not-italic">Trust & Excellence</em>
          </h2>
          <p className="text-center text-foreground/50 max-w-xl mx-auto mb-16 text-base leading-relaxed">
            Prime Estate by TrustOn — where every number tells a story of commitment, quality, and
            lasting value.
          </p>
        </Reveal>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => (
            <Reveal key={item.label} delay={item.delay}>
              <motion.div
                whileHover={{
                  y: -12,
                  scale: 1.03,
                  boxShadow:
                    "0 40px 80px -20px rgba(45,107,196,0.25), 0 0 0 1px rgba(45,107,196,0.1)",
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
                className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-[var(--bronze)]/30 transition-colors duration-500 cursor-default overflow-hidden"
                style={{
                  boxShadow: "0 15px 45px -20px rgba(0,0,0,0.08)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Bronze gradient top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "var(--gradient-bronze)",
                  }}
                />

                {/* Icon */}
                <div className="text-4xl mb-4">{item.icon}</div>

                {/* Number */}
                <div className="font-display text-5xl md:text-6xl font-bold mb-2 gradient-bronze-text">
                  <AnimatedNumber to={item.number} suffix={item.suffix} />
                </div>

                {/* Label */}
                <p className="font-semibold text-[var(--ink)] text-lg mb-3 group-hover:text-[var(--bronze)] transition-colors duration-300">
                  {item.label}
                </p>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ background: "var(--bronze)" }}
                />
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <Reveal delay={0.4}>
          <div className="mt-16 text-center">
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-[var(--bronze)] text-white px-10 py-4 text-[11px] uppercase tracking-widest font-semibold hover:opacity-90 transition-all duration-300 shadow-lg"
            >
              Explore Prime Estate
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
