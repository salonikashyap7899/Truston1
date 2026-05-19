import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { GalleryLightbox, type GalleryItem } from "@/components/GalleryLightbox";
import heroImg from "@/assets/hero-estate.jpg";
import { SobhaStyleHero } from "@/components/SobhaStyleHero";
import { Reveal, SectionEyebrow, CountUp } from "@/components/Reveal";
import { TextReveal, CharReveal } from "@/components/TextReveal";
import { PlotTracker } from "@/components/PlotTracker";
import { WealthCalculator } from "@/components/WealthCalculator";
import { Testimonials } from "@/components/Testimonials";
import { GallerySection } from "@/components/GallerySection";
import { DevelopersSection } from "@/components/DevelopersSection";
import { WhoWeAreSection } from "@/components/WhoWeAreSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TrustOn — Own the Ground. Build the Legacy." },
      {
        name: "description",
        content: "Prime Estate by TrustOn — Jila Panchayat approved luxury township in Lucknow.",
      },
      { property: "og:title", content: "TrustOn — Own the Ground. Build the Legacy." },
      { property: "og:image", content: heroImg },
    ],
    links: [{ rel: "preload", as: "image", href: heroImg, fetchpriority: "high" } as never],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <SobhaStyleHero
        height="full"
        title=""
        poster={heroImg}
        videoSources={[{ src: "/intro-video.mp4", type: "video/mp4" }]}
        alt="Aerial view of Prime Estate township at twilight"
      />

      <WhoWeAreSection />
      <DevelopersSection />

      <Marquee />
      <StatsBar />
      <PlotTracker />
      <Highlights />
      <GallerySection />
      <WealthCalculator />
      <Testimonials />
    </div>
  );
}

