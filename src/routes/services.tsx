import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Section3DBackground } from "@/components/Section3DBackground";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — TrustOn Developers" },
      {
        name: "description",
        content:
          "From land acquisition to handover, TrustOn provides a complete ecosystem of real estate services. One trusted partner, every step of your journey.",
      },
    ],
  }),
  component: ServicesPage,
});

const mainServices = [
  {
    num: "01",
    title: "Plot Selling",
    desc: "Premium residential plots in Lucknow's highest-growth corridors. Every plot comes with Jila Panchayat approval, clear title deeds, and complete legal transparency. Own the foundation for your legacy.",
    features: [
      "100+ Premium Plots Available",
      "Jila Panchayat Approved",
      "Clear Title Deeds",
      "Complete Legal Documentation",
      "Transparent Pricing",
      "High-Growth Locations",
    ],
    link: "/plot-selling",
    linkLabel: "Explore Plots",
  },
  {
    num: "02",
    title: "Architecture & Design",
    desc: "Transform your vision into architectural reality. Our in-house design team creates bespoke layouts, stunning elevations, and complete blueprint documentation—each project a masterpiece.",
    features: [
      "Concept Design & Layouts",
      "3D Renderings & Walkthroughs",
      "Complete Blueprints",
      "Material Selection Guidance",
      "Sustainable Design Solutions",
      "Regulatory Compliance",
    ],
    link: "/architecture-design",
    linkLabel: "View Design Services",
  },
  {
    num: "03",
    title: "Construction & Build",
    desc: "Quality construction where architectural dreams become tangible reality. Meticulous attention to detail, premium materials, and unwavering commitment to timely delivery—your home, built perfectly.",
    features: [
      "Complete Home Construction",
      "100% Material Certification",
      "50+ Structural Audits",
      "Skilled Workforce Management",
      "Progress Transparency",
      "On-Time Delivery Guaranteed",
    ],
    link: "/construction-build",
    linkLabel: "Learn About Building",
  },
  {
    num: "04",
    title: "Investment Consulting",
    desc: "Strategic wealth building through data-driven land investment guidance. ROI analysis, location intelligence, portfolio strategy—all tailored to your financial goals and risk profile.",
    features: [
      "Location & Market Analysis",
      "ROI Projections & Modeling",
      "Portfolio Strategy",
      "Legal Verification & Title Audit",
      "NRI Investment Solutions",
      "Tax Planning & Guidance",
    ],
    link: "/investment-consulting",
    linkLabel: "Investment Strategies",
  },
];

const advantages = [
  {
    title: "Seamless Coordination",
    desc: "Plot selection flows directly into architectural design, then construction—no coordination gaps, no vendor confusion. Your project stays aligned throughout.",
    benefit: "Timeline: 40–50 weeks from plot to handover",
  },
  {
    title: "Unified Quality Standards",
    desc: "Same quality philosophy across all services. Materials certified. Processes audited. Standards maintained. Consistency from first consultation to final handover.",
    benefit: "Quality: 50+ structural audits per project",
  },
  {
    title: "Complete Transparency",
    desc: "One team manages your project end-to-end. No hidden costs. No vendor surprises. Every decision, every material, every progress update—completely transparent.",
    benefit: "Transparency: Monthly progress reports & documentation",
  },
];

const whyChoose = [
  {
    title: "Complete Transparency, Always",
    desc: "Zero ambiguity in every transaction. Plot details, legal status, pricing, timelines, and quality standards disclosed fully upfront. No fine print. No surprises.",
  },
  {
    title: "High-Growth Location Intelligence",
    desc: "Dubagga and surrounding corridors are on a proven appreciation trajectory. We identify high-potential land before the market, passing that advantage directly to our clients.",
  },
  {
    title: "Government-Approved & Legally Secure",
    desc: "Every project carries Jila Panchayat approvals and verified title deeds. Your investment is legally clean, compliant, and protected for generations.",
  },
  {
    title: "One Team, Every Step",
    desc: "Plot acquisition, architecture, construction, investment advisory—all under one roof. No coordination between multiple agencies. One trusted partner.",
  },
  {
    title: "Proven Track Record",
    desc: "150+ premium plots sold. 50+ homes completed. Consistent on-time delivery. Years of trust from homeowners, investors, and partners.",
  },
  {
    title: "Your Goals, Our Commitment",
    desc: "Build now or hold for appreciation—both strategies are equally valid. We support your objectives with equal commitment, no pressure, no gimmicks.",
  },
];

