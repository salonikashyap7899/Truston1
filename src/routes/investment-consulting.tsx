import { createFileRoute } from "@tanstack/react-router";
import { InnerHero } from "@/components/InnerHero";
import { ServicePageBody, type ServiceContent } from "@/components/ServicePageBody";
import lucknowImg from "@/assets/lucknow-aerial.jpg";

export const Route = createFileRoute("/investment-consulting")({
  head: () => ({
    meta: [
      { title: "Investment Consulting — TrustOn" },
      {
        name: "description",
        content:
          "Buy smart. Invest smarter. Data-backed real-estate investment guidance focused on long-term value.",
      },
      { property: "og:title", content: "Investment Consulting — TrustOn" },
    ],
  }),
  component: Page,
});

const content: ServiceContent = {
  hero: "Smarter real estate investments, guided by expertise.",
  paragraphs: [
    "Real estate remains one of the most reliable tools for building long-term wealth, but success depends on informed decision-making, market timing, and a clear strategy.",
    "Our investment consulting service is focused entirely on real estate — providing structured, data-backed insights so you can identify the right opportunities, avoid common pitfalls, and align every decision with current conditions and future potential.",
    "Our recommendations are not driven by sales targets, but by objective market analysis and long-term value creation.",
  ],
  benefits: [
    "Market analysis",
    "Portfolio strategy",
    "Risk assessment",
    "ROI projections",
    "Legal and documentation",
    "End-to-end transaction",
  ],
  whyTrustHeading: "Why clients trust TrustOn with their investment",
  whyTrustText: [
    "Our investment consultants bring years of hands-on experience across residential, commercial, and land-based transactions — combining deep market knowledge with a genuine understanding of what each investor needs to achieve.",
    "We know the local property landscape thoroughly — pricing trends, growth corridors, regulatory environment, and the factors that separate a sound investment from a costly mistake.",
    "We are not just advisors. We are your partners in building a real estate portfolio that performs with purpose and stands on a foundation of well-informed decisions.",
  ],
  processHeading: "Where every smart investment finds its direction",
  process: [
    {
      title: "Wealth Strategy",
      body: "We start by understanding your financial objectives, investment horizon, risk tolerance, and the broader wealth-building vision behind your interest in real estate.",
    },
    {
      title: "Market Intelligence",
      body: "Thorough analysis of each opportunity — location, infrastructure, rental demand, price trends, and economic factors shaping that micro market.",
    },
    {
      title: "Strategic Selection",
      body: "We present vetted opportunities with full documentation — ownership records, legal clearances, encumbrance certificates, and relevant approvals.",
    },
    {
      title: "Legacy Preservation",
      body: "Independent legal due diligence covering title, ownership chain, encumbrance, and approvals — so you know exactly what you are buying before any commitment.",
    },
  ],
  faq: [
    {
      q: "Is this service only for large-scale investors?",
      a: "Not at all. We work with first-time buyers, individual investors, and institutional clients across a wide range of investment sizes and objectives.",
    },
    {
      q: "Which markets and locations do you cover?",
      a: "We focus on key real estate markets across the region — particularly Lucknow and its growth corridors — with selective advisory for high-potential opportunities nationally.",
    },
    {
      q: "How is your consulting fee structured?",
      a: "Fixed-fee advisory packages for clearly defined services, or success-based models for larger engagements. Fees are discussed transparently before any engagement begins.",
    },
    {
      q: "Can you assist with legal and documentation requirements?",
      a: "Yes. Legal and documentation support is integral to our service — coordinated with qualified professionals to fully protect your interests.",
    },
  ],
  cta: "Schedule your consultation and identify opportunities that deliver real and lasting returns.",
};

function Page() {
  return (
    <div className="bg-background">
      <InnerHero
        eyebrow="Portfolio Management"
        title={
          <>
            Investment <em className="text-luxe-cyan not-italic font-serif italic">Consulting.</em>
          </>
        }
        subtitle="Buy smart. Invest with billion-dollar intelligence."
        poster={lucknowImg}
        alt="Investment Consulting"
      />
      <div className="relative z-10">
        <ServicePageBody
          content={content}
          image="https://truston.advrtisinguru.com/wp-content/uploads/2026/04/jakub-zerdzicki-uZqmXxRLHmQ-unsplash-scaled.jpg"
        />
      </div>
    </div>
  );
}
