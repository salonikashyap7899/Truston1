import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { Section3DBackground } from "@/components/Section3DBackground";
import heroImg from "@/assets/luxury-interior.jpg";
import { usePageContent } from "@/hooks/usePageContent";

export const Route = createFileRoute("/architecture-design")({
  head: () => ({
    meta: [
      { title: "Architecture & Design — TrustOn Developers" },
      {
        name: "description",
        content:
          "Transform your vision into architectural reality. Our in-house design team creates bespoke layouts, stunning elevations, and complete blueprint documentation.",
      },
    ],
  }),
  component: ArchitectureDesignPage,
});

const DEFAULT_DELIVERY = ["Concept Design & Layouts","Elevation & 3D Renderings","Complete Blueprint Documentation","Material & Finish Selection Guidance","Space Planning & Optimization","Structural Design Consultation","Regulatory & Compliance Alignment","Construction Supervision"];
const DEFAULT_SERVICES = [
  { title: "Residential Designs", desc: "From cozy family homes to sprawling villas, we design residential spaces that celebrate your lifestyle. Every room is carefully planned for flow, natural light, and functional beauty." },
  { title: "3D Renderings & Walkthroughs", desc: "See your home before construction begins. Our photorealistic 3D renderings and virtual walkthroughs let you explore every corner, adjust details, and make confident decisions." },
  { title: "Interior Layout & Planning", desc: "Smart space utilization is an art. We maximize functionality while maintaining aesthetic appeal—thoughtfully positioned furniture, optimized storage, and intelligent traffic flow." },
  { title: "Material & Finish Selection", desc: "Choosing finishes can be overwhelming. Our design team guides you through material selections—flooring, wall treatments, hardware, lighting—ensuring cohesive aesthetics." },
  { title: "Sustainable Design Solutions", desc: "Modern homes should minimize environmental impact. We integrate sustainable design principles—passive cooling, natural ventilation, rainwater harvesting, solar orientation." },
  { title: "Renovation & Reimagining", desc: "Have an existing structure that needs new life? We reimagine spaces, modernize layouts, and refresh aesthetics while respecting structural integrity." },
];
const DEFAULT_PROCESS = [
  { num: "01", title: "Discovery", desc: "We begin with detailed conversations about your needs, preferences, lifestyle, and vision. Site analysis includes terrain, orientation, and growth opportunities." },
  { num: "02", title: "Concept Design", desc: "Multiple design concepts are developed, exploring different layouts and aesthetics. We present mood boards, space relationships, and preliminary sketches." },
  { num: "03", title: "Detailed Design", desc: "Once a concept is selected, we refine every detail. 3D renderings, materials, colors, and all specifications are finalized in collaboration with you." },
  { num: "04", title: "Documentation & Approval", desc: "Complete architectural blueprints, structural drawings, and all regulatory documentation are prepared. We handle approvals and ensure your design is construction-ready." },
];
const DEFAULT_EXCELLENCE = [
  { title: "In-House Expertise", desc: "Our architects and designers are part of your TrustOn family. There's no communication loss through external agencies—just direct collaboration." },
  { title: "Technology-Driven Design", desc: "We leverage cutting-edge design software—BIM modeling, advanced visualization, and simulation tools—to ensure your design is technically sound." },
  { title: "Local Context Expertise", desc: "Lucknow's climate, culture, and real estate landscape inform every design decision. We ensure your home is locally optimized for performance." },
  { title: "Regulatory Navigation", desc: "Municipal approvals, building codes, and zoning regulations can be complex. Our team handles all compliance requirements, ensuring no delays." },
];
const DEFAULT_GALLERY = [
  { title: "Modern Villa", sub: "Contemporary aesthetics", src: "/assets/redefining-luxury.jpg" },
  { title: "Urban Residence", sub: "Space optimization", src: "/assets/architecture-design.jpg" },
  { title: "Traditional Design", sub: "Cultural integration", src: "/assets/building-render.jpg" },
  { title: "Interior Rendering", sub: "3D visualization", src: "/assets/interior-street.jpg" },
  { title: "Sustainable Home", sub: "Eco-conscious design", src: "/assets/prime-estate-gate.jpg" },
  { title: "Luxury Layout", sub: "Premium planning", src: "/assets/aerial-township.jpg" },
];
const DEFAULT_TESTIMONIALS = [
  { quote: "The architectural design service exceeded all expectations. Our 3D walkthrough felt like stepping into a dream. When construction completed, the reality matched perfectly.", author: "Sunita Pandey", role: "Homeowner — Phase 2" },
  { quote: "The design team listened carefully to our requirements and created a layout that perfectly suits our family's lifestyle. The attention to detail was exceptional.", author: "Anil Singh", role: "Homeowner — Phase 1" },
  { quote: "As someone with no design background, I appreciated how the team explained every choice and showed me alternatives. The final design feels uniquely ours.", author: "Rajesh Kumar", role: "Plot Owner" },
  { quote: "The material selection guidance made the entire process stress-free. They have an incredible eye for detail and quality.", author: "Priya Sharma", role: "Homeowner — Lucknow" },
];

