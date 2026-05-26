import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Section3DBackground } from "@/components/Section3DBackground";

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

const deliveryItems = [
  "Concept Design & Layouts",
  "Elevation & 3D Renderings",
  "Complete Blueprint Documentation",
  "Material & Finish Selection Guidance",
  "Space Planning & Optimization",
  "Structural Design Consultation",
  "Regulatory & Compliance Alignment",
  "Construction Supervision",
];

const designServices = [
  {
    title: "Residential Designs",
    desc: "From cozy family homes to sprawling villas, we design residential spaces that celebrate your lifestyle. Every room is carefully planned for flow, natural light, and functional beauty.",
  },
  {
    title: "3D Renderings & Walkthroughs",
    desc: "See your home before construction begins. Our photorealistic 3D renderings and virtual walkthroughs let you explore every corner, adjust details, and make confident decisions.",
  },
  {
    title: "Interior Layout & Planning",
    desc: "Smart space utilization is an art. We maximize functionality while maintaining aesthetic appeal—thoughtfully positioned furniture, optimized storage, and intelligent traffic flow.",
  },
  {
    title: "Material & Finish Selection",
    desc: "Choosing finishes can be overwhelming. Our design team guides you through material selections—flooring, wall treatments, hardware, lighting—ensuring cohesive aesthetics.",
  },
  {
    title: "Sustainable Design Solutions",
    desc: "Modern homes should minimize environmental impact. We integrate sustainable design principles—passive cooling, natural ventilation, rainwater harvesting, solar orientation.",
  },
  {
    title: "Renovation & Reimagining",
    desc: "Have an existing structure that needs new life? We reimagine spaces, modernize layouts, and refresh aesthetics while respecting structural integrity.",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We begin with detailed conversations about your needs, preferences, lifestyle, and vision. Site analysis includes terrain, orientation, and growth opportunities.",
  },
  {
    num: "02",
    title: "Concept Design",
    desc: "Multiple design concepts are developed, exploring different layouts and aesthetics. We present mood boards, space relationships, and preliminary sketches.",
  },
  {
    num: "03",
    title: "Detailed Design",
    desc: "Once a concept is selected, we refine every detail. 3D renderings, materials, colors, and all specifications are finalized in collaboration with you.",
  },
  {
    num: "04",
    title: "Documentation & Approval",
    desc: "Complete architectural blueprints, structural drawings, and all regulatory documentation are prepared. We handle approvals and ensure your design is construction-ready.",
  },
];

const excellenceReasons = [
  {
    title: "In-House Expertise",
    desc: "Our architects and designers are part of your TrustOn family. There's no communication loss through external agencies—just direct collaboration.",
  },
  {
    title: "Technology-Driven Design",
    desc: "We leverage cutting-edge design software—BIM modeling, advanced visualization, and simulation tools—to ensure your design is technically sound.",
  },
  {
    title: "Local Context Expertise",
    desc: "Lucknow's climate, culture, and real estate landscape inform every design decision. We ensure your home is locally optimized for performance.",
  },
  {
    title: "Regulatory Navigation",
    desc: "Municipal approvals, building codes, and zoning regulations can be complex. Our team handles all compliance requirements, ensuring no delays.",
  },
];

const galleryItems = [
  { title: "Modern Villa", sub: "Contemporary aesthetics" },
  { title: "Urban Residence", sub: "Space optimization" },
  { title: "Traditional Design", sub: "Cultural integration" },
  { title: "Interior Rendering", sub: "3D visualization" },
  { title: "Sustainable Home", sub: "Eco-conscious design" },
  { title: "Luxury Layout", sub: "Premium planning" },
];

const testimonials = [
  {
    quote: "The architectural design service exceeded all expectations. Our 3D walkthrough felt like stepping into a dream. When construction completed, the reality matched perfectly.",
    author: "Sunita Pandey",
    role: "Homeowner — Phase 2",
  },
  {
    quote: "The design team listened carefully to our requirements and created a layout that perfectly suits our family's lifestyle. The attention to detail was exceptional.",
    author: "Anil Singh",
    role: "Homeowner — Phase 1",
  },
  {
    quote: "As someone with no design background, I appreciated how the team explained every choice and showed me alternatives. The final design feels uniquely ours.",
    author: "Rajesh Kumar",
    role: "Plot Owner",
  },
  {
    quote: "The material selection guidance made the entire process stress-free. They have an incredible eye for detail and quality.",
    author: "Priya Sharma",
    role: "Homeowner — Lucknow",
  },
];

