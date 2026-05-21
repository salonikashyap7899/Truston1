import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { LazyVideo, type VideoSource } from "./LazyVideo";
import { Luxury3DScene } from "./Luxury3DScene";

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  poster: string;
  videoSources?: VideoSource[];
  alt: string;
  children?: ReactNode;
  height?: "full" | "short";
}

/* Floating particle dot */
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

export function PageHero({
  eyebrow,
  title,
  subtitle,
  poster,
  videoSources,
  alt,
  children,
  height = "short",
}: PageHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

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
      className={`relative w-full overflow-hidden ${isFull ? "h-screen min-h-[720px]" : "h-[80vh] min-h-[560px]"}`}
    >
      {/* Parallax background */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <LazyVideo
          sources={videoSources}
          poster={poster}
          alt={alt}
          className="w-full h-full"
          mediaClassName="ken-burns"
        />
      </motion.div>

      {/* 3D Scene */}
      <Luxury3DScene />

      {/* Dark gradient overlay */}
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

      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to top, var(--background) 0%, transparent 100%)" }}
      />

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

      {/* Hero content */}
      <motion.div
        style={{ opacity, y: textY }}
        className={`relative z-10 h-full flex flex-col px-6 md:px-16 max-w-7xl mx-auto ${
          isFull ? "justify-end pb-28" : "justify-end pb-20 pt-32"
        }`}
      >
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: isFull ? 3.2 : 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-[var(--bronze)] text-[11px] uppercase tracking-luxe mb-6 flex items-center gap-3"
          >
            <motion.span
              className="inline-block h-px bg-[var(--bronze)]"
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ duration: 0.8, delay: isFull ? 3.4 : 0.5 }}
            />
            {eyebrow}
          </motion.p>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.3, delay: isFull ? 3.3 : 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`font-display text-white leading-[0.93] tracking-tight ${
            isFull ? "text-[15vw] md:text-[8.5vw]" : "text-6xl md:text-8xl"
          }`}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: isFull ? 3.6 : 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/70 mt-8 max-w-2xl text-lg leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: isFull ? 3.8 : 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            {children}
          </motion.div>
        )}

        {/* Scroll indicator */}
        {isFull && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: isFull ? 4.2 : 1.2, duration: 1 }}
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
