import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Section3DBackground } from "@/components/Section3DBackground";
import luxuryInteriorImg from "@/assets/luxury-interior.jpg";
import lucknowImg from "@/assets/lucknow-aerial.jpg";

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

const pillars = [
  {
    title: "Legacy",
    desc: "Own a piece of land that grows in value as your family grows in the space. A foundation for future generations.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format"
  },
  {
    title: "Connectivity",
    desc: "Stay connected to the heartbeat of the city while enjoying the tranquil pace of a master-planned residential colony.",
    img: lucknowImg
  },
  {
    title: "Exclusivity",
    desc: "A limited collection of plots designed for those who appreciate the finer details and the luxury of personal space.",
    img: luxuryInteriorImg
  }
];

function Page() {
  return (
    <div className="bg-[#04090f] text-white overflow-x-hidden selection:bg-[#00BFFF] selection:text-[#04090f]">
      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-[100px]">
        <div className="absolute inset-0 z-0">
          <img
            src={luxuryInteriorImg}
            alt="TrustOn Lifestyle"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.3) saturate(0.7)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#04090f]/60 via-transparent to-[#04090f]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04090f]/40 to-transparent" />
        </div>

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-20"
          style={{ background: "radial-gradient(circle, #00BFFF 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ duration: 1.2 }}
            className="text-[#00BFFF] text-[10px] md:text-xs uppercase font-bold mb-8 flex items-center justify-center gap-4"
          >
            <span className="w-10 h-px bg-[#00BFFF]/30" />
            The TrustOn Experience
            <span className="w-10 h-px bg-[#00BFFF]/30" />
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl font-serif tracking-tighter leading-none mb-8"
          >
            A Life Less
            <br />
            <em className="text-[#00BFFF] italic">Ordinary</em>
          </motion.h1>
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, delay: 0.8 }}
             className="text-white/40 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed"
          >
            Beyond the ground you own, we curate the lifestyle you live. Discover the difference of a community designed for those who demand excellence in every breath.
          </motion.p>
        </div>
      </section>

      {/* ── Stats Highlight ── */}
      <section className="py-20 border-y border-white/5 bg-[#060c16]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { val: "40%", label: "Green Cover" },
            { val: "24/7", label: "Surveillance" },
            { val: "Premier", label: "Clubhouse" },
            { val: "Elite", label: "Neighborhood" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <p className="font-serif text-3xl md:text-4xl text-white mb-2">{s.val}</p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Core Philosophy ── */}
      <section className="py-32 px-6 relative overflow-hidden">
        <Section3DBackground opacity={0.08} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#00BFFF] font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-[#00BFFF]" />
                Our Philosophy
              </p>
              <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-10">
                Designed for
                <br />
                <em className="text-[#00BFFF] italic">Generations</em>
              </h2>
              <div className="space-y-6 text-white/50 text-lg leading-relaxed font-light">
                <p>
                  At TrustOn, we believe that true luxury is found in the details of daily life. It's the peace of mind that comes with secure boundaries, the joy of wide open green spaces, and the pride of living in a neighborhood that values excellence above all else.
                </p>
                <p>
                  Every TrustOn township is a master-planned ecosystem where nature and infrastructure exist in perfect harmony, ensuring your investment doesn't just appreciate in value, but grows in soul.
                </p>
              </div>

              <div className="mt-12 flex items-center gap-10">
                 <div className="flex flex-col">
                   <span className="text-4xl font-serif text-[#00BFFF]">100%</span>
                   <span className="text-[10px] uppercase tracking-widest text-white/30 mt-1">Transparency</span>
                 </div>
                 <div className="w-px h-12 bg-white/10" />
                 <div className="flex flex-col">
                   <span className="text-4xl font-serif text-[#00BFFF]">Premium</span>
                   <span className="text-[10px] uppercase tracking-widest text-white/30 mt-1">Locations Only</span>
                 </div>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -8, borderColor: "rgba(0,191,255,0.4)" }}
                    className="bg-[#060c16]/50 backdrop-blur-xl border border-white/5 p-8 rounded-[32px] transition-all duration-500 h-full group"
                  >
                    <span className="text-3xl mb-6 block group-hover:scale-110 transition-transform duration-500">{f.icon}</span>
                    <h3 className="font-serif text-xl text-white mb-3 group-hover:text-[#00BFFF] transition-colors">{f.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed font-light">{f.desc}</p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Lifestyle Pillars ── */}
      <section className="py-32 px-6 bg-[#060c16] relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#00BFFF] font-bold mb-6">Lifestyle Pillars</p>
              <h2 className="font-serif text-4xl md:text-6xl leading-tight">The Three Foundations of <em className="italic text-[#00BFFF]">Living</em></h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <div className="group relative aspect-[3/4] overflow-hidden rounded-[32px] border border-white/5">
                   <img src={p.img} alt={p.title} className="absolute inset-0 w-full h-full object-cover brightness-50 group-hover:scale-110 transition-transform duration-1000" />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#04090f] via-transparent to-transparent opacity-80" />
                   <div className="absolute bottom-0 p-10">
                      <h3 className="font-serif text-3xl text-white mb-4">{p.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500">{p.desc}</p>
                   </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial Quote ── */}
      <section className="py-32 px-6 text-center border-b border-white/5">
        <Reveal>
          <div className="max-w-4xl mx-auto">
            <span className="text-5xl text-[#00BFFF]/20 font-serif mb-8 block">“</span>
            <p className="font-serif text-3xl md:text-5xl text-white/80 leading-snug italic mb-8">
              TrustOn didn't just sell us a plot; they sold us a future where our children can play safely and we can enjoy the luxury of quiet evenings.
            </p>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#00BFFF] font-bold">— A Prime Estate Homeowner</p>
          </div>
        </Reveal>
      </section>

      {/* ── CTA ── */}
      <section className="py-40 px-6 text-center relative overflow-hidden bg-[#04090f]">
        <Section3DBackground opacity={0.15} />
        <div className="max-w-4xl mx-auto relative z-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#00BFFF] font-bold mb-8">Ready to Elevate Your Standard?</p>
            <h2 className="font-serif text-5xl md:text-8xl leading-tight mb-12">
              Your New Chapter
              <br />
              <em className="text-[#00BFFF] italic">Starts Here</em>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/contact"
                className="px-14 py-6 bg-[#00BFFF] text-[#04090f] text-[12px] uppercase tracking-[0.2em] font-bold rounded-full transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(0,191,255,0.3)]"
              >
                Experience TrustOn →
              </Link>
              <a
                href="tel:+919616061166"
                className="px-14 py-6 border border-white/10 text-white/60 text-[12px] uppercase tracking-[0.2em] font-bold rounded-full hover:border-[#00BFFF] hover:text-[#00BFFF] transition-all duration-500"
              >
                Call Concierge
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
