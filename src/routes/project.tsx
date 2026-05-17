import { createFileRoute, Link } from "@tanstack/react-router";
import { InnerHero } from "@/components/InnerHero";
import { Reveal } from "@/components/Reveal";
import projectImg from "@/assets/project-prime.jpg";

export const Route = createFileRoute("/project")({
  head: () => ({
    meta: [
      { title: "Project — TrustOn" },
      { name: "description", content: "Explore TrustOn's residential projects — Prime Estate in Lucknow, Uttar Pradesh." },
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
    <>
      <InnerHero
        eyebrow="Project"
        title={<>Where imagination takes shape in <em className="gradient-bronze-text not-italic font-serif italic">luxury.</em></>}
        subtitle="Crafted for those who expect nothing less than exceptional living."
        poster={projectImg}
        alt="TrustOn Projects"
      />
      <section className="py-28 px-6">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1}>
              <Link to="/projects/$slug" params={{ slug: p.slug }} className="group block">
                <div className="relative aspect-[4/3] rounded-md overflow-hidden card-shadow mb-6">
                  <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.8s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                  <p className="absolute top-5 left-5 text-[11px] uppercase tracking-luxe text-cream bg-bronze/90 px-3 py-1 rounded-full">{p.type}</p>
                </div>
                <p className="text-[11px] uppercase tracking-luxe text-bronze">{p.location}</p>
                <h3 className="font-display text-4xl mt-2 group-hover:text-bronze transition-colors">{p.name}</h3>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
