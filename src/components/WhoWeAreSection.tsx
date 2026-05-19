import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * WhoWeAreSection Component
 * Sobha-style curved floating card design with parallax background image
 * Features a large curved white card overlaying a background image with scrolling parallax effect
 */

export function WhoWeAreSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  // Parallax effect for background image
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  // Subtle parallax for the card
  const cardY = useTransform(scrollYProgress, [0, 1], ["60px", "-60px"]);

  return (
    <section ref={ref} className="relative py-0 px-6 overflow-hidden bg-white">
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="https://truston.advrtisinguru.com/wp-content/uploads/2026/04/aerial-photography-chinese-city-600x800.jpg"
          alt="Prime Estate aerial view"
          className="w-full h-full object-cover"
        />
        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
      </motion.div>

      {/* Content Container */}
      <div className="relative mx-auto max-w-7xl py-24 md:py-32">
        {/* Large Curved White Card */}
        <motion.div
          style={{ y: cardY }}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative ml-0 md:ml-12 max-w-2xl bg-white rounded-[80px] md:rounded-[120px] shadow-2xl overflow-hidden"
        >
          <div className="px-8 md:px-16 py-16 md:py-24">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="inline-block w-8 h-px bg-[var(--bronze)]" />
              <p className="text-xs tracking-widest uppercase text-[var(--bronze)] font-light">
                Who We Are
              </p>
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="font-serif text-4xl md:text-5xl font-light leading-tight text-[var(--ink)] mb-8"
            >
              The Art <br />
              <em className="italic text-[var(--bronze)] not-italic">of Detail</em>
            </motion.h2>

            {/* Description Text */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="space-y-5 mb-10"
            >
              <p className="font-serif text-lg md:text-xl italic text-gray-700 leading-relaxed">
                At TrustOn Developers, we understand that true excellence lies in the meticulous attention to detail and the artistry of craftsmanship.
              </p>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed font-light">
                Guided by a commitment to perfection, we believe in crafting not just properties but immersive experiences where every nuance is thoughtfully considered. From transparent documentation to high-growth locations, we ensure your investment is secure, appreciated, and built to last.
              </p>
            </motion.div>

            {/* Key Points / Pillars */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="space-y-4 border-t border-gray-200 pt-8"
            >
              {[
                {
                  num: "01",
                  title: "Transparent Documentation",
                  desc: "Clear title deeds, Jila Panchayat approvals, and zero hidden conditions.",
                },
                {
                  num: "02",
                  title: "High-Growth Locations",
                  desc: "Projects in proven growth corridors with verified infrastructure.",
                },
                {
                  num: "03",
                  title: "End-to-End Partnership",
                  desc: "From acquisition to construction — one trusted team, start to finish.",
                },
              ].map((point, idx) => (
                <motion.div
                  key={point.num}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.55 + idx * 0.08, duration: 0.6 }}
                  className="flex gap-4"
                >
                  <div className="text-[var(--bronze)] font-serif text-lg md:text-xl font-light flex-shrink-0 pt-0.5">
                    {point.num}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm md:text-base mb-1">
                      {point.title}
                    </p>
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-light">
                      {point.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="mt-10 pt-8 border-t border-gray-200"
            >
              <button className="inline-flex items-center gap-2 text-[var(--bronze)] text-xs md:text-sm uppercase tracking-widest font-semibold hover:gap-3 transition-all duration-300">
                Learn More About TrustOn
                <span>→</span>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
