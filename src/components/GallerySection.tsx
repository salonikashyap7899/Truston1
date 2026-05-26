import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ZoomParallax } from "./ui/zoom-parallax";

const PARALLAX_IMAGES = [
  {
    src: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/hotel-lobby-interior-600x800.jpg",
    alt: "Grand Lobby",
  },
  {
    src: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/modern-interior-design-interior-600x800.jpg",
    alt: "Premium Interior",
  },
  {
    src: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/aerial-photography-chinese-city-600x800.jpg",
    alt: "Aerial Township",
  },
  {
    src: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/businessman-explaining-concept-details-600x800.jpg",
    alt: "Expert Consultation",
  },
  {
    src: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/webaliser-_TPTXZd9mOo-unsplash-1-1024x768.jpg",
    alt: "Plot Selling",
  },
  {
    src: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/april-pethybridge-nN28PjFOOLI-unsplash-scaled.jpg",
    alt: "Architecture & Design",
  },
  {
    src: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/avi-werde-hHz4yrvxwlA-unsplash-scaled.jpg",
    alt: "Construction Quality",
  },
];

export function GallerySection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5]);
  const lineScale = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <section
      id="gallery-section"
      className="relative bg-[#04090f] overflow-hidden"
    >
      {/* Ambient background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00BFFF]/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#004aad]/[0.04] rounded-full blur-[100px]" />
      </div>

      {/* Static Header with enhanced animations */}
      <div ref={headerRef} className="pt-24 pb-12 flex flex-col items-center relative z-20">
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="flex flex-col items-center"
        >
          {/* Eyebrow with animated lines */}
          <div className="flex items-center gap-4 mb-4 overflow-hidden">
            <motion.span 
              className="w-10 h-px bg-[#00BFFF] origin-right"
              style={{ scaleX: lineScale }}
            />
            <motion.p 
              className="text-[10px] uppercase tracking-[0.3em] text-[#00BFFF] font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Cinematic Gallery
            </motion.p>
            <motion.span 
              className="w-10 h-px bg-[#00BFFF] origin-left"
              style={{ scaleX: lineScale }}
            />
          </div>

          {/* Main heading with staggered reveal */}
          <motion.h2 
            className="text-white font-serif text-4xl md:text-6xl lg:text-7xl text-center mb-6 tracking-tighter"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Immersive{" "}
            <motion.em 
              className="italic text-[#00BFFF] font-light"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              Excellence
            </motion.em>
          </motion.h2>

          {/* Subtitle */}
          <motion.p 
            className="text-white/30 text-sm font-light tracking-[0.2em] uppercase mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Experience the TrustOn Portfolio
          </motion.p>

          {/* Animated scroll indicator line */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scaleY: 0 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-px h-24 bg-gradient-to-b from-[#00BFFF] to-transparent opacity-50" />
            <motion.div
              className="absolute top-0 left-0 w-px h-8 bg-[#00BFFF]"
              animate={{ y: [0, 64, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Zoom Parallax container with enhanced smoothness */}
      <div className="relative -mt-12">
        <ZoomParallax images={PARALLAX_IMAGES} />
      </div>

      {/* Bottom fade gradient for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#04090f] to-transparent pointer-events-none z-10" />
    </section>
  );
}
