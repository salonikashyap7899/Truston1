import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { LazyVideo, type VideoSource } from "./LazyVideo";
import { AdvancedLuxury3D } from "./AdvancedLuxury3D";
import { Link } from "@tanstack/react-router";

interface SobhaStyleHeroProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  poster: string;
  videoSources?: VideoSource[];
  alt: string;
  children?: ReactNode;
  height?: "full" | "short";
}

/* Floating particle dot with enhanced animation */
function Particle({
  x,
  y,
  delay,
  size = 2,
}: {
  x: string;
  y: string;
  delay: number;
  size?: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: "oklch(0.50 0.155 245 / 0.6)",
        boxShadow: "0 0 6px 2px oklch(0.50 0.155 245 / 0.3)",
      }}
      animate={{
        y: ["0px", "-28px", "0px"],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 4 + delay,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

/* Animated corner accent */
function CornerAccent({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const classes = {
    tl: "top-8 left-8",
    tr: "top-8 right-8",
    bl: "bottom-24 left-8",
    br: "bottom-24 right-8",
  };
  const rotate = { tl: 0, tr: 90, bl: -90, br: 180 };
  return (
    <motion.div
      className={`absolute ${classes[pos]} w-12 h-12 pointer-events-none hidden md:block`}
      style={{ rotate: rotate[pos] }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 0.35, scale: 1 }}
      transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute top-0 left-0 w-full h-px bg-[var(--bronze)]" />
      <div className="absolute top-0 left-0 h-full w-px bg-[var(--bronze)]" />
    </motion.div>
  );
}

export function SobhaStyleHero({
  eyebrow,
  title,
  subtitle,
  poster,
  videoSources,
  alt,
  children,
  height = "short",
}: SobhaStyleHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Enhanced parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  const isFull = height === "full";

  const particles = [
    { x: "15%", y: "30%", delay: 0 },
    { x: "25%", y: "60%", delay: 1.2 },
    { x: "40%", y: "20%", delay: 0.6, size: 3 },
    { x: "65%", y: "45%", delay: 2 },
    { x: "75%", y: "25%", delay: 0.3 },
    { x: "80%", y: "70%", delay: 1.7, size: 3 },
    { x: "88%", y: "40%", delay: 0.9 },
    { x: "50%", y: "75%", delay: 1.4 },
    { x: "10%", y: "55%", delay: 2.3, size: 3 },
    { x: "92%", y: "65%", delay: 0.5 },
  ];

  return (
    <section
      ref={ref}
      data-dark
      className={`relative w-full overflow-hidden ${
        isFull ? "h-screen min-h-[720px]" : "h-[80vh] min-h-[560px]"
      }`}
    >
      {/* Parallax background with enhanced effect */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <LazyVideo
          sources={videoSources}
          poster={poster}
          alt={alt}
          className="w-full h-full"
          mediaClassName="ken-burns"
        />
      </motion.div>

      {/* Dark gradient overlay with smooth transition */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(165deg, oklch(0.08 0.015 250 / 0.65) 0%, oklch(0.08 0.015 250 / 0.85) 60%, oklch(0.06 0.01 250 / 0.92) 100%)",
        }}
      />

      {/* Vignette edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: "inset 0 0 120px 40px rgba(0,0,0,0.5)" }}
      />

      {/* Subtle bottom fade — dark only, no white wash */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)",
          opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0.6]),
        }}
      />

      {/* 3D floating shapes overlay */}
      {isFull && <AdvancedLuxury3D intensity={0.35} />}

      {/* Floating particles */}
      {isFull && particles.map((p, i) => <Particle key={i} {...p} />)}

      {/* Corner accents */}
      {isFull && (
        <>
          <CornerAccent pos="tl" />
          <CornerAccent pos="tr" />
          <CornerAccent pos="bl" />
          <CornerAccent pos="br" />
        </>
      )}

      {/* Animated side line (full hero only) */}
      {isFull && (
        <motion.div
          className="absolute left-8 top-1/4 bottom-24 w-px bg-white/5 hidden md:block"
          initial={{ scaleY: 0, originY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.6, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="absolute inset-0 bg-[var(--bronze)]"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            style={{ height: "30%" }}
          />
        </motion.div>
      )}

      {/* Hero content with enhanced scroll animations */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className={`relative z-10 h-full flex flex-col px-6 md:px-16 max-w-7xl mx-auto ${
          isFull ? "justify-end pb-28" : "justify-end pb-20 pt-32"
        }`}
      >
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: isFull ? 0.3 : 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-6"
          >
            <motion.div
              className="h-px bg-[var(--bronze)]"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <span className="text-[10px] uppercase tracking-[0.35em] text-[var(--bronze)]">
              {eyebrow}
            </span>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 1.3,
            delay: isFull ? 0.5 : 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`font-display text-white leading-[0.93] tracking-tight ${
            isFull ? "text-[15vw] md:text-[8.5vw]" : "text-6xl md:text-8xl"
          }`}
        >
          {title || (
            <>
              Trust<span className="italic text-[var(--bronze)]">On</span>
            </>
          )}
        </motion.h1>

        {isFull && !subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/60 mt-6 max-w-xl text-lg md:text-xl font-serif italic font-light"
          >
            Own the Ground. Build the Legacy.
          </motion.p>
        )}

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.1,
              delay: isFull ? 0.8 : 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-white/70 mt-8 max-w-2xl text-lg leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}

        {(children || isFull) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.1,
              delay: isFull ? 1.0 : 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            {children ?? (
              <>
                <Link
                  to="/contact"
                  className="group relative px-8 py-4 bg-[var(--bronze)] text-white text-xs uppercase tracking-[0.2em] font-medium overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(45,107,196,0.35)]"
                >
                  <span className="relative z-10">Enquire Now</span>
                  <motion.span
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </Link>
                <Link
                  to="/project"
                  className="px-8 py-4 border border-white/30 text-white text-xs uppercase tracking-[0.2em] font-medium hover:border-[var(--bronze)] hover:text-[var(--bronze)] transition-all duration-500 backdrop-blur-sm"
                >
                  Explore Prime Estate
                </Link>
              </>
            )}
          </motion.div>
        )}

        {/* Enhanced scroll indicator */}
        {isFull && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: isFull ? 1.5 : 1.2,
              duration: 1,
            }}
            className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-3"
          >
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/25 rotate-90 mb-4">
              Scroll
            </span>
            <div className="w-px h-16 bg-white/10 overflow-hidden relative">
              <motion.div
                className="absolute top-0 left-0 right-0 bg-[var(--bronze)]"
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                style={{ height: "40%" }}
              />
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
