import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, SwipeReveal } from "@/components/Reveal";
import { usePageContent } from "@/hooks/usePageContent";

export function NewGenerationLivingSection() {
  const content = usePageContent("home.new_generation_living", {
    eyebrow: "New Generation",
    title: "Modern",
    title_accent: "Living",
    subtitle: "Real Estate",
    body: "everyday living are seamlessly connected.",
    body_secondary: "Planned around walkability and choice, the community brings together marina living, beach-inspired experiences, and forest-led neighbourhoods within one integrated city. Living options range from 1 and 2-bedroom residences to expansive 4 to 6 bedroom villas, thoughtfully positioned to offer privacy, openness, and connection to the surrounding landscape.",
    body_tertiary: "With intuitively placed amenities, expansive green corridors, and architecture shaped by context and",
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  // Prime Estate images - using paths relative to public folder
  const images = [
    "/assets/photo_1.jpg",
    "/assets/photo_2.jpg",
    "/assets/photo_3.jpg",
    "/assets/photo_4.jpg"
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-20 md:py-32 px-6 bg-[#050b14] overflow-hidden"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00BFFF]/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00BFFF]/3 rounded-full blur-[80px]" />
      </div>

      {/* Subtle top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00BFFF]/30 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* ── Left: Text Content ── */}
          <div className="space-y-8">
            {/* Eyebrow */}
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-[#00BFFF]" />
                <p className="text-[10px] uppercase tracking-[0.5em] text-[#00BFFF] font-bold">
                  {content.eyebrow}
                </p>
              </div>
            </Reveal>

            {/* Main Heading */}
            <SwipeReveal>
              <h2 className="font-serif leading-tight tracking-tight">
                <span className="block text-4xl md:text-5xl lg:text-6xl text-white font-light">
                  {content.title}
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl text-[#00BFFF] font-light italic mt-2">
                  {content.title_accent}
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl text-white/40 font-light mt-2">
                  {content.subtitle}
                </span>
              </h2>
            </SwipeReveal>

            {/* Divider */}
            <div className="w-16 h-px bg-[#00BFFF]/30" />

            {/* Body Text */}
            <Reveal delay={0.2}>
              <div className="space-y-6 text-white/60 text-base md:text-lg leading-relaxed font-light">
                <p>
                  <span className="text-white/80">{content.body}</span>
                </p>
                <p>
                  {content.body_secondary}
                </p>
                <p className="text-white/50">
                  {content.body_tertiary}
                </p>
              </div>
            </Reveal>

            {/* CTA Button */}
            <Reveal delay={0.4}>
              <button className="px-8 py-3 bg-[#00BFFF] text-[#04090f] text-sm uppercase tracking-[0.2em] font-bold rounded-full hover:scale-105 transition-all duration-500">
                Explore Living Options
              </button>
            </Reveal>
          </div>

          {/* ── Right: Zigzag Circle Grid ── */}
          <motion.div 
            style={{ scale, y: y1 }} 
            className="relative flex items-center justify-center"
          >
            <div className="grid grid-cols-2 gap-4 relative">
              {/* Main Image - Circle 1 (Large) */}
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-[#00BFFF]/30 shadow-[0_0_30px_rgba(0,191,255,0.2)]">
                <img 
                  src={images[0]} 
                  className="w-full h-full object-cover" 
                  alt="Prime Estate 1" 
                />
              </div>

              {/* Image 2 - Circle 2 (Small, offset down) */}
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-[#00BFFF]/20 mt-8 shadow-[0_0_20px_rgba(0,191,255,0.1)]">
                <img 
                  src={images[1]} 
                  className="w-full h-full object-cover" 
                  alt="Prime Estate 2" 
                />
              </div>

              {/* Image 3 - Circle 3 (Small, offset up) */}
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-[#00BFFF]/20 -mt-8 shadow-[0_0_20px_rgba(0,191,255,0.1)]">
                <img 
                  src={images[2]} 
                  className="w-full h-full object-cover" 
                  alt="Prime Estate 3" 
                />
              </div>

              {/* Image 4 - Circle 4 (Large) */}
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-[#00BFFF]/30 shadow-[0_0_30px_rgba(0,191,255,0.2)]">
                <img 
                  src={images[3]} 
                  className="w-full h-full object-cover" 
                  alt="Prime Estate 4" 
                />
              </div>

              {/* Center Accent Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-28 md:h-28 rounded-full bg-[#00BFFF]/10 backdrop-blur-md border border-[#00BFFF]/40 flex items-center justify-center z-10">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-[#00BFFF]/60 animate-ping" />
              </div>
            </div>

            {/* Floating info badge */}
            <motion.div
              style={{ y: y2 }}
              className="absolute -bottom-8 -right-4 lg:-right-8 bg-[#050b14] border border-[#00BFFF]/25 rounded-2xl px-6 py-4 shadow-xl backdrop-blur-xl z-20"
            >
              <p className="font-serif text-lg text-[#00BFFF] leading-none mb-1">
                Premium Living
              </p>
              <p className="text-[9px] uppercase tracking-[0.35em] text-white/35 font-bold">
                1-6 Bedroom Options
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Subtle bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
}
