import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SwipeReveal } from "./TextReveal";
import { Reveal } from "./Reveal";
import { Section3DBackground } from "./Section3DBackground";
import { usePageContent } from "@/hooks/usePageContent";

export function IntroHighlightSection() {
  const c = usePageContent("home.new_generation", {
    eyebrow: "New Generation",
    title: "Modern",
    title_accent: "Living",
    subtitle: "Real Estate",
    body: "Welcome to the era of TrustOn, where we blend cinematic storytelling with architectural excellence. Our mission is to create billion-dollar luxury experiences that transcend traditional real estate.",
    body_secondary: "From interactive 3D environments to immersive lifestyle offerings, every detail is crafted for the elite.",
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  // Using paths relative to public folder
  const images = [
    "/assets/green-amenities.jpg",
    "/assets/photo_2.jpg",
    "/assets/photo_3.jpg",
    "/assets/photo_4.jpg"
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[80vh] flex items-center justify-center py-24 px-6 overflow-hidden bg-background"
    >
      <Section3DBackground opacity={0.25} />

      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-luxe-blue/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-luxe-cyan/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Visual Side — Simple Circle Grid */}
          <motion.div style={{ scale, y: y1 }} className="relative flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4 relative">
              {/* Main Image - Circle 1 */}
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-[#00BFFF]/30 shadow-[0_0_30px_rgba(0,191,255,0.2)]">
                <img src={images[0]} className="w-full h-full object-cover" alt="Prime Estate 1" />
              </div>
              {/* Image 2 - Circle 2 */}
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-[#00BFFF]/20 mt-8 shadow-[0_0_20px_rgba(0,191,255,0.1)]">
                <img src={images[1]} className="w-full h-full object-cover" alt="Prime Estate 2" />
              </div>
              {/* Image 3 - Circle 3 */}
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-[#00BFFF]/20 -mt-8 shadow-[0_0_20px_rgba(0,191,255,0.1)]">
                <img src={images[2]} className="w-full h-full object-cover" alt="Prime Estate 3" />
              </div>
              {/* Image 4 - Circle 4 */}
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-[#00BFFF]/30 shadow-[0_0_30px_rgba(0,191,255,0.2)]">
                <img src={images[3]} className="w-full h-full object-cover" alt="Prime Estate 4" />
              </div>
              
              {/* Center Accent Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-28 md:h-28 rounded-full bg-[#00BFFF]/10 backdrop-blur-md border border-[#00BFFF]/40 flex items-center justify-center z-10">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-[#00BFFF]/60 animate-ping" />
              </div>
            </div>

            <motion.div
              style={{ y: y2 }}
              className="absolute -bottom-8 -right-4 lg:-right-8 glass-premium p-6 lg:p-8 rounded-2xl max-w-[200px] lg:max-w-xs shadow-luxe border-white/10 z-20"
            >
              <div className="text-[#00BFFF] text-[10px] uppercase tracking-[0.3em] mb-3 font-bold">Innovation</div>
              <p className="text-white/60 text-xs lg:text-sm leading-relaxed font-light">
                Pioneering futuristic living through architectural mastery.
              </p>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <div className="space-y-12">
            <Reveal>
              <div className="flex items-center gap-4 mb-4">
                <span className="w-12 h-px bg-luxe-cyan" />
                <span className="text-luxe-cyan text-xs uppercase tracking-[0.4em] font-bold">
                  {c.eyebrow || "New Generation"}
                </span>
              </div>
            </Reveal>

            <SwipeReveal>
              <h2 className="font-serif leading-tight tracking-tight">
                <span className="block text-4xl md:text-5xl lg:text-6xl text-white font-light uppercase tracking-widest">
                  {c.title || "Modern"}
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl text-[#00BFFF] font-light italic mt-2">
                  {c.title_accent || "Living"}
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl text-white/40 font-light mt-2">
                  {c.subtitle || "Real Estate"}
                </span>
              </h2>
            </SwipeReveal>

            <Reveal delay={0.3}>
              <div className="space-y-6 text-white/50 text-lg lg:text-xl font-light leading-relaxed">
                <p>{c.body || "Welcome to the era of TrustOn, where we blend cinematic storytelling with architectural excellence."}</p>
                <p>{c.body_secondary || "From interactive 3D environments to immersive lifestyle offerings, every detail is crafted for the elite."}</p>
              </div>
            </Reveal>

            <Reveal delay={0.5}>
              <button className="btn-magnetic btn-luxe px-12">Discover Our Vision</button>
            </Reveal>
          </div>
        </div>
      </div>

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
