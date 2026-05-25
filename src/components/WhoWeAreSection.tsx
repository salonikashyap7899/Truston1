import { motion } from "framer-motion";
import { ContainerScroll } from "./ui/container-scroll-animation";

const pillars = [
  {
    num: "01",
    title: "Transparent Documentation",
    desc: "Clear title deeds, Jila Panchayat approvals, and zero hidden conditions.",
  },
  {
    num: "02",
    title: "High-Growth Locations",
    desc: "Projects in proven corridors with verified infrastructure and appreciation potential.",
  },
  {
    num: "03",
    title: "End-to-End Partnership",
    desc: "From plot acquisition to construction — one trusted team, start to finish.",
  },
];

export function WhoWeAreSection() {
  return (
    <section className="relative bg-[#050b14] overflow-hidden">
      {/* Background grid */}
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
          <div className="px-4">
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-10 h-px bg-[#00BFFF]" />
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#00BFFF] font-bold">
                Who We Are
              </p>
              <span className="w-10 h-px bg-[#00BFFF]" />
            </div>

            {/* Heading */}
            <h2 className="font-serif text-5xl md:text-[4rem] lg:text-[5rem] text-white leading-[0.9] tracking-tight mb-8">
              Shaping{" "}
              <em className="italic text-[#00BFFF] font-light">Legacies</em>
              <br />
              in Lucknow
            </h2>

            {/* Description */}
            <p className="text-white/65 text-base md:text-lg leading-relaxed mb-3 font-light max-w-2xl mx-auto">
              Truston Developers is a Lucknow-based property development company built on a
              single founding principle — that buying land should be simple, transparent, and
              deeply empowering for the buyer.
            </p>
            <p className="text-white/40 text-sm md:text-base leading-relaxed mb-10 font-light max-w-2xl mx-auto">
              We don't merely sell plots; we help you make one of the most significant decisions
              of your life with complete clarity, verified documentation, and a team that stands
              behind every commitment.
            </p>

            {/* Pillars */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-3xl mx-auto text-left mb-4">
              {pillars.map((p) => (
                <motion.div
                  key={p.num}
                  className="flex gap-3 group cursor-default flex-1"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="font-serif text-2xl text-[#00BFFF]/20 font-light leading-none shrink-0 group-hover:text-[#00BFFF]/50 transition-colors duration-500">
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
        }
      >
        {/* Image inside the 3D scroll card */}
        <div className="relative w-full h-full">
          <img
            src="/assets/aerial-township.jpg"
            alt="Prime Estate — Township Overview"
            className="w-full h-full object-cover rounded-xl"
          />
          {/* Scan-line shimmer */}
          <motion.div
            className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00BFFF]/60 to-transparent pointer-events-none"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
          {/* Quote badge */}
          <div className="absolute bottom-5 left-5 right-5">
            <div className="bg-[#04090f]/70 backdrop-blur-2xl border border-[#00BFFF]/20 rounded-2xl p-4">
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#00BFFF] mb-1.5 font-bold">
                Prime Estate · 2025
              </p>
              <p className="font-serif text-white/90 text-lg leading-snug italic">
                "We build the foundation. You build the dream."
              </p>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