const selectionGuide = [
  {
    title: "The Home Builder",
    desc: "You want to buy a plot in a prime location and build your dream family home. You need guidance on land selection, architectural design, and quality construction.",
    recommended: ["Plot Selling", "Architecture & Design", "Construction & Build"],
  },
  {
    title: "The Wealth Investor",
    desc: "You're building a real estate portfolio focused on capital appreciation. You need data-driven location analysis, ROI projections, and strategic portfolio guidance.",
    recommended: ["Investment Consulting", "Plot Selling", "Architecture & Design"],
  },
  {
    title: "The Design-Forward Buyer",
    desc: "You own or are buying a plot and want exceptional architectural design. You need a creative design partner who understands your vision and translates it to reality.",
    recommended: ["Architecture & Design", "Construction & Build", "Plot Selling"],
  },
  {
    title: "The NRI Investor",
    desc: "You're investing from abroad seeking India's real estate growth with regulatory compliance, transparency, and distance management support.",
    recommended: ["Investment Consulting", "Plot Selling", "Construction & Build"],
  },
];

const testimonials = [
  {
    quote: "We bought our plot, got it designed by their architecture team, and are now building with them. One partner, unified vision. It's exactly how home building should feel.",
    author: "Anil Singh",
    role: "Homeowner — All Services",
  },
  {
    quote: "The investment consulting team provided insights I couldn't find anywhere else. Their ROI projections have held up perfectly. Two years and 25% appreciation—beyond expectations.",
    author: "Priya Sharma",
    role: "Investor — 18 months",
  },
  {
    quote: "From Dubai, managing a property investment seemed impossible. TrustOn made it seamless—documentation, construction oversight, regular updates. Completely stress-free.",
    author: "Vikram Agarwal",
    role: "NRI Investor",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Discovery & Understanding",
    desc: "We begin by listening. Your goals, timeline, budget, vision—all understood deeply before recommending any service path.",
  },
  {
    num: "02",
    title: "Analysis & Strategy",
    desc: "We analyze opportunities, research market dynamics, and create a tailored strategy aligned with your objectives.",
  },
  {
    num: "03",
    title: "Execution & Transparency",
    desc: "We execute with precision while maintaining complete transparency. Regular updates and documentation throughout the journey.",
  },
  {
    num: "04",
    title: "Delivery & Beyond",
    desc: "We deliver excellence and remain your partner beyond handover. Long-term relationships built on trust, not transactions.",
  },
];