function ArchitectureDesignPage() {
  return (
    <div className="bg-[#04090f] text-white overflow-x-hidden selection:bg-[#00BFFF] selection:text-[#04090f]">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
        <Section3DBackground opacity={0.15} />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-4xl mx-auto">
              <p className="text-[10px] uppercase tracking-[0.45em] text-[#00BFFF] font-bold mb-6">
                Crafting Spaces
              </p>
              <h1 className="font-serif text-5xl md:text-8xl leading-tight tracking-tight mb-8">
                Architecture & <em className="text-[#00BFFF] italic">Design</em>
              </h1>
              <p className="text-white/50 text-lg md:text-xl leading-relaxed font-light mb-12">
                Transform your vision into architectural reality. Our in-house design team creates bespoke layouts, stunning elevations, and complete blueprint documentation—each project a masterpiece of form and function.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/contact"
                  className="px-10 py-5 bg-[#00BFFF] text-[#04090f] text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all"
                >
                  Start Your Design
                </Link>
                <Link
                  to="/contact"
                  className="px-10 py-5 border-2 border-white/20 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:border-[#00BFFF] hover:text-[#00BFFF] transition-all"
                >
                  Schedule Consultation
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
                <h2 className="font-serif text-4xl md:text-6xl text-white mb-8">
                  Your Vision, Our <em className="text-[#00BFFF] italic">Design</em>
                </h2>
                <div className="space-y-6 text-white/50 text-lg leading-relaxed font-light">
                  <p>
                    At TrustOn, we believe exceptional design is where dreams take tangible form. Whether you're starting from an empty plot or reimagining an existing space, our architectural team brings technical expertise, creative innovation, and your personal aspirations into cohesive, buildable designs.
                  </p>
                  <h3 className="text-white font-serif text-2xl mt-12 mb-6">Design Philosophy</h3>
                  <p>
                    Great architecture speaks before words are spoken. It reflects the way you want to live, work, and grow. Our design process begins with listening—understanding your lifestyle, your dreams, and the unique characteristics of your land.
                  </p>
                  <p>
                    From concept sketches to photorealistic 3D renderings, we walk with you through every decision. Each design is tailored to Lucknow's climate, cultural context, and growth trajectories.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-[#060c16] border border-white/5 p-12 rounded-[48px]">
                <h3 className="text-[#00BFFF] text-[10px] uppercase tracking-[0.3em] font-bold mb-8">What We Deliver</h3>
                <ul className="space-y-6">
                  {deliveryItems.map((item) => (
                    <li key={item} className="flex items-center gap-4 text-white/70 text-lg">
                      <span className="w-8 h-px bg-[#00BFFF]" />
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
                Our <em className="text-[#00BFFF] italic">Design</em> Services
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {designServices.map((service, i) => (
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

      {/* Design Process */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">
                The Design <em className="text-[#00BFFF] italic">Process</em>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto text-lg font-light">
                From your first consultation to handing over your blueprints, we follow a structured yet flexible design methodology.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {processSteps.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.1}>
                <div className="text-center">
                  <div className="font-serif text-6xl text-[#00BFFF] mb-6">{step.num}</div>
                  <h4 className="font-serif text-xl text-white mb-4">{step.title}</h4>
                  <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose TrustOn Design */}
      <section className="py-32 px-6 bg-[#060c16]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">
                Why Choose <em className="text-[#00BFFF] italic">TrustOn Design</em>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto text-lg font-light">
                Excellence in design isn't just aesthetics—it's the seamless marriage of beauty, functionality, and buildability.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {excellenceReasons.map((reason, i) => (
              <Reveal key={reason.title} delay={i * 0.1}>
                <div className="bg-[#04090f] p-10 rounded-3xl border border-white/5 hover:border-[#00BFFF]/30 transition-all h-full">
                  <h3 className="font-serif text-2xl text-white mb-4">{reason.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{reason.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">
                Design <em className="text-[#00BFFF] italic">Gallery</em>
              </h2>
              <p className="text-white/40 text-lg font-light">
                A curated selection of our recent architectural designs and renderings
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="relative group aspect-[4/5] overflow-hidden rounded-2xl bg-[#060c16]">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04090f] via-transparent to-transparent z-10" />
                  <div className="absolute inset-0 flex items-end p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                    <div>
                      <p className="text-white font-serif text-xl">{item.title}</p>
                      <p className="text-[#00BFFF] text-xs mt-2 uppercase tracking-widest">{item.sub}</p>
                    </div>
                  </div>
                  {/* Placeholder for images since I don't have URLs */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00BFFF]/10 to-transparent group-hover:scale-110 transition-transform duration-700" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 bg-[#060c16]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-6xl text-white mb-20 text-center">
              What Our Clients <em className="text-[#00BFFF] italic">Say</em>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <Reveal key={t.author} delay={i * 0.1}>
                <div className="bg-[#04090f] border-l-4 border-[#00BFFF] p-10 rounded-2xl">
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
              Ready to Design Your Dream <em className="text-[#00BFFF] italic">Home</em>?
            </h2>
            <p className="text-white/50 text-lg mb-12">
              Schedule a consultation with our architecture team. We'll discuss your vision, analyze your plot, and create a design proposal tailored to your dreams and budget.
            </p>
            <Link
              to="/contact"
              className="px-12 py-5 bg-[#00BFFF] text-[#04090f] text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all inline-block"
            >
              Book Free Consultation
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
