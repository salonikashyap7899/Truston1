import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { GalleryLightbox, type GalleryItem } from "./GalleryLightbox";
import { ZoomParallax } from "./ui/zoom-parallax";

const ALL_IMAGES: GalleryItem[] = [
  {
    title: "Grand Lobby",
    sub: "5-star clubhouse entrance",
    category: "Amenities",
    img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/hotel-lobby-interior-600x800.jpg",
  },
  {
    title: "Premium Interior",
    sub: "World-class living spaces",
    category: "Interiors",
    img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/modern-interior-design-interior-600x800.jpg",
  },
  {
    title: "Aerial Township",
    sub: "Prime location overview",
    category: "Location",
    img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/aerial-photography-chinese-city-600x800.jpg",
  },
  {
    title: "Expert Consultation",
    sub: "Personalised property guidance",
    category: "Services",
    img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/businessman-explaining-concept-details-600x800.jpg",
  },
  {
    title: "Plot Selling",
    sub: "Premium plots, zero compromise",
    category: "Plots",
    img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/webaliser-_TPTXZd9mOo-unsplash-1-1024x768.jpg",
  },
  {
    title: "Architecture & Design",
    sub: "Your vision brought to life",
    category: "Design",
    img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/april-pethybridge-nN28PjFOOLI-unsplash-scaled.jpg",
  },
  {
    title: "Construction Quality",
    sub: "Grade-A build, no shortcuts",
    category: "Build",
    img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/avi-werde-hHz4yrvxwlA-unsplash-scaled.jpg",
  },
  {
    title: "Investment Returns",
    sub: "High-return land investment",
    category: "Investment",
    img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/close-up-hand-holding-cash-600x800.jpg",
  },
  {
    title: "Community Living",
    sub: "Thriving neighbourhoods",
    category: "Plots",
    img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/01/ser3.jpg",
  },
  {
    title: "Smart Investing",
    sub: "Buy smart, invest smarter",
    category: "Investment",
    img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/avi-waxman-f9qZuKoZYoY-unsplash-1-scaled.jpg",
  },
];

/* First 7 images go into the ZoomParallax intro */
const PARALLAX_IMAGES = ALL_IMAGES.slice(0, 7).map((i) => ({
  src: i.img,
  alt: i.title,
}));

const TABS = ["All", "Plots", "Interiors", "Amenities", "Design", "Investment"] as const;
type Tab = (typeof TABS)[number];

export function GallerySection() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: false, margin: "-60px" });

  const filtered =
    activeTab === "All" ? ALL_IMAGES : ALL_IMAGES.filter((img) => img.category === activeTab);

  const open = (i: number) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((p) => (p !== null ? (p - 1 + filtered.length) % filtered.length : 0));
  const next = () =>
    setLightboxIndex((p) => (p !== null ? (p + 1) % filtered.length : 0));
  const goTo = (i: number) => setLightboxIndex(i);

  return (
    <section
      id="gallery-section"
      className="relative bg-[#04090f] overflow-hidden"
    >
      {/* ── Zoom Parallax intro ── */}
      <div className="relative">
        {/* Eyebrow overlay — sits on top of the sticky parallax */}
        <div className="absolute top-0 inset-x-0 z-10 flex flex-col items-center pt-16 pointer-events-none">
          <div className="flex items-center gap-4 mb-4">
            <span className="w-10 h-px bg-[#00BFFF]" />
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#00BFFF] font-bold">
              Our Gallery
            </p>
            <span className="w-10 h-px bg-[#00BFFF]" />
          </div>
          <p className="text-white/30 text-sm font-light tracking-wider">
            Scroll to explore ↓
          </p>
        </div>

        <ZoomParallax images={PARALLAX_IMAGES} />
      </div>

      {/* ── Gallery grid ── */}
      <div ref={sectionRef} className="relative px-4 md:px-8 py-16 max-w-[1600px] mx-auto z-10">

        {/* Filter tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setLightboxIndex(null); }}
              className={`text-[10px] font-bold uppercase tracking-[0.4em] px-7 py-3 border rounded-full transition-all duration-400 ${
                activeTab === tab
                  ? "border-[#00BFFF] text-[#00BFFF] bg-[#00BFFF]/10"
                  : "border-white/10 text-white/30 hover:border-white/30 hover:text-white/70"
              }`}
            >
              {tab}
              {tab === "All" && (
                <span className="ml-2 opacity-30">{ALL_IMAGES.length}</span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Editorial masonry grid */}
        <EditorialGrid items={filtered} inView={inView} onOpen={open} />

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <p className="text-white/20 text-[10px] uppercase tracking-[0.4em] mb-8 font-bold">
            {filtered.length} cinematic assets in this collection
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 px-12 py-5 rounded-full text-[11px] uppercase tracking-[0.25em] font-bold text-[#04090f] transition-all duration-500 hover:scale-105"
            style={{ background: "#00BFFF" }}
          >
            Request Private Tour →
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <GalleryLightbox
        items={filtered}
        index={lightboxIndex}
        onClose={close}
        onPrev={prev}
        onNext={next}
        onGoTo={goTo}
      />
    </section>
  );
}

/* ── Editorial masonry grid ── */
function EditorialGrid({
  items,
  inView,
  onOpen,
}: {
  items: GalleryItem[];
  inView: boolean;
  onOpen: (i: number) => void;
}) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {items.map((item, i) => {
        const tall = i % 5 === 0 || i % 5 === 3;
        return (
          <motion.div
            key={`${item.title}-${i}`}
            className="relative overflow-hidden group cursor-pointer rounded-[28px] border border-white/5 break-inside-avoid"
            style={{ height: tall ? "440px" : "300px" }}
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            animate={
              inView
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 40, filter: "blur(8px)" }
            }
            transition={{ duration: 0.8, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => onOpen(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onOpen(i)}
            aria-label={`Open ${item.title}`}
          >
            <motion.img
              src={item.img}
              alt={item.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover brightness-75"
              whileHover={{ scale: 1.08, filter: "brightness(0.5)" }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#04090f]/95 via-[#04090f]/20 to-transparent" />

            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              style={{ background: "rgba(0,191,255,0.06)" }}
            />

            {item.category && (
              <div className="absolute top-5 left-5 text-[9px] uppercase tracking-[0.3em] text-white/60 border border-white/10 px-3 py-1.5 bg-[#04090f]/60 backdrop-blur-md rounded-full font-bold">
                {item.category}
              </div>
            )}

            <motion.div
              className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center border border-white/10 bg-[#04090f]/40 backdrop-blur-md text-[#00BFFF] rounded-full opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            >
              <svg viewBox="0 0 20 20" className="w-4 h-4 fill-current">
                <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
              </svg>
            </motion.div>

            <div className="absolute bottom-0 inset-x-0 p-6">
              <motion.div
                className="h-[1px] mb-4 bg-[#00BFFF] rounded-full"
                initial={{ width: 20 }}
                whileHover={{ width: 48 }}
                transition={{ duration: 0.4 }}
              />
              <p className="text-white font-serif text-xl tracking-tight leading-none mb-1">
                {item.title}
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/35 font-bold">
                {item.sub}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
