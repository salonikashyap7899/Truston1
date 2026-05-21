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
          transition={{ duration: 0.35 }}
          onClick={() => {
            if (!isZoomed) onClose();
          }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(6,8,18,0.97)", backdropFilter: "blur(16px)" }}
          />

          {/* ── Top bar ── */}
          <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-6 py-5 pointer-events-none">
            {/* Counter */}
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 pointer-events-none">
              {(index ?? 0) + 1} <span className="text-white/15">/ {items.length}</span>
            </span>

            {/* Category badge */}
            {item.category && (
              <span className="text-[9px] uppercase tracking-[0.5em] text-[oklch(0.50_0.155_245)] border border-[oklch(0.50_0.155_245)/30] px-3 py-1 pointer-events-none">
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
              className="pointer-events-auto w-10 h-10 flex items-center justify-center border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all duration-300 text-lg backdrop-blur-sm bg-white/5"
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
            className="absolute left-3 md:left-6 z-20 w-12 h-12 flex items-center justify-center border border-white/10 text-white/35 hover:text-white hover:border-[oklch(0.50_0.155_245)] transition-all duration-300 text-xl backdrop-blur-sm bg-black/20"
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
            className="absolute right-3 md:right-6 z-20 w-12 h-12 flex items-center justify-center border border-white/10 text-white/35 hover:text-white hover:border-[oklch(0.50_0.155_245)] transition-all duration-300 text-xl backdrop-blur-sm bg-black/20"
            aria-label="Next"
          >
            →
          </button>

          {/* ── Main image area ── */}
          <div
            className="relative z-10 w-full h-full flex flex-col items-center justify-center px-16 md:px-28 pb-28 pt-16"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`img-${index}`}
                custom={direction}
                variants={{
                  enter: (d: number) => ({
                    opacity: 0,
                    x: d * 80,
                    scale: 0.93,
                    filter: "blur(10px)",
                  }),
                  center: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" },
                  exit: (d: number) => ({
                    opacity: 0,
                    x: d * -60,
                    scale: 0.96,
                    filter: "blur(6px)",
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full flex flex-col items-center"
                style={{ maxHeight: "calc(100vh - 180px)" }}
              >
                {/* Swipeable / zoomable image wrapper */}
                <motion.div
                  drag={isZoomed ? true : "x"}
                  dragConstraints={
                    isZoomed
                      ? { left: -300, right: 300, top: -200, bottom: 200 }
                      : { left: 0, right: 0 }
                  }
                  dragElastic={isZoomed ? 0.1 : 0.25}
                  onDragEnd={handleDragEnd}
                  style={{ x: isZoomed ? undefined : dragX, opacity: isZoomed ? 1 : imgOpacity }}
                  className="relative overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing"
                  onDoubleClick={() => setIsZoomed((z) => !z)}
                >
                  <motion.img
                    src={item.img}
                    alt={item.title}
                    className="block w-auto select-none"
                    style={{
                      maxHeight: "calc(100vh - 200px)",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                    animate={{ scale: isZoomed ? 2 : 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    draggable={false}
                  />

                  {/* Animated scan line on open */}
                  <motion.div
                    className="absolute inset-x-0 h-px pointer-events-none"
                    style={{ background: "oklch(0.50 0.155 245 / 0.4)" }}
                    initial={{ top: "0%" }}
                    animate={{ top: "100%" }}
                    transition={{ duration: 1.8, ease: "easeInOut", delay: 0.3 }}
                  />

                  {/* Bottom gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                </motion.div>

                {/* Zoom hint */}
                {!isZoomed && (
                  <p className="text-[9px] uppercase tracking-[0.4em] text-white/15 mt-3">
                    Double-click to zoom · Swipe or drag to navigate
                  </p>
                )}
                {isZoomed && (
                  <motion.button
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => setIsZoomed(false)}
                    className="text-[9px] uppercase tracking-[0.4em] text-[oklch(0.50_0.155_245)] mt-3 hover:text-white transition-colors"
                  >
                    ✕ Exit zoom
                  </motion.button>
                )}

                {/* Caption */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mt-5 flex items-end justify-between w-full max-w-3xl px-2"
                >
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.5em] text-[oklch(0.50_0.155_245)] mb-1.5">
                      TrustOn Prime Estate
                    </p>
                    <h3 className="font-display text-2xl text-white leading-tight">{item.title}</h3>
                    <p className="text-white/35 text-sm mt-1 italic">{item.sub}</p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Thumbnail strip ── */}
          <div
            className="absolute bottom-0 inset-x-0 z-20 flex justify-center gap-1.5 pb-4 pt-3 px-4 overflow-x-auto"
            style={{
              background: "linear-gradient(to top, rgba(6,8,18,0.95) 0%, transparent 100%)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {items.map((it, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`flex-shrink-0 w-14 h-10 overflow-hidden transition-all duration-300 ${
                  i === index
                    ? "ring-2 ring-[oklch(0.50_0.155_245)] opacity-100 scale-105"
                    : "opacity-30 hover:opacity-60 scale-100"
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
