import { createFileRoute, Link } from "@tanstack/react-router";
import { InnerHero } from "@/components/InnerHero";
import { Reveal, SectionEyebrow } from "@/components/Reveal";
import interiorImg from "@/assets/luxury-interior.jpg";
import projectImg from "@/assets/project-prime.jpg";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "About — TrustOn Developers" },
      { name: "description", content: "Trusted real-estate development in Lucknow — transparency, quality, and long-term vision behind Prime Estate." },
      { property: "og:title", content: "About TrustOn Developers" },
      { property: "og:description", content: "The story behind Prime Estate." },
    ],
  }),
  component: AboutPage,
});

const services = [
  { title: "Plot Selling", to: "/plot-selling", img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/webaliser-_TPTXZd9mOo-unsplash-1-550x550.jpg" },
  { title: "Architecture & Design", to: "/architecture-design", img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/april-pethybridge-nN28PjFOOLI-unsplash-550x550.jpg" },
  { title: "Construction & Build", to: "/construction-build", img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/avi-werde-hHz4yrvxwlA-unsplash-550x550.jpg" },
  { title: "Investment Consulting", to: "/investment-consulting", img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/avi-waxman-f9qZuKoZYoY-unsplash-1-150x150.jpg" },
] as const;

function AboutPage() {
  return (
    <>
      <InnerHero eyebrow="About Us" title={<>The skilled team<br/>behind <em className="gradient-bronze-text not-italic font-serif italic">Prime Estate.</em></>} poster={interiorImg} alt="TrustOn skilled team" />

      <section className="py-28 px-6">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="relative aspect-[4/5] rounded-md overflow-hidden card-shadow">
              <img src={projectImg} alt="Prime Estate" loading="lazy" className="w-full h-full object-cover ken-burns" />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="text-bronze text-[11px] uppercase tracking-luxe mb-4 flex items-center gap-3">
                <span className="divider-bronze" /> About Our Company
              </p>
              <h2 className="font-display text-4xl md:text-5xl mb-8 leading-tight">
                Prime Estate — own the ground, <em className="gradient-bronze-text not-italic">build your legacy.</em>
              </h2>
              <p className="text-foreground/75 leading-relaxed mb-6">
                Prime Estate is a trusted name in real estate development, built on a foundation
                of transparency, quality, and long-term vision. We don't just sell land — we craft
                opportunities. Our flagship project is a Jila Panchayat approved township that
                combines legal security, prime location, and future-ready infrastructure.
              </p>
              <div className="grid sm:grid-cols-2 gap-px bg-border mb-8">
                <div className="bg-cream p-6">
                  <p className="text-bronze text-[11px] uppercase tracking-luxe mb-2">Strategic Development</p>
                  <p className="text-sm text-foreground/75">We plan every project with a long-term vision — location intelligence, infrastructure growth, and future value appreciation.</p>
                </div>
                <div className="bg-cream p-6">
                  <p className="text-bronze text-[11px] uppercase tracking-luxe mb-2">Execution Excellence</p>
                  <p className="text-sm text-foreground/75">From land acquisition to final delivery, a structured, transparent, regulatory-compliant process.</p>
                </div>
              </div>
              <Link to="/contact" className="rounded-full bronze-border px-7 py-3 text-[11px] uppercase tracking-luxe text-bronze hover:bg-bronze hover:text-cream transition-all">
                Contact Us
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-28 px-6 bg-sand/40">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionEyebrow>What We Do</SectionEyebrow>
            <h2 className="font-display text-4xl md:text-6xl text-center mb-20">
              Explore our <em className="gradient-bronze-text not-italic">services.</em>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <Reveal key={s.to} delay={i * 0.08}>
                <Link to={s.to} className="group block">
                  <div className="relative aspect-square rounded-md overflow-hidden mb-5">
                    <img src={s.img} alt={s.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.6s] group-hover:scale-110" />
                  </div>
                  <h3 className="font-serif text-2xl group-hover:text-bronze transition-colors">{s.title}</h3>
                  <span className="text-[11px] uppercase tracking-luxe text-bronze mt-2 inline-block">Get Free Quote →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 px-6">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionEyebrow>Our Leaders</SectionEyebrow>
            <h2 className="font-display text-4xl md:text-6xl text-center mb-20">
              The people leading our <em className="gradient-bronze-text not-italic">vision.</em>
            </h2>
          </Reveal>
          <Reveal>
            <div className="mx-auto max-w-sm text-center">
              <div className="relative aspect-square rounded-md overflow-hidden mb-6 card-shadow">
                <img src="https://truston.advrtisinguru.com/wp-content/uploads/2026/04/ChatGPT-Image-Apr-25-2026-11_23_46-PM.png" alt="Meraj Husain Rizvi" loading="lazy" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-serif text-2xl">Meraj Husain Rizvi</h3>
              <p className="text-[11px] uppercase tracking-luxe text-bronze mt-2">Architect</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
