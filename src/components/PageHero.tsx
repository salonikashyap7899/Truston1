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
        background: "var(--luxe-cyan)",
        opacity: 0.8,
        boxShadow: "0 0 10px 2px var(--luxe-cyan)",
      }}
      animate={{
        y: ["0px", "-40px", "0px"],
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
    tl: "top-10 left-10",
    tr: "top-10 right-10",
    bl: "bottom-24 left-10",
    br: "bottom-24 right-10",
  };
  const rotate = { tl: 0, tr: 90, bl: -90, br: 180 };
  return (
    <motion.div
      className={`absolute ${classes[pos]} w-16 h-16 pointer-events-none hidden lg:block`}
      style={{ rotate: rotate[pos] }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 0.5, scale: 1 }}
      transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute top-0 left-0 w-full h-px bg-luxe-cyan" />
      <div className="absolute top-0 left-0 h-full w-px bg-luxe-cyan" />
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
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const isFull = height === "full";

  const particles = [
    { x: "10%", y: "20%", delay: 0 },
    { x: "20%", y: "70%", delay: 1.5 },
    { x: "35%", y: "15%", delay: 0.8, size: 3 },
    { x: "60%", y: "40%", delay: 2.2 },
    { x: "70%", y: "20%", delay: 0.5 },
    { x: "85%", y: "75%", delay: 1.9, size: 4 },
    { x: "90%", y: "35%", delay: 1.1 },
    { x: "50%", y: "80%", delay: 1.6 },
    { x: "5%", y: "50%", delay: 2.5, size: 3 },
    { x: "95%", y: "60%", delay: 0.7 },
  ];

  return (
    <section
      ref={ref}
      className={`relative w-full overflow-hidden ${isFull ? "h-screen min-h-[720px]" : "h-[85vh] min-h-[600px]"} bg-ink`}
    >
      {/* Parallax background */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <LazyVideo
          sources={videoSources}
          poster={poster}
          alt={alt}
          className="w-full h-full"
          mediaClassName="ken-burns object-cover brightness-[0.6] contrast-[1.1]"
        />
      </motion.div>

      {/* 3D Scene */}
      <Luxury3DScene />

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(165deg, rgba(10, 15, 30, 0.4) 0%, rgba(5, 10, 20, 0.8) 60%, rgba(3, 5, 15, 0.95) 100%)",
        }}
      />

      {/* Vignette edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: "inset 0 0 150px 50px rgba(0,0,0,0.6)" }}
      />

      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-64 pointer-events-none"
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
          className="absolute left-10 top-1/4 bottom-24 w-px bg-white/10 hidden lg:block"
          initial={{ scaleY: 0, originY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="absolute inset-0 bg-luxe-cyan shadow-[0_0_15px_var(--luxe-cyan)]"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            style={{ height: "35%" }}
          />
        </motion.div>
      )}

      {/* Hero content */}
      <motion.div
        style={{ opacity, y: textY }}
        className={`relative z-10 h-full flex flex-col px-6 md:px-16 max-w-7xl mx-auto ${
          isFull ? "justify-end pb-32" : "justify-end pb-24 pt-32"
        }`}
      >
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-luxe-cyan text-[11px] uppercase tracking-[0.5em] mb-8 flex items-center gap-4 font-bold"
          >
            <motion.span
              className="inline-block h-px bg-luxe-cyan"
              initial={{ width: 0 }}
              animate={{ width: 50 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            {eyebrow}
          </motion.p>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 60, filter: "blur(15px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`font-display text-white leading-[0.9] tracking-tighter ${
            isFull ? "text-[14vw] md:text-[9.5vw]" : "text-6xl md:text-[7vw]"
          }`}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/60 mt-10 max-w-2xl text-lg md:text-xl font-light leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex flex-wrap items-center gap-8"
          >
            {children}
          </motion.div>
        )}

        {/* Scroll indicator */}
        {isFull && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 right-10 hidden md:flex flex-col items-center gap-4"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 rotate-90 mb-6 font-bold">
              Scroll
            </span>
            <div className="w-px h-20 bg-white/10 overflow-hidden relative">
              <motion.div
                className="absolute top-0 left-0 right-0 bg-luxe-cyan shadow-[0_0_10px_var(--luxe-cyan)]"
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{ height: "45%" }}
              />
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
