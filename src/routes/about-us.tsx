import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import interiorImg from "@/assets/luxury-interior.jpg";
import natureImg from "@/assets/hero-estate.jpg";
import qualityImg from "@/assets/project-prime.jpg";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "About Us — TrustOn Premium Estate" },
      {
        name: "description",
        content: "Experience the ultimate luxury lifestyle with TrustOn Premium Estate.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="bg-[#0A192F] text-white overflow-x-hidden selection:bg-luxe-cyan selection:text-black">
      {/* Immersive Intro Reveal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="fixed inset-0 pointer-events-none z-50 bg-[#0A192F] flex items-center justify-center animate-out fade-out fill-mode-forwards duration-1000 delay-700"
      >
        <motion.h1
          initial={{ letterSpacing: "0.5em", opacity: 0, filter: "blur(10px)" }}
          animate={{ letterSpacing: "1em", opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-white text-xs font-bold uppercase tracking-[1em]"
        >
          TRUSTON
        </motion.h1>
      </motion.div>

      {/* 01 Lifestyle Section */}
      <LifestyleSection />

      {/* 02 Nature Section */}
      <NatureSection />

      {/* 03 Quality Section */}
      <QualitySection />
    </div>
  );
}

function LifestyleSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center py-24 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
        {/* Large Image on the Left */}
        <div className="lg:col-span-7 relative">
          <motion.div
            style={{ y: yImage }}
            className="aspect-[4/5] md:aspect-[16/10] overflow-hidden rounded-2xl shadow-2xl border border-white/5"
          >
            <img
              src={interiorImg}
              alt="Luxury Lifestyle"
              className="w-full h-full object-cover scale-110"
            />
          </motion.div>
          {/* Decorative 3D elements */}
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-luxe-cyan/10 blur-[100px] rounded-full" />
        </div>

        {/* Content on the Right */}
        <div className="lg:col-span-5 relative z-10">
          <motion.div style={{ y: yText }}>
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-8xl md:text-[12rem] font-serif text-luxe-cyan/20 leading-none">
                01
              </span>
              <span className="text-luxe-cyan font-bold tracking-[0.5em] uppercase text-xs">
                Lifestyle
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-[0.9] tracking-tighter">
              Redefining <br />
              <em className="text-luxe-cyan italic">Modern Living</em>
            </h2>

            <p className="text-white/50 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-md">
              At TrustOn, we believe your home should be an extension of your soul. Every corner of
              our developments is designed with a "Quality First" philosophy, ensuring a lifestyle
              that is as premium as it is purposeful.
            </p>

            <Link
              to="/"
              className="inline-flex items-center gap-4 text-xs font-bold tracking-[0.3em] uppercase group"
            >
              <span className="w-12 h-px bg-white/20 group-hover:w-20 group-hover:bg-luxe-cyan transition-all duration-500" />
              BACK TO HOME
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Floating 3D Background Text */}
      <div className="absolute top-1/4 right-0 pointer-events-none opacity-[0.02] select-none translate-x-1/3">
        <h2 className="text-[20rem] font-serif leading-none">LIFESTYLE</h2>
      </div>
    </section>
  );
}

function QualitySection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center py-24 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
        {/* Large Image on the Left */}
        <div className="lg:col-span-7 relative">
          <motion.div
            style={{ y: yImage }}
            className="aspect-[4/5] md:aspect-[16/10] overflow-hidden rounded-2xl shadow-2xl border border-white/5"
          >
            <img
              src={qualityImg}
              alt="Quality Craftsmanship"
              className="w-full h-full object-cover scale-110"
            />
          </motion.div>
          {/* Decorative 3D elements */}
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-luxe-cyan/10 blur-[100px] rounded-full" />
        </div>

        {/* Content on the Right */}
        <div className="lg:col-span-5 relative z-10">
          <motion.div style={{ y: yText }}>
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-8xl md:text-[12rem] font-serif text-luxe-cyan/20 leading-none">
                03
              </span>
              <span className="text-luxe-cyan font-bold tracking-[0.5em] uppercase text-xs">
                Quality
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-[0.9] tracking-tighter">
              Crafted for <br />
              <em className="text-luxe-cyan italic">The Generations</em>
            </h2>

            <p className="text-white/50 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-md">
              Quality is not an act, it is a habit. From Jila Panchayat approval to the finest
              architectural details, we ensure that every TrustOn project stands as a legacy for you
              and your family.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center gap-4 text-xs font-bold tracking-[0.3em] uppercase group"
            >
              <span className="w-12 h-px bg-white/20 group-hover:w-20 group-hover:bg-luxe-cyan transition-all duration-500" />
              START YOUR LEGACY
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Floating 3D Background Text */}
      <div className="absolute top-1/4 right-0 pointer-events-none opacity-[0.02] select-none translate-x-1/3">
        <h2 className="text-[20rem] font-serif leading-none">QUALITY</h2>
      </div>
    </section>
  );
}

function NatureSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center py-24 px-6 md:px-12 overflow-hidden bg-white/5"
    >
      <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
        {/* Content on the Left */}
        <div className="lg:col-span-5 order-2 lg:order-1 relative z-10">
          <motion.div style={{ y: yText }} className="lg:text-right">
            <div className="flex items-baseline gap-4 mb-6 lg:justify-end">
              <span className="text-luxe-cyan font-bold tracking-[0.5em] uppercase text-xs">
                Nature
              </span>
              <span className="text-8xl md:text-[12rem] font-serif text-luxe-cyan/20 leading-none">
                02
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-[0.9] tracking-tighter">
              Harmony with <br />
              <em className="text-luxe-cyan italic">The Earth</em>
            </h2>

            <p className="text-white/50 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-md lg:ml-auto">
              We curate landscapes that breathe. Our projects integrate lush greenery and
              sustainable architecture to create a sanctuary where urban luxury meets the
              tranquility of nature.
            </p>

            <Link
              to="/"
              className="inline-flex items-center gap-4 text-xs font-bold tracking-[0.3em] uppercase group lg:flex-row-reverse"
            >
              <span className="w-12 h-px bg-white/20 group-hover:w-20 group-hover:bg-luxe-cyan transition-all duration-500" />
              OUR COMMUNITIES
            </Link>
          </motion.div>
        </div>

        {/* Large Image on the Right */}
        <div className="lg:col-span-7 order-1 lg:order-2 relative">
          <motion.div
            style={{ y: yImage }}
            className="aspect-[4/5] md:aspect-[16/10] overflow-hidden rounded-2xl shadow-2xl border border-white/5"
          >
            <img
              src={natureImg}
              alt="Nature Harmony"
              className="w-full h-full object-cover scale-110"
            />
          </motion.div>
          {/* Decorative 3D elements */}
          <div className="absolute top-12 left-12 w-64 h-64 bg-luxe-blue/10 blur-[100px] rounded-full" />
        </div>
      </div>

      {/* Floating 3D Background Text */}
      <div className="absolute bottom-1/4 left-0 pointer-events-none opacity-[0.02] select-none -translate-x-1/3">
        <h2 className="text-[20rem] font-serif leading-none">NATURE</h2>
      </div>
    </section>
  );
}
