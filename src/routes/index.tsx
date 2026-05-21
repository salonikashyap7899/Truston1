import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/hero-estate.jpg";

// Premium components
import { PremiumHero } from "@/components/PremiumHero";
import { PillarsSection } from "@/components/PillarsSection";
import { PropertiesCarousel } from "@/components/PropertiesCarousel";
import { WhoWeAreSection } from "@/components/WhoWeAreSection";
import { Reveal, SectionEyebrow, CountUp } from "@/components/Reveal";
import { Testimonials } from "@/components/Testimonials";

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
      {/* Premium Cinematic Hero */}
      <PremiumHero 
        poster={heroImg}
        videoSrc="/intro-video.mp4"
      />

      {/* Who We Are - Sobha Style Floating Card */}
      <WhoWeAreSection />

      {/* Pillars Section - "From Concept to Completion" */}
      <PillarsSection />

      {/* Properties Carousel */}
      <PropertiesCarousel />

      {/* Press Releases / News Section */}
      <PressReleasesSection />

      {/* Enhanced Stats Bar */}
      <EnhancedStatsBar />

      {/* Testimonials */}
      <Testimonials />

      {/* Final CTA Section */}
      <CTASection />
    </div>
  );
}

/* ── Press Releases Section (Sobha Style) ────────────────────────── */
function PressReleasesSection() {
  const pressItems = [
    {
      date: "Jan 2026",
      title: "TrustOn Launches Prime Estate Phase II",
      excerpt: "Expanding our flagship township with 50 new premium plots in Lucknow.",
      image: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/aerial-photography-chinese-city-600x800.jpg",
    },
    {
      date: "Dec 2025",
      title: "Record Sales in Q4 2025",
      excerpt: "TrustOn achieves milestone with highest quarterly sales in company history.",
      image: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/luxury-interior-design-600x800.jpg",
    },
    {
      date: "Nov 2025",
      title: "Excellence in Real Estate Award",
      excerpt: "Recognized for outstanding contribution to luxury real estate development.",
      image: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/hero-estate-600x800.jpg",
    },
  ];

  return (
    <section className="py-32 md:py-40 px-6 bg-white">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <Reveal>
          <SectionEyebrow>Latest Updates</SectionEyebrow>
        </Reveal>
        
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-8 mb-16">
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[var(--ink)] leading-[1.1]">
              Press <span className="text-[var(--bronze)]">Releases</span>
            </h2>
          </Reveal>
          
          <Reveal delay={0.2}>
            <Link
              to="/about-us"
              className="inline-flex items-center gap-2 text-[var(--bronze)] font-semibold text-sm uppercase tracking-widest hover:gap-3 transition-all duration-300"
            >
              View All
              <span>&rarr;</span>
            </Link>
          </Reveal>
        </div>

        {/* Press Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pressItems.map((item, idx) => (
            <Reveal key={idx} delay={idx * 0.1} direction="up">
              <motion.article
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden mb-6">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--bronze)] font-semibold">
                  {item.date}
                </span>
                <h3 className="font-display text-xl md:text-2xl text-[var(--ink)] mt-3 mb-3 group-hover:text-[var(--bronze)] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.excerpt}
                </p>

                {/* Underline */}
                <motion.div
                  className="h-px bg-[var(--bronze)] mt-6 origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 0.3 }}
                  whileHover={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                />
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Enhanced Stats Bar with Rich Animations ──────────────────────── */
function EnhancedStatsBar() {
  const stats = [
    { num: 150, suffix: "+", label: "Premium Plots", desc: "Carefully selected" },
    { num: 25, suffix: "%", label: "Land Appreciation", desc: "Year-on-year growth" },
    { num: 5, suffix: "+", label: "Years of Trust", desc: "Proven track record" },
    { num: 100, suffix: "%", label: "Legal Clearance", desc: "Fully documented" },
  ];

  return (
    <section className="bg-[var(--ink)] border-y border-white/5 px-6">
      <div className="mx-auto max-w-[1400px] grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <motion.div
              whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
              className="group flex flex-col items-center py-16 px-6 text-center border-r border-white/5 last:border-0 cursor-default transition-all duration-300 relative"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-6 right-6 h-px bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--bronze)]"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.15 }}
                />
              </div>

              {/* Counter */}
              <p className="font-display text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-none">
                <CountUp to={s.num} suffix={s.suffix} />
              </p>

              {/* Divider */}
              <motion.div
                className="w-8 h-px bg-white/20 my-6 group-hover:w-16 group-hover:bg-[var(--bronze)] transition-all duration-500"
              />

              {/* Label */}
              <p className="text-[11px] uppercase tracking-[0.25em] text-white/50 group-hover:text-[var(--bronze)] transition-colors duration-500 font-semibold">
                {s.label}
              </p>

              {/* Description */}
              <p className="text-[10px] text-white/30 mt-2 group-hover:text-white/50 transition-colors duration-300">
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
    <section
      ref={ref}
      className="relative py-32 md:py-40 px-6 overflow-hidden bg-gradient-to-br from-[var(--ink)] via-[var(--ink)] to-[var(--ink)]"
    >
      {/* Animated Background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 opacity-10 pointer-events-none"
      >
        <div className="absolute top-20 right-20 w-[600px] h-[600px] bg-[var(--bronze)] rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-[var(--bronze)] rounded-full blur-3xl" />
      </motion.div>

      {/* Grid Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.02]">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-white"
            style={{ left: `${(i + 1) * (100 / 9)}%` }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-4xl relative z-10 text-center">
        <Reveal>
          <SectionEyebrow light>Get Started</SectionEyebrow>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-white mb-8 leading-[1.1]">
            Ready to Build Your{" "}
            <span className="text-[var(--bronze)]">Legacy</span>?
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-lg md:text-xl text-white/60 mb-12 leading-relaxed max-w-2xl mx-auto">
            Join thousands of satisfied investors who have chosen TrustOn for their real estate investments. Experience transparency, growth, and excellence.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 bg-white text-[var(--ink)] font-semibold text-[11px] uppercase tracking-[0.2em] hover:bg-[var(--bronze)] hover:text-white transition-all duration-500"
            >
              Get Started Today
            </motion.a>
            <motion.a
              href="tel:+919616061166"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 border border-white/30 text-white font-semibold text-[11px] uppercase tracking-[0.2em] hover:bg-white/10 hover:border-white transition-all duration-500"
            >
              Call: +91 96160-61166
            </motion.a>
          </div>
        </Reveal>

        {/* Trust Badges */}
        <Reveal delay={0.4}>
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-white/40 text-[11px] uppercase tracking-[0.15em]">
            <div className="flex items-center gap-3">
              <span className="text-[var(--bronze)]">&#10003;</span> Jila Panchayat Approved
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[var(--bronze)]">&#10003;</span> 100% Legal Clearance
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[var(--bronze)]">&#10003;</span> Transparent Documentation
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
