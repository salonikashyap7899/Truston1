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
import { Services3DSection } from "@/components/Services3DSection";
import { IntroHighlightSection } from "@/components/IntroHighlightSection";
import { Projects3DShowcase } from "@/components/Projects3DShowcase";
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
    links: [{ rel: "preload", as: "image", href: heroImg, fetchpriority: "high" } as never],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      {/* Hero Section */}
      <SobhaStyleHero
        height="full"
        title="Architecture of the Future"
        subtitle="Experience the pinnacle of luxury living with Lucknow's premier developer."
        poster={heroImg}
        videoSources={[{ src: "/intro-video.mp4", type: "video/mp4" }]}
        alt="Aerial view of Prime Estate township at twilight"
      />

      {/* Intro Highlight Section */}
      <IntroHighlightSection />

      {/* Who We Are Section */}
      <WhoWeAreSection />

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
