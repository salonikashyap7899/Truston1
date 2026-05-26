import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Reveal } from "@/components/Reveal";
import { Section3DBackground } from "@/components/Section3DBackground";

export const Route = createFileRoute("/investment-consulting")({
  head: () => ({
    meta: [
      { title: "Investment Consulting — TrustOn Developers" },
      {
        name: "description",
        content:
          "Strategic wealth building through data-driven land investment guidance. ROI analysis, location intelligence, and portfolio strategy.",
      },
    ],
  }),
  component: InvestmentConsultingPage,
});

const investmentServices = [
  {
    title: "First-Time Buyer Guidance",
    desc: "Buying your first plot can feel overwhelming. We demystify the process, explain legal requirements, assess affordability, evaluate locations, and guide you toward land that aligns with your budget.",
  },
  {
    title: "Experienced Investor Portfolio Strategy",
    desc: "If you already own property, we help optimize your portfolio. We analyze existing holdings, identify portfolio gaps, recommend diversification, and structure new investments to maximize overall returns.",
  },
  {
    title: "NRI Investment Solutions",
    desc: "Investing from abroad brings unique challenges—currency fluctuations, regulatory compliance, property management distance. We provide NRI-specific guidance covering foreign investment regulations.",
  },
  {
    title: "Location Intelligence & Growth Analysis",
    desc: "We identify high-potential locations before the curve. Our analysis covers infrastructure development, commercial activity, population growth, and long-term demand drivers.",
  },
  {
    title: "Legal & Compliance Verification",
    desc: "Investment is only worthwhile if the foundation is legal and clear. We conduct thorough title audits, verify Jila Panchayat approvals, and confirm ownership documentation.",
  },
  {
    title: "Exit Strategy & Wealth Realization",
    desc: "Investment is ultimately about realization. We help you plan exit strategies, understand optimal holding periods, navigate sale processes, and realize maximum value.",
  },
];

const metrics = [
  {
    value: "12–18%",
    label: "Annual Appreciation",
    desc: "Historical land appreciation in high-growth Lucknow corridors, year-over-year",
  },
  {
    value: "7–10 yrs",
    label: "Wealth Doubling Timeline",
    desc: "Average investment doubling period at 12% compound annual growth",
  },
  {
    value: "3.1x–4.2x",
    label: "10-Year Return Multiple",
    desc: "Expected portfolio multiplier over a decade with strategic investment",
  },
  {
    value: "100%",
    label: "Legal Clearance",
    desc: "All TrustOn properties are fully documented and Jila Panchayat approved",
  },
];

const investorTypes = [
  {
    type: "Conservative Builder",
    desc: "You want to buy a plot and build your family home or hold for long-term appreciation.",
    benefits: [
      "Plot selection tailored to your vision",
      "Architecture & design coordination",
      "Construction guidance & oversight",
      "Long-term appreciation strategy",
    ],
  },
  {
    type: "Portfolio Growth Investor",
    desc: "You're building a real estate portfolio focused on capital appreciation and multiple wealth streams.",
    benefits: [
      "Multi-property portfolio analysis",
      "High-growth corridor identification",
      "ROI optimization per holding",
      "Tax-efficient structuring",
    ],
  },
  {
    type: "NRI Wealth Builder",
    desc: "You're investing from abroad seeking India's real estate growth with regulatory compliance and management support.",
    benefits: [
      "NRI-specific legal guidance",
      "Currency optimization strategies",
      "Remote property management",
      "Repatriation planning",
    ],
  },
];

const testimonials = [
  {
    quote: "I purchased two plots through TrustOn after thorough market research. The appreciation over 18 months has been exceptional. Their investment consulting team provided data-driven insights.",
    author: "Priya Sharma",
    role: "Investor — Lucknow",
  },
  {
    quote: "Managing a real estate investment from abroad is always nerve-wracking, but TrustOn made every step crystal clear. Documentation was impeccable and legal clearance was pristine.",
    author: "Vikram Agarwal",
    role: "NRI Investor — Dubai",
  },
  {
    quote: "As a channel partner, I have referred over 20 clients. The team is responsive, the commission structure is fair, and the product is genuinely good. Best partnership.",
    author: "Mohammed Irfan",
    role: "Channel Partner",
  },
  {
    quote: "The ROI projections have held up remarkably well. Highly recommended for anyone serious about real estate wealth.",
    author: "Rajesh Kumar",
    role: "Plot Investor — Phase 1",
  },
];

