import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, SectionEyebrow } from "@/components/Reveal";
import { FloatingImageScroll, SlideInOnScroll, BlurReveal } from "@/components/ScrollAnimations";
import { TiltCard3D } from "@/components/animations/TiltCard3D";

const projectStats = [
  { value: "120+", label: "Total Plots" },
  { value: "47", label: "Available Now" },
  { value: "2400", label: "Sq. Ft Range" },
  { value: "Rs 12L+", label: "Starting Price" },
];

const projectAmenities = [
  "Wide Internal Roads",
  "24/7 Security Guard",
  "Piped Water Supply",
  "Electricity Connection",
  "Landscaped Parks",
  "Underground Drainage",
  "Clear Plot Demarcation",
  "Phased Infrastructure",
];

const serviceCards = [
  {
    num: "01",
    title: "Plot Selling",
    desc: "Residential land parcels in Lucknow's high-growth corridors with Jila Panchayat approvals, clear title deeds, and complete legal documentation.",
    to: "/plot-selling",
    image: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/plot-selling-600x800.jpg",
  },
  {
    num: "02",
    title: "Construction & Build",
    desc: "Full home construction from foundation to finishing with quality materials, experienced teams, and complete transparency at every phase.",
    to: "/construction-build",
    image:
      "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/construction-site-600x800.jpg",
  },
  {
    num: "03",
    title: "Investment Consulting",
    desc: "Expert land investment guidance for first-time buyers, NRIs, and seasoned investors with ROI assessments and location analysis.",
    to: "/investment-consulting",
    image:
      "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/investment-consulting-600x800.jpg",
  },
  {
    num: "04",
    title: "Architecture & Design",
    desc: "In-house architectural planning tailored to your vision, from concept layouts and elevations to complete blueprint documentation.",
    to: "/architecture-design",
    image:
      "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/steve-driscoll-VsBl5PwVZpY-unsplash-scaled.jpg",
  },
];

const trustPoints = [
  {
    num: "01",
    title: "Complete Transparency, Always",
    desc: "Zero ambiguity in every transaction. Plot details, legal status, and pricing are disclosed fully upfront - no fine print and no surprises.",
  },
  {
    num: "02",
    title: "High-Growth Location Intelligence",
    desc: "Dubagga and surrounding corridors in Lucknow are on a proven appreciation trajectory. We identify and secure high-potential land before the curve.",
  },
  {
    num: "03",
    title: "Government-Approved, Legally Secure",
    desc: "Every project carries Jila Panchayat approvals and verified title deeds, ensuring your investment is legally clean and protected.",
  },
  {
    num: "04",
    title: "One Team, Every Step",
    desc: "Plot acquisition, construction, architecture, and investment advisory all sit under one roof, so you do not have to coordinate across agencies.",
  },
  {
    num: "05",
    title: "Your Land, Your Terms",
    desc: "Build now or hold for appreciation - both are valid strategies, and we support both with equal commitment and zero pressure.",
  },
];

