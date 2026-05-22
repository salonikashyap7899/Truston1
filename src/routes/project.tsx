import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import projectImg from "@/assets/project-prime.jpg";
import heroImg from "@/assets/hero-estate.jpg";
import { Reveal, SectionEyebrow } from "@/components/Reveal";
import { Section3DBackground } from "@/components/Section3DBackground";

export const Route = createFileRoute("/project")({
  head: () => ({
    meta: [
      { title: "Prime Estate — Projects | TrustOn" },
      {
        name: "description",
        content:
          "Explore Prime Estate — Jila Panchayat approved residential plots in Lucknow. Phase 1 & 2 now selling.",
      },
    ],
  }),
  component: ProjectPage,
});

const amenities = [
  { icon: "🛤️", name: "Wide Internal Roads" },
  { icon: "🔒", name: "24/7 Security Guard" },
  { icon: "💧", name: "Piped Water Supply" },
  { icon: "⚡", name: "Electricity Connection" },
  { icon: "🌳", name: "Landscaped Parks" },
  { icon: "🔧", name: "Underground Drainage" },
];

const faqs = [
  {
    q: "Are the plots in Prime Estate legally approved?",
    a: "Yes, all plots are Jila Panchayat approved with clear title deeds and proper documentation.",
  },
  {
    q: "Can I get construction approval to build my home?",
    a: "Yes, with proper construction approval, you can design and build your dream home exactly as you envision it.",
  },
  {
    q: "What is the starting price of plots in Prime Estate?",
    a: "Plots start from ₹1L+ depending on the size and phase. Contact us for the latest pricing.",
  },
  {
    q: "Is Phase 2 available for booking now?",
    a: "Phase 2 is in active development. Early buyers can register interest now to secure priority booking at launch pricing.",
  },
  {
    q: "How is Prime Estate connected to the rest of Lucknow?",
    a: "Prime Estate has direct highway connectivity and is close to the metro corridor, ensuring seamless access to central Lucknow and beyond.",
  },
];

