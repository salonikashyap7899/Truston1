import { motion } from "framer-motion";
import { usePageContent } from "@/hooks/usePageContent";

export function RedefiningLuxurySection() {
  const content = usePageContent("home.redefining", {
    eyebrow: "Welcome to the Era of TrustOn",
    title: "Redefining",
    title_accent: "Luxury",
    subtitle: "Real Estate",
    body: "Where we blend cinematic storytelling with architectural excellence. Our mission is to create billion-dollar luxury experiences that transcend traditional real estate.",
    body_secondary: "From interactive 3D environments to immersive lifestyle offerings, every detail is crafted for the elite.",
  });

  // Prime Estate Assets
  const images = [
    "/attached_assets/photo_1_2026-05-25_19-38-16_1779720030225.jpg", // Main Gate Day
    "/attached_assets/photo_2_2026-05-25_19-38-16_1779720030224.jpg", // Street View
    "/attached_assets/building_and_plots_1779988876087.jpg",          // Aerial Night
    "/attached_assets/Redefining_luxury_real_estate_1779988876092.jpg" // Aerial with Gate
  ];

  return (
    <section className="relative bg-[#04090f] overflow-hidden py-24 md:py-36">
      {/* Ambient glow orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#00BFFF]/[0.05] blur-[120px]" />
        <div className="absolute right-0 bottom-0 w-[400px] h-[400px] rounded-full bg-[#00BFFF]/[0.04] blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* LEFT — Exact Image Grid with Watercolor/Cloud Effect */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative cloud-border">
              <div className="grid grid-cols-2 gap-4 image-mask-cloud">
                {/* Image 1 - Large Top Left */}
                <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <img src={images[0]} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Prime Estate 1" />
                </div>
                {/* Image 2 - Top Right */}
                <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl mt-8">
                  <img src={images[1]} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Prime Estate 2" />
                </div>
                {/* Image 3 - Bottom Left */}
                <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl -mt-8">
                  <img src={images[2]} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Prime Estate 3" />
                </div>
                {/* Image 4 - Bottom Right */}
                <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <img src={images[3]} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Prime Estate 4" />
                </div>
              </div>
              
              {/* Floating Badge */}
              <motion.div 
                className="absolute -bottom-6 -right-6 bg-luxe-blue/20 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-luxe z-20 hidden md:block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <div className="text-[#00BFFF] text-[10px] uppercase tracking-[0.3em] font-bold mb-1">Project Status</div>
                <div className="text-white text-lg font-serif italic">Prime Estate Phase 1</div>
                <div className="text-white/40 text-[10px] uppercase tracking-widest mt-2">Dubagga, Lucknow</div>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT — Text content */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-px bg-[#00BFFF]" />
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#00BFFF] font-bold">
                {content.eyebrow}
              </p>
            </div>

            {/* Heading */}
            <h2 className="font-serif leading-tight tracking-tight mb-8">
              <span className="block text-4xl md:text-5xl text-white font-light uppercase tracking-widest">
                {content.title}
              </span>
              <span className="block text-4xl md:text-5xl text-[#00BFFF] font-light italic mt-2">
                {content.title_accent}
              </span>
              <span className="block text-4xl md:text-5xl text-white/40 font-light mt-2">
                {content.subtitle}
              </span>
            </h2>

            {/* Divider */}
            <div className="w-16 h-px bg-gradient-to-r from-[#00BFFF] to-transparent mb-8" />

            {/* Body */}
            <p className="text-white/70 text-base md:text-lg leading-relaxed font-light mb-5">
              {content.body}
            </p>
            <p className="text-white/40 text-sm md:text-base leading-relaxed font-light mb-10">
              {content.body_secondary}
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3">
              {["Architectural Excellence", "Cinematic Storytelling", "Elite Lifestyle", "3D Environments"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full border border-[#00BFFF]/20 text-[11px] uppercase tracking-[0.3em] text-white/50 hover:border-[#00BFFF]/50 hover:text-white/80 transition-colors duration-300 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