export function EnhancedDevelopersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-white via-sand/30 to-white"
    >
      <section className="relative py-24 md:py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <Reveal delay={0}>
            <SectionEyebrow>Flagship Project</SectionEyebrow>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mt-12">
            <Reveal direction="left" delay={0.1}>
              <div className="relative h-96 md:h-[560px] rounded-2xl overflow-hidden shadow-luxe">
                <FloatingImageScroll
                  src="https://truston.advrtisinguru.com/wp-content/uploads/2026/04/luxury-interior-design-600x800.jpg"
                  alt="Prime Estate masterplan"
                  className="h-full"
                  intensity={0.8}
                />
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.2}>
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <h2 className="typography-section-title text-ink mb-4">
                    Prime Estate <br />
                    <span className="text-bronze">Masterplan</span>
                  </h2>
                  <p className="typography-body text-gray-700 leading-relaxed">
                    A masterfully planned residential plot colony at Dubagga, Lucknow - designed
                    for those who want the freedom to build on their own terms in a location primed
                    for significant growth.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="grid grid-cols-2 gap-3"
                >
                  {projectStats.map((stat, idx) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.45 + idx * 0.08 }}
                      className="rounded-2xl border border-[var(--bronze)]/15 bg-white p-5 shadow-card"
                    >
                      <p className="font-display text-3xl md:text-4xl gradient-bronze-text">
                        {stat.value}
                      </p>
                      <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-gray-500">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="rounded-2xl border border-gray-100 bg-white/90 p-6 shadow-card"
                >
                  <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--bronze)] mb-4">
                    Premium Amenities
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {projectAmenities.map((amenity, idx) => (
                      <motion.p
                        key={amenity}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.55 + idx * 0.04 }}
                        className="text-sm text-gray-700 flex items-center gap-3"
                      >
                        <span className="h-2 w-2 rounded-full bg-[var(--bronze)]/70" />
                        {amenity}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  className="rounded-2xl border border-[var(--bronze)]/20 bg-[var(--bronze)]/5 p-5"
                >
                  <p className="text-sm text-gray-700 leading-relaxed">
                    All plots are <span className="font-semibold text-ink">Jila Panchayat Approved</span>{" "}
                    with clear title deeds, structured layout planning, transparent pricing, and
                    full legal documentation at every stage.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 bg-[var(--bronze)] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity duration-300"
                  >
                    Enquire Now
                  </Link>
                  <a
                    href="tel:+919616061166"
                    className="inline-flex items-center justify-center px-6 py-3 border border-[var(--bronze)]/40 text-[var(--bronze)] font-semibold rounded-lg hover:bg-[var(--bronze)]/10 transition-colors duration-300"
                  >
                    Schedule Visit
                  </a>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          <Reveal delay={0}>
            <SectionEyebrow>What We Offer</SectionEyebrow>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="typography-section-title text-center text-ink mt-8 mb-16">
              Four Pillars of Our Expertise
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {serviceCards.map((service, idx) => (
              <SlideInOnScroll key={service.title} direction={idx % 2 === 0 ? "up" : "down"} delay={idx * 0.12}>
                <TiltCard3D intensity={10} className="h-[420px]">
                  <Link
                    to={service.to}
                    className="group relative block overflow-hidden rounded-xl shadow-card hover:shadow-luxe transition-all duration-500 h-full"
                  >
                    <div className="absolute inset-0 overflow-hidden">
                      <motion.img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent" />
                    </div>

                    <div className="relative h-full flex flex-col justify-end p-8 text-white">
                      <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--bronze)] mb-3">
                        {service.num}
                      </p>
                      <h3 className="text-xl md:text-2xl font-semibold mb-3 group-hover:text-bronze transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-sm md:text-base text-white/90 leading-relaxed">
                        {service.desc}
                      </p>
                    </div>
                  </Link>
                </TiltCard3D>
              </SlideInOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 px-6 bg-gradient-to-br from-ink via-ink/95 to-ink">
        <motion.div style={{ y: bgY }} className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-bronze rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-bronze rounded-full blur-3xl" />
        </motion.div>

        <div className="mx-auto max-w-6xl relative z-10">
          <BlurReveal>
            <SectionEyebrow light>The Truston Difference</SectionEyebrow>
          </BlurReveal>

          <BlurReveal>
            <h2 className="typography-section-title text-center text-white mt-8 mb-6">
              Why Buyers Choose Truston
            </h2>
          </BlurReveal>

          <BlurReveal>
            <p className="max-w-3xl mx-auto text-center text-white/65 mb-16 leading-relaxed">
              Five reasons why Lucknow's smartest investors trust us with their most important
              decisions.
            </p>
          </BlurReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {trustPoints.map((point, idx) => (
              <motion.div
                key={point.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.8 }}
                className={idx === trustPoints.length - 1 ? "md:col-span-2" : ""}
              >
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                  <div className="flex gap-5">
                    <span className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-bronze/15 text-bronze text-sm font-semibold tracking-[0.2em]">
                      {point.num}
                    </span>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
                        {point.title}
                      </h3>
                      <p className="text-sm md:text-base text-white/75 leading-relaxed">
                        {point.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-20 px-6 bg-gradient-to-r from-bronze to-blue-600">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/80 mb-4">
              47 Plots Still Available - Prime Estate - Dubagga
            </p>
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-6">
              Ready to Build Your Legacy?
            </h3>
            <p className="text-white/90 text-base md:text-lg mb-8 leading-relaxed">
              Prices start at Rs 12 Lakhs with a clear, zero-pressure consultation from the team
              behind Truston's flagship development.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-bronze font-bold rounded-lg hover:bg-cream transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              Explore Prime Estate
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