function ProjectPage() {
  return (
    <div className="bg-[#0A192F] text-white overflow-hidden pt-[140px]">
      {/* Hero Section */}
      <section className="relative py-24 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImg} alt="Prime Estate" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/80 via-[#0A192F]/60 to-[#0A192F]" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 mb-8"
          >
            <span className="text-luxe-cyan text-sm">🏡</span>
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/80">
              Now Selling — Phase 1 & 2
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 tracking-[0.3em] uppercase text-xs font-bold mb-4"
          >
            Lucknow, Uttar Pradesh
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-9xl font-serif mb-8 tracking-tighter"
          >
            Prime <br />
            <em className="text-luxe-cyan italic">Estate</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-10"
          >
            Secure your piece of Lucknow's fastest-growing corridor. Residential plots in Phase 1 &
            2 — highway & metro connected, surrounded by greenery, Jila Panchayat approved with
            clear title deeds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            {[
              "🏗️ Highway Connected",
              "🚇 Metro Connectivity",
              "🌿 Green Surroundings",
              "✅ JP Approved",
            ].map((tag) => (
              <span
                key={tag}
                className="bg-white/5 border border-white/10 rounded-full px-5 py-2 text-sm text-white/70"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-6"
          >
            <Link to="/contact" className="btn-magnetic btn-luxe px-10 py-4 rounded-full text-sm">
              Book a Site Visit
            </Link>
            <a
              href="#project-overview"
              className="inline-flex items-center gap-3 border border-white/20 rounded-full px-10 py-4 text-sm font-bold tracking-wider hover:bg-white/5 transition-colors"
            >
              Explore Project ↓
            </a>
          </motion.div>
        </div>
      </section>

      {/* Project Overview */}
      <section id="project-overview" className="py-32 px-6 bg-white/[0.02] relative">
        <Section3DBackground opacity={0.1} />
        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal>
            <SectionEyebrow>Project Overview</SectionEyebrow>
            <h2 className="font-display text-5xl md:text-7xl text-white mb-10 leading-[0.9] tracking-tighter">
              Premium Residential Plots{" "}
              <em className="text-luxe-cyan italic font-serif">Crafted for Modern Living</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-white/50 text-lg md:text-xl font-light leading-relaxed max-w-3xl mb-12">
              Prime Estate is a thoughtfully planned residential plots colony designed for those who
              want the freedom to build on their own terms. Located in a promising growth corridor
              of Lucknow, the project offers well-defined plots, proper road connectivity, and
              essential infrastructure to support long-term development.
            </p>
            <p className="text-white/50 text-lg font-light leading-relaxed max-w-3xl mb-16">
              It is an ideal choice for buyers looking to secure land in a high-potential area,
              whether for future construction or investment. With clear planning and a focus on
              value appreciation, Prime Estate gives you the foundation to create a space that truly
              reflects your vision.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-[40px] overflow-hidden shadow-luxe">
              {[
                ["Project Type", "Residential Plots"],
                ["Target Buyers", "Investors & End Users"],
                ["Launch Date", "5 January 2025"],
                ["Location", "Lucknow, U.P."],
                ["Approval", "Jila Panchayat ✅"],
                ["Contact", "+91 96160-61166"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="bg-ink/50 p-8 md:p-10 hover:bg-white/[0.03] transition-colors"
                >
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-3 font-bold">
                    {k}
                  </p>
                  <p className="font-display text-xl md:text-2xl text-white tracking-tight">{v}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Site Image Section */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/5">
              <img
                src={projectImg}
                alt="Prime Estate, Lucknow"
                className="w-full h-[400px] md:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent opacity-70" />
              <div className="absolute top-8 right-8 bg-luxe-blue text-white text-xs font-bold tracking-wider uppercase px-5 py-3 rounded-full">
                JP Approved
              </div>
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
                <span className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-8 py-3 text-sm text-white/80">
                  Prime Estate, Lucknow
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              ["1200+", "Sq. Ft. Range"],
              ["₹1L+", "Starting Price"],
              ["2", "Project Phases"],
              ["100%", "Clear Title Deeds"],
            ].map(([n, l]) => (
              <Reveal key={l}>
                <div className="group">
                  <p className="font-display text-5xl md:text-7xl text-white tracking-tighter group-hover:scale-110 transition-transform duration-500 mb-4">
                    {n}
                  </p>
                  <div className="w-8 h-px bg-luxe-cyan/30 mx-auto mb-4 group-hover:w-16 group-hover:bg-luxe-cyan transition-all duration-700" />
                  <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold">
                    {l}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Location Advantage */}
      <section className="py-32 px-6 relative">
        <Section3DBackground opacity={0.15} />
        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal>
            <SectionEyebrow>Location Advantage</SectionEyebrow>
            <h2 className="font-display text-5xl md:text-7xl text-white mb-6 leading-[0.9] tracking-tighter">
              Well Connected to{" "}
              <em className="text-luxe-cyan italic font-serif">Every Corner of Lucknow</em>
            </h2>
            <p className="text-white/50 text-lg font-light leading-relaxed max-w-3xl mb-16">
              Prime Estate is strategically positioned for maximum convenience and future growth
              potential — with seamless access to the city's key transport corridors.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-8">
            {[
              {
                icon: "🏗️",
                title: "Highway Connectivity",
                desc: "Direct access to the major highway, ensuring fast and smooth connectivity to central Lucknow and beyond.",
              },
              {
                icon: "🚇",
                title: "Metro Connectivity",
                desc: "Close proximity to the metro corridor, making daily commutes and city travel effortless for future residents.",
              },
              {
                icon: "🌿",
                title: "Green Surroundings",
                desc: "The project is enveloped by lush greenery, offering clean air and a peaceful environment away from urban noise.",
              },
              {
                icon: "📈",
                title: "Growth Corridor",
                desc: "Located in a rapidly developing zone of Lucknow with rising infrastructure investment and land appreciation trends.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="glass-premium p-10 rounded-3xl border border-white/5 hover:border-luxe-cyan/30 transition-all duration-500 h-full">
                  <span className="text-4xl mb-6 block">{item.icon}</span>
                  <h3 className="font-display text-2xl text-white mb-4 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-32 px-6 bg-white/[0.02] relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal>
            <SectionEyebrow>Amenities</SectionEyebrow>
            <h2 className="font-display text-5xl md:text-7xl text-white mb-6 leading-[0.9] tracking-tighter">
              Everything You Need{" "}
              <em className="text-luxe-cyan italic font-serif">Is Already Here</em>
            </h2>
            <p className="text-white/50 text-lg font-light leading-relaxed max-w-3xl mb-16">
              From security to infrastructure, Prime Estate is equipped with six premium amenities
              ensuring a comfortable and complete residential experience.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((a, i) => (
              <Reveal key={a.name} delay={i * 0.05}>
                <div className="glass-premium p-10 h-full flex flex-col items-center text-center gap-4 rounded-3xl border border-white/5 hover:border-luxe-cyan/30 transition-all duration-500">
                  <span className="text-5xl mb-2">{a.icon}</span>
                  <h3 className="font-display text-2xl text-white tracking-tight">{a.name}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Development Phases */}
      <section className="py-32 px-6 relative">
        <Section3DBackground opacity={0.1} />
        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal>
            <SectionEyebrow>Development Phases</SectionEyebrow>
            <h2 className="font-display text-5xl md:text-7xl text-white mb-6 leading-[0.9] tracking-tighter">
              Structured in <em className="text-luxe-cyan italic font-serif">Two Phases</em>
            </h2>
            <p className="text-white/50 text-lg font-light leading-relaxed max-w-3xl mb-16">
              Prime Estate is being developed in two well-defined phases, ensuring quality delivery
              and consistent infrastructure development at every stage.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Phase 1 */}
            <Reveal delay={0.05}>
              <div className="bg-ink/50 border border-white/5 rounded-3xl p-10 md:p-12 relative overflow-hidden hover:border-luxe-cyan/20 transition-all duration-500">
                <div className="absolute top-8 right-8 font-display text-8xl text-luxe-cyan/10 leading-none">
                  01
                </div>
                <span className="inline-block bg-luxe-cyan/10 text-luxe-cyan text-[10px] font-bold tracking-[0.3em] uppercase px-4 py-2 rounded-full mb-6">
                  Now Available
                </span>
                <h3 className="font-display text-4xl text-white mb-6">Phase 1</h3>
                <p className="text-white/50 text-base leading-relaxed mb-8">
                  The first phase is ready for possession with complete plot demarcation, road
                  leveling, and drainage planning executed to the highest standard. Buyers can book
                  now and begin construction with Jila Panchayat approval.
                </p>
                <ul className="space-y-3">
                  {[
                    "Fully demarcated plots",
                    "Road leveling complete",
                    "Drainage infrastructure ready",
                    "Electricity & water connections",
                    "Clear title deeds available",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white/60 text-sm">
                      <span className="w-2 h-2 rounded-full bg-luxe-cyan" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Phase 2 */}
            <Reveal delay={0.1}>
              <div className="bg-ink/50 border border-white/5 rounded-3xl p-10 md:p-12 relative overflow-hidden hover:border-luxe-cyan/20 transition-all duration-500">
                <div className="absolute top-8 right-8 font-display text-8xl text-luxe-cyan/10 leading-none">
                  02
                </div>
                <span className="inline-block bg-white/5 text-white/60 text-[10px] font-bold tracking-[0.3em] uppercase px-4 py-2 rounded-full mb-6">
                  Coming Soon
                </span>
                <h3 className="font-display text-4xl text-white mb-6">Phase 2</h3>
                <p className="text-white/50 text-base leading-relaxed mb-8">
                  Phase 2 is in active development, expanding the colony with additional plots and
                  enhanced amenities. Early buyers can register interest now to secure priority
                  booking at launch pricing.
                </p>
                <ul className="space-y-3">
                  {[
                    "Extended plot sizes available",
                    "Landscaped green zones",
                    "Enhanced security systems",
                    "Community park & walkways",
                    "Pre-booking open now",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white/60 text-sm">
                      <span className="w-2 h-2 rounded-full bg-white/20" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why Prime Estate */}
      <section className="py-32 px-6 bg-white/[0.02] relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal>
            <SectionEyebrow>Why Prime Estate</SectionEyebrow>
            <h2 className="font-display text-5xl md:text-7xl text-white mb-6 leading-[0.9] tracking-tighter">
              Invest with <em className="text-luxe-cyan italic font-serif">Clarity & Confidence</em>
            </h2>
            <p className="text-white/50 text-lg font-light leading-relaxed max-w-3xl mb-16">
              At Prime Estate, the focus is on making property decisions simple and transparent.
              Here's what sets us apart:
            </p>
          </Reveal>

          <div className="space-y-6">
            {[
              {
                title: "High Growth Location",
                desc: "Situated in Lucknow's rapidly expanding development corridor with strong land appreciation potential.",
              },
              {
                title: "Transparent Documentation",
                desc: "Clear title deeds, Jila Panchayat approval, and no hidden charges — every document provided upfront.",
              },
              {
                title: "Planned Infrastructure",
                desc: "Wide roads, drainage, water, and electricity — developed in phases for consistent quality delivery.",
              },
              {
                title: "Build on Your Own Terms",
                desc: "With proper construction approval, you design and build your dream home exactly as you envision it.",
              },
              {
                title: "Strong Investment Potential",
                desc: "Highway and metro proximity make Prime Estate a smart long-term investment with high resale value.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="flex items-start gap-6 glass-premium p-8 rounded-2xl border border-white/5 hover:border-luxe-cyan/20 transition-all duration-500">
                  <div className="w-10 h-10 rounded-full bg-luxe-blue/20 flex items-center justify-center shrink-0 mt-1">
                    <svg
                      className="w-5 h-5 text-luxe-cyan"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-white mb-2">{item.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />

      {/* CTA */}
      <section className="py-32 px-6 bg-ink text-center relative overflow-hidden">
        <Section3DBackground opacity={0.3} />
        <div className="mx-auto max-w-5xl relative z-10">
          <Reveal>
            <SectionEyebrow light>Get Started Today</SectionEyebrow>
            <h2 className="font-display text-4xl md:text-8xl mb-8 text-white tracking-tighter leading-none">
              Ready to Own Your Plot in{" "}
              <em className="text-luxe-cyan italic font-serif">Prime Estate?</em>
            </h2>
            <p className="text-white/50 text-lg font-light leading-relaxed max-w-2xl mx-auto mb-12">
              Plots are limited. Secure yours now and build the life you've always envisioned — in
              one of Lucknow's fastest-growing residential corridors.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
              <a
                href="tel:+919616061166"
                className="btn-magnetic btn-luxe px-12 py-5 flex items-center gap-3"
              >
                <span>📞</span> Call +91 96160-61166
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 border border-white/20 rounded-full px-12 py-5 text-sm font-bold tracking-wider hover:bg-white/5 transition-colors"
              >
                <span>✉️</span> Email Us
              </Link>
            </div>
            <p className="text-white/30 text-sm mt-8">
              Or reach us at{" "}
              <a
                href="mailto:trustondevelopers01@gmail.com"
                className="text-luxe-cyan hover:underline"
              >
                trustondevelopers01@gmail.com
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <Reveal>
          <SectionEyebrow>Frequently Asked Questions</SectionEyebrow>
          <h2 className="font-display text-4xl md:text-6xl text-white mb-16 tracking-tighter">
            Common Questions About{" "}
            <em className="text-luxe-cyan italic font-serif">Prime Estate</em>
          </h2>
        </Reveal>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="border border-white/10 rounded-2xl overflow-hidden hover:border-luxe-cyan/20 transition-all duration-300">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-white/80 text-base font-medium pr-4">{faq.q}</span>
                  <svg
                    className={`w-5 h-5 text-white/40 shrink-0 transition-transform duration-300 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === i ? "auto" : 0,
                    opacity: openIndex === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-white/40 text-sm leading-relaxed">{faq.a}</p>
                </motion.div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
