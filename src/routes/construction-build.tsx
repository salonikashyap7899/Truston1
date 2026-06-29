import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { Section3DBackground } from "@/components/Section3DBackground";
import heroImg from "@/assets/hero-estate.jpg";
import { usePageContent } from "@/hooks/usePageContent";

export const Route = createFileRoute("/construction-build")({
  head: () => ({
    meta: [
      { title: "Construction & Build — TrustOn Developers" },
      { name: "description", content: "Quality construction where architectural dreams become tangible reality. Meticulous attention to detail, premium materials, and unwavering commitment to timely delivery." },
    ],
  }),
  component: ConstructionBuildPage,
});

const DEFAULT_FEATURES = [
  { title: "Complete Home Construction", desc: "From foundation to finishing, we handle the entire build process with professional oversight and dedicated project management." },
  { title: "100% Material Certification", desc: "We source only grade-A materials from verified suppliers. Every batch is certified for quality and durability." },
  { title: "50+ Structural Audits", desc: "Our projects undergo rigorous multi-stage quality inspections to ensure absolute structural integrity and compliance." },
  { title: "Skilled Workforce Management", desc: "Our teams are composed of experienced artisans and technicians who take genuine pride in the precision of their work." },
  { title: "Progress Transparency", desc: "Regular updates, site photos, and milestone reports ensure you are always informed about your project's status." },
  { title: "On-Time Delivery Guaranteed", desc: "Rigorous project scheduling and resource management ensure your home is handed over exactly when promised." },
];

const DEFAULT_PROCESS = [
  { num: "01", title: "Site Preparation", desc: "We begin with comprehensive site analysis, grading, and foundation engineering to ensure a solid base for your legacy." },
  { num: "02", title: "Structural Shell", desc: "Execution of the main structure using premium steel and concrete systems, adhering to the highest safety and design standards." },
  { num: "03", title: "Finishing & MEP", desc: "Installation of mechanical, electrical, and plumbing systems followed by high-end interior and exterior finishing works." },
  { num: "04", title: "Handover", desc: "Thorough quality inspection, snag resolution, and formal handover with complete documentation and support." },
];

const DEFAULT_TESTIMONIALS = [
  { quote: "The quality of construction is visible in every corner. They delivered exactly what was shown in the 3D renders. Truly professional team.", author: "Rajesh Kumar", role: "Homeowner — Phase 1" },
  { quote: "Managed the entire build while I was away. The transparency and regular updates gave me complete peace of mind. Highly recommended.", author: "Anil Singh", role: "NRI Homeowner" },
];

