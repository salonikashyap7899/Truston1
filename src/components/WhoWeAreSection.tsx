import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SplitTextReveal } from "./animations/SplitTextReveal";
import { ParallaxImage } from "./animations/ParallaxImage";
import { TiltCard3D } from "./animations/TiltCard3D";

export function WhoWeAreSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const cardY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className="relative bg-transparent pt-0 px-4 md:px-0 z-20">
      <motion.div
        style={{ y: cardY }}
        className="bg-[var(--cream)] text-[var(--ink)] rounded-t-[24px] px-6 md:px-24 py-16 md:py-28 relative -mt-[60px] max-w-6xl mx-auto shadow-2xl sobha-card-3d"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85 }}
          className="text-[0.62rem] tracking-[0.28em] uppercase text-[#4A6FA5] mb-[1.2rem] flex items-center gap-[0.8rem]"
        >
          <span className="w-[28px] h-[1px] bg-[#4A6FA5]"></span>
          Who We Are
        </motion.div>

        <SplitTextReveal
          type="words"
          delay={0.1}
          text={
            <motion.h2 className="font-serif text-[clamp(2.4rem,4vw,4.2rem)] font-light leading-[1.08] text-[#1A1810]">
              Shaping <em className="italic text-[#3b89e8]">Legacies</em>
              <br />
              in Lucknow
            </motion.h2>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start mt-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.2 }}
            className="flex flex-col"
          >
            <p className="text-[0.97rem] text-[#4A4840] leading-[1.9] font-light mb-6">
              Truston Developers is a Lucknow-based property development company built on a single
              founding principle - that buying land should be simple, transparent, and deeply
              empowering for the buyer.
            </p>
            <p className="text-[0.97rem] text-[#4A4840] leading-[1.9] font-light mb-6">
              We do not merely sell plots; we help you make one of the most significant decisions
              of your life with complete clarity, verified documentation, and a team that stands
              behind every commitment.
            </p>

            <div className="mt-10">
              <div className="flex items-start gap-[1.2rem] py-[1.4rem] border-y border-[rgba(26,24,16,0.07)]">
                <div className="font-serif text-[1.8rem] font-light text-[#5b9fd4] leading-none shrink-0 w-[2.5rem]">
                  01
                </div>
                <div>
                  <div className="text-[0.85rem] font-medium text-[#1A1810] mb-[0.3rem] tracking-[0.03em]">
                    Transparent Documentation
                  </div>
                  <div className="text-[0.78rem] text-[#8A8578] leading-[1.65]">
                    Clear title deeds, Jila Panchayat approvals, and zero hidden conditions at
                    every stage of the transaction.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-[1.2rem] py-[1.4rem] border-b border-[rgba(26,24,16,0.07)]">
                <div className="font-serif text-[1.8rem] font-light text-[#5b9fd4] leading-none shrink-0 w-[2.5rem]">
                  02
                </div>
                <div>
                  <div className="text-[0.85rem] font-medium text-[#1A1810] mb-[0.3rem] tracking-[0.03em]">
                    High-Growth Locations
                  </div>
                  <div className="text-[0.78rem] text-[#8A8578] leading-[1.65]">
                    Projects placed in proven growth corridors with verified infrastructure
                    readiness and long-term appreciation potential.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-[1.2rem] py-[1.4rem] border-b border-[rgba(26,24,16,0.07)]">
                <div className="font-serif text-[1.8rem] font-light text-[#5b9fd4] leading-none shrink-0 w-[2.5rem]">
                  03
                </div>
                <div>
                  <div className="text-[0.85rem] font-medium text-[#1A1810] mb-[0.3rem] tracking-[0.03em]">
                    End-to-End Partnership
                  </div>
                  <div className="text-[0.78rem] text-[#8A8578] leading-[1.65]">
                    From plot acquisition to construction and architectural design - one trusted
                    team, start to finish.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.3 }}
            className="relative"
          >
            <TiltCard3D intensity={14} className="w-full">
              <div className="w-full aspect-[4/5] bg-gradient-to-br from-[#2A2720] to-[#1A1815] relative overflow-hidden rounded-[4px] shadow-luxe-lg">
                <ParallaxImage
                  src="https://truston.advrtisinguru.com/wp-content/uploads/2026/04/aerial-photography-chinese-city-600x800.jpg"
                  alt="Prime Estate"
                  className="w-full h-full absolute inset-0 opacity-60 mix-blend-overlay"
                  parallaxOffset={30}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(191,164,106,0.04) 40px, rgba(191,164,106,0.04) 41px)",
                  }}
                ></div>
                <div className="absolute top-[1.5rem] left-[1.5rem] bg-[#3b89e8] text-[#080807] py-[0.4rem] px-[1rem] text-[0.58rem] tracking-[0.18em] uppercase font-medium rounded-[2px] shadow-lg">
                  Prime Estate - 2025
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-[2.5rem] bg-gradient-to-t from-[rgba(8,8,7,0.8)] via-[rgba(8,8,7,0.2)] to-transparent pointer-events-none">
                  <p className="font-serif text-[1.5rem] font-light italic text-[rgba(248,245,238,0.9)] leading-[1.4] relative drop-shadow-md">
                    "We build the foundation.
                    <br />
                    You build the dream."
                  </p>
                </div>
              </div>
            </TiltCard3D>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[rgba(26,24,16,0.08)] mt-16"
        >
          <div className="bg-[var(--cream)] p-8 text-center">
            <div className="font-serif text-[3.5rem] font-light leading-none text-[#1A1810]">
              120<sup className="text-[1.6rem] text-[#3b89e8]">+</sup>
            </div>
            <div className="text-[0.6rem] tracking-[0.18em] uppercase text-[#8A8578] mt-2">
              Total Plots
            </div>
          </div>
          <div className="bg-[var(--cream)] p-8 text-center">
            <div className="font-serif text-[3.5rem] font-light leading-none text-[#1A1810]">
              47
            </div>
            <div className="text-[0.6rem] tracking-[0.18em] uppercase text-[#8A8578] mt-2">
              Still Available
            </div>
          </div>
          <div className="bg-[var(--cream)] p-8 text-center">
            <div className="font-serif text-[3.5rem] font-light leading-none text-[#1A1810]">
              Rs 12<sup className="text-[1.6rem] text-[#3b89e8]">L+</sup>
            </div>
            <div className="text-[0.6rem] tracking-[0.18em] uppercase text-[#8A8578] mt-2">
              Starting Price
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
