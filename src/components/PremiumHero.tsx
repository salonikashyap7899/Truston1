import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";

interface PremiumHeroProps {
  poster: string;
  videoSrc?: string;
}

/**
 * Premium Cinematic Hero - Sobha Realty inspired
 * Features:
 * - Full-screen video background with Ken Burns
 * - Cinematic overlay with vignette
 * - Floating tagline carousel
 * - Smooth scroll-triggered parallax
 * - Premium corner accents
 */
export function PremiumHero({ poster, videoSrc = "/intro-video.mp4" }: PremiumHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [currentTagline, setCurrentTagline] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const taglines = [
    { main: "Own the Ground.", sub: "Build the Legacy." },
    { main: "Premium Plots.", sub: "Premium Living." },
    { main: "Trusted.", sub: "Transparent." },
  ];

  // Enhanced parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.4, 0.9]);

  // Tagline rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full h-screen min-h-[800px] overflow-hidden"
    >
      {/* Video/Image Background with Parallax */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 w-full h-full"
      >
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          onLoadedData={() => setVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover scale-105"
          style={{ filter: "brightness(0.85)" }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {/* Ken Burns fallback image */}
        {!videoLoaded && (
          <motion.img
            src={poster}
            alt="Hero background"
            className="absolute inset-0 w-full h-full object-cover ken-burns"
          />
        )}
      </motion.div>

      {/* Cinematic Gradient Overlay */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"
      />

      {/* Vignette Effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 200px 100px rgba(0,0,0,0.5)",
        }}
      />

      {/* Animated Grid Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-white"
            style={{ left: `${(i + 1) * (100 / 7)}%` }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.5, delay: i * 0.1 + 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>

      {/* Corner Accents */}
      <CornerAccent position="top-left" />
      <CornerAccent position="top-right" />
      <CornerAccent position="bottom-left" />
      <CornerAccent position="bottom-right" />

      {/* Side Decorative Line */}
      <motion.div
        className="absolute left-8 md:left-16 top-1/4 bottom-32 w-px hidden md:block overflow-hidden"
        initial={{ scaleY: 0, originY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute inset-0 bg-white/10" />
        <motion.div
          className="absolute inset-x-0 bg-[var(--bronze)]"
          style={{ height: "30%" }}
          animate={{ top: ["0%", "70%", "0%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Main Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-16 max-w-[1600px] mx-auto"
      >
        {/* Rotating Taglines */}
        <div className="relative h-40 md:h-48 mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTagline}
              initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <h1 className="font-display text-white leading-[0.9] tracking-[-0.02em]">
                <span className="block text-[12vw] md:text-[7vw] lg:text-[6vw]">
                  {taglines[currentTagline].main}
                </span>
                <span className="block text-[12vw] md:text-[7vw] lg:text-[6vw] text-[var(--bronze)]">
                  {taglines[currentTagline].sub}
                </span>
              </h1>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tagline Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex items-center gap-3 mb-8"
        >
          {taglines.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentTagline(idx)}
              className="relative h-1 w-12 md:w-16 bg-white/20 overflow-hidden rounded-full"
            >
              {idx === currentTagline && (
                <motion.div
                  className="absolute inset-y-0 left-0 bg-[var(--bronze)]"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-wrap items-center gap-4"
        >
          <Link
            to="/project"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-[var(--ink)] font-semibold text-[11px] uppercase tracking-[0.2em] hover:bg-[var(--bronze)] hover:text-white transition-all duration-500"
          >
            Explore Properties
            <motion.span
              className="transition-transform group-hover:translate-x-1"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              &rarr;
            </motion.span>
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 border border-white/40 text-white font-semibold text-[11px] uppercase tracking-[0.2em] hover:bg-white/10 hover:border-white transition-all duration-500"
          >
            Contact Us
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 right-8 md:right-16 hidden md:flex flex-col items-center gap-4"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 rotate-90 mb-6">
          Scroll
        </span>
        <div className="w-px h-20 bg-white/20 overflow-hidden relative">
          <motion.div
            className="absolute inset-x-0 bg-[var(--bronze)]"
            style={{ height: "40%" }}
            animate={{ top: ["0%", "60%", "0%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Bottom Fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{
          background: "linear-gradient(to top, var(--cream) 0%, transparent 100%)",
        }}
      />
    </section>
  );
}

/* Corner Accent Component */
function CornerAccent({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const positions = {
    "top-left": "top-8 left-8 md:top-12 md:left-16",
    "top-right": "top-8 right-8 md:top-12 md:right-16 rotate-90",
    "bottom-left": "bottom-32 left-8 md:bottom-40 md:left-16 -rotate-90",
    "bottom-right": "bottom-32 right-8 md:bottom-40 md:right-16 rotate-180",
  };

  return (
    <motion.div
      className={`absolute ${positions[position]} w-12 h-12 md:w-16 md:h-16 pointer-events-none hidden md:block`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 0.4, scale: 1 }}
      transition={{ duration: 1.2, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute top-0 left-0 w-full h-px bg-[var(--bronze)]" />
      <div className="absolute top-0 left-0 h-full w-px bg-[var(--bronze)]" />
    </motion.div>
  );
}
