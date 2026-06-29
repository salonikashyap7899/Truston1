import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Reveal } from "@/components/Reveal";
import { Section3DBackground } from "@/components/Section3DBackground";
import { PlotTrackerCompact } from "@/components/PlotTracker";
import heroImg from "@/assets/hero-estate.jpg";
import { usePageContent } from "@/hooks/usePageContent";

export const Route = createFileRoute("/investment-consulting")({
  head: () => ({
    meta: [
      { title: "Investment Consulting — TrustOn Developers" },
      { name: "description", content: "Strategic wealth building through data-driven land investment guidance. ROI analysis, location intelligence, and portfolio strategy." },
    ],
  }),
  component: InvestmentConsultingPage,
});

const DEFAULT_SERVICES = [
  { title: "First-Time Buyer Guidance", desc: "Buying your first plot can feel overwhelming. We demystify the process, explain legal requirements, assess affordability, evaluate locations, and guide you toward land that aligns with your budget." },
  { title: "Experienced Investor Portfolio Strategy", desc: "If you already own property, we help optimize your portfolio. We analyze existing holdings, identify portfolio gaps, recommend diversification, and structure new investments to maximize overall returns." },
  { title: "NRI Investment Solutions", desc: "Investing from abroad brings unique challenges—currency fluctuations, regulatory compliance, property management distance. We provide NRI-specific guidance covering foreign investment regulations." },
  { title: "Location Intelligence & Growth Analysis", desc: "We identify high-potential locations before the curve. Our analysis covers infrastructure development, commercial activity, population growth, and long-term demand drivers." },
  { title: "Legal & Compliance Verification", desc: "Investment is only worthwhile if the foundation is legal and clear. We conduct thorough title audits, verify Jila Panchayat approvals, and confirm ownership documentation." },
  { title: "Exit Strategy & Wealth Realization", desc: "Investment is ultimately about realization. We help you plan exit strategies, understand optimal holding periods, navigate sale processes, and realize maximum value." },
];
const DEFAULT_METRICS = [
  { value: "12–18%", label: "Annual Appreciation", desc: "Historical land appreciation in high-growth Lucknow corridors, year-over-year" },
  { value: "7–10 yrs", label: "Wealth Doubling Timeline", desc: "Average investment doubling period at 12% compound annual growth" },
  { value: "3.1x–4.2x", label: "10-Year Return Multiple", desc: "Expected portfolio multiplier over a decade with strategic investment" },
  { value: "100%", label: "Legal Clearance", desc: "All TrustOn properties are fully documented and Jila Panchayat approved" },
];
const DEFAULT_INVESTOR_TYPES = [
  { type: "Conservative Builder", desc: "You want to buy a plot and build your family home or hold for long-term appreciation.", benefits: ["Plot selection tailored to your vision", "Architecture & design coordination", "Construction guidance & oversight", "Long-term appreciation strategy"] },
  { type: "Portfolio Growth Investor", desc: "You're building a real estate portfolio focused on capital appreciation and multiple wealth streams.", benefits: ["Multi-property portfolio analysis", "High-growth corridor identification", "ROI optimization per holding", "Tax-efficient structuring"] },
  { type: "NRI Wealth Builder", desc: "You're investing from abroad seeking India's real estate growth with regulatory compliance and management support.", benefits: ["NRI-specific legal guidance", "Currency optimization strategies", "Remote property management", "Repatriation planning"] },
];
const DEFAULT_TESTIMONIALS = [
  { quote: "I purchased two plots through TrustOn after thorough market research. The appreciation over 18 months has been exceptional. Their investment consulting team provided data-driven insights.", author: "Priya Sharma", role: "Investor — Lucknow" },
  { quote: "Managing a real estate investment from abroad is always nerve-wracking, but TrustOn made every step crystal clear. Documentation was impeccable and legal clearance was pristine.", author: "Vikram Agarwal", role: "NRI Investor — Dubai" },
  { quote: "As a channel partner, I have referred over 20 clients. The team is responsive, the commission structure is fair, and the product is genuinely good. Best partnership.", author: "Mohammed Irfan", role: "Channel Partner" },
  { quote: "The ROI projections have held up remarkably well. Highly recommended for anyone serious about real estate wealth.", author: "Rajesh Kumar", role: "Plot Investor — Phase 1" },
];
const DEFAULT_STRATEGY_ITEMS = ["Location & Market Analysis","ROI Projections & Scenario Planning","Portfolio Diversification Strategy","Legal Verification & Title Audit","Tax Planning & Compliance Guidance","NRI Investment Solutions","Exit Strategy Planning","Long-Term Wealth Management"];

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
    <div className="bg-[#060c16] p-8 sm:p-10 rounded-[32px] border border-white/5">
      <h3 className="font-serif text-2xl sm:text-3xl text-white mb-8 sm:mb-10">Project Your Investment Returns</h3>
      <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
        {[
          { label: "Initial Investment (₹)", value: investment, setter: setInvestment },
          { label: "Time Horizon (Years)", value: years, setter: setYears },
          { label: "Annual Growth Rate (%)", value: growth, setter: setGrowth },
        ].map(({ label, value, setter }) => (
          <div key={label} className="space-y-3">
            <label className="text-white/40 text-xs uppercase tracking-widest font-bold">{label}</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setter(Number(e.target.value))}
              className="w-full bg-[#04090f] border border-white/10 rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-white focus:border-[#00BFFF] outline-none transition-all text-sm sm:text-base"
            />
          </div>
        ))}
      </div>
      <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
        {[
          { label: "Final Valuation", value: `₹${(results.finalValue / 10000000).toFixed(2)}Cr` },
          { label: "Total Profit", value: `₹${(results.profit / 10000000).toFixed(2)}Cr` },
          { label: "Return Multiple", value: `${results.multiple.toFixed(1)}x` },
        ].map(({ label, value }) => (
          <div key={label} className="bg-[#04090f] p-6 sm:p-8 rounded-2xl text-center border border-white/5">
            <p className="text-[#00BFFF] font-serif text-3xl sm:text-4xl mb-2">{value}</p>
            <p className="text-white/30 text-[10px] uppercase tracking-widest font-bold">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function InvestmentConsultingPage() {
  const hero = usePageContent("investment.hero", {
    eyebrow: "Strategic Wealth Advisory",
    title: "Invest with",
    title_accent: "Intelligence.",
    subtitle: "Data-driven real estate investment consulting for HNIs, NRIs, and first-time investors. We turn Lucknow's growth story into your wealth story.",
    image_url: "",
  });
  const main = usePageContent("investment.main", {
    section_1_title: "Why Lucknow",
    section_1_accent: "Now?",
    section_1_body: "Lucknow is experiencing unprecedented infrastructure investment — metro expansion, highway upgrades, and smart city initiatives — creating a rare window for strategic real estate investment.",
    cta_title: "Schedule Your",
    cta_accent: "Investment Consultation",
    cta_body: "Book a private session with our investment advisory team. We'll analyze your financial goals, risk appetite, and timeline to build a tailored real estate strategy.",
  });
  const ctaData = usePageContent("investment.cta", {
    title: "Ready to Build Your Real Estate",
    title_accent: "Wealth",
    body: "Schedule a confidential consultation with our investment advisory team. We'll analyze your goals, assess your risk profile, and create a personalized strategy.",
    cta_label: "Book Free Investment Consultation",
  });
  const servicesData = usePageContent("investment.services_list", { items: DEFAULT_SERVICES });
  const metricsData = usePageContent("investment.metrics", { items: DEFAULT_METRICS });
  const investorTypesData = usePageContent("investment.investor_types", { items: DEFAULT_INVESTOR_TYPES });
  const testimonialsData = usePageContent("investment.testimonials", { items: DEFAULT_TESTIMONIALS });
  const strategyData = usePageContent("investment.strategy_items", { items: DEFAULT_STRATEGY_ITEMS });

  const investmentServices = Array.isArray(servicesData.items) ? (servicesData.items as typeof DEFAULT_SERVICES) : DEFAULT_SERVICES;
  const metrics = Array.isArray(metricsData.items) ? (metricsData.items as typeof DEFAULT_METRICS) : DEFAULT_METRICS;
  const investorTypes = Array.isArray(investorTypesData.items) ? (investorTypesData.items as typeof DEFAULT_INVESTOR_TYPES) : DEFAULT_INVESTOR_TYPES;
  const testimonials = Array.isArray(testimonialsData.items) ? (testimonialsData.items as typeof DEFAULT_TESTIMONIALS) : DEFAULT_TESTIMONIALS;
  const strategyItems: string[] = Array.isArray(strategyData.items) ? (strategyData.items as string[]) : DEFAULT_STRATEGY_ITEMS;

  return (
    <div className="bg-[#04090f] text-white overflow-x-hidden selection:bg-[#00BFFF] selection:text-[#04090f]">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src={String(hero.image_url || heroImg)}
            alt="Investment Consulting"
            className="w-full h-full object-cover"
            loading="eager"
            style={{ filter: "brightness(0.25) saturate(0.7)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#04090f]/60 via-transparent to-[#04090f]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04090f]/50 to-transparent" />
        </div>
        <Section3DBackground opacity={0.1} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center max-w-4xl mx-auto">
              <p className="text-[10px] uppercase tracking-[0.45em] text-[#00BFFF] font-bold mb-6">
                {String(hero.eyebrow || "Strategic Wealth Advisory")}
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-8xl leading-tight tracking-tight mb-8">
                {String(hero.title || "Invest with")} <em className="text-[#00BFFF] italic">{String(hero.title_accent || "Intelligence.")}</em>
              </h1>
              <p className="text-white/50 text-base sm:text-lg md:text-xl leading-relaxed font-light mb-12">
                {String(hero.subtitle || "Data-driven real estate investment consulting for HNIs, NRIs, and first-time investors.")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <Link to="/contact" className="px-8 sm:px-10 py-4 sm:py-5 bg-[#00BFFF] text-[#04090f] text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all">
                  Start Investment Planning
                </Link>
                <Link to="/contact" className="px-8 sm:px-10 py-4 sm:py-5 border-2 border-white/20 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:border-[#00BFFF] hover:text-[#00BFFF] transition-all">
                  Schedule Expert Consultation
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal>
              <div>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-white mb-8 leading-tight">
                  {String(main.section_1_title || "Why Lucknow")} <em className="text-[#00BFFF] italic">{String(main.section_1_accent || "Now?")}</em>
                </h2>
                <div className="space-y-6 text-white/50 text-base sm:text-lg leading-relaxed font-light">
                  <p>{String(main.section_1_body || "Lucknow is experiencing unprecedented infrastructure investment.")}</p>
                  <h3 className="text-white font-serif text-xl sm:text-2xl mt-8 mb-4">Our Investment Philosophy</h3>
                  <p>Great investment decisions are rooted in data, not hunches. We analyze location fundamentals, growth trajectories, legal clarity, and long-term appreciation potential. Every recommendation is backed by market research.</p>
                  <p>We believe in transparency above all. You'll understand why we recommend a specific plot, what its appreciation potential is, what risks exist, and how it fits into your broader goals.</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="bg-[#060c16] border border-white/5 p-8 sm:p-12 rounded-[32px] sm:rounded-[48px]">
                <h3 className="text-[#00BFFF] text-[10px] uppercase tracking-[0.3em] font-bold mb-6 sm:mb-8">Investment Services Include</h3>
                <ul className="space-y-4 sm:space-y-6">
                  {strategyItems.map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-white/70 text-base sm:text-lg">
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
      <section className="py-20 sm:py-32 px-4 sm:px-6 bg-[#060c16]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-12 sm:mb-20">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-white mb-6">
                Our Investment <em className="text-[#00BFFF] italic">Services</em>
              </h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {investmentServices.map((service, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="bg-[#04090f] border-l-4 border-transparent hover:border-[#00BFFF] p-8 sm:p-10 rounded-2xl transition-all duration-500 hover:bg-[#00BFFF]/5 h-full">
                  <h3 className="font-serif text-xl sm:text-2xl text-white mb-4 sm:mb-6">{service.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{service.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-12 sm:mb-20">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-white mb-6">
                Real Estate Investment <em className="text-[#00BFFF] italic">Metrics</em>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto text-base sm:text-lg font-light">
                Understand the numbers behind successful real estate wealth building.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {metrics.map((m, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="bg-[#060c16] border-t-4 border-[#00BFFF] p-6 sm:p-10 rounded-2xl text-center h-full">
                  <p className="font-serif text-2xl sm:text-4xl text-[#00BFFF] mb-3 sm:mb-4">{m.value}</p>
                  <h4 className="text-white font-bold mb-2 sm:mb-4 text-sm sm:text-base">{m.label}</h4>
                  <p className="text-white/40 text-xs leading-relaxed hidden sm:block">{m.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Investor Types */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 bg-[#060c16]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-12 sm:mb-20">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-white mb-6 leading-tight">
                Investment Strategies by <em className="text-[#00BFFF] italic">Investor Type</em>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto text-base sm:text-lg font-light">
                Different investors have different goals. We tailor strategies to align with your timeline and risk appetite.
              </p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {investorTypes.map((investor, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="bg-[#04090f] border-b-4 border-[#00BFFF] p-8 sm:p-10 rounded-3xl flex flex-col h-full">
                  <h3 className="font-serif text-xl sm:text-2xl text-white mb-4">{investor.type}</h3>
                  <p className="text-white/45 text-sm leading-relaxed mb-8 sm:mb-10 flex-grow">{investor.desc}</p>
                  <ul className="space-y-3 sm:space-y-4">
                    {(Array.isArray(investor.benefits) ? investor.benefits : []).map((b: string, bi: number) => (
                      <li key={bi} className="text-white/60 text-xs flex items-start gap-3">
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

      {/* Tools Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-12 sm:mb-20">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-white mb-6">
                Data & <em className="text-[#00BFFF] italic">Insights</em>
              </h2>
            </div>
          </Reveal>
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            <Reveal direction="left">
              <ROICalculator />
            </Reveal>
            <Reveal direction="right" delay={0.2}>
              <PlotTrackerCompact />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 bg-[#060c16]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-white mb-12 sm:mb-20 text-center">
              Investor <em className="text-[#00BFFF] italic">Testimonials</em>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="bg-[#04090f] border-l-4 border-[#00BFFF] p-8 sm:p-10 rounded-2xl h-full flex flex-col">
                  <p className="text-white/60 italic text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 flex-grow">"{t.quote}"</p>
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
      <section className="py-20 sm:py-32 px-4 sm:px-6 text-center">
        <Reveal>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl mb-6 sm:mb-8">
              {String(ctaData.title || "Ready to Build Your Real Estate")} <em className="text-[#00BFFF] italic">{String(ctaData.title_accent || "Wealth")}</em>?
            </h2>
            <p className="text-white/50 text-base sm:text-lg mb-10 sm:mb-12">
              {String(ctaData.body || "Schedule a confidential consultation with our investment advisory team.")}
            </p>
            <Link to="/contact" className="px-10 sm:px-12 py-4 sm:py-5 bg-[#00BFFF] text-[#04090f] text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all inline-block">
              {String(ctaData.cta_label || "Book Free Investment Consultation")}
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
