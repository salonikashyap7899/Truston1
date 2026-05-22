import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SwipeReveal } from "./TextReveal";
import { Section3DBackground } from "./Section3DBackground";

export function WhoWeAreSection() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const glassY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen py-24 px-6 overflow-hidden flex items-center bg-background"
    >
      <Section3DBackground opacity={0.3} />

      {/* Background Architectural Visual */}
      <motion.div style={{ y: bgY, opacity: 0.1 }} className="absolute inset-0 z-0">
        <img
          src="https://truston.advrtisinguru.com/wp-content/uploads/2026/04/aerial-photography-chinese-city-600x800.jpg"
          alt="Architectural Visual"
          className="w-full h-full object-cover brightness-50 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-ink/90 to-background" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Storytelling Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div className="flex items-center gap-4 mb-8">
            <span className="w-12 h-px bg-luxe-cyan" />
            <span className="text-luxe-cyan text-xs uppercase tracking-[0.4em] font-medium">
              The Heritage
            </span>
          </motion.div>

          <SwipeReveal>
            <h2 className="typography-section-title text-white mb-8">
              Architecting <br />
              <em className="text-luxe-cyan italic font-serif">the Future</em> of Luxury
            </h2>
          </SwipeReveal>

          <div className="space-y-6 text-white/80 text-lg font-light leading-relaxed max-w-xl">
            <p>
              TrustOn is not just a developer; we are creators of architectural masterpieces that
              stand as a testament to futuristic luxury and timeless elegance.
            </p>
            <p>
              Every project we undertake is a cinematic journey, blending world-class design with
              meticulous craftsmanship to create environments that evoke emotion and inspire
              greatness.
            </p>
          </div>

          <motion.div
            className="mt-12 flex gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div>
              <div className="text-3xl font-display text-luxe-cyan mb-1">Billion+</div>
              <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                Portfolio Value
              </div>
            </div>
            <div>
              <div className="text-3xl font-display text-luxe-cyan mb-1">Elite</div>
              <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                Client Network
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: Floating Glass Cards */}
        <div className="relative h-[600px] flex items-center justify-center">
          <motion.div
            style={{ y: glassY }}
            className="relative z-20 w-full max-w-md"
            whileHover={{ rotateY: -10, rotateX: 10, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="glass-premium p-12 rounded-3xl relative overflow-hidden group border border-white/10 shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-luxe-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <h3 className="font-display text-3xl text-white mb-6">Uncompromising Standards</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                Our commitment to excellence is reflected in every detail, from the selection of
                premium materials to the integration of cutting-edge technology.
              </p>

              <ul className="space-y-4">
                {[
                  "Cinematic Architectural Design",
                  "Futuristic Smart Living",
                  "Elite Gated Communities",
                  "Sustainable Master Planning",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-3 text-white/80 text-xs font-medium uppercase tracking-widest"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-luxe-cyan" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            animate={{
              y: [0, -30, 0],
              rotate: [0, 5, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-64 h-64 glass-premium rounded-full blur-3xl opacity-20 bg-luxe-cyan"
          />
          <motion.div
            animate={{
              y: [0, 30, 0],
              rotate: [0, -5, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 w-80 h-80 glass-premium rounded-full blur-3xl opacity-10 bg-luxe-blue"
          />
        </div>
      </div>
    </section>
  );
}
