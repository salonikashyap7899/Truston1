import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * WhoWeAreSection Component
 * Sobha-style curved floating card design with Truston bronze color scheme
 */

export function WhoWeAreSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section ref={ref} className="relative py-0 px-6 overflow-hidden bg-[var(--ink)]">
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(45,107,196,0.12) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Floating Card - Curved top */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative -mt-20 md:-mt-32 bg-white rounded-[60px] md:rounded-[80px] shadow-2xl overflow-hidden"
        >
          <div className="px-6 md:px-16 py-16 md:py-24">
            {/* Header */}
            <div className="mb-12 md:mb-16">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-xs tracking-widest uppercase text-[var(--bronze)] mb-4 flex items-center gap-3"
              >
                <span className="inline-block w-8 h-px bg-[var(--bronze)]" />
                Who We Are
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="font-serif text-4xl md:text-6xl font-light leading-tight text-[var(--ink)]"
              >
                Shaping <em className="italic text-[var(--bronze)]">Legacies</em>
                <br />
                in Lucknow
              </motion.h2>
            </div>

            {/* Content Grid */}
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 mb-12 md:mb-16">
              {/* Left: Text & Pillars */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="space-y-6"
              >
                <div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed">
                  <p className="font-light">
                    Truston Developers is a Lucknow-based property development company built on a single founding principle — that buying land should be simple, transparent, and deeply empowering for the buyer.
                  </p>
                  <p className="font-light">
                    We don't merely sell plots; we help you make one of the most significant decisions of your life with complete clarity, verified documentation, and a team that stands behind every commitment.
                  </p>
                </div>

                {/* Pillars */}
                <div className="space-y-5 mt-8 pt-6 border-t border-gray-200">
                  {[
                    {
                      num: "01",
                      name: "Transparent Documentation",
                      desc: "Clear title deeds, Jila Panchayat approvals, and zero hidden conditions at every stage.",
                    },
                    {
                      num: "02",
                      name: "High-Growth Locations",
                      desc: "Projects in proven growth corridors with verified infrastructure and long-term appreciation.",
                    },
                    {
                      num: "03",
                      name: "End-to-End Partnership",
                      desc: "From plot acquisition to construction and architecture — one trusted team, start to finish.",
                    },
                  ].map((pillar) => (
                    <motion.div
                      key={pillar.num}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + parseInt(pillar.num) * 0.1, duration: 0.6 }}
                      className="flex gap-4"
                    >
                      <div className="text-[var(--bronze)] font-serif text-xl md:text-2xl font-light flex-shrink-0 pt-0.5">
                        {pillar.num}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm md:text-base mb-1">
                          {pillar.name}
                        </p>
                        <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-light">
                          {pillar.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right: Visual Box */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="flex items-center justify-center"
              >
                <div className="relative w-full aspect-square">
                  {/* Decorative circles */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute w-64 h-64 rounded-full border-2 border-[var(--bronze)]/10" />
                    <div className="absolute w-48 h-48 rounded-full border border-[var(--bronze)]/20" />
                  </div>

                  {/* Content box */}
                  <div className="relative h-full bg-gradient-to-br from-[var(--bronze)]/8 to-[var(--bronze)]/3 rounded-3xl border border-[var(--bronze)]/15 flex items-center justify-center p-8">
                    <div className="text-center">
                      <motion.p
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="font-serif text-xl md:text-2xl italic text-gray-700 leading-relaxed"
                      >
                        "We build the foundation.<br />
                        You build the dream."
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="text-xs md:text-sm text-[var(--bronze)] mt-6 tracking-widest uppercase font-light"
                      >
                        Prime Estate · 2025
                      </motion.p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="grid grid-cols-3 gap-4 md:gap-8 border-t border-gray-200 pt-8 md:pt-12"
            >
              {[
                { num: "120+", label: "Total Plots" },
                { num: "47", label: "Still Available" },
                { num: "₹12L+", label: "Starting Price" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-serif text-3xl md:text-5xl font-light text-[var(--ink)]">
                    {stat.num}
                  </p>
                  <p className="text-[10px] md:text-xs uppercase tracking-widest text-gray-400 mt-2 md:mt-3 font-light">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
