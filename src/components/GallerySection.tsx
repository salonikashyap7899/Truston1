import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";

const IMAGES = [
  { src: "/assets/building-plots.jpg",          alt: "Prime Estate — Aerial View" },
  { src: "/assets/gallery/prime-club.jpg",      alt: "Prime Club House" },
  { src: "/assets/gallery/prime-road.jpg",      alt: "Prime Roads" },
  { src: "/assets/gallery/prime-boulevard.jpg", alt: "Prime Boulevard" },
  { src: "/assets/gallery/prime-street.jpg",    alt: "Prime Street" },
];

export function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* ── Ultra-smooth lerp ── */
  const smooth = useMotionValue(0);
  useAnimationFrame(() => {
    const cur = smooth.get();
    const tgt = scrollYProgress.get();
    smooth.set(cur + (tgt - cur) * 0.055);
  });

  /* ── Hero transforms — shrinks to center grid position ── */
  const heroW = useTransform(smooth, [0, 0.9], ["100vw", "34%"]);
  const heroH = useTransform(smooth, [0, 0.9], ["100vh", "52%"]);
  const heroR = useTransform(smooth, [0, 0.9], ["0px", "12px"]);

  /* ── Overlay text fades out ── */
  const textOp = useTransform(smooth, [0, 0.3], [1, 0]);
  const textY = useTransform(smooth, [0, 0.3], [0, -60]);

  /* ── Corners: shared fade/scale ── */
  const cornerOp = useTransform(smooth, [0.1, 0.55], [0, 1]);
  const cornerSc = useTransform(smooth, [0.1, 0.55], [0.82, 1]);

  /* ── Corner travel — fly in from edges ── */
  const tlX = useTransform(smooth, [0, 0.9], ["-55vw", "0vw"]);
  const tlY = useTransform(smooth, [0, 0.9], ["-45vh", "0vh"]);
  const blX = useTransform(smooth, [0, 0.9], ["-55vw", "0vw"]);
  const blY = useTransform(smooth, [0, 0.9], ["45vh", "0vh"]);
  const trX = useTransform(smooth, [0, 0.9], ["55vw", "0vw"]);
  const trY = useTransform(smooth, [0, 0.9], ["-45vh", "0vh"]);
  const brX = useTransform(smooth, [0, 0.9], ["55vw", "0vw"]);
  const brY = useTransform(smooth, [0, 0.9], ["45vh", "0vh"]);

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

  return (
    <section
      id="gallery-section"
      style={{ background: "#04090f", margin: 0, padding: 0 }}
      className="relative w-full select-none"
    >
      {/* 105vh for minimal trailing space after animation */}
      <div ref={containerRef} style={{ height: "105vh", position: "relative" }}>
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

            {/* ── Top-left image ── */}
            <motion.div
              style={{
                ...cornerStyle,
                x: tlX, y: tlY, opacity: cornerOp, scale: cornerSc,
                width: "23%", height: "42%",
                top: "5%", left: "4%",
              }}
            >
              <img src={IMAGES[1].src} alt={IMAGES[1].alt} style={imgStyle} />
            </motion.div>

            {/* ── Bottom-left image ── */}
            <motion.div
              style={{
                ...cornerStyle,
                x: blX, y: blY, opacity: cornerOp, scale: cornerSc,
                width: "21%", height: "36%",
                bottom: "5%", left: "6%",
              }}
            >
              <img src={IMAGES[2].src} alt={IMAGES[2].alt} style={imgStyle} />
            </motion.div>

            {/* ── Top-right image ── */}
            <motion.div
              style={{
                ...cornerStyle,
                x: trX, y: trY, opacity: cornerOp, scale: cornerSc,
                width: "21%", height: "36%",
                top: "5%", right: "6%",
              }}
            >
              <img src={IMAGES[3].src} alt={IMAGES[3].alt} style={imgStyle} />
            </motion.div>

            {/* ── Bottom-right image ── */}
            <motion.div
              style={{
                ...cornerStyle,
                x: brX, y: brY, opacity: cornerOp, scale: cornerSc,
                width: "23%", height: "42%",
                bottom: "5%", right: "4%",
              }}
            >
              <img src={IMAGES[4].src} alt={IMAGES[4].alt} style={imgStyle} />
            </motion.div>

            {/* ── Hero — centre (shrinks from fullscreen) ── */}
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
                  src={IMAGES[0].src}
                  alt={IMAGES[0].alt}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
                {/* Subtle gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.08) 40%, transparent 100%)",
                  }}
                />

                {/* Text overlay — fades as user scrolls */}
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
                    SPACES WHERE LIFE
                    <br />
                    <em
                      style={{
                        fontStyle: "italic",
                        fontWeight: 400,
                        color: "#fff",
                      }}
                    >
                      Unfolds
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
