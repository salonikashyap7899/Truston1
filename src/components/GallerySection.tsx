import { motion } from "framer-motion";
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
  return (
    <section
      id="gallery-section"
      className="relative bg-[#04090f] overflow-hidden"
    >
      {/* Static Header — now outside the sticky parallax container */}
      <div className="pt-24 pb-12 flex flex-col items-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="w-10 h-px bg-[#00BFFF]" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#00BFFF] font-bold">
              Cinematic Gallery
            </p>
            <span className="w-10 h-px bg-[#00BFFF]" />
          </div>
          <h2 className="text-white font-serif text-4xl md:text-6xl lg:text-7xl text-center mb-6 tracking-tighter">
            Immersive <em className="italic text-[#00BFFF] font-light">Excellence</em>
          </h2>
          <p className="text-white/30 text-sm font-light tracking-[0.2em] uppercase mb-12">
            Experience the TrustOn Portfolio
          </p>
          <div className="w-px h-24 bg-gradient-to-b from-[#00BFFF] to-transparent opacity-50" />
        </motion.div>
      </div>

      {/* ── Zoom Parallax container ── */}
      <div className="relative -mt-12">
        <ZoomParallax images={PARALLAX_IMAGES} />
      </div>
    </section>
  );
}
