import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";
import { usePageContent } from "@/hooks/usePageContent";
import { useIsMobile } from "@/hooks/useIsMobile";

const DEFAULT_PILLARS = [
  { num: "01", title: "Transparent Documentation", desc: "Clear title deeds, Jila Panchayat approvals, and zero hidden conditions." },
  { num: "02", title: "High-Growth Locations", desc: "Projects in proven corridors with verified infrastructure and appreciation potential." },
  { num: "03", title: "End-to-End Partnership", desc: "From plot acquisition to construction — one trusted team, start to finish." },
];

export function WhoWeAreSection() {
  const isMobile = useIsMobile();
  const sectionRef = useRef(null);
  
  const content = usePageContent("home.who_we_are", {
    eyebrow: "Who We Are",
    title: "Shaping",
    title_accent: "Legacies",
    subtitle: "in Lucknow",
    body: "Truston Developers is a Lucknow-based property development company built on a single founding principle — that buying land should be simple, transparent, and deeply empowering for the buyer.",
    body_secondary: "We don't merely sell plots; we help you make one of the most significant decisions of your life with complete clarity, verified documentation, and a team that stands behind every commitment.",
    morning_image: "/assets/morning-image.jpeg",
    night_image: "/assets/night-image.jpeg",
    quote: "We build the foundation. You build the dream.",
    pillars: DEFAULT_PILLARS,
  });

  const pillars: typeof DEFAULT_PILLARS = Array.isArray(content.pillars) && (content.pillars as typeof DEFAULT_PILLARS).length > 0
    ? (content.pillars as typeof DEFAULT_PILLARS)
    : DEFAULT_PILLARS;

  type GalleryImage = { src: string; alt?: string; video_url?: string };
  const rawImages = Array.isArray(content.images) ? (content.images as GalleryImage[]) : [];
  const morningImage = String(rawImages[0]?.src || content.morning_image || "/assets/morning-image.jpeg");
  const nightImage = String(rawImages[1]?.src || content.night_image || "/assets/night-image.jpeg");
  const quote = String(content.quote || "We build the foundation. You build the dream.");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const morningOpacityRaw = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [1, 1, 0, 0]);
  const nightOpacityRaw = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 0, 1, 1]);

  const morningOpacity = isMobile ? 1 : morningOpacityRaw;
  const nightOpacity = isMobile ? 0 : nightOpacityRaw;

  return (
    <section ref={sectionRef} className="relative bg-[#050b14] overflow-hidden ">
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,191,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,191,255,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#00BFFF]/[0.04] blur-[120px] pointer-events-none" />

      <ContainerScroll
        titleComponent={
          <div className="px-4 mt-12">
            <div className="flex items-center justify-center gap-4 mb-5">
              <span className="w-10 h-px bg-[#00BFFF]" />
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#00BFFF] font-bold">
                {content.eyebrow}
              </p>
              <span className="w-10 h-px bg-[#00BFFF]" />
            </div>
            <h2 className="font-serif text-4xl md:text-[3.5rem] lg:text-[4.5rem] text-white leading-[0.9] tracking-tight">
              {content.title}{" "}
              <em className="italic text-[#00BFFF] font-light">{content.title_accent}</em>
              <br />
              {content.subtitle}
            </h2>
          </div>
        }
      >
        <div className="relative w-full h-full flex flex-col md:flex-row overflow-hidden rounded-xl m-t-0 m-b-0 ">

          <div className="relative w-full md:w-1/2 h-48 md:h-full shrink-0 overflow-hidden">
            <motion.img
              src={morningImage}
              alt="Prime Estate — Morning View"
              style={{ opacity: morningOpacity }}
              className="w-full h-full object-cover absolute inset-0"
            />
            <motion.img
              src={nightImage}
              alt="Prime Estate — Night View"
              style={{ opacity: nightOpacity }}
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute inset-x-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#00BFFF]/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-[#04090f]/75 backdrop-blur-xl border border-[#00BFFF]/20 rounded-xl p-3">
                <p className="text-[8px] uppercase tracking-[0.4em] text-[#00BFFF] mb-1 font-bold">
                  Prime Estate · 2025
                </p>
                <p className="font-serif text-white/90 text-sm leading-snug italic">
                  &ldquo;{quote}&rdquo;
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-[#04090f] p-6 md:p-8 flex flex-col justify-center overflow-y-auto">
            <p className="text-white/65 text-sm md:text-base leading-relaxed mb-3 font-light">
              {String(content.body || "")}
            </p>
            <p className="text-white/40 text-sm leading-relaxed mb-6 font-light">
              {String(content.body_secondary || "")}
            </p>

            <div className="space-y-0">
              {pillars.map((p) => (
                <motion.div
                  key={p.num}
                  className="flex gap-4 py-4 border-b border-white/[0.07] last:border-0 group cursor-default"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="font-serif text-xl text-[#00BFFF]/20 font-light leading-none shrink-0 w-8 group-hover:text-[#00BFFF]/50 transition-colors duration-500">
                    {p.num}
                  </span>
                  <div>
                    <p className="text-white font-semibold text-xs mb-1 tracking-wide group-hover:text-[#00BFFF] transition-colors duration-500 uppercase">
                      {p.title}
                    </p>
                    <p className="text-white/35 text-xs leading-relaxed font-light">
                      {p.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
