import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, SectionEyebrow } from "./Reveal";
import { Section3DBackground } from "./Section3DBackground";

export function PlotsAndStructures() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section
      ref={containerRef}
      className="relative py-32 px-6 bg-background overflow-hidden"
    >
      <Section3DBackground opacity={0.2} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <div className="order-2 lg:order-1">
            <SectionEyebrow>Strategic Masterpieces</SectionEyebrow>
            <Reveal>
              <h2 className="text-5xl md:text-7xl font-serif text-white mt-4 mb-8">
                Building <em className="text-luxe-cyan italic">Plots & Structures</em>
              </h2>
            </Reveal>

            <div className="space-y-8 text-white/50 text-lg font-light leading-relaxed">
              <Reveal delay={0.2}>
                <p>
                  Discover the ultimate foundation for your architectural dreams. Our premium building plots are strategically located in Lucknow's most promising corridors, offering 100% legal clearance and Jila Panchayat approval.
                </p>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="grid grid-cols-2 gap-8 pt-8">
                  <div className="border-l border-luxe-cyan/30 pl-6">
                    <p className="text-3xl font-display text-white mb-2">150+</p>
                    <p className="text-[10px] uppercase tracking-widest font-bold">Premium Plots</p>
                  </div>
                  <div className="border-l border-luxe-cyan/30 pl-6">
                    <p className="text-3xl font-display text-white mb-2">Elite</p>
                    <p className="text-[10px] uppercase tracking-widest font-bold">Architectural Support</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Visual Side */}
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
            <motion.div style={{ y: y1 }} className="pt-12">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 group">
                <img
                  src="/attached_assets/image_1779122082796.png"
                  alt="Modern House Structure"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <p className="text-white text-xs uppercase tracking-widest">Architectural Vision</p>
                </div>
              </div>
            </motion.div>

            <motion.div style={{ y: y2 }}>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 group">
                <img
                  src="/attached_assets/image_1779159211927.png"
                  alt="Plot Aerial View"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <p className="text-white text-xs uppercase tracking-widest">Strategic Location</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
