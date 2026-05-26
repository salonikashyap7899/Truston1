import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ZoomParallax } from "./ui/zoom-parallax";

const PARALLAX_IMAGES = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_1_2026-05-25_19-38-16-2xLo5BGzYgTB2WhGtDVtpfhhs6Eyuf.jpg",
    alt: "Prime Estate - Main Entrance",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2_2026-05-25_19-38-16-1qytWEiBDD2zpBMGHDzaktRHetBxXp.jpg",
    alt: "Modern Residential Villas",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_3_2026-05-25_19-38-16-WISs3ebxL9FqkIpokhI7LPQwQn1TgL.jpg",
    alt: "Residential Street View",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_4_2026-05-25_19-38-16-GSJIWS7vJOoTWvqNgmX3C9UBQCHkXk.jpg",
    alt: "Premium Row Houses",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5_2026-05-25_19-38-16-X6Q1I0ZnsXrnRVo8JT1Tpql22uVZ1f.jpg",
    alt: "Modern Building Exterior",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_6_2026-05-25_19-38-16-cHiw0fhYcgbwPjPSIWj74OMTpscaTT.jpg",
    alt: "Community Amenities & Parks",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_7_2026-05-25_19-38-16-LD1IHVG0q7n8pPcBM4dxBLCu00JRYo.jpg",
    alt: "Aerial Township Overview",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_8_2026-05-25_19-38-16-wMliSfU4l5PLFiUlOMWYi9ZzNvERfA.jpg",
    alt: "Prime Estate Gate 02",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-05-25_23-25-53-EUpd8pbrTS9Wb2OQCPgfPK1qro6Zdb.jpg",
    alt: "Master Plan Layout",
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
              Prime Estate Portfolio
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
            Where Imagination{" "}
            <motion.em 
              className="italic text-[#00BFFF] font-light"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              Takes Shape
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
            Crafted for those who expect nothing less than exceptional living
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
