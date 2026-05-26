import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const GALLERY_IMAGES = [
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
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Horizontal scroll transform - moves from right to left as user scrolls down
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-60%"]);

  return (
    <section
      id="gallery-section"
      ref={containerRef}
      className="relative bg-[#04090f] overflow-hidden py-20 md:py-32"
    >
      {/* Header */}
      <div className="px-6 md:px-16 max-w-7xl mx-auto mb-12 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="w-10 h-px bg-[#00BFFF]" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#00BFFF] font-bold">
              Cinematic Gallery
            </p>
          </div>
          <h2 className="text-white font-serif text-4xl md:text-6xl lg:text-7xl mb-6 tracking-tighter">
            Immersive <em className="italic text-[#00BFFF] font-light">Excellence</em>
          </h2>
          <p className="text-white/40 text-base md:text-lg font-light max-w-xl leading-relaxed">
            Experience the TrustOn portfolio through our cinematic showcase of premium developments and architectural excellence.
          </p>
        </motion.div>
      </div>

      {/* Horizontal Scrolling Gallery */}
      <div className="relative">
        <motion.div
          style={{ x }}
          className="flex gap-6 md:gap-8 pl-6 md:pl-16"
        >
          {GALLERY_IMAGES.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative flex-shrink-0 group"
            >
              <div className="relative w-[280px] md:w-[400px] lg:w-[500px] h-[380px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl">
                {/* Image */}
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#04090f]/80 via-transparent to-transparent" />
                
                {/* Hover border effect */}
                <div className="absolute inset-0 border border-white/0 group-hover:border-[#00BFFF]/30 rounded-2xl transition-all duration-500" />
                
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-white font-medium text-lg">{image.alt}</p>
                  <p className="text-[#00BFFF] text-xs uppercase tracking-widest mt-1">
                    View Project
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-12 flex items-center justify-center gap-4 text-white/30"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll to explore</span>
        <motion.svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ x: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
