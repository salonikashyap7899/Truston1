import { createFileRoute, Link } from "@tanstack/react-router";
import { InnerHero } from "@/components/InnerHero";
import { Reveal } from "@/components/Reveal";
import projectImg from "@/assets/project-prime.jpg";
import { Section3DBackground } from "@/components/Section3DBackground";

export const Route = createFileRoute("/project")({
  head: () => ({
    meta: [
      { title: "Project — TrustOn" },
      {
        name: "description",
        content: "Explore TrustOn's residential projects — Prime Estate in Lucknow, Uttar Pradesh.",
      },
      { property: "og:title", content: "Projects — TrustOn" },
    ],
  }),
  component: Page,
});

const projects = [
  {
    slug: "prime-estate-lucknow-uttar-pradesh",
    name: "Prime Estate",
    location: "Lucknow, Uttar Pradesh",
    type: "Residential",
    img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/prime-estate-gate-image-672x448.jpeg",
  },
];

function Page() {
  return (
    <div className="bg-background text-foreground overflow-hidden">
      <InnerHero
        eyebrow="Global Communities"
        title={
          <>
            Where imagination takes shape in{" "}
            <em className="text-luxe-cyan not-italic font-serif italic">Billion Dollar Luxury.</em>
          </>
        }
        subtitle="Crafted for the global elite who expect nothing less than architectural perfection."
        poster={projectImg}
        alt="TrustOn Projects"
      />

      <section className="py-32 px-6 relative">
        <Section3DBackground opacity={0.1} />
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-12 relative z-10">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1}>
              <Link to="/projects/$slug" params={{ slug: p.slug }} className="group block">
                <div className="relative aspect-[16/10] rounded-[40px] overflow-hidden shadow-luxe border border-white/5 mb-8">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[2.2s] group-hover:scale-115 brightness-75 contrast-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                  <p className="absolute top-8 left-8 text-[10px] font-bold uppercase tracking-[0.3em] text-white bg-luxe-blue/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                    {p.type}
                  </p>
                </div>
                <div className="px-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-luxe-cyan mb-3">
                    {p.location}
                  </p>
                  <h3 className="font-display text-5xl text-white group-hover:text-luxe-cyan transition-colors tracking-tighter">
                    {p.name}
                  </h3>
                  <div className="w-12 h-px bg-white/10 mt-6 group-hover:w-24 group-hover:bg-luxe-cyan transition-all duration-700" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
