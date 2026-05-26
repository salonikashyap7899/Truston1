import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

type GalleryItem = {
  src: string;
  alt: string;
};

export function HeroGridParallax({ images }: { images: GalleryItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll position of the tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Keep scroll 1:1 with the section (no spring lag), but clamp to avoid overshoot/jitter.
  // This makes scrolling feel more perfectly controlled.
  const smoothProgress = useTransform(scrollYProgress, (v) => {
    const clamped = Math.min(1, Math.max(0, v));
    return clamped;
  });

  // 1. Center Hero Image (Index 0) - Shrinks from full screen to grid size
  const heroWidth = useTransform(smoothProgress, [0, 1], ["100vw", "35vw"]);
  const heroHeight = useTransform(smoothProgress, [0, 1], ["100vh", "75vh"]);
  const heroRadius = useTransform(smoothProgress, [0, 1], ["0px", "16px"]);

  // 2. Corner Images (Indexes 1-4) - Fade in and slide into place
  // Match GSAP feel: remain hidden at the beginning, then quickly appear as the hero shrinks.
  const cornerOpacity = useTransform(smoothProgress, [0, 0.35, 1], [0, 1, 1]);

  // Top Left (Index 1)
  const tlX = useTransform(smoothProgress, [0, 1], ["-50vw", "0vw"]);
  const tlY = useTransform(smoothProgress, [0, 1], ["-50vh", "0vh"]);
  const tlRotate = useTransform(smoothProgress, [0, 1], [-15, 0]);

  // Bottom Left (Index 2)
  const blX = useTransform(smoothProgress, [0, 1], ["-50vw", "0vw"]);
  const blY = useTransform(smoothProgress, [0, 1], ["50vh", "0vh"]);
  const blRotate = useTransform(smoothProgress, [0, 1], [15, 0]);

  // Top Right (Index 3)
  const trX = useTransform(smoothProgress, [0, 1], ["50vw", "0vw"]);
  const trY = useTransform(smoothProgress, [0, 1], ["-50vh", "0vh"]);
  const trRotate = useTransform(smoothProgress, [0, 1], [15, 0]);

  // Bottom Right (Index 4)
  const brX = useTransform(smoothProgress, [0, 1], ["50vw", "0vw"]);
  const brY = useTransform(smoothProgress, [0, 1], ["50vh", "0vh"]);
  const brRotate = useTransform(smoothProgress, [0, 1], [-15, 0]);

  // We need exactly 5 images for this specific asymmetric layout
  const gridImages = images.slice(0, 5);

  if (gridImages.length < 5) return null;

  return (
    // The scroll track: 300vh gives the user time to scroll while the animation plays out
    <div ref={containerRef} className="h-[300vh] w-full relative">
      {/* Pinned Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#04090f]">
        {/* The Grid Wrapper */}
        <div className="relative w-full max-w-[1400px] h-[85vh] flex items-center justify-center">
          {/* Top Left */}
          <motion.div
            style={{ x: tlX, y: tlY, opacity: cornerOpacity, rotate: tlRotate }}
            className="absolute top-[5%] left-[5%] w-[25%] h-[40%] rounded-2xl overflow-hidden shadow-2xl shadow-[#00BFFF]/10"
          >
            <img
              src={gridImages[1].src}
              alt={gridImages[1].alt}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Bottom Left */}
          <motion.div
            style={{ x: blX, y: blY, opacity: cornerOpacity, rotate: blRotate }}
            className="absolute bottom-[5%] left-[10%] w-[22%] h-[35%] rounded-2xl overflow-hidden shadow-2xl shadow-[#00BFFF]/10"
          >
            <img
              src={gridImages[2].src}
              alt={gridImages[2].alt}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Top Right */}
          <motion.div
            style={{ x: trX, y: trY, opacity: cornerOpacity, rotate: trRotate }}
            className="absolute top-[10%] right-[10%] w-[22%] h-[35%] rounded-2xl overflow-hidden shadow-2xl shadow-[#00BFFF]/10"
          >
            <img
              src={gridImages[3].src}
              alt={gridImages[3].alt}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Bottom Right */}
          <motion.div
            style={{ x: brX, y: brY, opacity: cornerOpacity, rotate: brRotate }}
            className="absolute bottom-[5%] right-[5%] w-[25%] h-[40%] rounded-2xl overflow-hidden shadow-2xl shadow-[#00BFFF]/10"
          >
            <img
              src={gridImages[4].src}
              alt={gridImages[4].alt}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Center Hero Image (The Expanding/Shrinking Anchor) */}
          <motion.div
            style={{ width: heroWidth, height: heroHeight, borderRadius: heroRadius }}
            className="absolute z-10 overflow-hidden shadow-2xl shadow-black/80"
          >
            <img
              src={gridImages[0].src}
              alt={gridImages[0].alt}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
