import { createFileRoute, Link } from "@tanstack/react-router";
import { InnerHero } from "@/components/InnerHero";
import { Reveal, SectionEyebrow } from "@/components/Reveal";
import interiorImg from "@/assets/luxury-interior.jpg";
import projectImg from "@/assets/project-prime.jpg";
import { Section3DBackground } from "@/components/Section3DBackground";

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
    <div className="bg-background text-foreground overflow-hidden">
      <InnerHero
        eyebrow="The Institution"
        title={
          <>
            Architecture of
            <br />a{" "}
            <em className="gradient-luxe-text not-italic font-serif italic">
              Billion Dollar Legacy.
            </em>
          </>
        }
        poster={interiorImg}
        alt="TrustOn skilled team"
      />

      <section className="py-32 px-6 relative">
        <Section3DBackground opacity={0.1} />
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-20 items-center relative z-10">
          <Reveal>
            <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-luxe border border-white/5">
              <img
                src={projectImg}
                alt="Prime Estate"
                loading="lazy"
                className="w-full h-full object-cover ken-burns brightness-75 contrast-125"
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-px bg-luxe-cyan" />
                <span className="text-luxe-cyan text-xs uppercase tracking-[0.4em] font-bold">
                  The Ethos
                </span>
              </div>
              <h2 className="font-display text-5xl md:text-7xl text-white mb-10 leading-[0.9] tracking-tighter">
                Prime Estate — <br />
                <em className="text-luxe-cyan italic font-serif">A Global Vision.</em>
              </h2>
              <p className="text-white/50 text-xl leading-relaxed mb-12 font-light">
                Prime Estate is a trusted name in real estate development, built on a foundation of
                transparency, quality, and long-term vision. We don't just sell land — we craft
                opportunities for elite wealth creation.
              </p>
              <div className="grid sm:grid-cols-2 gap-px bg-white/5 mb-12 rounded-3xl overflow-hidden border border-white/5">
                <div className="bg-ink/50 p-8 hover:bg-white/[0.03] transition-colors">
                  <p className="text-luxe-cyan text-[10px] uppercase tracking-[0.3em] mb-4 font-bold">
                    Strategic Growth
                  </p>
                  <p className="text-sm text-white/40 leading-relaxed font-light">
                    We plan every project with a long-term vision — location intelligence and future
                    value appreciation.
                  </p>
                </div>
                <div className="bg-ink/50 p-8 hover:bg-white/[0.03] transition-colors">
                  <p className="text-luxe-cyan text-[10px] uppercase tracking-[0.3em] mb-4 font-bold">
                    Compliance
                  </p>
                  <p className="text-sm text-white/40 leading-relaxed font-light">
                    Regulatory-compliant processes ensured at every stage of land acquisition and
                    development.
                  </p>
                </div>
              </div>
              <button className="btn-magnetic btn-luxe px-12 py-5">Secure Consultation</button>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-ink relative">
        <Section3DBackground opacity={0.15} />
        <div className="mx-auto max-w-7xl relative z-10">
          <Reveal>
            <SectionEyebrow light>Portfolio Pillars</SectionEyebrow>
            <h2 className="font-display text-5xl md:text-8xl text-center text-white mb-24 tracking-tighter">
              Architecture of <em className="text-luxe-cyan italic font-serif">Excellence.</em>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                          strokeWidth="1"
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
                          strokeWidth="1"
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
                          strokeWidth="1"
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
                          strokeWidth="1"
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
                  <Link
                    to={s.to}
                    className="group block text-center glass-premium p-10 rounded-[32px] border border-white/5 hover:border-luxe-cyan/30 transition-all duration-500"
                  >
                    <div className="flex justify-center mb-10 text-luxe-cyan/40 group-hover:text-luxe-cyan group-hover:scale-110 transition-all duration-700">
                      {getIcon(s.title)}
                    </div>
                    <h3 className="font-display text-2xl text-white mb-6 tracking-tight">
                      {s.title}
                    </h3>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-luxe-cyan font-bold opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-500 block">
                      Get Proposal →
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 relative">
        <div className="mx-auto max-w-7xl relative z-10">
          <Reveal>
            <SectionEyebrow>Leadership</SectionEyebrow>
            <h2 className="font-display text-5xl md:text-8xl text-center text-white mb-24 tracking-tighter leading-none">
              Strategic <em className="text-luxe-cyan italic font-serif">Architects.</em>
            </h2>
          </Reveal>
          <Reveal>
            <div className="mx-auto max-w-md text-center">
              <div className="relative aspect-square rounded-[60px] overflow-hidden mb-10 shadow-luxe border border-white/10 group">
                <img
                  src="https://truston.advrtisinguru.com/wp-content/uploads/2026/04/ChatGPT-Image-Apr-25-2026-11_23_46-PM.png"
                  alt="Meraj Husain Rizvi"
                  loading="lazy"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-60" />
              </div>
              <h3 className="font-display text-4xl text-white tracking-tight">
                Meraj Husain Rizvi
              </h3>
              <p className="text-[10px] uppercase tracking-[0.6em] text-luxe-cyan mt-4 font-bold">
                Principal Architect
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
