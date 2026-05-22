import { createFileRoute } from "@tanstack/react-router";
import { InnerHero } from "@/components/InnerHero";
import { ServicePageBody, type ServiceContent } from "@/components/ServicePageBody";
import plotImg from "@/assets/plot-tracker.jpg";

export const Route = createFileRoute("/plot-selling")({
  head: () => ({
    meta: [
      { title: "Plot Selling — TrustOn" },
      {
        name: "description",
        content:
          "Premium plots. Zero compromise. Verified, legally clear land parcels across prime locations.",
      },
      { property: "og:title", content: "Plot Selling — TrustOn" },
    ],
  }),
  component: Page,
});

const content: ServiceContent = {
  hero: "Find the right plot and build something lasting.",
  paragraphs: [
    "Land is the starting point of every meaningful project. Whether you are planning a family home, a commercial development, or a long-term investment, selecting the right plot shapes everything that follows.",
    "Our plot selling service provides access to a carefully curated portfolio of verified land parcels — each assessed for legal clarity, ownership records, zoning compliance, and surrounding infrastructure.",
    "Beyond listings, we offer strategic guidance on location value, connectivity, and growth potential so you understand both the present worth and future upside of your investment.",
  ],
  benefits: [
    "Verified listings",
    "Prime locations",
    "Hassle-free transfer",
    "Flexible plot sizes",
    "Complete documentation",
    "End-to-end guidance",
  ],
  whyTrustHeading: "Why clients trust TrustOn with their plot purchase",
  whyTrustText: [
    "Choosing the right plot — and the right partner to guide that purchase — is one of the most important decisions you will make for your future. We earn that trust through consistent delivery, honest communication, and an unwavering commitment to getting every detail right.",
    "Our real estate professionals bring years of hands-on experience across residential, commercial, and township plot transactions, combining deep market knowledge with a genuine understanding of what each client needs.",
    "We are not just plot sellers. We are your partners in securing the right foundation for everything you plan to build upon it.",
  ],
  processHeading: "Where your future begins with the right plot",
  process: [
    {
      title: "Strategic Brief",
      body: "We start by getting to know you — your purpose for the land, your budget, preferred locations, timeline, and the vision behind the purchase.",
    },
    {
      title: "Site Intelligence",
      body: "We study each plot thoroughly — access roads, surrounding development, civic infrastructure, approved land use, and growth trajectory.",
    },
    {
      title: "Curation & Viewing",
      body: "We present a range of vetted options with full documentation and arrange accompanied site visits so you can experience each plot in person.",
    },
    {
      title: "Legacy Documentation",
      body: "Independent legal review covering title verification, ownership chain, encumbrance search, and all government clearances — before a single rupee changes hands.",
    },
  ],
  faq: [
    {
      q: "Are the plots freehold or leasehold?",
      a: "The majority of plots in our portfolio are freehold — full and unconditional ownership rights transferred to you at registration. Any leasehold arrangements are disclosed at the very start.",
    },
    {
      q: "Can I visit the plot before making a purchase decision?",
      a: "Absolutely. We arrange accompanied visits with all relevant survey documents, boundary markings, and location context so your visit is as informative as possible.",
    },
    {
      q: "Is financing available for plot purchases?",
      a: "Yes. We work with banking partners offering dedicated plot loans with competitive interest rates and flexible repayment structures.",
    },
    {
      q: "How quickly is ownership transferred after payment?",
      a: "Once documentation and payment are in order, transfer through the sub-registrar office is typically processed within 15 to 30 working days.",
    },
  ],
  cta: "Schedule your consultation and take the first step towards land that sets your project up for long-term success.",
};

function Page() {
  return (
    <div className="bg-background">
      <InnerHero
        eyebrow="Asset Acquisition"
        title={
          <>
            Plot <em className="text-luxe-cyan not-italic font-serif italic">Selling.</em>
          </>
        }
        subtitle="Premium plots. Zero compromise. Billion-dollar security."
        poster={plotImg}
        alt="Premium plot township"
      />
      <div className="relative z-10">
        <ServicePageBody
          content={content}
          image="https://truston.advrtisinguru.com/wp-content/uploads/2026/04/First-Cut_3-Photo.jpg-scaled.jpeg"
        />
      </div>
    </div>
  );
}
