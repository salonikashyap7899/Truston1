import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-estate.jpg";
import { Reveal, SectionEyebrow, CountUp } from "@/components/Reveal";
import { Testimonials } from "@/components/Testimonials";
import { IntroHighlightSection } from "@/components/IntroHighlightSection";
import { PlotsAndStructures } from "@/components/PlotsAndStructures";
import { Section3DBackground } from "@/components/Section3DBackground";
import {
  TrustonServicesSection,
  TrustonWhySection,
  TrustonCTAStrip,
} from "@/components/TrustonDevelopersSection";
import { PrimeEstateSection } from "@/components/PrimeEstateSection";
import { WhoWeAreSection } from "@/components/WhoWeAreSection";
import { GallerySection } from "@/components/GallerySection";

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

        {/* Center-aligned hero layout */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 md:px-16 max-w-[1200px] mx-auto w-full">
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Main headline */}
            <motion.h1
              className="font-serif text-5xl md:text-7xl lg:text-8xl text-white tracking-tighter leading-[0.85] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              TRUST<span style={{ color: "#00BFFF" }}>ON</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="text-white/60 text-base md:text-lg font-light tracking-widest uppercase mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.75 }}
            >
              Own the Ground. Build the Legacy.
            </motion.p>

            <motion.p
              className="text-white/30 text-sm font-light max-w-xl mx-auto leading-relaxed mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              Curated land, architectural mastery and construction excellence — under one roof.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              <Link
                to="/contact"
                className="px-10 py-4 text-[11px] uppercase tracking-[0.2em] font-bold rounded-full transition-all duration-500 hover:scale-105"
                style={{ background: "#00BFFF", color: "#04090f" }}
              >
                Enquire Now →
              </Link>
              <a
                href="tel:+919616061166"
                className="px-10 py-4 border border-white/20 text-white/75 text-[11px] uppercase tracking-[0.2em] font-bold rounded-full hover:border-[#00BFFF] hover:text-[#00BFFF] transition-all duration-500"
              >
                +91 96160-61166
              </a>
            </motion.div>
          </motion.div>

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

      {/* Who We Are */}
      <WhoWeAreSection />

      {/* Prime Estate Project */}
      <div className="pb-12 md:pb-20 bg-[#0F0F0D]">
        <PrimeEstateSection />
      </div>

      {/* Gallery Section — Moved here as per request */}
      <div className="-mt-1">
        <GallerySection />
      </div>

      {/* Stats Bar */}
      <div className="-mt-1">
        <EnhancedStatsBar />
      </div>

      {/* Services (Four Pillars) */}
      <TrustonServicesSection />

      {/* Philosophy — Moved here as per request (third image section) */}
      <PhilosophySection />

      {/* Why Truston */}
      <TrustonWhySection />

      {/* Intro Highlight */}
      <IntroHighlightSection />

      {/* Plots & Structures — CSS building scene */}
      <PlotsAndStructures />

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
    <section className="py-28 md:py-36 px-6 bg-[#050b14] relative overflow-hidden">
      <Section3DBackground opacity={0.10} />

      {/* Subtle top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00BFFF]/30 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Left: Text ── */}
          <Reveal>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-[#00BFFF]" />
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#00BFFF] font-bold">
                Our Philosophy
              </p>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-[1.1] tracking-tight">
              Crafting{" "}
              <em className="text-[#00BFFF] italic font-light">Timeless</em>
              <br />
              Legacies
            </h2>

            {/* Divider */}
            <div className="w-16 h-px bg-[#00BFFF]/30 mb-8" />

            {/* Body */}
            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-4 font-light">
              TrustOn stands at the intersection of architectural brilliance and strategic
              investment. We don&apos;t just sell plots; we provide the foundation for your
              future aspirations.
            </p>
            <p className="text-white/40 text-base leading-relaxed mb-10 font-light">
              Our commitment to quality and transparency ensures that every square foot you
              own is a testament to enduring luxury — built to outlast trends and appreciate
              with time.
            </p>

            {/* Stats row */}
            <div className="flex items-stretch divide-x divide-white/10 border border-white/[0.07] rounded-2xl overflow-hidden">
              {[
                { val: "100%", label: "Transparency" },
                { val: "Prime", label: "Locations" },
                { val: "5+", label: "Years of Trust" },
              ].map((s) => (
                <div key={s.label} className="flex-1 px-6 py-5 text-center">
                  <p className="text-2xl md:text-3xl font-serif text-[#00BFFF] leading-none mb-1">
                    {s.val}
                  </p>
                  <p className="text-[9px] uppercase tracking-[0.35em] text-white/35 font-bold">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* ── Right: Image ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Glow */}
            <div className="absolute -inset-6 bg-[#00BFFF]/5 blur-3xl rounded-3xl pointer-events-none" />

            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden border border-white/5 shadow-2xl aspect-[4/3]">
              <img
                src="/assets/aerial-township.jpg"
                alt="Prime Estate — Aerial Township"
                className="w-full h-full object-cover brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050b14]/70 via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-5 -left-5 bg-[#050b14] border border-[#00BFFF]/25 rounded-2xl px-6 py-4 shadow-xl backdrop-blur-xl">
              <p className="font-serif text-xl text-[#00BFFF] leading-none mb-1">₹12L+</p>
              <p className="text-[9px] uppercase tracking-[0.35em] text-white/35 font-bold">
                Starting Unit
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Subtle bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
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
  const items = [...words, ...words, ...words];
  return (
    <div className="border-y border-white/5 py-8 overflow-hidden relative" style={{ background: "#04090f" }}>
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
