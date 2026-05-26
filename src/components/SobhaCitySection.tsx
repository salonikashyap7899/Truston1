import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SplitTextReveal } from "./animations/SplitTextReveal";

export function SobhaCitySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.95]);
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[var(--ink)]"
      data-dark
    >
      {/* Parallax background image */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
        <img
          src="https://truston.advrtisinguru.com/wp-content/uploads/2026/04/hero-estate-600x800.jpg"
          alt=""
          className="w-full h-full object-cover opacity-30"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.08 0.015 250 / 0.7) 0%, oklch(0.10 0.02 250 / 0.85) 50%, oklch(0.08 0.015 250 / 0.95) 100%)",
          }}
        />
      </motion.div>

      {/* Floating 3D grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-white/10"
            style={{ left: `${(i + 1) * 16}%` }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>

      <motion.div
        style={{ y: textY, opacity, scale }}
        className="relative z-10 text-center px-6 md:px-16 max-w-5xl mx-auto py-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <motion.div
            style={{ width: lineWidth }}
            className="h-px bg-[var(--bronze)] max-w-[120px]"
          />
          <span className="text-[10px] uppercase tracking-[0.35em] text-[var(--bronze)]">
            Flagship Township
          </span>
          <motion.div
            style={{ width: lineWidth }}
            className="h-px bg-[var(--bronze)] max-w-[120px]"
          />
        </motion.div>

        <SplitTextReveal
          type="characters"
          delay={0.02}
          text={
            <h2 className="font-display text-[clamp(3.5rem,12vw,9rem)] font-light text-white leading-[0.9] tracking-tight">
              Prime Estate
            </h2>
          }
        />

        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 text-xl md:text-2xl font-serif italic text-white/60 font-light"
        >
          A Township Planned with Precision
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-8 text-white/50 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-light"
        >
          At TrustOn, we understand that true excellence lies in meticulous attention to detail. We
          craft not just plots, but immersive living experiences where every nuance is thoughtfully
          considered — from verified documentation to world-class amenities.
        </motion.p>
      </motion.div>

      {/* Bottom scroll fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[var(--ink)] to-transparent pointer-events-none" />
    </section>
  );
}
