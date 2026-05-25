import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Reveal, CountUp } from "@/components/Reveal";
import heroImg from "@/assets/luxury-interior.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — TrustOn | Plots, Architecture, Construction & Investment" },
      {
        name: "description",
        content:
          "Explore TrustOn's full suite of premium real estate services — plot selling, architecture & design, construction & build, and investment consulting.",
      },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: "🏗️",
    title: "Plot Selling",
    blurb:
      "Premium residential land parcels in Lucknow's high-growth corridors with complete legal clarity.",
    features: ["Jila Panchayat Approved", "Clear Title Deeds", "Verified Documentation", "High-Growth Locations"],
    link: "/plot-selling",
    linkLabel: "Explore Plots →",
  },
  {
    icon: "📐",
    title: "Architecture & Design",
    blurb:
      "Bespoke architectural planning tailored to your vision with 3D visualizations and blueprint documentation.",
    features: ["Custom Layouts", "3D Visualizations", "Elevation Designs", "Complete Blueprints"],
    link: "/architecture-design",
    linkLabel: "Design Your Space →",
  },
  {
    icon: "🏢",
    title: "Construction & Build",
    blurb:
      "Full-service home construction from foundation to finishing with premium craftsmanship and transparency.",
    features: ["Premium Materials", "Expert Teams", "On-Time Delivery", "Quality Assurance"],
    link: "/construction-build",
    linkLabel: "Build With Us →",
  },
  {
    icon: "📈",
    title: "Investment Consulting",
    blurb:
      "Data-driven advisory on yield, ROI, and strategic positioning across premium real estate inventory.",
    features: ["ROI Analysis", "Location Intelligence", "Portfolio Strategy", "Exit Planning"],
    link: "/investment-consulting",
    linkLabel: "Grow Your Assets →",
  },
] as const;

const stats = [
  { num: 120, suffix: "+", label: "Premium Plots" },
  { num: 50, suffix: "+", label: "Architectural Designs" },
  { num: 100, suffix: "%", label: "On-Schedule Delivery" },
  { label: "Assets Under Mgmt", static: "₹500Cr+" },
];

const steps = [
  { num: "01", title: "Consultation", desc: "Meet our experts to understand your needs, budget, and vision for your investment." },
  { num: "02", title: "Selection & Verification", desc: "Curate premium plots matched to your requirements with complete legal verification." },
  { num: "03", title: "Architectural Design", desc: "Receive custom architectural plans and 3D visualizations of your future home." },
  { num: "04", title: "Construction & Delivery", desc: "Professional construction with transparent progress tracking and on-time delivery guarantee." },
  { num: "05", title: "Handover & Support", desc: "Complete handover with full documentation and ongoing support for your investment." },
];

function ServicesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const servicesInView = useInView(servicesRef, { once: true, margin: "-80px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });
  const processInView = useInView(processRef, { once: true, margin: "-80px" });

  return (
    <div className="bg-[#04090f] text-white overflow-x-hidden">

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #04090f 0%, #060c16 50%, #04090f 100%)" }}
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="TrustOn Services"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#04090f]/60 via-transparent to-[#04090f]" />
        </div>

        {/* Ambient orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.07] pointer-events-none"
          style={{ background: "radial-gradient(circle, #00BFFF, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.05] pointer-events-none"
          style={{ background: "radial-gradient(circle, #0099ff, transparent 70%)" }} />

        <motion.div
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.p
            className="text-[10px] uppercase tracking-[0.45em] text-[#00BFFF] font-bold mb-6"
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={heroInView ? { opacity: 1, letterSpacing: "0.45em" } : {}}
            transition={{ duration: 1.2, delay: 0.15 }}
          >
            Empire Expertise
          </motion.p>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight tracking-tight mb-6">
            Our Expertise In{" "}
            <em
              className="not-italic"
              style={{ background: "linear-gradient(135deg, #00BFFF, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              Real Estate Excellence
            </em>
          </h1>

          <p className="text-white/50 text-lg md:text-xl leading-relaxed font-light max-w-2xl mx-auto mb-12">
            From prime plots to complete architectural solutions — comprehensive real estate services
            that transform your vision into reality with transparency and precision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#services"
              className="px-10 py-4 text-[11px] uppercase tracking-[0.2em] font-bold rounded-full transition-all duration-500 hover:scale-105"
              style={{ background: "#00BFFF", color: "#04090f" }}
            >
              Explore Services
            </a>
            <Link
              to="/contact"
              className="px-10 py-4 border border-white/20 text-white/70 text-[11px] uppercase tracking-[0.2em] font-bold rounded-full hover:border-[#00BFFF] hover:text-[#00BFFF] transition-all duration-500"
            >
              Schedule Consultation
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Services Grid ── */}
      <section
        id="services"
        ref={servicesRef}
        className="py-28 px-6"
        style={{ background: "linear-gradient(180deg, #04090f 0%, #060c16 100%)" }}
      >
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-[10px] uppercase tracking-[0.45em] text-[#00BFFF] font-bold mb-4">Our Services</p>
              <h2 className="font-serif text-4xl md:text-6xl text-white mb-4 tracking-tight">
                Four Pillars of{" "}
                <em className="text-[#00BFFF] italic">Excellence</em>
              </h2>
              <p className="text-white/40 max-w-lg mx-auto text-base font-light">
                Comprehensive solutions designed to guide you through every step of your real estate journey
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                className="relative group rounded-[20px] border border-[#00BFFF]/20 p-8 overflow-hidden transition-all duration-500 hover:border-[#00BFFF]/60 hover:-translate-y-3 cursor-pointer"
                style={{ background: "rgba(255,255,255,0.02)" }}
                initial={{ opacity: 0, y: 40 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ boxShadow: "0 24px 60px rgba(0,191,255,0.18)" }}
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[20px]"
                  style={{ background: "radial-gradient(circle at 70% 0%, rgba(0,191,255,0.08) 0%, transparent 70%)" }} />

                <div className="text-4xl mb-5">{s.icon}</div>

                <h3 className="font-serif text-xl text-white mb-3 tracking-tight">{s.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed mb-5 font-light">{s.blurb}</p>

                <ul className="space-y-2 mb-6">
                  {s.features.map((f) => (
                    <li key={f} className="text-white/50 text-xs flex items-center gap-2">
                      <span className="text-[#00BFFF] font-bold">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to={s.link}
                  className="text-[#00BFFF] text-xs font-bold uppercase tracking-[0.25em] inline-flex items-center gap-2 group-hover:gap-4 transition-all duration-300"
                >
                  {s.linkLabel}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section
        ref={statsRef}
        className="py-20 px-6"
        style={{ background: "linear-gradient(135deg, #060c16 0%, #04090f 100%)" }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="text-center py-12 px-6 rounded-[20px] border border-[#00BFFF]/15"
              style={{ background: "linear-gradient(135deg, rgba(0,191,255,0.06) 0%, rgba(0,153,255,0.03) 100%)" }}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                className="font-serif text-4xl md:text-5xl mb-2"
                style={{ background: "linear-gradient(135deg, #00BFFF, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                {"num" in s ? <CountUp to={s.num} suffix={s.suffix ?? ""} /> : s.static}
              </p>
              <p className="text-white/40 text-xs uppercase tracking-[0.3em] font-bold mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Process Timeline ── */}
      <section
        id="process"
        ref={processRef}
        className="py-28 px-6"
        style={{ background: "linear-gradient(180deg, #04090f 0%, #060c16 100%)" }}
      >
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-[10px] uppercase tracking-[0.45em] text-[#00BFFF] font-bold mb-4">How It Works</p>
              <h2 className="font-serif text-4xl md:text-6xl text-white mb-4 tracking-tight">
                Your Journey{" "}
                <em className="text-[#00BFFF] italic">With TrustOn</em>
              </h2>
              <p className="text-white/40 max-w-md mx-auto text-base font-light">
                A streamlined process designed for clarity and success
              </p>
            </div>
          </Reveal>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00BFFF]/60 via-[#00BFFF]/20 to-transparent transform md:-translate-x-1/2" />

            <div className="space-y-10">
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  className={`relative flex gap-8 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  animate={processInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 top-4 w-3 h-3 rounded-full bg-[#00BFFF] border-4 border-[#04090f] transform -translate-x-1/2 z-10" />

                  {/* Content */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                    <div
                      className="rounded-[16px] border border-[#00BFFF]/20 p-6 transition-all duration-400 hover:border-[#00BFFF]/50"
                      style={{ background: "linear-gradient(135deg, rgba(0,191,255,0.06) 0%, rgba(0,153,255,0.03) 100%)" }}
                    >
                      <p className="text-[#00BFFF] text-xs font-bold uppercase tracking-[0.3em] mb-2">{step.num}</p>
                      <h3 className="font-serif text-xl text-white mb-2">{step.title}</h3>
                      <p className="text-white/45 text-sm leading-relaxed font-light">{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Strip ── */}
      <section
        className="py-24 px-6 text-center border-t border-white/5"
        style={{ background: "#04090f" }}
      >
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.45em] text-[#00BFFF] font-bold mb-6">Private Intelligence</p>
          <h2 className="font-serif text-4xl md:text-6xl text-white mb-10 tracking-tight leading-tight">
            Let our advisors architect<br />
            <em className="text-[#00BFFF] italic">your legacy path.</em>
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <a
              href="tel:+919616061166"
              className="font-serif text-3xl md:text-4xl text-white hover:text-[#00BFFF] transition-colors tracking-tight"
            >
              +91 96160-61166
            </a>
            <Link
              to="/contact"
              className="px-12 py-5 text-[11px] uppercase tracking-[0.3em] font-bold rounded-full transition-all duration-500 hover:scale-105"
              style={{ background: "#00BFFF", color: "#04090f" }}
            >
              Secure Consultation →
            </Link>
          </div>
        </Reveal>
      </section>

    </div>
  );
}
