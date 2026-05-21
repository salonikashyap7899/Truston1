import { createFileRoute } from "@tanstack/react-router";
import { PlotTracker } from "@/components/PlotTracker";
import { WealthCalculator } from "@/components/WealthCalculator";
import { GallerySection } from "@/components/GallerySection";
import { InnerHero } from "@/components/InnerHero";
import heroImg from "@/assets/luxury-interior.jpg";

export const Route = createFileRoute("/lifestyle")({
  head: () => ({
    meta: [
      { title: "Lifestyle — TrustOn" },
      {
        name: "description",
        content: "Experience the TrustOn lifestyle. Every detail, captured.",
      },
    ],
  }),
  component: LifestylePage,
});

function LifestylePage() {
  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <InnerHero
        eyebrow="TrustOn"
        title={<span>Lifestyle</span>}
        subtitle="Every detail, captured. Experience the pinnacle of luxury living."
        poster={heroImg}
        alt="Luxury lifestyle interior"
      />

      <div className="py-12">
        <PlotTracker />
      </div>

      <GallerySection />

      <div className="py-12">
        <WealthCalculator />
      </div>
    </div>
  );
}
