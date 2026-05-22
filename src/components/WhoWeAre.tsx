import { motion } from "framer-motion";
import { Reveal, SectionEyebrow } from "./Reveal";

const WHO_WE_ARE_ITEMS = [
  {
    number: "01",
    title: "Our Heritage",
    description: "Founded on the principles of integrity and architectural excellence, TrustOn has been at the forefront of luxury real estate development for over a decade.",
  },
  {
    number: "02",
    title: "Our Vision",
    description: "We aim to redefine the landscape of premium living by blending futuristic technology with timeless design, creating spaces that inspire and endure.",
  },
  {
    number: "03",
    title: "Our Commitment",
    description: "Every plot we sell and every structure we build is a testament to our commitment to quality, transparency, and the long-term success of our investors.",
  },
];

export function WhoWeAre() {
  return (
    <section className="py-32 px-6 bg-[var(--ink)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <SectionEyebrow>The TrustOn Legacy</SectionEyebrow>
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-serif text-white mt-4 mb-8">
              Who <em className="text-luxe-cyan italic">We Are</em>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {WHO_WE_ARE_ITEMS.map((item, i) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="relative group pt-12 border-t border-white/10"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-luxe-cyan to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

              <span className="text-8xl font-serif text-white/5 absolute -top-4 left-0 select-none group-hover:text-luxe-cyan/10 transition-colors duration-500">
                {item.number}
              </span>

              <div className="relative z-10">
                <h3 className="text-2xl font-display text-white mb-6 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-white/40 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 flex items-center gap-2 text-luxe-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Explore More</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
