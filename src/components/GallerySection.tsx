import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { usePageContent } from "@/hooks/usePageContent";

const DEFAULT_IMAGES = [
  { src: "/assets/building-plots.jpg",          alt: "Prime Estate — Aerial Night View" },
  { src: "/assets/gallery/prime-club.jpg",      alt: "Prime Estate Club House" },
  { src: "/assets/gallery/prime-road.jpg",      alt: "Prime Estate Internal Roads" },
  { src: "/assets/gallery/prime-boulevard.jpg", alt: "Prime Estate Boulevard" },
  { src: "/assets/gallery/prime-street.jpg",    alt: "Prime Estate Street at Sunset" },
];

export function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const c = usePageContent("home.gallery", {
    heading: "LIVING LEGACIES",
    heading_accent: "In Stone & Light",
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001,
  });

  /* Hero shrinks from full-screen to centre column */
  const heroWidth  = useTransform(smoothProgress, [0, 1], ["100vw", "40%"]);
  const heroHeight = useTransform(smoothProgress, [0, 1], ["100vh", "70%"]);
  const heroRadius = useTransform(smoothProgress, [0, 1], ["0px", "10px"]);

  /* Overlay text fades out early */
  const textOpacity = useTransform(smoothProgress, [0, 0.35], [1, 0]);
  const textY       = useTransform(smoothProgress, [0, 0.35], [0, -24]);

  /* Four corner images fly in */
  const cornerOpacity = useTransform(smoothProgress, [0.08, 0.45], [0, 1]);

  const tlX = useTransform(smoothProgress, [0, 1], ["-60vw", "0vw"]);
  const tlY = useTransform(smoothProgress, [0, 1], ["-60vh", "0vh"]);

  const blX = useTransform(smoothProgress, [0, 1], ["-60vw", "0vw"]);
  const blY = useTransform(smoothProgress, [0, 1], [ "60vh", "0vh"]);

  const trX = useTransform(smoothProgress, [0, 1], [ "60vw", "0vw"]);
  const trY = useTransform(smoothProgress, [0, 1], ["-60vh", "0vh"]);

  const brX = useTransform(smoothProgress, [0, 1], [ "60vw", "0vw"]);
  const brY = useTransform(smoothProgress, [0, 1], [ "60vh", "0vh"]);

  return (
    <section id="gallery-section" className="relative bg-[#04090f] w-full select-none">
      {/* Sticky scroll container — 160 vh gives a smooth but not over-long animation */}
      <div ref={containerRef} className="h-[160vh] w-full relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#04090f]">
          <div className="relative w-full max-w-[1400px] h-[90vh] mx-auto top-1/2 -translate-y-1/2 flex items-center justify-center">

            {/* Top-left */}
            <motion.div
              style={{ x: tlX, y: tlY, opacity: cornerOpacity }}
              className="absolute top-[3%] left-[3%] w-[25%] h-[43%] rounded-lg overflow-hidden shadow-xl"
            >
              <img src={DEFAULT_IMAGES[1].src} alt={DEFAULT_IMAGES[1].alt} className="w-full h-full object-cover" />
            </motion.div>

            {/* Bottom-left */}
            <motion.div
              style={{ x: blX, y: blY, opacity: cornerOpacity }}
              className="absolute bottom-[3%] left-[7%] w-[22%] h-[38%] rounded-lg overflow-hidden shadow-xl"
            >
              <img src={DEFAULT_IMAGES[2].src} alt={DEFAULT_IMAGES[2].alt} className="w-full h-full object-cover" />
            </motion.div>

            {/* Top-right */}
            <motion.div
              style={{ x: trX, y: trY, opacity: cornerOpacity }}
              className="absolute top-[7%] right-[7%] w-[22%] h-[38%] rounded-lg overflow-hidden shadow-xl"
            >
              <img src={DEFAULT_IMAGES[3].src} alt={DEFAULT_IMAGES[3].alt} className="w-full h-full object-cover" />
            </motion.div>

            {/* Bottom-right */}
            <motion.div
              style={{ x: brX, y: brY, opacity: cornerOpacity }}
              className="absolute bottom-[3%] right-[3%] w-[25%] h-[43%] rounded-lg overflow-hidden shadow-xl"
            >
              <img src={DEFAULT_IMAGES[4].src} alt={DEFAULT_IMAGES[4].alt} className="w-full h-full object-cover" />
            </motion.div>

            {/* Hero — centre */}
            <motion.div
              style={{ width: heroWidth, height: heroHeight, borderRadius: heroRadius }}
              className="absolute z-10 overflow-hidden shadow-2xl bg-[#04090f] origin-center"
            >
              <img
                src={DEFAULT_IMAGES[0].src}
                alt={DEFAULT_IMAGES[0].alt}
                className="w-full h-full object-cover object-center absolute inset-0"
              />

              {/* Text overlay */}
              <motion.div
                style={{ opacity: textOpacity, y: textY }}
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col items-center justify-center text-white p-4 z-20 pointer-events-none"
              >
                <p className="text-[10px] uppercase tracking-[0.5em] text-[#00BFFF] font-bold mb-4">
                  Prime Estate · Lucknow
                </p>
                <h2
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-5xl md:text-7xl font-light leading-tight text-center"
                >
                  {c.heading || "LIVING LEGACIES"} <br />
                  <span className="italic font-normal text-[#00BFFF]">
                    {c.heading_accent || "In Stone & Light"}
                  </span>
                </h2>
                <p className="mt-6 text-white/50 text-xs uppercase tracking-[0.35em]">
                  Scroll to explore
                </p>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
