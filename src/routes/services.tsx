import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Reveal, SectionEyebrow } from "@/components/Reveal";
import heroImg from "@/assets/luxury-interior.jpg";
import { Section3DBackground } from "@/components/Section3DBackground";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — TrustOn | Plots, Architecture, Construction & Investment" },
      {
        name: "description",
        content:
          "Explore TrustOn's full suite of premium real estate services — plot selling, architecture & design, construction & build, and investment consulting.",
      },
      { property: "og:title", content: "Services — TrustOn" },
      {
        property: "og:description",
        content:
          "Premium plots, architecture, construction and investment consulting under one roof.",
      },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    title: "Plot Selling",
    sub: "Premium Plots. Zero Compromise.",
    blurb:
      "Curated, legally vetted plots across Lucknow's most promising corridors — appreciation-ready and approval-clear.",
    to: "/plot-selling",
    img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/webaliser-_TPTXZd9mOo-unsplash-1-1024x768.jpg",
  },
  {
    title: "Architecture & Design",
    sub: "Your Vision, Brought to Life on Paper First.",
    blurb:
      "Bespoke architectural drawings, 3D visualisation and interior planning tailored to your land and lifestyle.",
    to: "/architecture-design",
    img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/april-pethybridge-nN28PjFOOLI-unsplash-scaled.jpg",
  },
  {
    title: "Construction & Build",
    sub: "We Don't Just Build Buildings. We Build Promises.",
    blurb:
      "Turnkey construction with transparent costing, on-time delivery and premium craftsmanship — end to end.",
    to: "/construction-build",
    img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/avi-werde-hHz4yrvxwlA-unsplash-scaled.jpg",
  },
  {
    title: "Investment Consulting",
    sub: "Buy Smart. Invest Smarter.",
    blurb:
      "Data-led advisory on yield, ROI and exit timing across residential, commercial and pre-launch inventory.",
    to: "/investment-consulting",
    img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/avi-waxman-f9qZuKoZYoY-unsplash-1-scaled.jpg",
  },
] as const;

function ServicesPage() {
  return (
    <div className="bg-background text-foreground overflow-hidden">
      <PageHero
        height="short"
        eyebrow="Empire Expertise"
        title={
          <>
            Strategic Disciplines.{" "}
            <em className="text-luxe-cyan not-italic font-serif italic">Global Standards.</em>
          </>
        }
        subtitle="Four pillars of multi-billion dollar real estate execution. One uncompromising standard of luxury."
        poster={heroImg}
        alt="TrustOn services"
      />

      <section className="py-32 px-6 relative">
        <Section3DBackground opacity={0.1} />
        <div className="mx-auto max-w-7xl relative z-10">
          <Reveal>
            <SectionEyebrow>The Ecosystem</SectionEyebrow>
            <h2 className="font-display text-center text-5xl md:text-8xl text-white mb-24 tracking-tighter leading-none">
              A Complete <em className="text-luxe-cyan italic font-serif">Architecture.</em>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-10">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <Link
                  to={s.to}
                  className="group block relative aspect-[16/11] rounded-[40px] overflow-hidden shadow-luxe border border-white/5"
                >
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[2.2s] group-hover:scale-115 brightness-75 contrast-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-10 md:p-14 text-white">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-luxe-cyan mb-4 font-bold">
                      Module 0{i + 1}
                    </p>
                    <h3 className="font-display text-4xl md:text-5xl mb-4 tracking-tight">
                      {s.title}
                    </h3>
                    <p className="text-white/40 text-lg font-serif italic mb-6">{s.sub}</p>
                    <p className="text-base text-white/50 max-w-md leading-relaxed font-light">
                      {s.blurb}
                    </p>
                    <span className="inline-flex items-center gap-3 mt-8 text-[11px] uppercase tracking-[0.3em] text-luxe-cyan font-bold opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-700">
                      Explore Expertise →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-48 px-6 bg-ink text-white relative overflow-hidden">
        <Section3DBackground opacity={0.3} />
        <div className="mx-auto max-w-5xl text-center relative z-10">
          <Reveal>
            <p className="text-luxe-cyan text-[11px] uppercase tracking-[0.5em] mb-8 font-bold">
              Private Curated Intelligence
            </p>
            <h2 className="font-display text-4xl md:text-8xl leading-[0.9] text-white tracking-tighter mb-16">
              Let our advisors architect <br />
              <em className="text-luxe-cyan italic font-serif">your legacy path.</em>
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-12">
              <a
                href="tel:+919616061166"
                className="font-display text-4xl md:text-6xl text-white hover:text-luxe-cyan transition-colors tracking-tighter"
              >
                +91 96160-61166
              </a>
              <Link to="/contact" className="btn-magnetic btn-luxe px-12 py-5">
                Secure Consultation
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
