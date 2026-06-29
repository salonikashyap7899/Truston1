import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SwipeReveal } from "./TextReveal";
import { Reveal } from "./Reveal";
import { Section3DBackground } from "./Section3DBackground";
import { usePageContent } from "@/hooks/usePageContent";
import { useIsMobile } from "@/hooks/useIsMobile";

const DEFAULT_IMAGES = [
  { src: "/assets/green-amenities.jpg", alt: "Prime Estate 1", video_url: "" },
  { src: "/assets/photo_2.jpg", alt: "Prime Estate 2", video_url: "" },
  { src: "/assets/photo_3.jpg", alt: "Prime Estate 3", video_url: "" },
  { src: "/assets/photo_4.jpg", alt: "Prime Estate 4", video_url: "" },
];

interface MediaItem {
  src: string;
  alt: string;
  video_url: string;
}

function MediaCircle({ item, className }: { item: MediaItem; className: string }) {
  if (item.video_url) {
    return (
      <div className={`rounded-full overflow-hidden ${className}`}>
        <video src={item.video_url} autoPlay muted loop playsInline className="w-full h-full object-cover" />
      </div>
    );
  }
  return (
    <div className={`rounded-full overflow-hidden ${className}`}>
      <img src={item.src} className="w-full h-full object-cover" alt={item.alt} />
    </div>
  );
}

export function IntroHighlightSection() {
  const c = usePageContent("home.new_generation", {
    eyebrow: "New Generation",
    title: "Modern",
    title_accent: "Living",
    subtitle: "Real Estate",
    body: "Welcome to the era of TrustOn, where we blend cinematic storytelling with architectural excellence. Our mission is to create billion-dollar luxury experiences that transcend traditional real estate.",
    body_secondary: "From interactive 3D environments to immersive lifestyle offerings, every detail is crafted for the elite.",
    cta_label: "Discover Our Vision",
    accent_label: "Innovation",
    accent_body: "Pioneering futuristic living through architectural mastery.",
    images: DEFAULT_IMAGES,
  });

  const images: MediaItem[] = Array.isArray(c.images) && (c.images as MediaItem[]).length > 0
    ? (c.images as MediaItem[]).slice(0, 4)
    : DEFAULT_IMAGES;

  while (images.length < 4) images.push(DEFAULT_IMAGES[images.length % DEFAULT_IMAGES.length]);

  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1Raw = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2Raw = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const scaleRaw = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  const y1 = isMobile ? 0 : y1Raw;
  const y2 = isMobile ? 0 : y2Raw;
  const scale = isMobile ? 1 : scaleRaw;

  return (
    <section
      ref={containerRef}
      className="relative min-h-[80vh] flex items-center justify-center py-24 px-6 overflow-hidden bg-background"
    >
      <Section3DBackground opacity={0.25} />

      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-luxe-blue/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-luxe-cyan/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div style={{ scale, y: y1 }} className="relative flex items-center justify-center">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 relative">
              <MediaCircle
                item={images[0]}
                className="w-28 h-28 sm:w-40 sm:h-40 md:w-56 md:h-56 border-2 border-[#00BFFF]/30 shadow-[0_0_30px_rgba(0,191,255,0.2)]"
              />
              <MediaCircle
                item={images[1]}
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 border-2 border-[#00BFFF]/20 mt-6 sm:mt-8 shadow-[0_0_20px_rgba(0,191,255,0.1)]"
              />
              <MediaCircle
                item={images[2]}
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 border-2 border-[#00BFFF]/20 -mt-6 sm:-mt-8 shadow-[0_0_20px_rgba(0,191,255,0.1)]"
              />
              <MediaCircle
                item={images[3]}
                className="w-28 h-28 sm:w-40 sm:h-40 md:w-56 md:h-56 border-2 border-[#00BFFF]/30 shadow-[0_0_30px_rgba(0,191,255,0.2)]"
              />

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-28 md:h-28 rounded-full bg-[#00BFFF]/10 backdrop-blur-md border border-[#00BFFF]/40 flex items-center justify-center z-10">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-[#00BFFF]/60 animate-ping" />
              </div>
            </div>

            <motion.div
              style={{ y: y2 }}
              className="absolute -bottom-8 -right-4 lg:-right-8 glass-premium p-6 lg:p-8 rounded-2xl max-w-[200px] lg:max-w-xs shadow-luxe border-white/10 z-20"
            >
              <div className="text-[#00BFFF] text-[10px] uppercase tracking-[0.3em] mb-3 font-bold">
                {String(c.accent_label || "Innovation")}
              </div>
              <p className="text-white/60 text-xs lg:text-sm leading-relaxed font-light">
                {String(c.accent_body || "Pioneering futuristic living through architectural mastery.")}
              </p>
            </motion.div>
          </motion.div>

          <div className="space-y-12">
            <Reveal>
              <div className="flex items-center gap-4 mb-4">
                <span className="w-12 h-px bg-luxe-cyan" />
                <span className="text-luxe-cyan text-xs uppercase tracking-[0.4em] font-bold">
                  {c.eyebrow || "New Generation"}
                </span>
              </div>
            </Reveal>

            <SwipeReveal text={String(c.title || "Modern")}>
              <h2 className="font-serif leading-tight tracking-tight">
                <span className="block text-4xl md:text-5xl lg:text-6xl text-white font-light uppercase tracking-widest">
                  {String(c.title || "Modern")}
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl text-[#00BFFF] font-light italic mt-2">
                  {String(c.title_accent || "Living")}
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl text-white/40 font-light mt-2">
                  {String(c.subtitle || "Real Estate")}
                </span>
              </h2>
            </SwipeReveal>

            <Reveal delay={0.3}>
              <div className="space-y-6 text-white/50 text-lg lg:text-xl font-light leading-relaxed">
                <p>{String(c.body || "Welcome to the era of TrustOn, where we blend cinematic storytelling with architectural excellence.")}</p>
                <p>{String(c.body_secondary || "From interactive 3D environments to immersive lifestyle offerings, every detail is crafted for the elite.")}</p>
              </div>
            </Reveal>

            <Reveal delay={0.5}>
              <button className="btn-magnetic btn-luxe px-12">{String(c.cta_label || "Discover Our Vision")}</button>
            </Reveal>
          </div>
        </div>
      </div>

      <motion.div
        style={{ y: y1 }}
        className="absolute top-1/2 -left-24 -translate-y-1/2 rotate-90 pointer-events-none opacity-[0.03]"
      >
        <span className="text-[12rem] font-display text-white whitespace-nowrap uppercase tracking-tighter">
          Truston Empire
        </span>
      </motion.div>
    </section>
  );
}
