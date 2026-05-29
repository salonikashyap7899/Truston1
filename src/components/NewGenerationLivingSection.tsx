import { motion } from "framer-motion";
import { Reveal, SwipeReveal } from "@/components/Reveal";
import { usePageContent } from "@/hooks/usePageContent";

export function NewGenerationLivingSection() {
  const content = usePageContent("home.new_generation_living", {
    eyebrow: "New Generation",
    title: "Modern",
    title_accent: "Living",
    subtitle: "Real Estate",
    body: "everyday living are seamlessly connected.",
    body_secondary: "Planned around walkability and choice, the community brings together marina living, beach-inspired experiences, and forest-led neighbourhoods within one integrated city. Living options range from 1 and 2-bedroom residences to expansive 4 to 6 bedroom villas, thoughtfully positioned to offer privacy, openness, and connection to the surrounding landscape.",
    body_tertiary: "With intuitively placed amenities, expansive green corridors, and architecture shaped by context and",
    image_url: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663675321036/XXDfWyhGsReNyllJ.png",
  });

  return (
    <section className="relative py-20 md:py-32 px-6 bg-[#050b14] overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00BFFF]/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00BFFF]/3 rounded-full blur-[80px]" />
      </div>

      {/* Subtle top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00BFFF]/30 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* ── Left: Text Content ── */}
          <div className="space-y-8">
            {/* Eyebrow */}
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-[#00BFFF]" />
                <p className="text-[10px] uppercase tracking-[0.5em] text-[#00BFFF] font-bold">
                  {content.eyebrow}
                </p>
              </div>
            </Reveal>

            {/* Main Heading */}
            <SwipeReveal>
              <h2 className="font-serif leading-tight tracking-tight">
                <span className="block text-4xl md:text-5xl lg:text-6xl text-white font-light">
                  {content.title}
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl text-[#00BFFF] font-light italic mt-2">
                  {content.title_accent}
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl text-white/40 font-light mt-2">
                  {content.subtitle}
                </span>
              </h2>
            </SwipeReveal>

            {/* Divider */}
            <div className="w-16 h-px bg-[#00BFFF]/30" />

            {/* Body Text */}
            <Reveal delay={0.2}>
              <div className="space-y-6 text-white/60 text-base md:text-lg leading-relaxed font-light">
                <p>
                  <span className="text-white/80">{content.body}</span>
                </p>
                <p>
                  {content.body_secondary}
                </p>
                <p className="text-white/50">
                  {content.body_tertiary}
                </p>
              </div>
            </Reveal>

            {/* CTA Button */}
            <Reveal delay={0.4}>
              <button className="px-8 py-3 bg-[#00BFFF] text-[#04090f] text-sm uppercase tracking-[0.2em] font-bold rounded-full hover:scale-105 transition-all duration-500">
                Explore Living Options
              </button>
            </Reveal>
          </div>

          {/* ── Right: Image with Cloud Fade Effect ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[500px] md:h-[600px]"
          >
            {/* Glow effect */}
            <div className="absolute -inset-8 bg-[#00BFFF]/5 blur-3xl rounded-3xl pointer-events-none" />

            {/* Main image container with fade effect */}
            <div className="relative h-full rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
              <img
                src={content.image_url}
                alt="New Generation Living — Marina Lifestyle"
                className="w-full h-full object-cover"
              />

              {/* Gradient overlay for cloud/fade effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050b14]/40" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050b14]/20 via-transparent to-transparent" />

              {/* Soft cloud fade at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#050b14] via-[#050b14]/50 to-transparent pointer-events-none" />
            </div>

            {/* Floating info badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-6 -left-6 bg-[#050b14] border border-[#00BFFF]/25 rounded-2xl px-6 py-4 shadow-xl backdrop-blur-xl z-20"
            >
              <p className="font-serif text-lg text-[#00BFFF] leading-none mb-1">
                Premium Living
              </p>
              <p className="text-[9px] uppercase tracking-[0.35em] text-white/35 font-bold">
                1-6 Bedroom Options
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Subtle bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
}
