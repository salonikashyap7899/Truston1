import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Section3DBackground } from "@/components/Section3DBackground";
import luxuryInteriorImg from "@/assets/luxury-interior.jpg";

export const Route = createFileRoute("/lifestyle")({
  head: () => ({
    meta: [
      { title: "Lifestyle — TrustOn" },
      {
        name: "description",
        content:
          "Experience the curated TrustOn lifestyle. Beyond real estate, we build communities and experiences that last.",
      },
      { property: "og:title", content: "Lifestyle — TrustOn" },
    ],
  }),
  component: Page,
});

const features = [
  {
    title: "Curated Communities",
    desc: "We don't just build roads and plots; we foster environments where neighbors become friends and families thrive in a secure, upscale setting.",
    icon: "🏘️"
  },
  {
    title: "Eco-Conscious Living",
    desc: "Integrated green spaces, planned plantations, and sustainable infrastructure are at the heart of every TrustOn development.",
    icon: "🌱"
  },
  {
    title: "Secure & Serene",
    desc: "24/7 security and meticulously planned layouts ensure that your home is a sanctuary of peace and safety for your loved ones.",
    icon: "🛡️"
  },
  {
    title: "Architectural Harmony",
    desc: "Consistent design guidelines and aesthetic excellence ensure that the entire township maintains a premium, cohesive character.",
    icon: "✨"
  }
];

function Page() {
  return (
    <div className="bg-[#04090f] text-white overflow-x-hidden selection:bg-[#00BFFF] selection:text-[#04090f]">
      {/* ── Hero ── */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-[100px]">
        <div className="absolute inset-0 z-0">
          <img
            src={luxuryInteriorImg}
            alt="TrustOn Lifestyle"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.35) saturate(0.8)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#04090f]/60 via-transparent to-[#04090f]" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[#00BFFF] text-[10px] uppercase tracking-[0.5em] font-bold mb-6"
          >
            The TrustOn Experience
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-5xl md:text-8xl font-serif tracking-tighter leading-none mb-8"
          >
            A Life Less
            <br />
            <em className="text-[#00BFFF] italic">Ordinary</em>
          </motion.h1>
          <motion.p
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1, delay: 0.5 }}
             className="text-white/50 text-lg font-light max-w-2xl mx-auto leading-relaxed"
          >
            Beyond the ground you own, we curate the lifestyle you live. Discover the difference of a community designed for the future.
          </motion.p>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-32 px-6 relative overflow-hidden">
        <Section3DBackground opacity={0.1} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <Reveal>
              <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-8">
                Designed for
                <br />
                <em className="text-[#00BFFF] italic">Generations</em>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-8 font-light">
                At TrustOn, we believe that true luxury is found in the details of daily life. It's the peace of mind that comes with secure boundaries, the joy of wide open green spaces, and the pride of living in a neighborhood that values excellence.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                   <p className="text-3xl font-serif text-[#00BFFF] mb-2">100%</p>
                   <p className="text-[10px] uppercase tracking-widest text-white/40">Secure Living</p>
                </div>
                <div>
                   <p className="text-3xl font-serif text-[#00BFFF] mb-2">40%</p>
                   <p className="text-[10px] uppercase tracking-widest text-white/40">Green Spaces</p>
                </div>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.1}>
                  <div className="bg-[#060c16] border border-white/5 p-8 rounded-3xl hover:border-[#00BFFF]/30 transition-all duration-500">
                    <span className="text-3xl mb-4 block">{f.icon}</span>
                    <h3 className="font-serif text-xl text-white mb-3">{f.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed font-light">{f.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 text-center relative overflow-hidden bg-[#060c16]">
        <div className="max-w-4xl mx-auto relative z-10">
          <Reveal>
            <h2 className="font-serif text-5xl md:text-7xl leading-tight mb-10">
              Your New Chapter
              <br />
              <em className="text-[#00BFFF] italic">Starts Here</em>
            </h2>
            <Link
              to="/contact"
              className="inline-block px-12 py-5 bg-[#00BFFF] text-[#04090f] text-[12px] uppercase tracking-[0.15em] font-bold rounded-full transition-all duration-500 hover:scale-105"
            >
              Experience TrustOn →
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
