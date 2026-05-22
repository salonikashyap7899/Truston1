import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SwipeReveal } from "./TextReveal";
import { Reveal } from "./Reveal";
import { Section3DBackground } from "./Section3DBackground";

export function IntroHighlightSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[80vh] flex items-center justify-center py-24 px-6 overflow-hidden bg-background"
    >
      <Section3DBackground opacity={0.25} />

      {/* Cinematic Background Elements */}
      <motion.div style={{ opacity }} className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-luxe-blue/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-luxe-cyan/5 rounded-full blur-[150px]" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Visual Side */}
          <motion.div style={{ scale, y: y1 }} className="relative aspect-[4/5] lg:aspect-square">
            <div className="absolute inset-0 border border-white/10 rounded-3xl transform rotate-3 scale-105" />
            <div className="absolute inset-0 border border-luxe-cyan/20 rounded-3xl transform -rotate-3 scale-105" />
            <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-luxe">
              <img
                src="https://truston.advrtisinguru.com/wp-content/uploads/2026/04/aerial-photography-chinese-city-600x800.jpg"
                alt="Visionary Architecture"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
            </div>

            {/* Floating Detail Card */}
            <motion.div
              style={{ y: y2 }}
              className="absolute -bottom-12 -right-6 lg:-right-12 glass-premium p-10 rounded-3xl max-w-xs shadow-luxe border-white/10"
            >
              <div className="text-luxe-cyan text-xs uppercase tracking-[0.3em] mb-4 font-bold">
                Innovation
              </div>
              <p className="text-white/60 text-sm leading-relaxed font-light">
                Pioneering futuristic living through architectural mastery and sustainable
                development.
              </p>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <div className="space-y-12">
            <Reveal>
              <div className="flex items-center gap-4 mb-4">
                <span className="w-12 h-px bg-luxe-cyan" />
                <span className="text-luxe-cyan text-xs uppercase tracking-[0.4em] font-bold">
                  New Generation
                </span>
              </div>
            </Reveal>

            <SwipeReveal>
              <h2 className="font-display text-white text-6xl lg:text-8xl leading-[0.9] tracking-tighter">
                Redefining <br />
                <span className="text-luxe-cyan italic font-serif">Luxury</span> Real Estate
              </h2>
            </SwipeReveal>

            <Reveal delay={0.3}>
              <div className="space-y-6 text-white/50 text-lg lg:text-xl font-light leading-relaxed">
                <p>
                  Welcome to the era of TrustOn, where we blend cinematic storytelling with
                  architectural excellence. Our mission is to create billion-dollar luxury
                  experiences that transcend traditional real estate.
                </p>
                <p>
                  From interactive 3D environments to immersive lifestyle offerings, every detail is
                  crafted for the elite.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.5}>
              <button className="btn-magnetic btn-luxe px-12">Discover Our Vision</button>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Decorative Floating Text */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-1/2 -left-24 -translate-y-1/2 rotate-90 pointer-events-none opacity-[0.03]"
      >
        <span className="text-[12rem] font-display text-white whitespace-nowrap uppercase tracking-tighter">
          Truston Empire
        </span>
      </motion.div>
    </section>
  );
}
