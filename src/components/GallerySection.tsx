import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { usePageContent } from "@/hooks/usePageContent";

const DEFAULT_IMAGES = [
  { src: "/assets/prime-estate-gate.jpg",        alt: "Prime Estate — Aerial Night View", title: "Prime Estate", sub: "Aerial Night View" },
  { src: "/assets/gallery/prime-club.jpg",      alt: "Prime Estate Club House", title: "The Club House", sub: "Premium Amenities" },
  { src: "/assets/building-plots.jpg",          alt: "Prime Estate Internal Roads", title: "Building Plots", sub: "Infrastructure" },
  { src: "/assets/gallery/prime-boulevard.jpg", alt: "Prime Estate Boulevard", title: "The Boulevard", sub: "Green Walkways" },
  { src: "/assets/gallery/prime-street.jpg",    alt: "Prime Estate Street at Sunset", title: "Urban Living", sub: "Modern Streetscapes" },
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

  /* Hero expands from centre to full-screen on scroll down */
  const heroWidth  = useTransform(smoothProgress, [0, 1], ["40%", "100vw"]);
  const heroHeight = useTransform(smoothProgress, [0, 1], ["70%", "100vh"]);
  const heroRadius = useTransform(smoothProgress, [0, 1], ["20px", "0px"]);

  /* Overlay text reveals as hero expands */
  const textOpacity = useTransform(smoothProgress, [0.7, 1], [0, 1]);
  const textY       = useTransform(smoothProgress, [0.7, 1], [24, 0]);

  /* Four corner images disperse outwards on scroll down */
  const cornerOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);

  const tlX = useTransform(smoothProgress, [0, 1], ["0vw", "-100vw"]);
  const tlY = useTransform(smoothProgress, [0, 1], ["0vw", "-100vh"]);

  const blX = useTransform(smoothProgress, [0, 1], ["0vw", "-100vw"]);
  const blY = useTransform(smoothProgress, [0, 1], ["0vw", "100vh"]);

  const trX = useTransform(smoothProgress, [0, 1], ["0vw", "100vw"]);
  const trY = useTransform(smoothProgress, [0, 1], ["0vw", "-100vh"]);

  const brX = useTransform(smoothProgress, [0, 1], ["0vw", "100vw"]);
  const brY = useTransform(smoothProgress, [0, 1], ["0vw", "100vh"]);

  return (
    <section id="gallery-section" className="relative bg-[#04090f] w-full select-none pt-24">
      {/* Sticky scroll container */}
      <div ref={containerRef} className="h-[150vh] w-full relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#04090f]">
          <div className="relative w-full max-w-[1400px] h-screen mx-auto flex items-center justify-center">

            {/* Top-left */}
            <motion.div
              style={{ x: tlX, y: tlY, opacity: cornerOpacity }}
              className="absolute top-[5%] left-[5%] w-[25%] h-[40%] rounded-2xl overflow-hidden shadow-2xl group"
            >
              <img src={DEFAULT_IMAGES[1].src} alt={DEFAULT_IMAGES[1].alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                <p className="text-[#00BFFF] text-[10px] uppercase tracking-widest font-bold mb-1">{DEFAULT_IMAGES[1].sub}</p>
                <h3 className="text-white font-serif text-xl">{DEFAULT_IMAGES[1].title}</h3>
              </div>
            </motion.div>

            {/* Bottom-left */}
            <motion.div
              style={{ x: blX, y: blY, opacity: cornerOpacity }}
              className="absolute bottom-[5%] left-[8%] w-[22%] h-[35%] rounded-2xl overflow-hidden shadow-2xl group"
            >
              <img src={DEFAULT_IMAGES[2].src} alt={DEFAULT_IMAGES[2].alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                <p className="text-[#00BFFF] text-[10px] uppercase tracking-widest font-bold mb-1">{DEFAULT_IMAGES[2].sub}</p>
                <h3 className="text-white font-serif text-xl">{DEFAULT_IMAGES[2].title}</h3>
              </div>
            </motion.div>

            {/* Top-right */}
            <motion.div
              style={{ x: trX, y: trY, opacity: cornerOpacity }}
              className="absolute top-[8%] right-[8%] w-[22%] h-[35%] rounded-2xl overflow-hidden shadow-2xl group"
            >
              <img src={DEFAULT_IMAGES[3].src} alt={DEFAULT_IMAGES[3].alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                <p className="text-[#00BFFF] text-[10px] uppercase tracking-widest font-bold mb-1">{DEFAULT_IMAGES[3].sub}</p>
                <h3 className="text-white font-serif text-xl">{DEFAULT_IMAGES[3].title}</h3>
              </div>
            </motion.div>

            {/* Bottom-right */}
            <motion.div
              style={{ x: brX, y: brY, opacity: cornerOpacity }}
              className="absolute bottom-[5%] right-[5%] w-[25%] h-[40%] rounded-2xl overflow-hidden shadow-2xl group"
            >
              <img src={DEFAULT_IMAGES[4].src} alt={DEFAULT_IMAGES[4].alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                <p className="text-[#00BFFF] text-[10px] uppercase tracking-widest font-bold mb-1">{DEFAULT_IMAGES[4].sub}</p>
                <h3 className="text-white font-serif text-xl">{DEFAULT_IMAGES[4].title}</h3>
              </div>
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
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col items-center justify-center text-white p-4 z-20 pointer-events-none"
              >
                <p className="text-[10px] uppercase tracking-[0.5em] text-[#00BFFF] font-bold mb-4">
                  Prime Estate · Lucknow
                </p>
                <h2
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-5xl md:text-8xl font-light leading-tight text-center"
                >
                  {c.heading || "LIVING LEGACIES"} <br />
                  <span className="italic font-normal text-[#00BFFF]">
                    {c.heading_accent || "In Stone & Light"}
                  </span>
                </h2>
                <p className="mt-8 text-white/50 text-xs uppercase tracking-[0.35em]">
                  SPACES WHERE LIFE Unfolds
                </p>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
