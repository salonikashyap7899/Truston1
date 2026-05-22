import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { GalleryLightbox, type GalleryItem } from "@/components/GalleryLightbox";
import heroImg from "@/assets/hero-estate.jpg";
import { SobhaStyleHero } from "@/components/SobhaStyleHero";
import { Reveal, SectionEyebrow, CountUp } from "@/components/Reveal";
import { TextReveal, CharReveal } from "@/components/TextReveal";
import { Testimonials } from "@/components/Testimonials";
import { WealthCalculator } from "@/components/WealthCalculator";
import { EnhancedDevelopersSection } from "@/components/DevelopersSection.Enhanced";
import { EnhancedGallerySection } from "@/components/GallerySection.Enhanced";
import { WhoWeAreSection } from "@/components/WhoWeAreSection";
import { WhoWeAre } from "@/components/WhoWeAre";
import { Services3DSection } from "@/components/Services3DSection";
import { IntroHighlightSection } from "@/components/IntroHighlightSection";
import { Projects3DShowcase } from "@/components/Projects3DShowcase";
import { PlotsAndStructures } from "@/components/PlotsAndStructures";
import {
  FloatingImageScroll,
  SlideInOnScroll,
  BlurReveal,
  HighlightText,
} from "@/components/ScrollAnimations";
import { LuxuryHighlights } from "@/components/LuxuryHighlights";
import { Section3DBackground } from "@/components/Section3DBackground";

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
    <div className="bg-background text-foreground overflow-x-hidden">
      {/* Hero Section with Video Background - Extended for scroll overlay */}
      <section className="relative min-h-[200vh] bg-[var(--ink)] overflow-hidden">
        {/* Fixed Background Intro Video */}
        <div className="fixed inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{ opacity: 0.7 }}
          >
            <source
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-05-22%20at%2010.03.14%20PM-QaTFrXd8V3Y9wkvJT59K1CIHabjmqa.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--ink)]/60 via-[var(--ink)]/30 to-[var(--ink)]/80" />
        </div>

        {/* Hero Content - Centered at top */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 tracking-tight"
            >
              TRUST<span className="text-[#00BFFF]">ON</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-white/60 text-sm md:text-lg tracking-[0.3em] font-light uppercase"
            >
              Billion Dollar Legacy
            </motion.p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ 
              opacity: { duration: 1, delay: 1 },
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute bottom-12 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-[#00BFFF] hover:text-[#00BFFF] transition-colors duration-500 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </div>

        {/* Who We Are Section - Overlays on video with scroll animation */}
        <div className="relative z-10">
          <WhoWeAre />
        </div>
      </section>

      {/* 3. Intro Highlight Section */}
      <IntroHighlightSection />

      {/* 4. Building Plots & Structures */}
      <PlotsAndStructures />

      {/* Philosophy Section - Darkened and Refined */}
      <section className="py-24 px-6 bg-[var(--ink)] relative overflow-hidden">
        <Section3DBackground opacity={0.15} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 leading-tight">
                Crafting <em className="text-luxe-cyan italic">Timeless</em> Legacies
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                TrustOn stands at the intersection of architectural brilliance and strategic
                investment. We don't just sell plots; we provide the foundation for your future
                aspirations. Our commitment to quality and transparency ensures that every square
                foot you own is a testament to luxury.
              </p>
              <div className="flex gap-8">
                <div>
                  <p className="text-3xl font-serif text-luxe-cyan mb-2">100%</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">
                    Transparency
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-serif text-luxe-cyan mb-2">Prime</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Locations</p>
                </div>
              </div>
            </Reveal>
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="aspect-square bg-gradient-to-br from-luxe-cyan/10 to-transparent rounded-full flex items-center justify-center border border-white/5"
              >
                <div className="w-3/4 h-3/4 bg-white/5 backdrop-blur-3xl rounded-full border border-white/10 flex items-center justify-center text-white/10 text-9xl font-serif">
                  T
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Futuristic Projects Showcase - This contains "Prime Estate" masterpieces */}
      <Projects3DShowcase />

      {/* MOVING Luxury Highlights Section — after Prime state (Projects Showcase) */}
      <LuxuryHighlights />

      {/* Futuristic Services Section */}
      <Services3DSection />

      {/* Enhanced Developers Section with Floating Images */}
      <EnhancedDevelopersSection />

      {/* Enhanced Gallery Section */}
      <EnhancedGallerySection />

      {/* Wealth Calculator */}
      <WealthCalculator />

      {/* Marquee */}
      <Marquee />

      {/* Enhanced Stats Bar */}
      <EnhancedStatsBar />

      {/* Testimonials */}
      <Testimonials />

      {/* Call to Action Section */}
      <CTASection />
    </div>
  );
}

