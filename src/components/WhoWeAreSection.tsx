import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";
import { Section3DBackground } from "./Section3DBackground";

export function WhoWeAreSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.1, 0.1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background overflow-hidden"
    >
      <Section3DBackground opacity={0.2} />

      {/* Background Overlay */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://truston.advrtisinguru.com/wp-content/uploads/2026/04/aerial-photography-chinese-city-600x800.jpg"
          alt="Architectural Visual"
          className="w-full h-full object-cover brightness-50 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-ink/90 to-background" />
      </motion.div>

      {/* Container Scroll Animation */}
      <div className="relative z-10">
        <ContainerScroll
          titleComponent={
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex items-center gap-4 mb-6"
              >
                <span className="w-12 h-px bg-luxe-cyan" />
                <span className="text-luxe-cyan text-xs uppercase tracking-[0.4em] font-medium">
                  The Heritage
                </span>
                <span className="w-12 h-px bg-luxe-cyan" />
              </motion.div>

              <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-4">
                Architecting{" "}
                <em className="text-luxe-cyan italic">the Future</em>
              </h2>
              <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mt-4 font-light">
                TrustOn is not just a developer; we are creators of architectural
                masterpieces that stand as a testament to futuristic luxury.
              </p>
            </div>
          }
        >
          {/* Content Card Inside the Scroll Animation */}
          <div className="h-full w-full bg-gradient-to-br from-[var(--ink)] via-[#1a1a2e] to-[var(--ink)] p-6 md:p-10 flex flex-col justify-between overflow-auto">
            {/* Top Section - Main Content */}
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-display text-white">
                    Uncompromising Standards
                  </h3>
                  <p className="text-white/50 text-sm md:text-base leading-relaxed">
                    Our commitment to excellence is reflected in every detail,
                    from the selection of premium materials to the integration
                    of cutting-edge technology. Every project we undertake is a
                    cinematic journey.
                  </p>

                  <ul className="space-y-3 mt-6">
                    {[
                      "Cinematic Architectural Design",
                      "Futuristic Smart Living",
                      "Elite Gated Communities",
                      "Sustainable Master Planning",
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="flex items-center gap-3 text-white/70 text-xs md:text-sm font-medium uppercase tracking-widest"
                      >
                        <span className="w-2 h-2 rounded-full bg-luxe-cyan" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Right Column - Stats */}
                <div className="flex flex-col justify-center space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { value: "Billion+", label: "Portfolio Value" },
                      { value: "Elite", label: "Client Network" },
                      { value: "150+", label: "Premium Plots" },
                      { value: "100%", label: "Legal Clearance" },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-6 text-center hover:border-luxe-cyan/30 transition-colors duration-500"
                      >
                        <div className="text-2xl md:text-3xl font-display text-luxe-cyan mb-2">
                          {stat.value}
                        </div>
                        <div className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/40 font-bold">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section - CTA */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-white/40 text-xs md:text-sm text-center md:text-left">
                Creating environments that evoke emotion and inspire greatness.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-luxe-cyan/10 border border-luxe-cyan/30 text-luxe-cyan text-xs uppercase tracking-widest font-bold rounded-full hover:bg-luxe-cyan/20 transition-colors duration-300 flex items-center gap-2"
              >
                Explore Legacy
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </ContainerScroll>
      </div>
    </section>
  );
}
