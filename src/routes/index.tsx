import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-estate.jpg";
import { Reveal, SectionEyebrow, CountUp } from "@/components/Reveal";
import { Testimonials } from "@/components/Testimonials";
import { WealthCalculator } from "@/components/WealthCalculator";
import { GallerySection } from "@/components/GallerySection";
import { IntroHighlightSection } from "@/components/IntroHighlightSection";
import { PlotsAndStructures } from "@/components/PlotsAndStructures";
import { Section3DBackground } from "@/components/Section3DBackground";
import {
  TrustonServicesSection,
  TrustonWhySection,
  TrustonCTAStrip,
} from "@/components/TrustonDevelopersSection";
import { PrimeEstateSection } from "@/components/PrimeEstateSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TrustOn — Billion Dollar Luxury Real Estate" },
      {
        name: "description",
        content: "Prime Estate by TrustOn — Jila Panchayat approved luxury township in Lucknow.",
      },
      { property: "og:title", content: "TrustOn — Own the Ground. Build the Legacy." },
      { property: "og:image", content: heroImg },
    ],
    links: [{ rel: "preload", as: "image", href: heroImg, fetchPriority: "high" } as never],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-[#04090f] text-foreground overflow-x-hidden">

      {/* ── Hero — Full-screen video ── */}
      <section className="relative h-screen bg-[#04090f] overflow-hidden">
        {/* Video background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay muted loop playsInline preload="metadata"
            className="w-full h-full object-cover"
            style={{ opacity: 0.88, transform: "translateZ(0)" }}
          >
            <source
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-05-22%20at%2010.03.14%20PM-QaTFrXd8V3Y9wkvJT59K1CIHabjmqa.mp4"
              type="video/mp4"
            />
          </video>
          {/* Multi-layer gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#04090f]/40 via-transparent to-[#04090f]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04090f]/60 via-transparent to-transparent" />
        </div>

        {/* Left-aligned editorial layout */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-28 px-8 md:px-16 lg:px-24 max-w-[1400px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow */}
            <motion.div
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <span className="w-10 h-px bg-[#00BFFF]" />
              <p className="text-[10px] md:text-[11px] text-[#00BFFF] uppercase font-bold tracking-[0.45em]">
                Begin Your Journey
              </p>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              className="font-serif text-6xl md:text-8xl lg:text-[10rem] text-white tracking-tighter leading-[0.85] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              TRUST<span style={{ color: "#00BFFF" }}>ON</span>
            </motion.h1>

            {/* Tagline + CTAs in a row */}
            <motion.div
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <div>
                <p className="text-white/50 text-sm md:text-base tracking-[0.35em] font-light uppercase mb-1">
                  Billion Dollar Legacy
                </p>
                <p className="text-white/25 text-xs font-light tracking-widest">
                  Lucknow's Premier Real Estate Development
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  className="px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] font-bold rounded-full transition-all duration-500 hover:scale-105 text-center"
                  style={{ background: "#00BFFF", color: "#04090f" }}
                >
                  Enquire Now →
                </Link>
                <a
                  href="tel:+919616061166"
                  className="px-8 py-3.5 border border-white/20 text-white/70 text-[11px] uppercase tracking-[0.2em] font-bold rounded-full hover:border-[#00BFFF] hover:text-[#00BFFF] transition-all duration-500 text-center"
                >
                  +91 96160-61166
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom decorative line */}
          <motion.div
            className="absolute bottom-0 left-8 md:left-16 lg:left-24 right-8 h-px bg-white/8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "left" }}
          />
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { duration: 1, delay: 2 },
            y: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 2 },
          }}
          onClick={() => document.getElementById("gallery-section")?.scrollIntoView({ behavior: "smooth" })}
          className="absolute bottom-10 right-8 md:right-16 lg:right-24 w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:border-[#00BFFF] hover:text-[#00BFFF] transition-colors duration-500 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </section>

      {/* Site Photography — Every detail, captured */}
      <GallerySection />

      {/* Stats Bar — after gallery */}
      <EnhancedStatsBar />

      {/* Prime Estate Project */}
      <PrimeEstateSection />

      {/* Services */}
      <TrustonServicesSection />

      {/* Intro Highlight */}
      <IntroHighlightSection />

      {/* Plots & Structures — CSS building scene */}
      <PlotsAndStructures />

      {/* Philosophy */}
      <PhilosophySection />

      {/* Why Truston */}
      <TrustonWhySection />

      {/* Wealth Calculator */}
      <WealthCalculator />

      {/* Marquee */}
      <Marquee />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Strip */}
      <TrustonCTAStrip />
    </div>
  );
}

