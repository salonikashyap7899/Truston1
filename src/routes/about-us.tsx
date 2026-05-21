import { createFileRoute, Link } from "@tanstack/react-router";
import { InnerHero } from "@/components/InnerHero";
import { Reveal, SectionEyebrow } from "@/components/Reveal";
import interiorImg from "@/assets/luxury-interior.jpg";
import projectImg from "@/assets/project-prime.jpg";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "About — TrustOn Developers" },
      {
        name: "description",
        content:
          "Trusted real-estate development in Lucknow — transparency, quality, and long-term vision behind Prime Estate.",
      },
      { property: "og:title", content: "About TrustOn Developers" },
      { property: "og:description", content: "The story behind Prime Estate." },
    ],
  }),
  component: AboutPage,
});

const services = [
  {
    title: "Plot Selling",
    to: "/plot-selling",
  },
  {
    title: "Architecture & Design",
    to: "/architecture-design",
  },
  {
    title: "Construction & Build",
    to: "/construction-build",
  },
  {
    title: "Investment Consulting",
    to: "/investment-consulting",
  },
] as const;

function AboutPage() {
  return (
    <>
      <InnerHero
        eyebrow="About Us"
        title={
          <>
            The skilled team
            <br />
            behind{" "}
            <em className="gradient-bronze-text not-italic font-serif italic">Prime Estate.</em>
          </>
        }
        poster={interiorImg}
        alt="TrustOn skilled team"
      />

      <section className="py-28 px-6">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="relative aspect-[4/5] rounded-md overflow-hidden card-shadow">
              <img
                src={projectImg}
                alt="Prime Estate"
                loading="lazy"
                className="w-full h-full object-cover ken-burns"
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="text-bronze text-[11px] uppercase tracking-luxe mb-4 flex items-center gap-3">
                <span className="divider-bronze" /> About Our Company
              </p>
              <h2 className="font-display text-4xl md:text-5xl mb-8 leading-tight">
                Prime Estate — own the ground,{" "}
                <em className="gradient-bronze-text not-italic">build your legacy.</em>
              </h2>
              <p className="text-foreground/75 leading-relaxed mb-6">
                Prime Estate is a trusted name in real estate development, built on a foundation of
                transparency, quality, and long-term vision. We don't just sell land — we craft
                opportunities. Our flagship project is a Jila Panchayat approved township that
                combines legal security, prime location, and future-ready infrastructure.
              </p>
              <div className="grid sm:grid-cols-2 gap-px bg-border mb-8">
                <div className="bg-cream p-6">
                  <p className="text-bronze text-[11px] uppercase tracking-luxe mb-2">
                    Strategic Development
                  </p>
                  <p className="text-sm text-foreground/75">
                    We plan every project with a long-term vision — location intelligence,
                    infrastructure growth, and future value appreciation.
                  </p>
                </div>
                <div className="bg-cream p-6">
                  <p className="text-bronze text-[11px] uppercase tracking-luxe mb-2">
                    Execution Excellence
                  </p>
                  <p className="text-sm text-foreground/75">
                    From land acquisition to final delivery, a structured, transparent,
                    regulatory-compliant process.
                  </p>
                </div>
              </div>
              <Link
                to="/contact"
                className="rounded-full bronze-border px-7 py-3 text-[11px] uppercase tracking-luxe text-bronze hover:bg-bronze hover:text-cream transition-all"
              >
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
            {services.map((s, i) => {
              const getIcon = (title: string) => {
                switch (title) {
                  case "Plot Selling":
                    return (
                      <svg
                        className="w-16 h-16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M3 12l2.393-6.823c.5-1.422 1.944-2.305 3.467-2.305h5.514c1.523 0 2.967.883 3.467 2.305L21 12M3 12a9 9 0 0118 0m-9 9v-6m-4-3h8m-4 3v6m4-3h4"
                        />
                      </svg>
                    );
                  case "Architecture & Design":
                    return (
                      <svg
                        className="w-16 h-16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                        />
                      </svg>
                    );
                  case "Construction & Build":
                    return (
                      <svg
                        className="w-16 h-16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    );
                  case "Investment Consulting":
                    return (
                      <svg
                        className="w-16 h-16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    );
                  default:
                    return null;
                }
              };
              return (
                <Reveal key={s.to} delay={i * 0.08}>
                  <Link to={s.to} className="group block text-center">
                    <div className="flex justify-center mb-6 text-bronze group-hover:text-[var(--bronze)] transition-colors duration-300">
                      {getIcon(s.title)}
                    </div>
                    <h3 className="font-serif text-2xl group-hover:text-bronze transition-colors">
                      {s.title}
                    </h3>
                    <span className="text-[11px] uppercase tracking-luxe text-bronze mt-2 inline-block">
                      Get Free Quote →
                    </span>
                  </Link>
                </Reveal>
              );
            })}
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
                <img
                  src="https://truston.advrtisinguru.com/wp-content/uploads/2026/04/ChatGPT-Image-Apr-25-2026-11_23_46-PM.png"
                  alt="Meraj Husain Rizvi"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
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