function ServicesPage() {
  return (
    <div className="bg-[#04090f] text-white overflow-x-hidden selection:bg-[#00BFFF] selection:text-[#04090f]">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        <Section3DBackground opacity={0.15} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.45em] text-[#00BFFF] font-bold mb-6">
              Complete Real Estate Ecosystem
            </p>
            <h1 className="font-serif text-5xl md:text-8xl leading-tight tracking-tight mb-8">
              Our <em className="text-[#00BFFF] italic">Services</em>
            </h1>
            <p className="text-white/50 text-lg md:text-xl leading-relaxed font-light max-w-3xl mx-auto mb-12">
              From land acquisition to handover, TrustOn provides a complete ecosystem of real estate services. One trusted partner, every step of your journey—whether you're buying a plot, building your dream home, or investing strategically.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">
                Four Pillars of <em className="text-[#00BFFF] italic">Expertise</em>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto text-lg font-light">
                Each service is crafted to deliver excellence, whether you're a first-time buyer, experienced investor, or visionary builder.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {mainServices.map((service, i) => (
              <Reveal key={service.num} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-[#060c16] border border-white/5 p-10 rounded-[32px] group hover:border-[#00BFFF]/30 transition-all duration-500"
                >
                  <div className="text-5xl font-serif text-[#00BFFF]/20 mb-6 group-hover:text-[#00BFFF]/40 transition-colors">
                    {service.num}
                  </div>
                  <h3 className="font-serif text-3xl text-white mb-4">{service.title}</h3>
                  <p className="text-white/45 text-lg leading-relaxed mb-8">{service.desc}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    {service.features.map((f) => (
                      <li key={f} className="text-white/60 text-sm flex items-start gap-2">
                        <span className="text-[#00BFFF]">—</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={service.link}
                    className="inline-flex items-center gap-2 text-[#00BFFF] text-xs font-bold uppercase tracking-[0.2em] group-hover:gap-4 transition-all"
                  >
                    {service.linkLabel} <span>→</span>
                  </Link>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TrustOn Advantage (Integration) */}
      <section className="py-32 px-6 bg-[#060c16]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">
                The TrustOn <em className="text-[#00BFFF] italic">Advantage</em>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto text-lg font-light">
                Unlike traditional real estate agencies that juggle multiple vendors, TrustOn brings all expertise under one roof. One vision. One team. Complete continuity.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {advantages.map((adv, i) => (
              <Reveal key={adv.title} delay={i * 0.1}>
                <div className="bg-[#04090f] border-t-4 border-[#00BFFF] p-10 rounded-2xl h-full flex flex-col">
                  <h3 className="font-serif text-2xl text-white mb-4">{adv.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed mb-8 flex-grow">{adv.desc}</p>
                  <div className="bg-[#00BFFF]/10 p-4 rounded-lg text-[#00BFFF] text-xs font-bold text-center">
                    {adv.benefit}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">
                Why Choose <em className="text-[#00BFFF] italic">TrustOn</em>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto text-lg font-light">
                Five reasons TrustOn stands apart in Lucknow's real estate landscape.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChoose.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="bg-[#060c16] border-l-4 border-[#00BFFF] p-8 rounded-xl h-full">
                  <h4 className="font-serif text-xl text-white mb-4">{item.title}</h4>
                  <p className="text-white/45 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Selection Guide */}
      <section className="py-32 px-6 bg-[#060c16]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">
                Which Services Are <em className="text-[#00BFFF] italic">Right</em> for You?
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto text-lg font-light">
                Different journeys require different services. Find your path below.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {selectionGuide.map((scenario, i) => (
              <Reveal key={scenario.title} delay={i * 0.1}>
                <div className="bg-[#04090f] border-b-4 border-[#00BFFF] p-10 rounded-[32px] h-full flex flex-col">
                  <h4 className="font-serif text-2xl text-white mb-4">{scenario.title}</h4>
                  <p className="text-white/45 text-sm leading-relaxed mb-8 flex-grow">{scenario.desc}</p>
                  <div className="bg-white/5 p-6 rounded-2xl">
                    <p className="text-[#00BFFF] text-[10px] uppercase tracking-[0.2em] font-bold mb-4">Recommended Services</p>
                    <ul className="space-y-3">
                      {scenario.recommended.map((s) => (
                        <li key={s} className="text-white/70 text-sm flex items-center gap-3">
                          <span className="text-[#00BFFF]">✓</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">
                Client <em className="text-[#00BFFF] italic">Success</em> Stories
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto text-lg font-light">
                Real voices from the families and investors we've partnered with across all our services.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <Reveal key={t.author} delay={i * 0.1}>
                <div className="bg-[#060c16] border-l-4 border-[#00BFFF] p-10 rounded-2xl h-full flex flex-col">
                  <p className="text-white/60 italic text-lg leading-relaxed mb-8 flex-grow">"{t.quote}"</p>
                  <div>
                    <p className="text-white font-bold">{t.author}</p>
                    <p className="text-[#00BFFF] text-xs uppercase tracking-widest mt-1">{t.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work (Process) */}
      <section className="py-32 px-6 bg-[#060c16]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">
                How We <em className="text-[#00BFFF] italic">Work</em>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto text-lg font-light">
                Regardless of which services you choose, our process is consistent: listen, analyze, execute, deliver.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#00BFFF] text-[#04090f] rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                    {step.num}
                  </div>
                  <h4 className="font-serif text-xl text-white mb-4">{step.title}</h4>
                  <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="bg-[#00BFFF] p-16 md:p-24 rounded-[48px] text-[#04090f] text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <h2 className="font-serif text-4xl md:text-6xl mb-8">
                  Ready to Begin Your <em className="italic">Journey</em>?
                </h2>
                <p className="text-[#04090f]/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
                  Explore our services, understand which path aligns with your vision, and connect with our team for a detailed, obligation-free consultation.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link
                    to="/contact"
                    className="px-10 py-5 bg-[#04090f] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all"
                  >
                    Book Free Consultation
                  </Link>
                  <Link
                    to="/projects"
                    className="px-10 py-5 border-2 border-[#04090f] text-[#04090f] text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[#04090f] hover:text-white transition-all"
                  >
                    Explore Our Projects
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
