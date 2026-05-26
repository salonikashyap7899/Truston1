import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { useRef } from "react";

interface Image {
  src: string;
  alt?: string;
}

interface ZoomParallaxProps {
  images: Image[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // Ultra-smooth spring config for premium buttery feel
  const springConfig = { damping: 40, stiffness: 80, mass: 0.8 };

  // All images scale up and move towards center, eventually becoming ONE image
  // The center image stays put while others zoom in and merge into it
  
  // Center image scale - starts normal, zooms in slightly
  const rawCenterScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 4]);
  
  // Surrounding images start spread out, then zoom and converge to center
  const rawScale2 = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0.8, 1.2, 2.5, 6]);
  const rawScale3 = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.7, 1.1, 2.8, 7]);
  const rawScale4 = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.6, 1, 3, 8]);
  const rawScale5 = useTransform(scrollYProgress, [0, 0.25, 0.55, 1], [0.5, 0.9, 3.5, 9]);
  const rawScale6 = useTransform(scrollYProgress, [0, 0.2, 0.5, 1], [0.4, 0.8, 4, 10]);
  const rawScale7 = useTransform(scrollYProgress, [0, 0.15, 0.45, 1], [0.3, 0.7, 4.5, 12]);

  // Apply spring smoothing for buttery animations
  const centerScale = useSpring(rawCenterScale, springConfig);
  const scale2 = useSpring(rawScale2, springConfig);
  const scale3 = useSpring(rawScale3, springConfig);
  const scale4 = useSpring(rawScale4, springConfig);
  const scale5 = useSpring(rawScale5, springConfig);
  const scale6 = useSpring(rawScale6, springConfig);
  const scale7 = useSpring(rawScale7, springConfig);

  // Position transforms - images converge to center as you scroll
  // X positions (start offset, end at center)
  const x2 = useTransform(scrollYProgress, [0, 0.6, 1], ["-35vw", "-10vw", "0vw"]);
  const x3 = useTransform(scrollYProgress, [0, 0.6, 1], ["35vw", "10vw", "0vw"]);
  const x4 = useTransform(scrollYProgress, [0, 0.6, 1], ["-25vw", "-5vw", "0vw"]);
  const x5 = useTransform(scrollYProgress, [0, 0.6, 1], ["25vw", "5vw", "0vw"]);
  const x6 = useTransform(scrollYProgress, [0, 0.6, 1], ["-40vw", "-8vw", "0vw"]);
  const x7 = useTransform(scrollYProgress, [0, 0.6, 1], ["40vw", "8vw", "0vw"]);

  // Y positions
  const y2 = useTransform(scrollYProgress, [0, 0.6, 1], ["-25vh", "-8vh", "0vh"]);
  const y3 = useTransform(scrollYProgress, [0, 0.6, 1], ["-20vh", "-5vh", "0vh"]);
  const y4 = useTransform(scrollYProgress, [0, 0.6, 1], ["25vh", "8vh", "0vh"]);
  const y5 = useTransform(scrollYProgress, [0, 0.6, 1], ["20vh", "5vh", "0vh"]);
  const y6 = useTransform(scrollYProgress, [0, 0.6, 1], ["-10vh", "-3vh", "0vh"]);
  const y7 = useTransform(scrollYProgress, [0, 0.6, 1], ["30vh", "10vh", "0vh"]);

  // Apply springs to positions
  const springX2 = useSpring(x2, springConfig);
  const springX3 = useSpring(x3, springConfig);
  const springX4 = useSpring(x4, springConfig);
  const springX5 = useSpring(x5, springConfig);
  const springX6 = useSpring(x6, springConfig);
  const springX7 = useSpring(x7, springConfig);

  const springY2 = useSpring(y2, springConfig);
  const springY3 = useSpring(y3, springConfig);
  const springY4 = useSpring(y4, springConfig);
  const springY5 = useSpring(y5, springConfig);
  const springY6 = useSpring(y6, springConfig);
  const springY7 = useSpring(y7, springConfig);

  // Opacity - surrounding images fade out as they merge, center stays visible
  const centerOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [1, 1, 1, 0.8]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.3, 0.7, 0.9], [0.9, 1, 0.6, 0]);
  const opacity3 = useTransform(scrollYProgress, [0, 0.25, 0.65, 0.85], [0.85, 1, 0.5, 0]);
  const opacity4 = useTransform(scrollYProgress, [0, 0.2, 0.6, 0.8], [0.8, 1, 0.4, 0]);
  const opacity5 = useTransform(scrollYProgress, [0, 0.15, 0.55, 0.75], [0.75, 1, 0.3, 0]);
  const opacity6 = useTransform(scrollYProgress, [0, 0.1, 0.5, 0.7], [0.7, 0.9, 0.2, 0]);
  const opacity7 = useTransform(scrollYProgress, [0, 0.05, 0.45, 0.65], [0.65, 0.85, 0.1, 0]);

  const limited = images.slice(0, 7);

  // Image configurations
  const imageConfigs = [
    { scale: centerScale, x: "0vw", y: "0vh", opacity: centerOpacity, zIndex: 10, size: "h-[35vh] w-[35vw] md:h-[40vh] md:w-[30vw]" },
    { scale: scale2, x: springX2, y: springY2, opacity: opacity2, zIndex: 9, size: "h-[25vh] w-[30vw] md:h-[28vh] md:w-[22vw]" },
    { scale: scale3, x: springX3, y: springY3, opacity: opacity3, zIndex: 8, size: "h-[22vh] w-[28vw] md:h-[25vh] md:w-[20vw]" },
    { scale: scale4, x: springX4, y: springY4, opacity: opacity4, zIndex: 7, size: "h-[20vh] w-[25vw] md:h-[22vh] md:w-[18vw]" },
    { scale: scale5, x: springX5, y: springY5, opacity: opacity5, zIndex: 6, size: "h-[18vh] w-[22vw] md:h-[20vh] md:w-[16vw]" },
    { scale: scale6, x: springX6, y: springY6, opacity: opacity6, zIndex: 5, size: "h-[16vh] w-[20vw] md:h-[18vh] md:w-[14vw]" },
    { scale: scale7, x: springX7, y: springY7, opacity: opacity7, zIndex: 4, size: "h-[14vh] w-[18vw] md:h-[16vh] md:w-[12vw]" },
  ];

  return (
    <div ref={container} className="relative h-[350vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Ambient glow effect */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.3]) }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-[#00BFFF]/[0.03] rounded-full blur-[120px]" />
        </motion.div>

        {limited.map(({ src, alt }, index) => {
          const config = imageConfigs[index];

          return (
            <motion.div
              key={index}
              style={{
                scale: config.scale,
                x: typeof config.x === "string" ? config.x : config.x,
                y: typeof config.y === "string" ? config.y : config.y,
                zIndex: config.zIndex,
                willChange: "transform, opacity",
              }}
              className="absolute"
            >
              <motion.div
                className={`relative ${config.size} overflow-hidden rounded-xl shadow-2xl`}
                style={{ opacity: config.opacity }}
              >
                {/* Premium border glow */}
                <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-[#00BFFF]/30 via-transparent to-[#004aad]/20 opacity-60" />

                <img
                  src={src || "/placeholder.svg"}
                  alt={alt || `Gallery image ${index + 1}`}
                  className="h-full w-full object-cover"
                  style={{
                    filter: index === 0 ? "brightness(0.9) saturate(1.15)" : "brightness(0.8) saturate(1.1)",
                  }}
                  loading={index === 0 ? "eager" : "lazy"}
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#04090f]/50 via-transparent to-transparent pointer-events-none" />

                {/* Vignette effect */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-xl"
                  style={{
                    boxShadow: "inset 0 0 80px rgba(0,0,0,0.4)",
                  }}
                />
              </motion.div>
            </motion.div>
          );
        })}

        {/* Center focus indicator */}
        <motion.div
          className="absolute w-2 h-2 bg-[#00BFFF] rounded-full"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.8, 0.8, 0]),
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 2]),
          }}
        />
      </div>
    </div>
  );
}
