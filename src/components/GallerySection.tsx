import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import { usePageContent } from "@/hooks/usePageContent";
import { useIsMobile } from "@/hooks/useIsMobile";

export function GallerySection() {
  const isMobile = useIsMobile();
  const c = usePageContent("home.gallery", {
    heading: "Living place that becomes",
    heading_accent: "your pride",
    img_1_src: "/assets/building-plots.jpg",
    img_1_alt: "Prime Estate — Aerial View",
    img_2_src: "/assets/gallery/prime-club.jpg",
    img_2_alt: "Prime Club House",
    img_3_src: "/assets/gallery/prime-road.jpg",
    img_3_alt: "Prime Roads",
    img_4_src: "/assets/gallery/prime-boulevard.jpg",
    img_4_alt: "Prime Boulevard",
    img_5_src: "/assets/gallery/prime-street.jpg",
    img_5_alt: "Prime Street",
    images: [
      { src: "/assets/building-plots.jpg", alt: "Prime Estate — Aerial View", video_url: "" },
      { src: "/assets/gallery/prime-club.jpg", alt: "Prime Club House", video_url: "" },
      { src: "/assets/gallery/prime-road.jpg", alt: "Prime Roads", video_url: "" },
      { src: "/assets/gallery/prime-boulevard.jpg", alt: "Prime Boulevard", video_url: "" },
      { src: "/assets/gallery/prime-street.jpg", alt: "Prime Street", video_url: "" },
    ],
  });

  const images = Array.isArray(c.images) ? (c.images as { src: string; alt?: string }[]) : [];
  const img1 = { src: String(images[0]?.src || c.img_1_src || "/assets/building-plots.jpg"), alt: String(images[0]?.alt || c.img_1_alt || "") };
  const img2 = { src: String(images[1]?.src || c.img_2_src || "/assets/gallery/prime-club.jpg"), alt: String(images[1]?.alt || c.img_2_alt || "") };
  const img3 = { src: String(images[2]?.src || c.img_3_src || "/assets/gallery/prime-road.jpg"), alt: String(images[2]?.alt || c.img_3_alt || "") };
  const img4 = { src: String(images[3]?.src || c.img_4_src || "/assets/gallery/prime-boulevard.jpg"), alt: String(images[3]?.alt || c.img_4_alt || "") };
  const img5 = { src: String(images[4]?.src || c.img_5_src || "/assets/gallery/prime-street.jpg"), alt: String(images[4]?.alt || c.img_5_alt || "") };

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useMotionValue(0);
  useAnimationFrame(() => {
    if (isMobile) return;
    const cur = smooth.get();
    const tgt = scrollYProgress.get();
    smooth.set(cur + (tgt - cur) * 0.055);
  });

  const heroW = useTransform(smooth, [0, 0.9], ["100vw", "36%"]);
  const heroH = useTransform(smooth, [0, 0.9], ["100vh", "54%"]);
  const heroR = useTransform(smooth, [0, 0.9], ["0px", "12px"]);

  const textOp = useTransform(smooth, [0, 0.3], [1, 0]);
  const textY  = useTransform(smooth, [0, 0.3], [0, -60]);

  const cornerOp = useTransform(smooth, [0.1, 0.55], [0, 1]);
  const cornerSc = useTransform(smooth, [0.1, 0.55], [0.82, 1]);

  const tlX = useTransform(smooth, [0, 0.9], ["-55vw", "0vw"]);
  const tlY = useTransform(smooth, [0, 0.9], ["-45vh", "0vh"]);
  const blX = useTransform(smooth, [0, 0.9], ["-55vw", "0vw"]);
  const blY = useTransform(smooth, [0, 0.9], ["45vh",  "0vh"]);
  const trX = useTransform(smooth, [0, 0.9], ["55vw",  "0vw"]);
  const trY = useTransform(smooth, [0, 0.9], ["-45vh", "0vh"]);
  const brX = useTransform(smooth, [0, 0.9], ["55vw",  "0vw"]);
  const brY = useTransform(smooth, [0, 0.9], ["45vh",  "0vh"]);

  const cornerStyle: React.CSSProperties = {
    position: "absolute",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 16px 48px rgba(0,0,0,0.4)",
  };

  const imgStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  };

  /* ── Mobile: show a simple static gallery grid ─────────── */
  if (isMobile) {
    return (
      <section
        id="gallery-section"
        style={{ background: "#04090f" }}
        className="relative w-full overflow-hidden"
      >
        <div className="relative w-full" style={{ aspectRatio: "16/10", maxHeight: "70vw" }}>
          <img src={img1.src} alt={img1.alt} className="w-full h-full object-cover" />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.6rem, 7vw, 2.8rem)", fontWeight: 300, lineHeight: 1.15, textAlign: "center", color: "#fff", textShadow: "0 4px 24px rgba(0,0,0,0.45)", margin: 0 }}>
              {String(c.heading || "")}<br />
              <em style={{ fontStyle: "italic", fontWeight: 400 }}>{String(c.heading_accent || "")}</em>
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1" style={{ background: "#04090f" }}>
          {[img2, img3, img4, img5].map((img, i) => (
            <div key={i} className="overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="gallery-section"
      style={{ background: "#04090f", margin: 0, padding: 0 }}
      className="relative w-full select-none"
    >
      <div ref={containerRef} style={{ height: "clamp(100vh, 105vh, 110vh)", position: "relative" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            background: "#04090f",
          }}
          className="w-full"
        >
          <div className="relative w-full h-full flex items-center justify-center">

            {/* Top-left */}
            <motion.div
              style={{
                ...cornerStyle,
                x: tlX, y: tlY, opacity: cornerOp, scale: cornerSc,
                width: "25%", height: "44%",
                top: "4%", left: "4%",
              }}
            >
              <img src={img2.src} alt={img2.alt} style={imgStyle} />
            </motion.div>

            {/* Bottom-left */}
            <motion.div
              style={{
                ...cornerStyle,
                x: blX, y: blY, opacity: cornerOp, scale: cornerSc,
                width: "23%", height: "38%",
                bottom: "4%", left: "6%",
              }}
            >
              <img src={img3.src} alt={img3.alt} style={imgStyle} />
            </motion.div>

            {/* Top-right */}
            <motion.div
              style={{
                ...cornerStyle,
                x: trX, y: trY, opacity: cornerOp, scale: cornerSc,
                width: "23%", height: "38%",
                top: "4%", right: "6%",
              }}
            >
              <img src={img4.src} alt={img4.alt} style={imgStyle} />
            </motion.div>

            {/* Bottom-right */}
            <motion.div
              style={{
                ...cornerStyle,
                x: brX, y: brY, opacity: cornerOp, scale: cornerSc,
                width: "25%", height: "44%",
                bottom: "4%", right: "4%",
              }}
            >
              <img src={img5.src} alt={img5.alt} style={imgStyle} />
            </motion.div>

            {/* Hero centre image */}
            <motion.div
              style={{
                position: "absolute",
                zIndex: 10,
                overflow: "hidden",
                boxShadow: "0 32px 80px rgba(0,0,0,0.55)",
                width: heroW,
                height: heroH,
                borderRadius: heroR,
              }}
            >
              <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
                <img
                  src={img1.src}
                  alt={img1.alt}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.08) 40%, transparent 100%)",
                  }}
                />

                <motion.div
                  style={{
                    opacity: textOp,
                    y: textY,
                    position: "absolute",
                    inset: 0,
                    zIndex: 20,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    pointerEvents: "none",
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "clamp(2.2rem, 5.5vw, 5.5rem)",
                      fontWeight: 300,
                      lineHeight: 1.1,
                      textAlign: "center",
                      color: "#fff",
                      textShadow: "0 4px 40px rgba(0,0,0,0.35)",
                      margin: 0,
                      letterSpacing: "0.015em",
                    }}
                  >
                    {String(c.heading || "")}
                    <br />
                    <em
                      style={{
                        fontStyle: "italic",
                        fontWeight: 400,
                        color: "#fff",
                      }}
                    >
                      {String(c.heading_accent || "")}
                    </em>
                  </h2>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
