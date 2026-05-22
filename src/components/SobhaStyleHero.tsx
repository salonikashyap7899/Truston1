import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, type ReactNode, useState, useEffect } from "react";
import { LazyVideo, type VideoSource } from "./LazyVideo";
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

export function SobhaStyleHero({
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

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const isFull = height === "full";

  // Magnetic button state
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.35;
    const y = (clientY - (top + height / 2)) * 0.35;
    setButtonPos({ x, y });
  };

  const handleMouseLeave = () => {
    setButtonPos({ x: 0, y: 0 });
  };

  return (
    <section
      ref={ref}
      className={`relative w-full overflow-hidden flex items-center justify-center ${
        isFull ? "h-screen" : "h-[85vh]"
      } bg-background`}
    >
      {/* Cinematic Video/Image Background */}
      <motion.div style={{ y, scale, opacity: 0.5 }} className="absolute inset-0 z-[-1]">
        <LazyVideo
          sources={videoSources}
          poster={poster}
          alt={alt}
          className="w-full h-full"
          mediaClassName="ken-burns object-cover brightness-[0.7] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-[1400px] px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ duration: 2, delay: 0.2 }}
            className="text-luxe-cyan text-[10px] md:text-xs uppercase font-medium mb-8 tracking-[0.6em] block"
          >
            TrustOn Luxury Real Estate
          </motion.span>

          {/* Main Title with Stagger Reveal */}
          <h1 className="typography-hero text-white mb-8">
            {typeof title === "string"
              ? title.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 1.2,
                      delay: 0.5 + i * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block mr-[0.3em] last:mr-0"
                  >
                    {word}
                  </motion.span>
                ))
              : title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 1.5, delay: 1.2 }}
              className="text-white text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-12"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Magnetic CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex flex-col sm:flex-row gap-6 items-center"
          >
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative group"
            >
              <motion.button
                animate={{ x: buttonPos.x, y: buttonPos.y }}
                transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
                className="btn-magnetic btn-luxe min-w-[240px] px-10 py-5 rounded-full"
              >
                Explore Projects
                <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </motion.button>
            </div>

            <button className="text-white/60 hover:text-luxe-cyan text-[11px] uppercase tracking-widest font-semibold transition-colors duration-300 border-b border-white/20 hover:border-luxe-cyan pb-1">
              Book Consultation
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Side Decorative Lines */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 2, delay: 1 }}
        className="absolute left-8 top-1/4 bottom-1/4 w-px bg-white/10 hidden lg:block origin-top"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 2, delay: 1.2 }}
        className="absolute right-8 top-1/4 bottom-1/4 w-px bg-white/10 hidden lg:block origin-bottom"
      />

      {/* Scroll Indicator */}
      {isFull && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[9px] uppercase tracking-[0.4em] text-white/30">Scroll</span>
          <div className="w-px h-12 bg-white/10 overflow-hidden relative">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-luxe-cyan"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
