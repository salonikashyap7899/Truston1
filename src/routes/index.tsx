import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { GalleryLightbox, type GalleryItem } from "@/components/GalleryLightbox";
import heroImg from "@/assets/hero-estate.jpg";
import projectImg from "@/assets/project-prime.jpg";
import interiorImg from "@/assets/luxury-interior.jpg";
import lucknowImg from "@/assets/lucknow-aerial.jpg";
import { PageHero } from "@/components/PageHero";
import { Reveal, SectionEyebrow, CountUp } from "@/components/Reveal";
import { TextReveal, CharReveal } from "@/components/TextReveal";
import { PlotTracker } from "@/components/PlotTracker";
import { WealthCalculator } from "@/components/WealthCalculator";
import { Testimonials } from "@/components/Testimonials";
import { CursorGlow } from "@/components/CursorGlow";
import { GallerySection } from "@/components/GallerySection";
import { MagneticButton } from "@/components/MagneticButton";

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
      <CursorGlow />
      <PageHero
        height="full"
        eyebrow="Luxury Real Estate — Lucknow"
        title={
          <>
            Own the <em className="gradient-bronze-text not-italic font-display">Ground.</em>
            <br />
            Build the <span className="font-display italic">Legacy.</span>
          </>
        }
        poster={heroImg}
        videoSources={[{ src: "/intro-video.mp4", type: "video/mp4" }]}
        alt="Aerial view of Prime Estate township at twilight"
      >
        <MagneticButton strength={40}>
          <Link
            to="/project"
            className="group inline-flex items-center gap-4 bg-[var(--bronze)] text-white px-10 py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-white hover:text-[var(--ink)] transition-all duration-500 shadow-luxe"
          >
            Explore Projects
            <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
          </Link>
        </MagneticButton>
        <MagneticButton strength={25}>
          <Link
            to="/contact"
            className="text-[11px] uppercase tracking-[0.25em] text-white/80 hover:text-[var(--bronze)] transition-all duration-500 border-b border-white/30 hover:border-[var(--bronze)] pb-0.5"
          >
            Private Consultation
          </Link>
        </MagneticButton>
      </PageHero>

      <Marquee />
      <StatsBar />
      <PlotTracker />
      <Highlights />
      <GallerySection />
      <WealthCalculator />
      <AboutPrime />
      <InvestLucknow />
      <LuxurySignature />
      <Services />
      <ProjectFeature />
      <WhyTrust />
      <Testimonials />
      <ChannelPartnerCTA />
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

