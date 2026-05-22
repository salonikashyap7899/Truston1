import { createFileRoute } from "@tanstack/react-router";
import { InnerHero } from "@/components/InnerHero";
import { ServicePageBody, type ServiceContent } from "@/components/ServicePageBody";
import projectImg from "@/assets/project-prime.jpg";

export const Route = createFileRoute("/construction-build")({
  head: () => ({
    meta: [
      { title: "Construction & Build — TrustOn" },
      {
        name: "description",
        content:
          "From blueprint to reality, built the way you imagined. End-to-end construction with full accountability.",
      },
      { property: "og:title", content: "Construction & Build — TrustOn" },
    ],
  }),
  component: Page,
});

const content: ServiceContent = {
  hero: "From blueprint to reality, built the way you imagined.",
  paragraphs: [
    "A great design is only as good as its execution. Our construction and build service brings together skilled professionals, quality materials, and proven project management to turn architectural plans into structures you can be proud of.",
    "We oversee every phase — from site preparation and foundation work to structural completion and finishing details — with full transparency on timelines, costs, and progress.",
    "Construction is where vision becomes reality, and we treat every brick, every beam, and every finishing detail as a direct reflection of the trust our clients place in us.",
  ],
  benefits: [
    "Budget accountability",
    "Skilled workforce",
    "Quality materials",
    "Transparent timelines",
    "Modern construction methods",
    "End-to-end site management",
  ],
  whyTrustHeading: "Why clients trust TrustOn with their construction",
  whyTrustText: [
    "Our construction teams bring years of hands-on experience across residential, commercial, and mixed-use projects, combining technical skill with on-site discipline and a genuine pride in the work they deliver.",
    "We understand that building or renovating is a significant investment — financially and emotionally — so we treat every project with the care and attention it deserves, regardless of scale.",
    "We are not just contractors. We are your partners in creating a structure that is built right, built to last, and built to serve the life or business you are putting inside it.",
  ],
  processHeading: "Where ideas take shape through expert construction",
  process: [
    {
      title: "Strategic Brief",
      body: "We begin by understanding what matters most to you — functional requirements, long-term goals, budget expectations, and project purpose.",
    },
    {
      title: "Site Intelligence",
      body: "Detailed evaluation of the land — orientation, access, levels, surroundings, sunlight, airflow, and environmental conditions.",
    },
    {
      title: "Concept Refinement",
      body: "Multiple planning directions that respond to your requirements in different ways — compare layouts and refine intent before committing.",
    },
    {
      title: "Visual Execution",
      body: "Plans refined, technical aspects aligned, the project visualized through 3D views and walkthroughs before execution begins.",
    },
  ],
  faq: [
    {
      q: "Do you handle both residential and commercial construction?",
      a: "Yes — independent residential homes, apartment buildings, commercial offices, retail, hospitality, and mixed-use developments. Our teams adapt to each typology.",
    },
    {
      q: "Can you work with an architect or design firm we have already engaged?",
      a: "Absolutely. We coordinate directly with your chosen architect from the beginning to ensure plans are understood, constructability issues are identified early, and the final build matches their intent.",
    },
    {
      q: "How do you handle unexpected issues or cost changes during construction?",
      a: "Any issue affecting cost or timeline is communicated immediately with a transparent explanation, revised estimate, and recommended course of action — no work proceeds without your approval.",
    },
    {
      q: "What quality checks take place during the build?",
      a: "Structured quality inspections at every major milestone — foundation, structural frame, MEP rough-in, plastering, flooring, and final finishing — with formal sign-off before each next phase.",
    },
  ],
  cta: "Schedule your consultation and take the first step towards a building constructed the right way, from the ground up.",
};

function Page() {
  return (
    <div className="bg-background">
      <InnerHero
        eyebrow="Empire Construction"
        title={
          <>
            Engineering <span className="font-serif italic">&amp;</span>{" "}
            <em className="text-luxe-cyan not-italic font-serif italic">Build.</em>
          </>
        }
        subtitle="We don't just build buildings. We architect multi-billion dollar promises."
        poster={projectImg}
        alt="Construction & Build"
      />
      <ServicePageBody
        content={content}
        image="https://truston.advrtisinguru.com/wp-content/uploads/2026/04/ej-yao-D46mXLsQRJw-unsplash-scaled.jpg"
      />
    </div>
  );
}