/* ── Marquee ─────────────────────────────────────────── */
function Marquee() {
  const words = [
    "Cinematic Living",
    "Editorial Architecture",
    "Premium Plots",
    "Jila Panchayat Approved",
    "Legacy Investments",
    "Prime Location",
    "Transparent Dealings",
  ];
  return (
    <div className="bg-[var(--ink)] border-y border-white/5 py-5 overflow-hidden">
      <div className="flex whitespace-nowrap marquee gap-16">
        {[...Array(2)].map((_, k) => (
          <div key={k} className="flex gap-16 shrink-0">
            {words.map((w, i) => (
              <span
                key={`${k}-${i}`}
                className="font-serif text-xl italic text-white/40 hover:text-white/70 transition-colors duration-500 cursor-default"
              >
                {w} <span className="text-[var(--bronze)] mx-5 not-italic text-sm">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Stats Bar ───────────────────────────────────────── */
function StatsBar() {
  const stats = [
    { num: 150, suffix: "+", label: "Premium Plots", icon: "◉" },
    { num: 25, suffix: "%", label: "Land Appreciation", icon: "◆" },
    { num: 5, suffix: "+", label: "Years of Trust", icon: "◎" },
    { num: 100, suffix: "%", label: "Legal Clearance", icon: "◈" },
  ];
  return (
    <section className="bg-white border-b border-gray-100 px-6">
      <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <motion.div
              whileHover={{ backgroundColor: "oklch(0.98 0.004 240)" }}
              className="group flex flex-col items-center py-12 px-6 text-center border-r border-gray-100 last:border-0 cursor-default transition-colors duration-300 relative"
            >
              {/* Top accent line animate */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gray-100 overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--bronze)]"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.15 }}
                />
              </div>

              <span className="text-[var(--bronze)]/30 text-2xl mb-4 group-hover:text-[var(--bronze)]/60 transition-colors duration-500">
                {s.icon}
              </span>
              <p className="font-display text-5xl md:text-6xl gradient-bronze-text font-bold leading-none">
                <CountUp to={s.num} suffix={s.suffix} />
              </p>
              <div className="w-6 h-px bg-gray-200 my-4 group-hover:w-12 group-hover:bg-[var(--bronze)] transition-all duration-500" />
              <p className="text-[11px] uppercase tracking-[0.25em] text-gray-400 group-hover:text-[var(--bronze)] transition-colors duration-500">
                {s.label}
              </p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Highlights ──────────────────────────────────────── */
function Highlights() {
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: false, margin: "-80px" });

  const cards: GalleryItem[] = [
    {
      title: "Premium Living",
      sub: "World-class interiors",
      img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/modern-interior-design-interior-600x800.jpg",
    },
    {
      title: "Green Development",
      sub: "Sustainable spaces",
      img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/aerial-photography-chinese-city-600x800.jpg",
    },
    {
      title: "Modern Amenities",
      sub: "5-star community",
      img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/hotel-lobby-interior-600x800.jpg",
    },
    {
      title: "Property Guidance",
      sub: "Expert consultation",
      img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/businessman-explaining-concept-details-600x800.jpg",
    },
    {
      title: "Reasonable Pricing",
      sub: "Value-first pricing",
      img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/close-up-hand-holding-cash-600x800.jpg",
    },
  ];

  const total = cards.length;
  const openGallery = (i: number) => setGalleryIndex(i);
  const closeGallery = () => setGalleryIndex(null);
  const prevImg = () => setGalleryIndex((p) => (p !== null ? (p - 1 + total) % total : 0));
  const nextImg = () => setGalleryIndex((p) => (p !== null ? (p + 1) % total : 0));

  return (
    <section ref={sectionRef} className="py-28 px-6 bg-[var(--sand)] overflow-hidden">
      {/* Gallery lightbox */}
      <GalleryLightbox
        items={cards}
        index={galleryIndex}
        onClose={closeGallery}
        onPrev={prevImg}
        onNext={nextImg}
      />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <Reveal className="text-center mb-16">
          <SectionEyebrow>Lifestyle</SectionEyebrow>
          <h2 className="font-display text-5xl md:text-6xl leading-tight flex flex-col items-center">
            <TextReveal>A life beyond</TextReveal>
            <em className="gradient-bronze-text not-italic">
              <CharReveal delay={0.8}>ordinary.</CharReveal>
            </em>
          </h2>
          <p className="text-foreground/50 mt-4 max-w-md mx-auto text-sm">
            Click any image to open the gallery — every detail crafted for those who demand the
            finest.
          </p>
        </Reveal>

        {/* Animated stagger grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 60, scale: 0.94, filter: "blur(8px)" }}
              animate={
                inView
                  ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                  : { opacity: 0, y: 60, scale: 0.94, filter: "blur(8px)" }
              }
              transition={{ duration: 0.85, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => openGallery(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && openGallery(i)}
              aria-label={`Open ${c.title} gallery`}
            >
              <motion.div
                className="relative overflow-hidden group"
                style={{ aspectRatio: "3/4" }}
                whileHover="hovered"
                initial="rest"
              >
                {/* Image with scale */}
                <motion.img
                  src={c.img}
                  alt={c.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                  variants={{ rest: { scale: 1 }, hovered: { scale: 1.09 } }}
                  transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Base dark gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/25 to-transparent" />

                {/* Hover blue tint — use rgba(0,0,0,0) instead of "transparent" */}
                <motion.div
                  className="absolute inset-0"
                  variants={{
                    rest: { backgroundColor: "rgba(0,0,0,0)" },
                    hovered: { backgroundColor: "rgba(45,107,196,0.14)" },
                  }}
                  transition={{ duration: 0.45 }}
                />

                {/* "Tap to view" overlay on hover */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  variants={{ rest: { opacity: 0 }, hovered: { opacity: 1 } }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="border border-white/30 px-5 py-2.5 text-[10px] uppercase tracking-widest text-white/80 backdrop-blur-sm bg-black/20">
                    View Gallery
                  </div>
                </motion.div>

                {/* Number badge */}
                <motion.span
                  className="absolute top-4 right-4 font-display text-3xl text-white/10"
                  variants={{ rest: { opacity: 0.3 }, hovered: { opacity: 0.8 } }}
                  transition={{ duration: 0.35 }}
                >
                  0{i + 1}
                </motion.span>

                {/* Bottom text */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <motion.div
                    className="h-px bg-[var(--bronze)] mb-3"
                    variants={{ rest: { width: 20 }, hovered: { width: 52 } }}
                    transition={{ duration: 0.5 }}
                  />
                  <p className="font-serif text-lg text-white leading-tight">{c.title}</p>
                  <motion.p
                    className="text-[10px] uppercase tracking-widest text-white/40 mt-1"
                    variants={{ rest: { opacity: 0, y: 8 }, hovered: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.4 }}
                  >
                    {c.sub}
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