/* ── About Prime ─────────────────────────────────────── */
function AboutPrime() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  const features = [
    { label: "Jila Panchayat", value: "Approved" },
    { label: "Clear Title", value: "Deeds" },
    { label: "Infrastructure", value: "Ready" },
  ];

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-20 items-center">
        {/* Image column */}
        <Reveal direction="left">
          <div className="relative">
            <div className="relative aspect-[3/4] overflow-hidden shadow-2xl">
              <motion.div style={{ y }} className="absolute inset-[-10%]">
                <img
                  src={interiorImg}
                  alt="Luxury interior"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            {/* Floating stat badge */}
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 40 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-10 -right-6 md:-right-10 bg-[var(--bronze)] text-white p-8 shadow-2xl"
            >
              <p className="font-display text-4xl font-bold">150+</p>
              <p className="text-[10px] uppercase tracking-widest mt-1 text-white/80">
                Premium Plots
              </p>
            </motion.div>
            {/* Side feature tags */}
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -40 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-10 -left-6 md:-left-10 flex flex-col gap-2"
            >
              {features.map((f, i) => (
                <div key={f.label} className="bg-[var(--ink)] text-white px-5 py-3 shadow-xl">
                  <p className="text-[9px] uppercase tracking-widest text-white/40">{f.label}</p>
                  <p className="text-sm font-semibold text-[var(--bronze)]">{f.value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </Reveal>

        {/* Text column */}
        <Reveal direction="right">
          <p className="text-[var(--bronze)] text-[11px] uppercase tracking-luxe mb-5 flex items-center gap-3">
            <span className="inline-block w-10 h-px bg-[var(--bronze)]" />
            Own the Ground. Build Your Legacy.
          </p>
          <h2 className="font-display text-5xl md:text-6xl leading-tight mb-8">
            Prime Estate — where <em className="gradient-bronze-text not-italic">imagination</em>{" "}
            takes shape.
          </h2>
          <p className="text-foreground/60 text-lg leading-relaxed mb-10">
            Prime Estate is a trusted name in real estate development, built on a foundation of
            transparency, quality, and long-term vision. We don't just sell land — we craft
            opportunities. Our flagship project is a Jila Panchayat approved township that combines
            legal security, prime location, and future-ready infrastructure.
          </p>

          <div className="grid sm:grid-cols-2 gap-px bg-gray-100 mb-10">
            {[
              {
                title: "Our Mission",
                body: "Make premium, legally secure land ownership accessible to every aspiring homeowner and investor.",
              },
              {
                title: "Our Vision",
                body: "Build not just properties, but thriving communities where families live and businesses grow.",
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-7 border-l-2 border-[var(--bronze)] group cursor-default"
              >
                <p className="text-[var(--bronze)] text-[10px] uppercase tracking-widest mb-3">
                  {card.title}
                </p>
                <p className="font-serif text-lg leading-snug text-foreground/70">{card.body}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-8">
            <Link
              to="/about-us"
              className="group inline-flex items-center gap-3 bg-[var(--ink)] text-white px-8 py-4 text-[11px] uppercase tracking-widest hover:bg-[var(--bronze)] transition-all duration-500"
            >
              Read More
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </Link>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400">Call Anytime</p>
              <a
                href="tel:+919616061166"
                className="font-serif text-2xl text-[var(--bronze)] hover:underline"
              >
                +91 96160-61166
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Luxury Signature ────────────────────────────────── */
function LuxurySignature() {
  return (
    <section className="py-40 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <Reveal>
          <div className="inline-block mb-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 border border-[var(--bronze)]/20 rounded-full flex items-center justify-center relative"
            >
              <div className="absolute inset-0 border-t-2 border-[var(--bronze)] rounded-full" />
              <span className="font-display text-4xl text-[var(--bronze)] font-bold">T</span>
            </motion.div>
          </div>
        </Reveal>

        <h2 className="font-display text-6xl md:text-[120px] leading-[0.9] tracking-tighter mb-12">
          <TextReveal>Elegance in every</TextReveal>
          <em className="gradient-bronze-text not-italic">
            <CharReveal delay={0.6}>Detail.</CharReveal>
          </em>
        </h2>

        <div className="max-w-2xl mx-auto border-t border-gray-100 pt-12">
          <p className="font-serif italic text-2xl text-foreground/50 leading-relaxed">
            "True luxury is not just about what you see, but how it makes you feel. At TrustOn, we
            craft experiences that resonate with the soul of modern Lucknow."
          </p>
          <div className="mt-8 flex flex-col items-center">
            <div className="w-12 h-px bg-[var(--bronze)] mb-4" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-[var(--bronze)] font-bold">
              TrustOn Developers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Invest Lucknow ──────────────────────────────────── */
function InvestLucknow() {
  const items = [
    {
      t: "Lucknow Metro",
      d: "Extended metro lines are boosting surrounding land values across key residential zones.",
      num: "3X",
      unit: "Growth",
    },
    {
      t: "Purvanchal Expressway",
      d: "Direct connectivity to UP's fastest-growing economic and industrial corridor.",
      num: "300",
      unit: "KM Range",
    },
    {
      t: "25% Land Appreciation",
      d: "Premium zones in Lucknow have seen up to 25% appreciation in the last 3 years.",
      num: "25%",
      unit: "Appreciation",
    },
    {
      t: "Airport Expansion",
      d: "The new international terminal is driving demand for premium residential properties.",
      num: "#1",
      unit: "Growth City",
    },
  ];

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden bg-[var(--ink)]">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={lucknowImg}
          alt=""
          className="w-full h-full object-cover opacity-10"
          loading="lazy"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--ink)]/90 via-[var(--ink)]/60 to-[var(--ink)]/95" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionEyebrow light>NRI / Investment</SectionEyebrow>
          <h2 className="font-display text-5xl md:text-7xl text-center text-white mb-6 leading-tight">
            Why invest in <em className="gradient-bronze-text not-italic">Lucknow?</em>
          </h2>
          <p className="text-center text-white/40 max-w-2xl mx-auto mb-20">
            One of India's fastest-growing real estate markets — driven by world-class
            infrastructure and rapidly rising land values.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-4 gap-px bg-white/[0.04]">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.1}>
              <motion.div
                whileHover={{ backgroundColor: "rgba(255,255,255,0.07)" }}
                className="group bg-white/[0.02] p-10 h-full transition-all duration-500 relative overflow-hidden cursor-default"
              >
                {/* Animated top border */}
                <div className="absolute top-0 left-0 right-0 h-px bg-white/5 overflow-hidden">
                  <motion.div
                    className="h-full bg-[var(--bronze)]"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.15 }}
                  />
                </div>

                {/* Subtle number background */}
                <div className="absolute -right-4 -bottom-4 font-display text-[100px] leading-none text-white/[0.03] select-none pointer-events-none">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <p className="font-display text-5xl gradient-bronze-text font-bold mb-1">
                  {it.num}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-white/25 mb-7">
                  {it.unit}
                </p>
                <h3 className="font-serif text-xl text-white mb-4 group-hover:text-[var(--bronze)] transition-colors duration-400">
                  {it.t}
                </h3>
                <p className="text-sm text-white/35 leading-relaxed">{it.d}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Services ────────────────────────────────────────── */
function Services() {
  const services = [
    {
      title: "Plot Selling",
      sub: "Premium Plots. Zero Compromise.",
      to: "/plot-selling",
      img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/webaliser-_TPTXZd9mOo-unsplash-1-1024x768.jpg",
      num: "01",
    },
    {
      title: "Architecture & Design",
      sub: "Your Vision, Brought to Life on Paper First",
      to: "/architecture-design",
      img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/april-pethybridge-nN28PjFOOLI-unsplash-scaled.jpg",
      num: "02",
    },
    {
      title: "Construction & Build",
      sub: "We Don't Just Build Buildings. We Build Promises",
      to: "/construction-build",
      img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/avi-werde-hHz4yrvxwlA-unsplash-scaled.jpg",
      num: "03",
    },
    {
      title: "Investment Consulting",
      sub: "Buy Smart. Invest Smarter.",
      to: "/investment-consulting",
      img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/avi-waxman-f9qZuKoZYoY-unsplash-1-scaled.jpg",
      num: "04",
    },
  ] as const;

  return (
    <section className="py-32 px-6 bg-white">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionEyebrow>Our Services</SectionEyebrow>
          <h2 className="font-display text-5xl md:text-7xl text-center mb-4 leading-tight flex flex-col items-center">
            <TextReveal>Everything you need,</TextReveal>
            <em className="gradient-bronze-text not-italic">
              <TextReveal delay={0.6}>under one roof.</TextReveal>
            </em>
          </h2>
          <p className="text-center text-foreground/45 mb-20 max-w-xl mx-auto">
            Four pillars of expertise, one trusted partner — from land to legacy.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-1">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.09}>
              <motion.div
                whileHover="hovered"
                initial="rest"
                className="relative overflow-hidden block"
                style={{ aspectRatio: "16/10" }}
              >
                <Link to={s.to} className="absolute inset-0 z-10" aria-label={s.title} />
                <motion.img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                  variants={{ rest: { scale: 1 }, hovered: { scale: 1.08 } }}
                  transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.div
                  className="absolute inset-0"
                  variants={{
                    rest: {
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)",
                    },
                    hovered: {
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.15) 100%)",
                    },
                  }}
                  transition={{ duration: 0.5 }}
                />

                {/* Number top-right */}
                <motion.div
                  className="absolute top-6 right-6 font-display text-5xl"
                  variants={{
                    rest: { color: "rgba(255,255,255,0.1)" },
                    hovered: { color: "rgba(255,255,255,0.25)" },
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {s.num}
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 p-10 text-white z-[1]">
                  <motion.div
                    className="h-px bg-[var(--bronze)] mb-6"
                    variants={{ rest: { width: 32 }, hovered: { width: 64 } }}
                    transition={{ duration: 0.6 }}
                  />
                  <h3 className="font-display text-4xl mb-2">{s.title}</h3>
                  <p className="text-white/55 font-serif italic mb-6">{s.sub}</p>
                  <motion.span
                    className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-[var(--bronze)]"
                    variants={{ rest: { opacity: 0, y: 8 }, hovered: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.45 }}
                  >
                    Discover More →
                  </motion.span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-gray-100 pt-12">
            <p className="font-serif italic text-xl text-foreground/50">
              Don't be late — luxury doesn't wait. Choose the life you deserve.
            </p>
            <Link
              to="/services"
              className="inline-flex items-center gap-3 border border-[var(--bronze)] text-[var(--bronze)] px-8 py-4 text-[11px] uppercase tracking-widest hover:bg-[var(--bronze)] hover:text-white transition-all duration-500"
            >
              All Services →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Project Feature ─────────────────────────────────── */
function ProjectFeature() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.7, 0.9]);

  return (
    <section ref={ref} className="relative py-32 px-6 bg-[var(--sand)]">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionEyebrow>Flagship Project</SectionEyebrow>
          <h2 className="font-display text-5xl md:text-7xl text-center mb-3 leading-tight">
            Where imagination takes shape in{" "}
            <em className="gradient-bronze-text not-italic">luxury.</em>
          </h2>
          <p className="text-center text-foreground/50 font-serif italic text-lg mb-16">
            Crafted for those who expect nothing less than exceptional living.
          </p>
        </Reveal>

        <Reveal>
          <Link
            to="/projects/$slug"
            params={{ slug: "prime-estate-lucknow-uttar-pradesh" }}
            className="group block relative overflow-hidden shadow-2xl"
          >
            <div className="relative" style={{ aspectRatio: "21/9" }}>
              <motion.img
                style={{ scale }}
                src={projectImg}
                alt="Prime Estate"
                className="w-full h-full object-cover absolute inset-0"
                loading="lazy"
              />
              <motion.div
                style={{ opacity: overlayOpacity }}
                className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"
              />
            </div>

            <div className="absolute inset-0 flex flex-col justify-center px-12 md:px-20 max-w-2xl text-white">
              <motion.div
                className="h-px bg-[var(--bronze)] mb-8"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              <p className="text-[10px] uppercase tracking-widest text-[var(--bronze)] mb-4">
                Residential Township · Lucknow
              </p>
              <h3 className="font-display text-5xl md:text-7xl mb-6 leading-none">Prime Estate</h3>
              <p className="text-white/65 mb-10 max-w-md text-lg leading-relaxed">
                A flagship Jila Panchayat approved township — combining legal security, prime
                location, and future-ready infrastructure.
              </p>
              <motion.span
                className="inline-flex w-fit items-center gap-4 bg-[var(--bronze)] text-white px-8 py-4 text-[11px] uppercase tracking-widest"
                whileHover={{ gap: "1.5rem" }}
                transition={{ duration: 0.3 }}
              >
                View Project →
              </motion.span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Why Trust ───────────────────────────────────────── */
function WhyTrust() {
  const items = [
    {
      t: "Legal Security",
      d: "Every plot backed by Jila Panchayat approval & clear title deeds.",
      icon: "⚖",
    },
    {
      t: "Transparent Dealings",
      d: "No hidden charges. What we quote is what you pay.",
      icon: "◈",
    },
    {
      t: "Design Expertise",
      d: "In-house architects who understand your vision, not just blueprints.",
      icon: "◻",
    },
    {
      t: "Prime Location",
      d: "Strategic positioning with road access & utility connections.",
      icon: "◉",
    },
    {
      t: "Quality Construction",
      d: "Grade-A materials, skilled workforce, no shortcuts.",
      icon: "◆",
    },
    { t: "After-Sale Support", d: "We stay with you long after the deal is signed.", icon: "◎" },
  ];

  return (
    <section className="py-32 px-6 bg-[var(--ink)] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 50%, var(--bronze) 0%, transparent 55%), radial-gradient(ellipse at 80% 50%, oklch(0.50 0.155 245) 0%, transparent 55%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionEyebrow light>Why Choose Us</SectionEyebrow>
          <h2 className="font-display text-5xl md:text-7xl text-center text-white mb-20 leading-tight">
            Why buyers trust <em className="gradient-bronze-text not-italic">Prime Estate.</em>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-px bg-white/[0.04]">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.07}>
              <motion.div
                whileHover={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                className="group bg-white/[0.02] p-10 h-full cursor-default relative overflow-hidden transition-colors duration-500"
              >
                {/* Hover bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-transparent group-hover:bg-[var(--bronze)] transition-colors duration-500" />

                <div className="flex items-start justify-between mb-8">
                  <motion.span
                    className="text-3xl text-[var(--bronze)]/50 group-hover:text-[var(--bronze)] transition-colors duration-400"
                    whileHover={{ rotate: 15, scale: 1.2 }}
                  >
                    {it.icon}
                  </motion.span>
                  <span className="font-display text-6xl text-white/[0.05] group-hover:text-white/[0.12] transition-colors duration-500 leading-none">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-white mb-3 group-hover:text-[var(--bronze)] transition-colors duration-400">
                  {it.t}
                </h3>
                <p className="text-sm text-white/35 leading-relaxed group-hover:text-white/55 transition-colors duration-400">
                  {it.d}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <Reveal>
          <div className="mt-px bg-white/[0.02] p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="font-serif italic text-xl text-white/40">
              Join 500+ families who trusted Prime Estate for their dream home.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-[var(--bronze)] text-white px-8 py-4 text-[11px] uppercase tracking-widest hover:opacity-90 transition-opacity shrink-0"
            >
              Talk to Us →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Channel Partner CTA ─────────────────────────────── */
function ChannelPartnerCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-20 items-center">
        <Reveal direction="left">
          <p className="text-[var(--bronze)] text-[11px] uppercase tracking-luxe mb-5 flex items-center gap-3">
            <span className="inline-block w-10 h-px bg-[var(--bronze)]" />
            Channel Partner Program
          </p>
          <h2 className="font-display text-5xl md:text-6xl leading-tight mb-6">
            Earn more by partnering with{" "}
            <em className="gradient-bronze-text not-italic">TrustOn</em> today.
          </h2>
          <p className="text-foreground/60 text-lg leading-relaxed mb-10">
            Join TrustOn's Channel Partner Program and start earning premium commissions on every
            deal — with full marketing support, RERA-compliant projects, and a team that's always in
            your corner.
          </p>

          {/* Benefit tags */}
          <div className="flex flex-wrap gap-3 mb-10">
            {["Premium Commission", "Marketing Support", "RERA Compliant", "Instant Payouts"].map(
              (tag) => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.03, borderColor: "var(--bronze)" }}
                  className="text-[11px] uppercase tracking-widest border border-gray-200 px-4 py-2 text-gray-500 cursor-default transition-colors duration-300"
                >
                  {tag}
                </motion.span>
              ),
            )}
          </div>

          <div className="flex flex-wrap gap-4">
            <MagneticButton strength={30}>
              <Link
                to="/channel-partner"
                className="group inline-flex items-center gap-3 bg-[var(--bronze)] text-white px-8 py-4 text-[11px] uppercase tracking-widest hover:bg-[var(--ink)] transition-all duration-500"
              >
                Register Now
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </Link>
            </MagneticButton>
            <MagneticButton strength={20}>
              <a
                href="tel:+919616061166"
                className="inline-flex items-center gap-3 border border-gray-200 text-gray-500 px-8 py-4 text-[11px] uppercase tracking-widest hover:border-[var(--bronze)] hover:text-[var(--bronze)] transition-all duration-400"
              >
                Call Us
              </a>
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal direction="right" delay={0.12}>
          <div className="relative">
            <motion.div style={{ y }} className="relative aspect-[4/5] overflow-hidden shadow-2xl">
              <img
                src="https://truston.advrtisinguru.com/wp-content/uploads/2026/01/ser3.jpg"
                alt="Channel Partner Program"
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <p className="font-display text-4xl mb-1">50+</p>
                <p className="text-[11px] uppercase tracking-widest text-white/50">
                  Active Partners
                </p>
              </div>
            </motion.div>
            {/* Floating accent */}
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="absolute -top-6 -right-6 bg-white border border-gray-100 shadow-xl p-6 text-center"
            >
              <p className="font-display text-3xl gradient-bronze-text font-bold">₹50K+</p>
              <p className="text-[9px] uppercase tracking-widest text-gray-400 mt-1">
                Avg Commission
              </p>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