function ConstructionBuildPage() {
  const hero = usePageContent("construction.hero", {
    eyebrow: "Building Reality",
    title: "Construction &",
    title_accent: "Build",
    subtitle: "Quality construction where architectural dreams become tangible reality. Meticulous attention to detail, premium materials, and unwavering commitment to timely delivery—your home, built perfectly.",
    image_url: "",
  });
  const main = usePageContent("construction.main", {
    section_1_title: "Built with",
    section_1_accent: "Precision",
    section_1_body: "We combine traditional craftsmanship with modern engineering to deliver homes that stand the test of time.",
    section_2_title: "The Build",
    section_2_accent: "Process",
    section_2_body: "From breaking ground to the final polish, our process is structured for quality and clarity.",
    cta_title: "Build Your",
    cta_accent: "Legacy",
    cta_body: "Ready to turn your architectural vision into reality? Connect with our construction team for a detailed project consultation and quote.",
  });
  const featuresData = usePageContent("construction.features", { items: DEFAULT_FEATURES });
  const processData = usePageContent("construction.process_steps", { items: DEFAULT_PROCESS });
  const testimonialsData = usePageContent("construction.testimonials", { items: DEFAULT_TESTIMONIALS });

  const constructionFeatures = Array.isArray(featuresData.items) ? (featuresData.items as typeof DEFAULT_FEATURES) : DEFAULT_FEATURES;
  const processSteps = Array.isArray(processData.items) ? (processData.items as typeof DEFAULT_PROCESS) : DEFAULT_PROCESS;
  const testimonials = Array.isArray(testimonialsData.items) ? (testimonialsData.items as typeof DEFAULT_TESTIMONIALS) : DEFAULT_TESTIMONIALS;

  return (
    <div className="bg-[#04090f] text-white overflow-x-hidden selection:bg-[#00BFFF] selection:text-[#04090f]">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src={String(hero.image_url || heroImg)}
            alt="Construction & Build"
            className="w-full h-full object-cover"
            loading="eager"
            style={{ filter: "brightness(0.25) saturate(0.7)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#04090f]/60 via-transparent to-[#04090f]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04090f]/40 to-transparent" />
        </div>
        <Section3DBackground opacity={0.08} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center max-w-4xl mx-auto">
              <p className="text-[10px] uppercase tracking-[0.45em] text-[#00BFFF] font-bold mb-6">
                {String(hero.eyebrow || "Building Reality")}
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-8xl leading-tight tracking-tight mb-8">
                {String(hero.title || "Construction &")} <em className="text-[#00BFFF] italic">{String(hero.title_accent || "Build")}</em>
              </h1>
              <p className="text-white/50 text-base sm:text-lg md:text-xl leading-relaxed font-light mb-12">
                {String(hero.subtitle || "Quality construction where architectural dreams become tangible reality.")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <Link to="/contact" className="px-8 sm:px-10 py-4 sm:py-5 bg-[#00BFFF] text-[#04090f] text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all">
                  Start Your Build
                </Link>
                <Link to="/contact" className="px-8 sm:px-10 py-4 sm:py-5 border-2 border-white/20 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:border-[#00BFFF] hover:text-[#00BFFF] transition-all">
                  Schedule Consultation
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-12 sm:mb-20">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-white mb-6">
                {String(main.section_1_title || "Built with")} <em className="text-[#00BFFF] italic">{String(main.section_1_accent || "Precision")}</em>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto text-base sm:text-lg font-light">
                {String(main.section_1_body || "We combine traditional craftsmanship with modern engineering.")}
              </p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {constructionFeatures.map((feature, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="bg-[#060c16] border border-white/5 p-8 sm:p-10 rounded-3xl group hover:border-[#00BFFF]/30 transition-all h-full">
                  <h3 className="font-serif text-xl sm:text-2xl text-white mb-4 group-hover:text-[#00BFFF] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-white/45 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Build Process */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 bg-[#060c16]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-12 sm:mb-20">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-white mb-6">
                {String(main.section_2_title || "The Build")} <em className="text-[#00BFFF] italic">{String(main.section_2_accent || "Process")}</em>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto text-base sm:text-lg font-light">
                {String(main.section_2_body || "From breaking ground to the final polish, our process is structured for quality and clarity.")}
              </p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {processSteps.map((step, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="font-serif text-5xl sm:text-6xl text-[#00BFFF] mb-4 sm:mb-6">{step.num}</div>
                  <h4 className="font-serif text-lg sm:text-xl text-white mb-3 sm:mb-4">{step.title}</h4>
                  <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-white mb-12 sm:mb-20 text-center">
              What Homeowners <em className="text-[#00BFFF] italic">Say</em>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="bg-[#060c16] border-l-4 border-[#00BFFF] p-8 sm:p-10 rounded-2xl">
                  <p className="text-white/60 italic text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">"{t.quote}"</p>
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
              {String(main.cta_title || "Build Your")} <em className="text-[#00BFFF] italic">{String(main.cta_accent || "Legacy")}</em>
            </h2>
            <p className="text-white/50 text-base sm:text-lg mb-10 sm:mb-12">
              {String(main.cta_body || "Ready to turn your architectural vision into reality? Connect with our construction team for a detailed project consultation and quote.")}
            </p>
            <Link to="/contact" className="px-10 sm:px-12 py-4 sm:py-5 bg-[#00BFFF] text-[#04090f] text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all inline-block">
              Get a Construction Quote
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