/* ── Philosophy ───────────────────────────────────────────────────── */
function PhilosophySection() {
  return (
    <section className="py-24 px-6 bg-[#050b14] relative overflow-hidden">
      <Section3DBackground opacity={0.12} />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#00BFFF] font-bold mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-[#00BFFF]" /> Our Philosophy
            </p>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 leading-tight">
              Crafting <em className="text-[#00BFFF] italic">Timeless</em> Legacies
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              TrustOn stands at the intersection of architectural brilliance and strategic
              investment. We don&apos;t just sell plots; we provide the foundation for your future
              aspirations. Our commitment to quality and transparency ensures that every square
              foot you own is a testament to luxury.
            </p>
            <div className="flex gap-10">
              <div>
                <p className="text-3xl font-serif text-[#00BFFF] mb-2">100%</p>
                <p className="text-[10px] text-white/40 uppercase tracking-widest">Transparency</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-[#00BFFF] mb-2">Prime</p>
                <p className="text-[10px] text-white/40 uppercase tracking-widest">Locations</p>
              </div>
            </div>
          </Reveal>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="aspect-square flex items-center justify-center relative"
            >
              {/* Concentric rings */}
              {[280, 220, 160, 100].map((size, i) => (
                <motion.div
                  key={size}
                  className="absolute rounded-full border"
                  style={{
                    width: size,
                    height: size,
                    borderColor: `rgba(0,191,255,${0.08 - i * 0.015})`,
                  }}
                  animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: 20 + i * 8, repeat: Infinity, ease: "linear" }}
                />
              ))}
              {/* Center logo */}
              <div className="w-20 h-20 bg-[#00BFFF]/10 border border-[#00BFFF]/30 rounded-full flex items-center justify-center z-10">
                <span className="text-3xl font-serif text-[#00BFFF]">T</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Marquee ─────────────────────────────────────────────────────── */
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
  const items = [...words, ...words];
  return (
    <div className="border-y border-white/5 py-6 overflow-hidden relative" style={{ background: "#04090f" }}>
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "marquee-scroll 35s linear infinite", willChange: "transform" }}
      >
        {items.map((w, i) => (
          <span
            key={i}
            className="font-serif text-xl italic text-white/25 hover:text-[#00BFFF] transition-colors duration-500 cursor-default uppercase tracking-widest shrink-0 px-10"
          >
            {w} <span className="text-[#00BFFF] not-italic text-sm">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Stats Bar ─────────────────────────────────────────────────────── */
function EnhancedStatsBar() {
  const stats = [
    { num: 150, suffix: "+", label: "Premium Plots", icon: "◉", desc: "Carefully selected" },
    { num: 25, suffix: "%", label: "Land Appreciation", icon: "◆", desc: "Year-on-year growth" },
    { num: 5, suffix: "+", label: "Years of Trust", icon: "◎", desc: "Proven track record" },
    { num: 100, suffix: "%", label: "Legal Clearance", icon: "◈", desc: "Fully documented" },
  ];
  return (
    <section className="border-y border-white/5 px-6 relative overflow-hidden" style={{ background: "#04090f" }}>
      <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <motion.div
              whileHover={{ backgroundColor: "rgba(0,191,255,0.03)" }}
              className="group flex flex-col items-center py-14 px-6 text-center border-r border-white/5 last:border-0 cursor-default transition-all duration-500 relative"
            >
              <div className="absolute top-0 left-6 right-6 h-px bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full"
                  style={{ background: "#00BFFF" }}
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.15 }}
                />
              </div>
              <motion.span
                className="text-[#00BFFF]/30 text-2xl mb-5 group-hover:text-[#00BFFF] transition-colors duration-500"
                whileHover={{ scale: 1.3, rotate: 15 }}
              >
                {s.icon}
              </motion.span>
              <p className="font-serif text-4xl md:text-6xl text-white font-light leading-none tracking-tight">
                <CountUp to={s.num} suffix={s.suffix} />
              </p>
              <motion.div className="w-6 h-px bg-white/10 my-5 group-hover:w-12 group-hover:bg-[#00BFFF] transition-all duration-500" />
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/35 group-hover:text-[#00BFFF] transition-colors duration-500 font-bold">
                {s.label}
              </p>
              <p className="text-[10px] text-white/20 mt-2 group-hover:text-white/50 transition-colors duration-300">
                {s.desc}
              </p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
