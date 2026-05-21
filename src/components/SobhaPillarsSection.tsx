import { motion } from "framer-motion";
import { TiltCard3D } from "./animations/TiltCard3D";
import { SplitTextReveal } from "./animations/SplitTextReveal";

const pillars = [
  {
    num: "01",
    title: "Transparent Documentation",
    desc: "Clear title deeds, Jila Panchayat approvals, and zero hidden conditions at every stage of the transaction.",
    icon: "/",
  },
  {
    num: "02",
    title: "High-Growth Locations",
    desc: "Projects placed in proven growth corridors with verified infrastructure readiness and long-term appreciation potential.",
    icon: "+",
  },
  {
    num: "03",
    title: "End-to-End Partnership",
    desc: "From plot acquisition to construction and architectural design - one trusted team, start to finish.",
    icon: "O",
  },
];

export function SobhaPillarsSection() {
  return (
    <section className="relative py-24 md:py-36 px-6 bg-[var(--cream)] overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[var(--bronze)]/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[var(--bronze)]/8 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[10px] uppercase tracking-[0.35em] text-[var(--bronze)] flex items-center justify-center gap-4 mb-6">
            <span className="w-12 h-px bg-[var(--bronze)]" />
            Our Pillars
            <span className="w-12 h-px bg-[var(--bronze)]" />
          </span>
          <SplitTextReveal
            type="words"
            delay={0.08}
            text={
              <h2 className="font-display text-4xl md:text-6xl text-[var(--ink)] font-light leading-tight">
                From Concept to Completion:
                <br />
                <em className="italic text-[var(--bronze)]">Defining Our Standards</em>
              </h2>
            }
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.num}
              initial={{ opacity: 0, y: 60, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.9,
                delay: idx * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ perspective: "1000px" }}
            >
              <TiltCard3D className="h-full" intensity={10}>
                <div className="group h-full p-10 md:p-12 bg-white rounded-sm border border-[var(--ink)]/5 shadow-luxe hover:shadow-luxe-lg transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--bronze)]/0 to-[var(--bronze)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <span className="text-5xl text-[var(--bronze)]/20 group-hover:text-[var(--bronze)]/40 transition-colors duration-500 block mb-6">
                    {pillar.icon}
                  </span>

                  <span className="font-display text-6xl font-light text-[var(--bronze)]/30 leading-none block mb-4">
                    {pillar.num}
                  </span>

                  <h3 className="font-serif text-2xl text-[var(--ink)] mb-4 group-hover:text-[var(--bronze)] transition-colors duration-300">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-[var(--ink)]/60 leading-relaxed font-light">
                    {pillar.desc}
                  </p>

                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-[var(--bronze)]"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 + idx * 0.2 }}
                  />
                </div>
              </TiltCard3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