const strategyItems = [
  "Location & Market Analysis",
  "ROI Projections & Scenario Planning",
  "Portfolio Diversification Strategy",
  "Legal Verification & Title Audit",
  "Tax Planning & Compliance Guidance",
  "NRI Investment Solutions",
  "Exit Strategy Planning",
  "Long-Term Wealth Management",
];

function ROICalculator() {
  const [investment, setInvestment] = useState(2500000);
  const [years, setYears] = useState(10);
  const [growth, setGrowth] = useState(15);
  const [results, setResults] = useState({ finalValue: 0, profit: 0, multiple: 0 });

  useEffect(() => {
    const finalValue = investment * Math.pow(1 + growth / 100, years);
    const profit = finalValue - investment;
    const multiple = finalValue / investment;
    setResults({ finalValue, profit, multiple });
  }, [investment, years, growth]);

  return (
    <div className="bg-[#060c16] p-10 rounded-[32px] border border-white/5">
      <h3 className="font-serif text-3xl text-white mb-10">Project Your Investment Returns</h3>
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="space-y-3">
          <label className="text-white/40 text-xs uppercase tracking-widest font-bold">Initial Investment (₹)</label>
          <input
            type="number"
            value={investment}
            onChange={(e) => setInvestment(Number(e.target.value))}
            className="w-full bg-[#04090f] border border-white/10 rounded-xl px-6 py-4 text-white focus:border-[#00BFFF] outline-none transition-all"
          />
        </div>
        <div className="space-y-3">
          <label className="text-white/40 text-xs uppercase tracking-widest font-bold">Time Horizon (Years)</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full bg-[#04090f] border border-white/10 rounded-xl px-6 py-4 text-white focus:border-[#00BFFF] outline-none transition-all"
          />
        </div>
        <div className="space-y-3">
          <label className="text-white/40 text-xs uppercase tracking-widest font-bold">Annual Growth Rate (%)</label>
          <input
            type="number"
            value={growth}
            onChange={(e) => setGrowth(Number(e.target.value))}
            className="w-full bg-[#04090f] border border-white/10 rounded-xl px-6 py-4 text-white focus:border-[#00BFFF] outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-[#04090f] p-8 rounded-2xl text-center border border-white/5">
          <p className="text-[#00BFFF] font-serif text-4xl mb-2">₹{(results.finalValue / 10000000).toFixed(2)}Cr</p>
          <p className="text-white/30 text-[10px] uppercase tracking-widest font-bold">Final Valuation</p>
        </div>
        <div className="bg-[#04090f] p-8 rounded-2xl text-center border border-white/5">
          <p className="text-[#00BFFF] font-serif text-4xl mb-2">₹{(results.profit / 10000000).toFixed(2)}Cr</p>
          <p className="text-white/30 text-[10px] uppercase tracking-widest font-bold">Total Profit</p>
        </div>
        <div className="bg-[#04090f] p-8 rounded-2xl text-center border border-white/5">
          <p className="text-[#00BFFF] font-serif text-4xl mb-2">{results.multiple.toFixed(1)}x</p>
          <p className="text-white/30 text-[10px] uppercase tracking-widest font-bold">Return Multiple</p>
        </div>
      </div>
    </div>
  );
}

function PlotTracker() {
  const plots = [
    { id: "A1", status: "sold", growth: "+45%" },
    { id: "A2", status: "available", growth: "+38%" },
    { id: "A3", status: "sold", growth: "+42%" },
    { id: "A4", status: "available", growth: "+35%" },
    { id: "B1", status: "available", growth: "+30%" },
    { id: "B2", status: "sold", growth: "+40%" },
    { id: "B3", status: "available", growth: "+32%" },
    { id: "B4", status: "available", growth: "+28%" },
    { id: "C1", status: "sold", growth: "+50%" },
    { id: "C2", status: "sold", growth: "+48%" },
    { id: "C3", status: "available", growth: "+36%" },
    { id: "C4", status: "available", growth: "+34%" },
  ];

  return (
    <div className="bg-[#060c16] p-10 rounded-[32px] border border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h3 className="font-serif text-3xl text-white mb-2">Interactive Plot Tracker</h3>
          <p className="text-white/40 text-sm">Real-time availability and appreciation mapping across Prime Estate.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#00BFFF] rounded-full" />
            <span className="text-white/60 text-xs">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-white/10 rounded-full" />
            <span className="text-white/60 text-xs">Sold</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-4 gap-4">
        {plots.map((plot) => (
          <motion.div
            key={plot.id}
            whileHover={{ scale: 1.05 }}
            className={`aspect-square rounded-xl flex flex-col items-center justify-center border transition-all duration-300 ${
              plot.status === "available"
                ? "bg-[#00BFFF]/5 border-[#00BFFF]/30 hover:bg-[#00BFFF]/10"
                : "bg-white/5 border-white/10 opacity-40"
            }`}
          >
            <span className="text-white font-bold text-lg mb-1">{plot.id}</span>
            <span className={`text-[10px] font-bold ${plot.status === "available" ? "text-[#00BFFF]" : "text-white/40"}`}>
              {plot.growth}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 p-6 bg-[#04090f] rounded-2xl border border-white/5">
        <div className="flex items-center justify-between">
          <p className="text-white/60 text-sm">Overall Phase 1 Appreciation</p>
          <p className="text-[#00BFFF] font-serif text-2xl">+42.5% <span className="text-[10px] uppercase tracking-widest text-white/30 ml-2">since launch</span></p>
        </div>
      </div>
    </div>
  );
}

function InvestmentConsultingPage() {
  return (
    <div className="bg-[#04090f] text-white overflow-x-hidden selection:bg-[#00BFFF] selection:text-[#04090f]">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
        <Section3DBackground opacity={0.15} />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-4xl mx-auto">
              <p className="text-[10px] uppercase tracking-[0.45em] text-[#00BFFF] font-bold mb-6">
                Strategic Wealth Building
              </p>
              <h1 className="font-serif text-5xl md:text-8xl leading-tight tracking-tight mb-8">
                Investment <em className="text-[#00BFFF] italic">Consulting</em>
              </h1>
              <p className="text-white/50 text-lg md:text-xl leading-relaxed font-light mb-12">
                Real estate wealth isn't built by chance—it's built by strategy. Our investment consulting team provides data-driven guidance for seeking robust land investment opportunities in Lucknow's highest-growth corridors.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/contact"
                  className="px-10 py-5 bg-[#00BFFF] text-[#04090f] text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all"
                >
                  Start Investment Planning
                </Link>
                <Link
                  to="/contact"
                  className="px-10 py-5 border-2 border-white/20 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:border-[#00BFFF] hover:text-[#00BFFF] transition-all"
                >
                  Schedule Expert Consultation
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div>
                <h2 className="font-serif text-4xl md:text-6xl text-white mb-8 leading-tight">
                  Build Wealth Through <em className="text-[#00BFFF] italic">Strategic Land Investment</em>
                </h2>
                <div className="space-y-6 text-white/50 text-lg leading-relaxed font-light">
                  <p>
                    Land is one of India's most predictable wealth-building assets. At TrustOn, we transform real estate investment from guesswork into strategic certainty. Our consulting approach combines deep local market expertise, transparent ROI analysis, and long-term portfolio strategy.
                  </p>
                  <h3 className="text-white font-serif text-2xl mt-12 mb-6">Our Investment Philosophy</h3>
                  <p>
                    Great investment decisions are rooted in data, not hunches. We analyze location fundamentals, growth trajectories, legal clarity, and long-term appreciation potential. Every recommendation is backed by market research.
                  </p>
                  <p>
                    We believe in transparency above all. You'll understand why we recommend a specific plot, what its appreciation potential is, what risks exist, and how it fits into your broader goals.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-[#060c16] border border-white/5 p-12 rounded-[48px]">
                <h3 className="text-[#00BFFF] text-[10px] uppercase tracking-[0.3em] font-bold mb-8">Investment Services Include</h3>
                <ul className="space-y-6">
                  {strategyItems.map((item) => (
                    <li key={item} className="flex items-center gap-4 text-white/70 text-lg">
                      <span className="text-[#00BFFF]">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 px-6 bg-[#060c16]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">
                Our Investment <em className="text-[#00BFFF] italic">Services</em>
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {investmentServices.map((service, i) => (
              <Reveal key={service.title} delay={i * 0.1}>
                <div className="bg-[#04090f] border-l-4 border-transparent hover:border-[#00BFFF] p-10 rounded-2xl transition-all duration-500 hover:bg-[#00BFFF]/5 h-full">
                  <h3 className="font-serif text-2xl text-white mb-6">{service.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{service.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">
                Real Estate Investment <em className="text-[#00BFFF] italic">Metrics</em>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto text-lg font-light">
                Understand the numbers behind successful real estate wealth building.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.1}>
                <div className="bg-[#060c16] border-t-4 border-[#00BFFF] p-10 rounded-2xl text-center h-full">
                  <p className="font-serif text-4xl text-[#00BFFF] mb-4">{m.value}</p>
                  <h4 className="text-white font-bold mb-4">{m.label}</h4>
                  <p className="text-white/40 text-xs leading-relaxed">{m.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Investor Types */}
      <section className="py-32 px-6 bg-[#060c16]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-6xl text-white mb-6 leading-tight">
                Investment Strategies by <em className="text-[#00BFFF] italic">Investor Type</em>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto text-lg font-light">
                Different investors have different goals. We tailor strategies to align with your timeline and risk appetite.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-8">
            {investorTypes.map((investor, i) => (
              <Reveal key={investor.type} delay={i * 0.1}>
                <div className="bg-[#04090f] border-b-4 border-[#00BFFF] p-10 rounded-3xl flex flex-col h-full">
                  <h3 className="font-serif text-2xl text-white mb-4">{investor.type}</h3>
                  <p className="text-white/45 text-sm leading-relaxed mb-10 flex-grow">{investor.desc}</p>
                  <ul className="space-y-4">
                    {investor.benefits.map((b) => (
                      <li key={b} className="text-white/60 text-xs flex items-start gap-3">
                        <span className="text-[#00BFFF]">✓</span> {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section (ROI & Plot Tracker) */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">
                Data & <em className="text-[#00BFFF] italic">Insights</em>
              </h2>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-12">
            <Reveal direction="left">
              <ROICalculator />
            </Reveal>
            <Reveal direction="right" delay={0.2}>
              <PlotTracker />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 bg-[#060c16]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-6xl text-white mb-20 text-center">
              Investor <em className="text-[#00BFFF] italic">Testimonials</em>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <Reveal key={t.author} delay={i * 0.1}>
                <div className="bg-[#04090f] border-l-4 border-[#00BFFF] p-10 rounded-2xl h-full flex flex-col">
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

      {/* CTA Section */}
      <section className="py-32 px-6 text-center">
        <Reveal>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl md:text-6xl mb-8">
              Ready to Build Your Real Estate <em className="text-[#00BFFF] italic">Wealth</em>?
            </h2>
            <p className="text-white/50 text-lg mb-12">
              Schedule a confidential consultation with our investment advisory team. We'll analyze your goals, assess your risk profile, and create a personalized strategy.
            </p>
            <Link
              to="/contact"
              className="px-12 py-5 bg-[#00BFFF] text-[#04090f] text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all inline-block"
            >
              Book Free Investment Consultation
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
