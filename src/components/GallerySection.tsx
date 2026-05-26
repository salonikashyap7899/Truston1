import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { useCollection } from "@/hooks/useCollections";

type GalleryItem = {
  src: string;
  alt: string;
};

const DEFAULT_IMAGES: GalleryItem[] = [
  { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80", alt: "Hero" },
  { src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80", alt: "Top Left" },
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", alt: "Bottom Left" },
  { src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80", alt: "Top Right" },
  { src: "https://images.unsplash.com/photo-1499810631641-541e76d678a2?auto=format&fit=crop&w=800&q=80", alt: "Bottom Right" },
];

export function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: remoteImages } = useCollection<GalleryItem>("gallery", { order: "order_index" });
  const displayImages = remoteImages?.length && remoteImages.length >= 5 ? remoteImages : DEFAULT_IMAGES;
  const gridImages = displayImages.slice(0, 5);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Replicates the 'scrub: 1' interpolation behavior from Lenis/GSAP perfectly
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // --- 1:1 LAYOUT DIMENSIONS & VALUE INTERPOLATIONS ---
  
  // Center Hero Card starts exactly at full screen viewport scale
  const heroWidth = useTransform(smoothProgress, [0, 1], ["100vw", "35vw"]);
  const heroHeight = useTransform(smoothProgress, [0, 1], ["100vh", "75vh"]);
  const heroRadius = useTransform(smoothProgress, [0, 1], ["0px", "12px"]);

  // Core overlay transitions
  const textOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const textScale = useTransform(smoothProgress, [0, 1], [1, 0.85]);

  // Symmetrical Explosion: Corners are completely hidden at start and emerge smoothly
  const cornerOpacity = useTransform(smoothProgress, [0, 0.2, 1], [0, 1, 1]);

  // Top Left Configuration
  const tlX = useTransform(smoothProgress, [0, 1], ["-60vw", "0vw"]);
  const tlY = useTransform(smoothProgress, [0, 1], ["-60vh", "0vh"]);
  const tlRotate = useTransform(smoothProgress, [0, 1], [-10, 0]);

  // Bottom Left Configuration
  const blX = useTransform(smoothProgress, [0, 1], ["-60vw", "0vw"]);
  const blY = useTransform(smoothProgress, [0, 1], ["60vh", "0vh"]);
  const blRotate = useTransform(smoothProgress, [0, 1], [-10, 0]);

  // Top Right Configuration
  const trX = useTransform(smoothProgress, [0, 1], ["60vw", "0vw"]);
  const trY = useTransform(smoothProgress, [0, 1], ["-60vh", "0vh"]);
  const trRotate = useTransform(smoothProgress, [0, 1], [10, 0]);

  // Bottom Right Configuration
  const brX = useTransform(smoothProgress, [0, 1], ["60vw", "0vw"]);
  const brY = useTransform(smoothProgress, [0, 1], ["60vh", "0vh"]);
  const brRotate = useTransform(smoothProgress, [0, 1], [10, 0]);

  if (gridImages.length < 5) return null;

  return (
    <section id="gallery-section" className="relative bg-[#04090f] w-full select-none m-t-6 m-b-6">
      
      {/* 300vh Scroll Timeline Track */}
      <div ref={containerRef} className="h-[300vh] w-full relative">
        
        {/* Sticky Pinned Viewport Stage */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#04090f]">
          
          {/* Symmetrical Window Layer */}
          <div className="relative w-screen h-screen flex items-center justify-center">
            
            {/* Top Left Element */}
            <motion.div
              style={{ x: tlX, y: tlY, rotate: tlRotate, opacity: cornerOpacity }}
              className="absolute top-[8vh] left-[6vw] w-[25vw] h-[38vh] rounded-xl overflow-hidden shadow-2xl"
            >
              <img src={gridImages[1].src} alt={gridImages[1].alt} className="w-full h-full object-cover" />
            </motion.div>

            {/* Bottom Left Element */}
            <motion.div
              style={{ x: blX, y: blY, rotate: blRotate, opacity: cornerOpacity }}
              className="absolute bottom-[8vh] left-[10vw] w-[22vw] h-[34vh] rounded-xl overflow-hidden shadow-2xl"
            >
              <img src={gridImages[2].src} alt={gridImages[2].alt} className="w-full h-full object-cover" />
            </motion.div>

            {/* Top Right Element */}
            <motion.div
              style={{ x: trX, y: trY, rotate: trRotate, opacity: cornerOpacity }}
              className="absolute top-[12vh] right-[10vw] w-[22vw] h-[34vh] rounded-xl overflow-hidden shadow-2xl"
            >
              <img src={gridImages[3].src} alt={gridImages[3].alt} className="w-full h-full object-cover" />
            </motion.div>

            {/* Bottom Right Element */}
            <motion.div
              style={{ x: brX, y: brY, rotate: brRotate, opacity: cornerOpacity }}
              className="absolute bottom-[8vh] right-[6vw] w-[25vw] h-[38vh] rounded-xl overflow-hidden shadow-2xl"
            >
              <img src={gridImages[4].src} alt={gridImages[4].alt} className="w-full h-full object-cover" />
            </motion.div>

            {/* Center Hero Card - Transforms uniformly around center origin points */}
            <motion.div
              style={{ 
                width: heroWidth, 
                height: heroHeight, 
                borderRadius: heroRadius,
              }}
              className="absolute z-10 overflow-hidden shadow-2xl bg-[#04090f] flex items-center justify-center origin-center"
            >
              <img src={gridImages[0].src} alt={gridImages[0].alt} className="w-full h-full object-cover absolute inset-0" />
              
              {/* Core Hero Branding Title */}
              <motion.div 
                style={{ opacity: textOpacity, scale: textScale }}
                className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white p-6 z-20 pointer-events-none"
              >
                <h1 
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight text-center tracking-wide"
                >
                  SPACES WHERE LIFE <br />
                  <span className="italic font-normal">Unfolds</span>
                </h1>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}