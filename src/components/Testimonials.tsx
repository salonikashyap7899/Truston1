import { motion } from "framer-motion";
import { Reveal, SectionEyebrow } from "./Reveal";
import { Section3DBackground } from "./Section3DBackground";

const items = [
  {
    quote:
      "We not only bought our plot from Prime Estate, but also got our home designed by their architecture team. The designs were exactly what we imagined — beautiful and within budget.",
    name: "Anil Singh",
    role: "Homeowner",
    initial: "A",
  },
  {
    quote:
      "As a channel partner, I have referred over 20 clients to Prime Estate. The team is responsive, the commission structure is fair, and the product is genuinely good.",
    name: "Mohammed Irfan",
    role: "Channel Partner",
    initial: "M",
  },
  {
    quote:
      "I was skeptical about buying a plot but Prime Estate's team walked me through every document. The land is approved, the location is growing, and the process was completely transparent.",
    name: "Ramesh Verma",
    role: "Plot Owner, Phase 1",
    initial: "R",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-32 px-6 bg-ink overflow-hidden">
      <Section3DBackground opacity={0.1} />

      {/* Background decoration */}
      <div
        className="absolute top-0 left-0 w-96 h-96 opacity-[0.1]"
        style={{ background: "radial-gradient(circle, var(--luxe-blue), transparent)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-[0.08]"
        style={{ background: "radial-gradient(circle, var(--luxe-cyan), transparent)" }}
      />

      <div className="relative mx-auto max-w-7xl z-10">
        <Reveal>
          <SectionEyebrow light>Client Narratives</SectionEyebrow>
          <h2 className="font-display text-5xl md:text-7xl text-center text-white mb-4 max-w-4xl mx-auto tracking-tight">
            Distinguished <em className="gradient-luxe-text not-italic">Partnerships</em>
          </h2>
          <p className="text-center text-white/40 mt-4 mb-20 max-w-xl mx-auto font-light">
            Voices of excellence from our global network of homeowners and investors.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.12}>
              <motion.figure
                whileHover={{
                  y: -12,
                  scale: 1.02,
                }}
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 0.5,
                  ease: [0.2, 0.8, 0.2, 1],
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 },
                }}
                className="relative glass-premium p-10 h-full group cursor-default border border-white/5 hover:border-luxe-cyan/30 transition-all duration-500 rounded-3xl"
              >
                {/* Quote mark */}
                <div className="font-display text-8xl text-luxe-cyan/10 leading-none absolute top-4 left-8 select-none">
                  &ldquo;
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, si) => (
                    <span key={si} className="text-luxe-cyan text-sm">
                      ★
                    </span>
                  ))}
                </div>

                <blockquote className="font-serif italic text-xl text-white/80 leading-relaxed relative z-10">
                  {t.quote}
                </blockquote>

                <figcaption className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-luxe-blue flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg">
                    {t.initial}
                  </div>
                  <div>
                    <p className="font-semibold text-white group-hover:text-luxe-cyan transition-colors">
                      {t.name}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mt-1 font-bold">
                      {t.role}
                    </p>
                  </div>
                </figcaption>

                {/* Blue accent bar on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-luxe-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              </motion.figure>
            </Reveal>
          ))}
        </div>

        {/* CTA strip */}
        <Reveal>
          <div className="mt-24 text-center">
            <p className="font-serif italic text-2xl text-white/40 mb-8">
              Join the future of luxury real estate.
            </p>
            <a href="tel:+919616061166" className="btn-magnetic btn-luxe px-12 py-5">
              Speak to an Expert →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
