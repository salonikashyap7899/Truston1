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
      {/* ── Zoom Parallax intro ── */}
      <div className="relative">
        {/* Eyebrow overlay — sticky so it stays visible during parallax scroll */}
        <div className="sticky top-0 h-screen z-10 flex flex-col items-center justify-start pt-24 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="w-10 h-px bg-[#00BFFF]" />
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#00BFFF] font-bold">
                Cinematic Gallery
              </p>
              <span className="w-10 h-px bg-[#00BFFF]" />
            </div>
            <h2 className="text-white font-serif text-3xl md:text-5xl lg:text-6xl text-center mb-6 tracking-tighter">
              Immersive <em className="italic text-[#00BFFF] font-light">Excellence</em>
            </h2>
            <p className="text-white/30 text-sm font-light tracking-[0.2em] uppercase">
              Scroll to explore depth ↓
            </p>
          </motion.div>
        </div>

        {/* The component itself is 300vh, the sticky overlay inside handles visibility */}
        <div className="-mt-[100vh]">
          <ZoomParallax images={PARALLAX_IMAGES} />
        </div>
      </div>
    </section>
  );
}
