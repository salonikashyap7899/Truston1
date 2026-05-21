import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { GalleryLightbox, type GalleryItem } from "./GalleryLightbox";
import { SectionEyebrow } from "./Reveal";

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

const TABS = ["All", "Plots", "Interiors", "Amenities", "Design", "Investment"] as const;
type Tab = (typeof TABS)[number];

/* Grid layout: index → how many columns/rows it spans in a 3-col grid */
const SPANS: Record<number, string> = {
  0: "md:col-span-2 md:row-span-2", // large feature
  4: "md:col-span-2", // wide
  7: "md:col-span-1 md:row-span-2", // tall
};

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
  const next = () => setLightboxIndex((p) => (p !== null ? (p + 1) % filtered.length : 0));
  const goTo = (i: number) => setLightboxIndex(i);

  return (
    <section ref={sectionRef} className="relative py-32 px-6 bg-[var(--ink)] overflow-hidden">
      {/* ── Ambient glow orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, var(--gold), transparent 70%)" }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, var(--bronze), transparent 70%)" }}
        />
      </div>

      {/* ── Grid texture ── */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* ── Header ── */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionEyebrow light>Site Photography</SectionEyebrow>
          <h2 className="font-display text-5xl md:text-7xl text-white leading-tight">
            Every detail, <em className="gradient-bronze-text not-italic">captured.</em>
          </h2>
          <p className="text-white/35 mt-4 max-w-lg mx-auto text-sm leading-relaxed">
            Click any image to open the cinematic viewer. Swipe or use arrow keys to explore.
            Double-click to zoom.
          </p>
        </motion.div>

        {/* ── Filter tabs ── */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setLightboxIndex(null);
              }}
              className={`text-[10px] uppercase tracking-[0.4em] px-5 py-2.5 border transition-all duration-300 ${
                activeTab === tab
                  ? "border-[var(--bronze)] text-[var(--bronze)] bg-[var(--bronze)]/10"
                  : "border-white/10 text-white/35 hover:border-white/30 hover:text-white/60"
              }`}
            >
              {tab}
              {tab === "All" && <span className="ml-2 text-white/20">{ALL_IMAGES.length}</span>}
            </button>
          ))}
        </motion.div>

        {/* ── Masonry grid ── */}
        <AnimatedGrid
          items={filtered}
          inView={inView}
          onOpen={open}
          spans={activeTab === "All" ? SPANS : {}}
        />

        {/* ── Bottom CTA ── */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <p className="text-white/25 text-[11px] uppercase tracking-widest mb-6">
            {filtered.length} image{filtered.length !== 1 ? "s" : ""} in this collection
          </p>
          <a
            href="tel:+919616061166"
            className="inline-flex items-center gap-3 border border-[var(--bronze)]/50 text-[var(--bronze)] px-8 py-4 text-[11px] uppercase tracking-widest hover:bg-[var(--bronze)] hover:text-white transition-all duration-500"
          >
            Book a Site Visit →
          </a>
        </motion.div>
      </div>

      {/* ── Lightbox ── */}
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

/* ── Internal grid component ── */
function AnimatedGrid({
  items,
  inView,
  onOpen,
  spans,
}: {
  items: GalleryItem[];
  inView: boolean;
  onOpen: (i: number) => void;
  spans: Record<number, string>;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 auto-rows-[200px] md:auto-rows-[220px]">
      {items.map((item, i) => (
        <motion.div
          key={`${item.title}-${i}`}
          className={`relative overflow-hidden group cursor-pointer ${spans[i] ?? ""}`}
          initial={{ opacity: 0, scale: 0.92, filter: "blur(12px)" }}
          animate={
            inView
              ? { opacity: 1, scale: 1, filter: "blur(0px)" }
              : { opacity: 0, scale: 0.92, filter: "blur(12px)" }
          }
          transition={{ duration: 0.75, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
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
            className="absolute inset-0 w-full h-full object-cover"
            variants={{ rest: { scale: 1 }, hovered: { scale: 1.08 } }}
            whileHover="hovered"
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Base overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

          {/* Bronze tint on hover */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{ background: "rgba(184,134,11,0.12)" }}
          />

          {/* Category chip */}
          {item.category && (
            <div className="absolute top-3 left-3 text-[8px] uppercase tracking-[0.4em] text-white/60 border border-white/10 px-2 py-1 bg-black/30 backdrop-blur-sm">
              {item.category}
            </div>
          )}

          {/* Zoom icon */}
          <motion.div
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center border border-white/15 bg-black/20 backdrop-blur-sm text-white/40"
            initial={{ opacity: 0, scale: 0.7 }}
            whileHover={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
          >
            <svg viewBox="0 0 20 20" className="w-4 h-4 fill-current">
              <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
            </svg>
          </motion.div>

          {/* Bottom info */}
          <div className="absolute bottom-0 inset-x-0 p-4">
            <motion.div
              className="h-px mb-3 bg-[var(--bronze)]"
              initial={{ width: 16 }}
              whileHover={{ width: 40 }}
              transition={{ duration: 0.5 }}
            />
            <p className="text-white font-serif text-base leading-tight">{item.title}</p>
            <motion.p
              className="text-[9px] uppercase tracking-widest text-white/40 mt-1"
              initial={{ opacity: 0, y: 6 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {item.sub}
            </motion.p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