function ArchitectureDesignPage() {
  const hero = usePageContent("architecture.hero", {
    eyebrow: "Crafting Spaces",
    title: "Architecture &",
    title_accent: "Design",
    subtitle: "Transform your vision into architectural reality. Our in-house design team creates bespoke layouts, stunning elevations, and complete blueprint documentation—each project a masterpiece of form and function.",
    image_url: "",
  });
  const main = usePageContent("architecture.main", {
    section_1_title: "Your Vision, Our",
    section_1_accent: "Design",
    section_1_body: "At TrustOn, we believe exceptional design is where dreams take tangible form. Whether you're starting from an empty plot or reimagining an existing space, our architectural team brings technical expertise, creative innovation, and your personal aspirations into cohesive, buildable designs.",
    section_1_philosophy_title: "Design Philosophy",
    section_1_philosophy_body: "Great architecture speaks before words are spoken. It reflects the way you want to live, work, and grow. Our design process begins with listening—understanding your lifestyle, your dreams, and the unique characteristics of your land.",
  });
  const deliveryData = usePageContent("architecture.delivery_items", { items: DEFAULT_DELIVERY });
  const servicesData = usePageContent("architecture.services_list", { items: DEFAULT_SERVICES });
  const processData = usePageContent("architecture.process_steps", { items: DEFAULT_PROCESS });
  const excellenceData = usePageContent("architecture.excellence", { items: DEFAULT_EXCELLENCE });
  const galleryData = usePageContent("architecture.gallery", { items: DEFAULT_GALLERY });
  const testimonialsData = usePageContent("architecture.testimonials", { items: DEFAULT_TESTIMONIALS });
  const ctaData = usePageContent("architecture.cta", {
    title: "Ready to Design Your Dream",
    title_accent: "Home",
    body: "Schedule a consultation with our architecture team. We'll discuss your vision, analyze your plot, and create a design proposal tailored to your dreams and budget.",
    cta_label: "Book Free Consultation",
  });

  const deliveryItems: string[] = Array.isArray(deliveryData.items) ? (deliveryData.items as string[]) : DEFAULT_DELIVERY;
  const designServices = Array.isArray(servicesData.items) ? (servicesData.items as typeof DEFAULT_SERVICES) : DEFAULT_SERVICES;
  const processSteps = Array.isArray(processData.items) ? (processData.items as typeof DEFAULT_PROCESS) : DEFAULT_PROCESS;
  const excellenceReasons = Array.isArray(excellenceData.items) ? (excellenceData.items as typeof DEFAULT_EXCELLENCE) : DEFAULT_EXCELLENCE;
  const galleryItems = Array.isArray(galleryData.items) ? (galleryData.items as typeof DEFAULT_GALLERY) : DEFAULT_GALLERY;
  const testimonials = Array.isArray(testimonialsData.items) ? (testimonialsData.items as typeof DEFAULT_TESTIMONIALS) : DEFAULT_TESTIMONIALS;

  return (
    <div className="bg-[#04090f] text-white overflow-x-hidden selection:bg-[#00BFFF] selection:text-[#04090f]">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src={String(hero.image_url || heroImg)}
            alt="Architecture & Design"
            className="w-full h-full object-cover"
            loading="eager"
            style={{ filter: "brightness(0.22) saturate(0.7)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#04090f]/60 via-transparent to-[#04090f]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04090f]/40 to-transparent" />
        </div>
        <Section3DBackground opacity={0.08} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center max-w-4xl mx-auto">
              <p className="text-[10px] uppercase tracking-[0.45em] text-[#00BFFF] font-bold mb-6">
                {String(hero.eyebrow || "Crafting Spaces")}
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-8xl leading-tight tracking-tight mb-8">
                {String(hero.title || "Architecture &")} <em className="text-[#00BFFF] italic">{String(hero.title_accent || "Design")}</em>
              </h1>
              <p className="text-white/50 text-base sm:text-lg md:text-xl leading-relaxed font-light mb-12">
                {String(hero.subtitle || "Transform your vision into architectural reality.")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <Link to="/contact" className="px-8 sm:px-10 py-4 sm:py-5 bg-[#00BFFF] text-[#04090f] text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all">
                  Start Your Design
                </Link>
                <Link to="/contact" className="px-8 sm:px-10 py-4 sm:py-5 border-2 border-white/20 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:border-[#00BFFF] hover:text-[#00BFFF] transition-all">
                  Schedule Consultation
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
                <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-white mb-8">
                  {String(main.section_1_title || "Your Vision, Our")} <em className="text-[#00BFFF] italic">{String(main.section_1_accent || "Design")}</em>
                </h2>
                <div className="space-y-6 text-white/50 text-base sm:text-lg leading-relaxed font-light">
                  <p>{String(main.section_1_body || "At TrustOn, we believe exceptional design is where dreams take tangible form.")}</p>
                  <h3 className="text-white font-serif text-xl sm:text-2xl mt-8 sm:mt-12 mb-4 sm:mb-6">{String(main.section_1_philosophy_title || "Design Philosophy")}</h3>
                  <p>{String(main.section_1_philosophy_body || "Great architecture speaks before words are spoken. It reflects the way you want to live, work, and grow.")}</p>
                  <p>From concept sketches to photorealistic 3D renderings, we walk with you through every decision. Each design is tailored to Lucknow's climate, cultural context, and growth trajectories.</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-[#060c16] border border-white/5 p-8 sm:p-12 rounded-[32px] sm:rounded-[48px]">
                <h3 className="text-[#00BFFF] text-[10px] uppercase tracking-[0.3em] font-bold mb-6 sm:mb-8">What We Deliver</h3>
                <ul className="space-y-4 sm:space-y-6">
                  {deliveryItems.map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-white/70 text-base sm:text-lg">
                      <span className="w-6 sm:w-8 h-px bg-[#00BFFF] shrink-0" />
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
                Our <em className="text-[#00BFFF] italic">Design</em> Services
              </h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {designServices.map((service, i) => (
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

      {/* Design Process */}
      <section className="py-20 sm:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-12 sm:mb-20">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-white mb-6">
                The Design <em className="text-[#00BFFF] italic">Process</em>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto text-base sm:text-lg font-light">
                From your first consultation to handing over your blueprints, we follow a structured yet flexible design methodology.
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

      {/* Why Choose TrustOn Design */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 bg-[#060c16]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-12 sm:mb-20">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-white mb-6">
                Why Choose <em className="text-[#00BFFF] italic">TrustOn Design</em>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto text-base sm:text-lg font-light">
                Excellence in design isn't just aesthetics—it's the seamless marriage of beauty, functionality, and buildability.
              </p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {excellenceReasons.map((reason, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="bg-[#04090f] p-8 sm:p-10 rounded-3xl border border-white/5 hover:border-[#00BFFF]/30 transition-all h-full">
                  <h3 className="font-serif text-xl sm:text-2xl text-white mb-4">{reason.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{reason.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-12 sm:mb-20">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-white mb-6">
                Design <em className="text-[#00BFFF] italic">Gallery</em>
              </h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {galleryItems.map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="relative group aspect-[4/5] overflow-hidden rounded-2xl bg-[#060c16]">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04090f] via-transparent to-transparent z-10" />
                  <div className="absolute inset-0 flex items-end p-6 sm:p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                    <div>
                      <p className="text-white font-serif text-lg sm:text-xl">{item.title}</p>
                      <p className="text-[#00BFFF] text-xs mt-2 uppercase tracking-widest">{item.sub}</p>
                    </div>
                  </div>
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 bg-[#060c16]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-white mb-12 sm:mb-20 text-center">
              What Our Clients <em className="text-[#00BFFF] italic">Say</em>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="bg-[#04090f] border-l-4 border-[#00BFFF] p-8 sm:p-10 rounded-2xl">
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
              {String(ctaData.title || "Ready to Design Your Dream")} <em className="text-[#00BFFF] italic">{String(ctaData.title_accent || "Home")}</em>?
            </h2>
            <p className="text-white/50 text-base sm:text-lg mb-10 sm:mb-12">
              {String(ctaData.body || "Schedule a consultation with our architecture team.")}
            </p>
            <Link to="/contact" className="px-10 sm:px-12 py-4 sm:py-5 bg-[#00BFFF] text-[#04090f] text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all inline-block">
              {String(ctaData.cta_label || "Book Free Consultation")}
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