/* ── Enhanced Marquee with Floating Text ─────────────────────────── */
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
    <div className="bg-ink border-y border-white/5 py-8 overflow-hidden relative">
      <motion.div
        className="flex whitespace-nowrap marquee gap-24"
        animate={{ x: [0, -1200] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(2)].map((_, k) => (
          <div key={k} className="flex gap-24 shrink-0">
            {words.map((w, i) => (
              <motion.span
                key={`${k}-${i}`}
                className="font-display text-2xl italic text-white/30 hover:text-luxe-cyan transition-colors duration-500 cursor-default uppercase tracking-widest"
              >
                {w} <span className="text-luxe-cyan mx-8 not-italic text-sm">✦</span>
              </motion.span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Enhanced Stats Bar with Rich Animations ──────────────────────── */
function EnhancedStatsBar() {
  const stats = [
    { num: 150, suffix: "+", label: "Premium Plots", icon: "◉", desc: "Carefully selected" },
    { num: 25, suffix: "%", label: "Land Appreciation", icon: "◆", desc: "Year-on-year growth" },
    { num: 5, suffix: "+", label: "Years of Trust", icon: "◎", desc: "Proven track record" },
    { num: 100, suffix: "%", label: "Legal Clearance", icon: "◈", desc: "Fully documented" },
  ];
  return (
    <section className="bg-background border-y border-white/5 px-6 relative overflow-hidden">
      <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <motion.div
              whileHover={{ backgroundColor: "rgba(100, 200, 255, 0.03)" }}
              className="group flex flex-col items-center py-16 px-8 text-center border-r border-white/5 last:border-0 cursor-default transition-all duration-500 relative"
            >
              {/* Top accent line animate */}
              <div className="absolute top-0 left-8 right-8 h-px bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full bg-luxe-cyan"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.15 }}
                />
              </div>

              {/* Icon */}
              <motion.span
                className="text-luxe-cyan/30 text-3xl mb-6 group-hover:text-luxe-cyan transition-colors duration-500"
                whileHover={{ scale: 1.3, rotate: 15 }}
              >
                {s.icon}
              </motion.span>

              {/* Counter */}
              <p className="font-display text-5xl md:text-7xl text-white font-bold leading-none tracking-tighter">
                <CountUp to={s.num} suffix={s.suffix} />
              </p>

              {/* Divider */}
              <motion.div className="w-8 h-px bg-white/10 my-6 group-hover:w-16 group-hover:bg-luxe-cyan transition-all duration-500" />

              {/* Label */}
              <p className="text-[11px] uppercase tracking-[0.4em] text-white/30 group-hover:text-luxe-cyan transition-colors duration-500 font-bold">
                {s.label}
              </p>

              {/* Description */}
              <p className="text-[10px] text-white/20 mt-3 group-hover:text-white/50 transition-colors duration-300 font-medium">
                {s.desc}
              </p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Call to Action Section ──────────────────────────────────────── */
function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} className="relative py-32 md:py-48 px-6 overflow-hidden bg-ink">
      <Section3DBackground opacity={0.2} />

      {/* Animated Background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 right-20 w-[800px] h-[800px] bg-luxe-blue rounded-full blur-[150px]" />
        <div className="absolute bottom-20 left-20 w-[800px] h-[800px] bg-luxe-cyan rounded-full blur-[150px]" />
      </motion.div>

      <div className="mx-auto max-w-5xl relative z-10 text-center">
        <BlurReveal>
          <h2 className="font-display text-5xl md:text-8xl text-white mb-8 tracking-tighter leading-none">
            Ready to Build Your <br />
            <em className="text-luxe-cyan italic font-serif">Legacy?</em>
          </h2>
        </BlurReveal>

        <SlideInOnScroll direction="up" delay={0.2}>
          <p className="text-white/40 text-lg md:text-2xl mb-12 leading-relaxed font-light max-w-2xl mx-auto">
            Join the global circle of elite investors who have chosen TrustOn for their strategic
            real estate acquisitions.
          </p>
        </SlideInOnScroll>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <button className="btn-magnetic btn-luxe px-12 py-5">Secure Consultation</button>
          <button className="px-12 py-5 border border-white/10 text-white/50 font-bold rounded-full hover:border-luxe-cyan hover:text-luxe-cyan transition-all duration-500 text-[11px] uppercase tracking-widest">
            Private Portfolio
          </button>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-20 flex flex-wrap justify-center gap-10 text-white/30 text-[10px] uppercase tracking-[0.3em] font-bold"
        >
          <div className="flex items-center gap-3 group">
            <span className="text-luxe-cyan text-xl group-hover:scale-125 transition-transform">
              ✓
            </span>{" "}
            Jila Panchayat Approved
          </div>
          <div className="flex items-center gap-3 group">
            <span className="text-luxe-cyan text-xl group-hover:scale-125 transition-transform">
              ✓
            </span>{" "}
            100% Legal Clearance
          </div>
          <div className="flex items-center gap-3 group">
            <span className="text-luxe-cyan text-xl group-hover:scale-125 transition-transform">
              ✓
            </span>{" "}
            Transparent Documentation
          </div>
        </motion.div>
      </div>
    </section>
  );
}
