import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { GalleryLightbox, type GalleryItem } from "@/components/GalleryLightbox";
import heroImg from "@/assets/hero-estate.jpg";
import { SobhaStyleHero } from "@/components/SobhaStyleHero";
import { Reveal, SectionEyebrow, CountUp } from "@/components/Reveal";
import { TextReveal, CharReveal } from "@/components/TextReveal";
import { Testimonials } from "@/components/Testimonials";
import { EnhancedDevelopersSection } from "@/components/DevelopersSection.Enhanced";
import { EnhancedGallerySection } from "@/components/GallerySection.Enhanced";
import { WhoWeAreSection } from "@/components/WhoWeAreSection";
import { FloatingImageScroll, SlideInOnScroll, BlurReveal, HighlightText } from "@/components/ScrollAnimations";

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
      {/* Hero Section */}
      <SobhaStyleHero
        height="full"
        title=""
        poster={heroImg}
        videoSources={[{ src: "/intro-video.mp4", type: "video/mp4" }]}
        alt="Aerial view of Prime Estate township at twilight"
      />

      {/* Who We Are Section */}
      <WhoWeAreSection />

      {/* Enhanced Developers Section with Floating Images */}
      <EnhancedDevelopersSection />

      {/* Enhanced Gallery Section */}
      <EnhancedGallerySection />

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
    <div className="bg-[var(--ink)] border-y border-white/5 py-5 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap marquee gap-16"
        animate={{ x: [0, -1000] }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(2)].map((_, k) => (
          <div key={k} className="flex gap-16 shrink-0">
            {words.map((w, i) => (
              <motion.span
                key={`${k}-${i}`}
                className="font-serif text-xl italic text-white/40 hover:text-white/70 transition-colors duration-500 cursor-default"
                whileHover={{ color: "rgba(255, 255, 255, 0.9)" }}
              >
                {w} <span className="text-[var(--bronze)] mx-5 not-italic text-sm">✦</span>
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
    <section className="bg-white border-b border-gray-100 px-6">
      <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <motion.div
              whileHover={{ backgroundColor: "oklch(0.98 0.004 240)" }}
              className="group flex flex-col items-center py-12 px-6 text-center border-r border-gray-100 last:border-0 cursor-default transition-all duration-300 relative hover:shadow-lg"
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

              {/* Icon */}
              <motion.span
                className="text-[var(--bronze)]/30 text-2xl mb-4 group-hover:text-[var(--bronze)]/60 transition-colors duration-500"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                {s.icon}
              </motion.span>

              {/* Counter */}
              <p className="font-display text-5xl md:text-6xl gradient-bronze-text font-bold leading-none">
                <CountUp to={s.num} suffix={s.suffix} />
              </p>

              {/* Divider */}
              <motion.div
                className="w-6 h-px bg-gray-200 my-4 group-hover:w-12 group-hover:bg-[var(--bronze)] transition-all duration-500"
              />

              {/* Label */}
              <p className="text-[11px] uppercase tracking-[0.25em] text-gray-400 group-hover:text-[var(--bronze)] transition-colors duration-500 font-semibold">
                {s.label}
              </p>

              {/* Description */}
              <p className="text-[10px] text-gray-500 mt-2 group-hover:text-gray-700 transition-colors duration-300">
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
  const textY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 px-6 overflow-hidden bg-gradient-to-br from-ink via-ink/95 to-ink"
    >
      {/* Animated Background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 opacity-5 pointer-events-none"
      >
        <div className="absolute top-20 right-20 w-96 h-96 bg-bronze rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-bronze rounded-full blur-3xl" />
      </motion.div>

      <div className="mx-auto max-w-4xl relative z-10 text-center">
        <BlurReveal>
          <motion.h2
            style={{ y: textY }}
            className="typography-hero text-white mb-6"
          >
            Ready to Build Your <HighlightText highlightColor="var(--bronze)">Legacy</HighlightText>?
          </motion.h2>
        </BlurReveal>

        <SlideInOnScroll direction="up" delay={0.2}>
          <p className="typography-body-light text-lg md:text-xl mb-8 leading-relaxed">
            Join thousands of satisfied investors who have chosen TrustOn for their real estate investments. Experience transparency, growth, and excellence.
          </p>
        </SlideInOnScroll>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(45, 107, 196, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-bronze text-white font-bold rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg"
          >
            Get Started Today
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 border-2 border-bronze text-bronze font-bold rounded-lg hover:bg-bronze/10 transition-all duration-300"
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-12 flex flex-wrap justify-center gap-6 text-white/70 text-sm"
        >
          <div className="flex items-center gap-2">
            <span className="text-bronze text-xl">✓</span> Jila Panchayat Approved
          </div>
          <div className="flex items-center gap-2">
            <span className="text-bronze text-xl">✓</span> 100% Legal Clearance
          </div>
          <div className="flex items-center gap-2">
            <span className="text-bronze text-xl">✓</span> Transparent Documentation
          </div>
        </motion.div>
      </div>
    </section>
  );
}


