import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Reveal, SectionEyebrow } from "@/components/Reveal";
import {
  LuxuryParallax,
  LuxuryGlassCard,
  BlurInEffect,
  ScrollRevealContainer,
} from "@/components/LuxuryAnimations";
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
    <>
      <PageHero
        height="short"
        eyebrow="Our Services"
        title={
          <>
            Everything you need,{" "}
            <em className="gradient-bronze-text not-italic">under one roof.</em>
          </>
        }
        subtitle="Four disciplines. One uncompromising standard of luxury real estate execution."
        poster={heroImg}
        alt="TrustOn services"
      />

      <section className="py-28 px-6 relative overflow-hidden">
        <LuxuryParallax offset={30}>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-bronze/5 rounded-full blur-3xl" />
        </LuxuryParallax>

        <div className="mx-auto max-w-7xl relative z-10">
          <Reveal>
            <SectionEyebrow>Explore</SectionEyebrow>
            <h2 className="font-display text-center text-4xl md:text-6xl mb-20 leading-tight">
              A complete <em className="gradient-bronze-text not-italic">real estate</em> ecosystem.
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <ScrollRevealContainer key={s.title} delay={i * 0.1}>
                <Link
                  to={s.to}
                  className="group block relative aspect-[16/11] rounded-2xl overflow-hidden hover-lift card-shadow"
                >
                  <BlurInEffect delay={i * 0.05}>
                    <img
                      src={s.img}
                      alt={s.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[2.2s] group-hover:scale-110 ken-burns"
                    />
                  </BlurInEffect>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/50 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-bronze/0 to-bronze/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 text-cream">
                    <p className="text-[11px] uppercase tracking-luxe text-bronze mb-3 group-hover:text-blue-400 transition-colors">
                      0{i + 1} — Service
                    </p>
                    <h3 className="font-display text-3xl md:text-4xl mb-2 group-hover:text-bronze transition-colors duration-300">
                      {s.title}
                    </h3>
                    <p className="text-cream/80 font-serif italic mb-3">{s.sub}</p>
                    <p className="text-sm text-cream/70 max-w-md leading-relaxed">{s.blurb}</p>
                    <span className="inline-flex items-center gap-2 mt-5 text-[11px] uppercase tracking-luxe text-bronze opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-700">
                      Discover →
                    </span>
                  </div>
                </Link>
              </ScrollRevealContainer>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-ink text-cream relative overflow-hidden">
        <LuxuryParallax offset={40}>
          <div className="absolute top-10 left-0 w-80 h-80 bg-bronze/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-10 w-96 h-96 bg-bronze/3 rounded-full blur-3xl" />
        </LuxuryParallax>

        <div className="mx-auto max-w-4xl text-center relative z-10">
          <ScrollRevealContainer>
            <p className="text-bronze text-[11px] uppercase tracking-luxe mb-5">
              Not sure where to begin?
            </p>
            <h2 className="font-display text-3xl md:text-5xl leading-tight">
              Let our advisors curate the right{" "}
              <em className="text-bronze font-serif italic not-italic">path for you.</em>
            </h2>
            <div className="mt-10 flex flex-wrap justify-center items-center gap-8">
              <a
                href="tel:+919616061166"
                className="font-serif text-3xl text-bronze hover:text-blue-400 transition-colors"
              >
                +91 96160-61166
              </a>
              <Link
                to="/contact"
                className="rounded-full bronze-border px-7 py-3 text-[11px] uppercase tracking-luxe text-bronze hover:bg-bronze hover:text-cream transition-all hover:shadow-lg hover:shadow-bronze/30"
              >
                Book a Consultation
              </Link>
            </div>
          </ScrollRevealContainer>
        </div>
      </section>
    </>
  );
}
