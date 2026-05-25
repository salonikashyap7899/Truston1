import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { GalleryLightbox, type GalleryItem } from "./GalleryLightbox";
import { SectionEyebrow } from "./Reveal";
import { ImageCursorTrail } from "./ImageCursorTrail";

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

const TRAIL_IMGS = ALL_IMAGES.map((i) => i.img);

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
      ref={sectionRef}
      id="gallery-section"
      className="relative bg-[#04090f] overflow-hidden"
    >
      {/* ── Cursor Trail Hero Header ── */}
      <ImageCursorTrail
        items={TRAIL_IMGS}
        maxNumberOfImages={5}
        distance={22}
        imgClass="w-36 h-44 sm:w-44 sm:h-52"
        fadeAnimation
        className="min-h-[520px] flex items-center justify-center border-b border-white/5"
      >
        <motion.div
          className="relative z-30 text-center px-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionEyebrow light>Site Photography</SectionEyebrow>

          <h2
            className="font-serif text-6xl md:text-8xl lg:text-9xl text-white leading-[0.88] tracking-tighter mb-6"
          >
            Every detail,{" "}
            <em className="text-[#00BFFF] not-italic">captured.</em>
          </h2>

          <p className="text-white/40 mt-6 max-w-lg mx-auto text-base md:text-lg leading-relaxed font-light">
            Experience architectural brilliance in high definition — our curated collection of
            premium sites and designs.
          </p>

          <p className="text-white/20 text-[10px] uppercase tracking-[0.45em] mt-10 font-bold">
            ✦ &nbsp; Move cursor to explore &nbsp; ✦
          </p>
        </motion.div>
      </ImageCursorTrail>

      {/* ── Gallery body ── */}
      <div className="relative px-4 md:px-8 py-20 max-w-[1600px] mx-auto z-10">

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

        {/* Professional editorial grid */}
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

/* ── Editorial grid: 2 columns desktop, staggered heights ── */
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
            {/* Image */}
            <motion.img
              src={item.img}
              alt={item.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover brightness-75"
              whileHover={{ scale: 1.08, filter: "brightness(0.5)" }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#04090f]/95 via-[#04090f]/20 to-transparent" />

            {/* Hover tint */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              style={{ background: "rgba(0,191,255,0.06)" }}
            />

            {/* Category chip */}
            {item.category && (
              <div className="absolute top-5 left-5 text-[9px] uppercase tracking-[0.3em] text-white/60 border border-white/10 px-3 py-1.5 bg-[#04090f]/60 backdrop-blur-md rounded-full font-bold">
                {item.category}
              </div>
            )}

            {/* Zoom icon */}
            <motion.div
              className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center border border-white/10 bg-[#04090f]/40 backdrop-blur-md text-[#00BFFF] rounded-full opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            >
              <svg viewBox="0 0 20 20" className="w-4 h-4 fill-current">
                <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
              </svg>
            </motion.div>

            {/* Bottom info */}
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
