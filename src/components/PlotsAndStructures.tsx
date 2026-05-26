import { motion } from "framer-motion";
import { Reveal, SectionEyebrow } from "./Reveal";
import { Section3DBackground } from "./Section3DBackground";
import { Home } from "lucide-react";

export function PlotsAndStructures() {
  return (
    <section className="relative py-24 md:py-32 bg-[#060c16] overflow-hidden">
      <Section3DBackground opacity={0.12} />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,191,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,191,255,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content Side */}
          <div className="order-2 lg:order-1">
            <SectionEyebrow>Strategic Masterpieces</SectionEyebrow>
            
            <Reveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-white mt-6 mb-8 leading-[1.05] tracking-tight">
                Building{" "}
                <em className="text-[#00BFFF] italic font-light">Plots &</em>
                <br />
                <em className="text-[#00BFFF] italic font-light">Structures</em>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10 max-w-lg font-light">
                Discover the ultimate foundation for your architectural dreams. Our premium building
                plots are strategically located in Lucknow&apos;s most promising corridors, offering
                100% legal clearance and Jila Panchayat approval.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex items-stretch gap-8 md:gap-12">
                <div className="border-l-2 border-[#00BFFF]/50 pl-5">
                  <p className="text-3xl md:text-4xl font-serif text-white mb-1 leading-none">150+</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 mt-2">
                    Premium Plots
                  </p>
                </div>
                <div className="border-l-2 border-[#00BFFF]/50 pl-5">
                  <p className="text-3xl md:text-4xl font-serif text-white mb-1 leading-none">Elite</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 mt-2">
                    Architectural Support
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Image Side */}
          <div className="order-1 lg:order-2 relative">
            {/* Main Image Container */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Decorative frame/border */}
              <div className="absolute -inset-4 border border-[#00BFFF]/10 rounded-3xl pointer-events-none" />
              <div className="absolute -inset-8 border border-[#00BFFF]/5 rounded-3xl pointer-events-none" />

              {/* Image wrapper */}
              <div className="relative rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                {/* Label badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="px-4 py-2 bg-[#04090f]/80 backdrop-blur-sm border border-[#00BFFF]/20 rounded-full">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-[#00BFFF] font-bold">
                      Prime Estate · Lucknow
                    </p>
                  </div>
                </div>

                {/* Main plot image */}
                <div className="aspect-[4/3] md:aspect-[16/10]">
                  <img
                    src="/images/plot-layout.jpg"
                    alt="Prime Estate Plot Layout"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060c16]/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#060c16]/20 via-transparent to-transparent pointer-events-none" />

                {/* Grid lines overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.08]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(0,191,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,191,255,1) 1px, transparent 1px)",
                    backgroundSize: "50px 50px",
                  }}
                />

                {/* Floating dots/markers for visual effect */}
                <motion.div
                  className="absolute top-1/3 left-1/4 w-2 h-2 bg-[#00BFFF] rounded-full"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-[#00BFFF] rounded-full"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                />
              </div>

              {/* Floating home icon badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:-left-6 lg:top-1/2 lg:-translate-y-1/2"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 bg-[#00BFFF] rounded-2xl flex items-center justify-center shadow-xl shadow-[#00BFFF]/20">
                  <Home className="w-7 h-7 md:w-8 md:h-8 text-[#04090f]" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00BFFF]/20 to-transparent" />
    </section>
  );
}
