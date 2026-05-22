import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useCallback, useState, useRef } from "react";

export interface GalleryItem {
  img: string;
  title: string;
  sub: string;
  category?: string;
}

interface GalleryLightboxProps {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onGoTo?: (i: number) => void;
}

export function GalleryLightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
  onGoTo,
}: GalleryLightboxProps) {
  const isOpen = index !== null;
  const item = isOpen ? items[index!] : null;
  const [isZoomed, setIsZoomed] = useState(false);
  const [direction, setDirection] = useState(0); // -1 = prev, 1 = next
  const dragX = useMotionValue(0);
  const imgOpacity = useTransform(dragX, [-200, 0, 200], [0.3, 1, 0.3]);
  const prevIndex = useRef<number | null>(null);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        setIsZoomed(false);
        onClose();
      }
      if (e.key === "ArrowLeft") {
        setDirection(-1);
        setIsZoomed(false);
        onPrev();
      }
      if (e.key === "ArrowRight") {
        setDirection(1);
        setIsZoomed(false);
        onNext();
      }
    },
    [isOpen, onClose, onPrev, onNext],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setIsZoomed(false);
    }
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey, isOpen]);

  // Track direction from index changes
  useEffect(() => {
    if (index !== null && prevIndex.current !== null) {
      const diff = index - prevIndex.current;
      if (diff > 0 || diff < -(items.length - 1)) setDirection(1);
      else setDirection(-1);
    }
    prevIndex.current = index;
  }, [index, items.length]);

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (isZoomed) return;
    if (info.offset.x < -80) {
      setDirection(1);
      setIsZoomed(false);
      onNext();
    } else if (info.offset.x > 80) {
      setDirection(-1);
      setIsZoomed(false);
      onPrev();
    }
    dragX.set(0);
  };

  const goTo = (i: number) => {
    if (onGoTo) {
      setDirection(i > (index ?? 0) ? 1 : -1);
      setIsZoomed(false);
      onGoTo(i);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          key="lb-backdrop"
          className="fixed inset-0 z-[9000] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => {
            if (!isZoomed) onClose();
          }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(5,7,15,0.98)", backdropFilter: "blur(24px)" }}
          />

          {/* ── Top bar ── */}
          <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-8 py-8 pointer-events-none">
            {/* Counter */}
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/30 pointer-events-none">
              {(index ?? 0) + 1} <span className="text-white/10">/ {items.length}</span>
            </span>

            {/* Category badge */}
            {item.category && (
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-luxe-cyan border border-luxe-cyan/30 px-4 py-1.5 pointer-events-none rounded-full">
                {item.category}
              </span>
            )}

            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(false);
                onClose();
              }}
              className="pointer-events-auto w-12 h-12 flex items-center justify-center border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all duration-300 text-xl backdrop-blur-xl bg-white/5 rounded-full"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* ── Prev arrow ── */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDirection(-1);
              setIsZoomed(false);
              onPrev();
            }}
            className="absolute left-6 md:left-12 z-20 w-16 h-16 flex items-center justify-center border border-white/10 text-white/30 hover:text-luxe-cyan hover:border-luxe-cyan transition-all duration-500 text-2xl backdrop-blur-xl bg-white/5 rounded-full"
            aria-label="Previous"
          >
            ←
          </button>

          {/* ── Next arrow ── */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDirection(1);
              setIsZoomed(false);
              onNext();
            }}
            className="absolute right-6 md:right-12 z-20 w-16 h-16 flex items-center justify-center border border-white/10 text-white/30 hover:text-luxe-cyan hover:border-luxe-cyan transition-all duration-500 text-2xl backdrop-blur-xl bg-white/5 rounded-full"
            aria-label="Next"
          >
            →
          </button>

          {/* ── Main image area ── */}
          <div
            className="relative z-10 w-full h-full flex flex-col items-center justify-center px-20 md:px-32 pb-32 pt-20"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`img-${index}`}
                custom={direction}
                variants={{
                  enter: (d: number) => ({
                    opacity: 0,
                    x: d * 100,
                    scale: 0.9,
                    filter: "blur(15px)",
                  }),
                  center: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" },
                  exit: (d: number) => ({
                    opacity: 0,
                    x: d * -100,
                    scale: 0.95,
                    filter: "blur(10px)",
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full flex flex-col items-center"
                style={{ maxHeight: "calc(100vh - 200px)" }}
              >
                {/* Swipeable / zoomable image wrapper */}
                <motion.div
                  drag={isZoomed ? true : "x"}
                  dragConstraints={
                    isZoomed
                      ? { left: -400, right: 400, top: -300, bottom: 300 }
                      : { left: 0, right: 0 }
                  }
                  dragElastic={isZoomed ? 0.15 : 0.3}
                  onDragEnd={handleDragEnd}
                  style={{ x: isZoomed ? undefined : dragX, opacity: isZoomed ? 1 : imgOpacity }}
                  className="relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] cursor-grab active:cursor-grabbing rounded-3xl"
                  onDoubleClick={() => setIsZoomed((z) => !z)}
                >
                  <motion.img
                    src={item.img}
                    alt={item.title}
                    className="block w-auto select-none"
                    style={{
                      maxHeight: "calc(100vh - 220px)",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                    animate={{ scale: isZoomed ? 2 : 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    draggable={false}
                  />

                  {/* Animated scan line on open */}
                  <motion.div
                    className="absolute inset-x-0 h-px pointer-events-none z-10"
                    style={{
                      background: "var(--luxe-cyan)",
                      boxShadow: "0 0 15px var(--luxe-cyan)",
                    }}
                    initial={{ top: "0%" }}
                    animate={{ top: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 0.4 }}
                  />

                  {/* Bottom gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                </motion.div>

                {/* Zoom hint */}
                {!isZoomed && (
                  <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/10 mt-6">
                    Double-click to zoom · Swipe to navigate
                  </p>
                )}
                {isZoomed && (
                  <motion.button
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => setIsZoomed(false)}
                    className="text-[10px] font-bold uppercase tracking-[0.4em] text-luxe-cyan mt-6 hover:text-white transition-colors"
                  >
                    ✕ Exit zoom
                  </motion.button>
                )}

                {/* Caption */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="mt-8 flex items-end justify-between w-full max-w-4xl px-4"
                >
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.6em] text-luxe-cyan mb-3">
                      TrustOn Luxury Empire
                    </p>
                    <h3 className="font-display text-4xl text-white tracking-tight leading-none">
                      {item.title}
                    </h3>
                    <p className="text-white/30 text-lg mt-2 font-light italic">{item.sub}</p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Thumbnail strip ── */}
          <div
            className="absolute bottom-0 inset-x-0 z-20 flex justify-center gap-3 pb-8 pt-6 px-6 overflow-x-auto"
            style={{
              background: "linear-gradient(to top, rgba(5,7,15,0.98) 0%, transparent 100%)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {items.map((it, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`flex-shrink-0 w-20 h-14 overflow-hidden transition-all duration-500 rounded-lg ${
                  i === index
                    ? "ring-2 ring-luxe-cyan opacity-100 scale-110 shadow-[0_0_20px_rgba(100,200,255,0.4)]"
                    : "opacity-20 hover:opacity-50 scale-100"
                }`}
                aria-label={`Go to image ${i + 1}`}
              >
                <img
                  src={it.img}
                  alt={it.title}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
