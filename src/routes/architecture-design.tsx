import { createFileRoute } from "@tanstack/react-router";
import { InnerHero } from "@/components/InnerHero";
import { ServicePageBody, type ServiceContent } from "@/components/ServicePageBody";
import interiorImg from "@/assets/luxury-interior.jpg";

export const Route = createFileRoute("/architecture-design")({
  head: () => ({
    meta: [
      { title: "Architecture & Design — TrustOn" },
      { name: "description", content: "Your vision, brought to life on paper first. Architecture and interior design rooted in craft and intent." },
      { property: "og:title", content: "Architecture & Design — TrustOn" },
    ],
  }),
  component: Page,
});

const content: ServiceContent = {
  hero: "Spaces designed with vision, built with precision.",
  paragraphs: [
    "Great architecture is more than drawing walls on paper. It is about fundamentally shaping the way people live, work, and experience the spaces around them.",
    "Our architecture and design services bring together bold creative thinking, rigorous technical expertise, and a deep, empathetic understanding of human needs to deliver structures that stand the test of time.",
    "We believe firmly that no two projects are alike. Whether a private residence, a landmark commercial complex, or a sophisticated mixed-use development, our approach begins with listening — truly, attentively, and without assumption.",
  ],
  benefits: ["Custom design plans", "3D visualization", "Regulatory compliance", "End-to-end guidance", "Transparent design process", "Sustainable design thinking"],
  whyTrustHeading: "Why clients trust TrustOn with their design",
  whyTrustText: [
    "Our architects bring years of hands-on experience across residential, commercial, and mixed-use projects — combining technical skill with creative passion. We understand the local regulatory landscape deeply, which means fewer delays and smoother approvals.",
    "We treat every project with the care and attention it deserves, regardless of scale. We are not just designers — we are your partners in creating a space that works hard, lasts long, and feels exactly right.",
  ],
  processHeading: "Where your vision meets expert architecture",
  process: [
    { title: "Discovery & Brief", body: "We start by getting to know you — your lifestyle, aspirations, functional needs, and the story you want your space to tell." },
    { title: "Site Analysis", body: "We study your plot thoroughly — orientation, topography, access, natural light, and prevailing winds — so design works with the site, not against it." },
    { title: "Concept Design", body: "Multiple distinct directions for you to review and choose from — creative exploration and open dialogue at the heart of every concept." },
    { title: "Design Development & 3D", body: "Photorealistic renders and immersive walkthroughs so you genuinely experience your future space long before construction begins." },
  ],
  faq: [
    { q: "Can changes be made after the design is finalised?", a: "Minor modifications can usually be accommodated without significant delays. Major structural changes may require revised drawings and extended timelines — discuss as early as possible." },
    { q: "How long does the architectural design process typically take?", a: "Standard residential projects: 4–8 weeks from brief to approval-ready drawings. Larger residential or commercial: 10–16 weeks or more. We provide a clear schedule at the outset." },
    { q: "Do you provide interior design services as well?", a: "Yes. We offer fully integrated interior design alongside architecture — ensuring a seamless aesthetic from facade through to every interior space." },
    { q: "What should I prepare before our first consultation?", a: "Plot dimensions and survey documents, a rough budget range, inspiration images, timeline expectations, and a list of specific requirements." },
  ],
  cta: "Schedule your consultation and take the first step towards a space that truly reflects who you are.",
};

function Page() {
  return (
    <>
      <InnerHero eyebrow="Service · 02" title={<>Architecture <span className="font-serif italic">&amp;</span> <em className="gradient-bronze-text not-italic font-serif italic">Design.</em></>} subtitle="Your vision, brought to life on paper first." poster={interiorImg} alt="Architecture & Design" />
      <ServicePageBody content={content} image="https://truston.advrtisinguru.com/wp-content/uploads/2026/04/steve-driscoll-VsBl5PwVZpY-unsplash-scaled.jpg" />
    </>
  );
}
