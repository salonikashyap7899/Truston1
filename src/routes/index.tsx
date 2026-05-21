import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/hero-estate.jpg";
import { SobhaStyleHero } from "@/components/SobhaStyleHero";
import { Reveal, CountUp } from "@/components/Reveal";
import { Testimonials } from "@/components/Testimonials";
import { EnhancedDevelopersSection } from "@/components/DevelopersSection.Enhanced";
import { EnhancedGallerySection } from "@/components/GallerySection.Enhanced";
import { WhoWeAreSection } from "@/components/WhoWeAreSection";
import { SobhaCitySection } from "@/components/SobhaCitySection";
import { SobhaPillarsSection } from "@/components/SobhaPillarsSection";
import { AmenitiesMarquee } from "@/components/AmenitiesMarquee";
import { SlideInOnScroll, BlurReveal, HighlightText } from "@/components/ScrollAnimations";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { SplitTextReveal } from "@/components/animations/SplitTextReveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TrustOn - Own the Ground. Build the Legacy." },
      {
        name: "description",
        content: "Prime Estate by TrustOn - Jila Panchayat approved luxury township in Lucknow.",
      },
      { property: "og:title", content: "TrustOn - Own the Ground. Build the Legacy." },
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
        eyebrow="Lucknow's Premier Developer"
        title=""
        poster={heroImg}
        videoSources={[{ src: "/intro-video.mp4", type: "video/mp4" }]}
        alt="Aerial view of Prime Estate township at twilight"
      />

      <SobhaCitySection />
      <WhoWeAreSection />
      <SobhaPillarsSection />
      <EnhancedDevelopersSection />
      <AmenitiesMarquee />
      <EnhancedGallerySection />
      <Marquee />
      <EnhancedStatsBar />
      <Testimonials />
      <CTASection />
    </div>
  );
}

function Marquee() {
  const words = [
    "Prime Estate - Lucknow",
    "Jila Panchayat Approved",
    "Clear Title Deeds",
    "Residential Plot Colony",
    "Dubagga Growth Corridor",
    "Plot Selling - Construction - Architecture",
    "Investment Consultancy",
    "Wide Internal Roads",
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
            {words.map((word, i) => (
              <motion.span
                key={`${k}-${i}`}
                className="font-serif text-xl italic text-white/40 hover:text-white/70 transition-colors duration-500 cursor-default"
                whileHover={{ color: "rgba(255, 255, 255, 0.9)" }}
              >
                {word} <span className="text-[var(--bronze)] mx-5 not-italic text-sm">/</span>
              </motion.span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function EnhancedStatsBar() {
  const stats = [
    {
      num: 120,
      suffix: "+",
      label: "Total Plots",
      icon: "01",
      desc: "Masterplanned inventory",
    },
    {
      num: 47,
      suffix: "",
      label: "Available Now",
      icon: "02",
      desc: "Current live availability",
    },
    {
      num: 2400,
      suffix: "",
      label: "Sq. Ft Range",
      icon: "03",
      desc: "Spacious residential plots",
    },
    {
      num: 12,
      prefix: "Rs ",
      suffix: "L+",
      label: "Starting Price",
      icon: "04",
      desc: "Transparent from day one",
    },
  ];

  return (
    <section className="bg-white border-b border-gray-100 px-6">
      <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.1}>
            <motion.div
              whileHover={{ backgroundColor: "oklch(0.98 0.004 240)" }}
              className="group flex flex-col items-center py-12 px-6 text-center border-r border-gray-100 last:border-0 cursor-default transition-all duration-300 relative hover:shadow-lg"
            >
              <div className="absolute top-0 left-6 right-6 h-px bg-gray-100 overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--bronze)]"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.15 }}
                />
              </div>

              <motion.span
                className="text-[var(--bronze)]/40 text-xs font-semibold tracking-[0.35em] uppercase mb-4 group-hover:text-[var(--bronze)]/70 transition-colors duration-500"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                {stat.icon}
              </motion.span>

              <p className="font-display text-5xl md:text-6xl gradient-bronze-text font-bold leading-none">
                {stat.prefix ? <span>{stat.prefix}</span> : null}
                <CountUp to={stat.num} suffix={stat.suffix} />
              </p>

              <motion.div className="w-6 h-px bg-gray-200 my-4 group-hover:w-12 group-hover:bg-[var(--bronze)] transition-all duration-500" />

              <p className="text-[11px] uppercase tracking-[0.25em] text-gray-400 group-hover:text-[var(--bronze)] transition-colors duration-500 font-semibold">
                {stat.label}
              </p>

              <p className="text-[10px] text-gray-500 mt-2 group-hover:text-gray-700 transition-colors duration-300">
                {stat.desc}
              </p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

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
      <motion.div style={{ y: bgY }} className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-bronze rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-bronze rounded-full blur-3xl" />
      </motion.div>

      <div className="mx-auto max-w-4xl relative z-10 text-center">
        <BlurReveal>
          <SplitTextReveal
            type="words"
            delay={0.1}
            text={
              <motion.h2 style={{ y: textY }} className="typography-hero text-white mb-6">
                Ready to Claim Your{" "}
                <HighlightText highlightColor="var(--bronze)">Plot</HighlightText>?
              </motion.h2>
            }
          />
        </BlurReveal>

        <SlideInOnScroll direction="up" delay={0.2}>
          <p className="typography-body-light text-lg md:text-xl mb-8 leading-relaxed">
            Prices starting at Rs 12 Lakhs. Talk to our team today - no obligations, just complete
            clarity about your investment.
          </p>
        </SlideInOnScroll>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <MagneticButton>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-bronze text-white font-bold rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg"
            >
              Book Free Consultation
            </Link>
          </MagneticButton>
          <MagneticButton>
            <a
              href="tel:+919616061166"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-bronze text-bronze font-bold rounded-lg hover:bg-bronze/10 transition-all duration-300"
            >
              +91 96160-61166
            </a>
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-12 flex flex-wrap justify-center gap-6 text-white/70 text-sm"
        >
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-bronze" />
            47 Plots Currently Available
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-bronze" />
            Jila Panchayat Approved
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-bronze" />
            Clear Title Deeds
          </div>
        </motion.div>
      </div>
    </section>
  );
}
