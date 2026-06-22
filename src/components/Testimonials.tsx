import { Reveal, SectionEyebrow } from "./Reveal";
import { Section3DBackground } from "./Section3DBackground";
import { usePageContent } from "@/hooks/usePageContent";
import { openConsultationModal } from "./ConsultationModal";
import { useRef } from "react";

const FALLBACK_VIDEO =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-05-22%20at%2010.03.14%20PM-QaTFrXd8V3Y9wkvJT59K1CIHabjmqa.mp4";

interface TestimonialItem {
  name: string;
  designation: string;
  description: string;
  profile_image: string;
  video_url: string;
}

const DEFAULT_ITEMS: TestimonialItem[] = [
  { name: "Ramesh Verma", designation: "Plot Owner, Phase 1", description: "I was skeptical about buying a plot but Prime Estate's team walked me through every document. The land is approved, the location is growing, and the process was completely transparent.", profile_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop", video_url: FALLBACK_VIDEO },
  { name: "Anil Singh", designation: "Homeowner", description: "We not only bought our plot from Prime Estate, but also got our home designed by their architecture team. The designs were exactly what we imagined — beautiful and within budget.", profile_image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop", video_url: FALLBACK_VIDEO },
  { name: "Mohammed Irfan", designation: "Channel Partner", description: "As a channel partner, I have referred over 20 clients to Prime Estate. The team is responsive, the commission structure is fair, and the product is genuinely good.", profile_image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop", video_url: FALLBACK_VIDEO },
  { name: "Priya Sharma", designation: "Investor, Phase 2", description: "I invested in two plots as a long-term asset. TrustOn's team gave me honest ROI projections, explained the infrastructure timeline clearly, and has been available every step of the way.", profile_image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop", video_url: FALLBACK_VIDEO },
  { name: "Vivek Tiwari", designation: "Plot Owner — Dubagga", description: "The location of Prime Estate is genuinely strategic. Within months of buying, I could already see infrastructure work picking up nearby. TrustOn delivered exactly what they promised.", profile_image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop", video_url: FALLBACK_VIDEO },
  { name: "Suman Mishra", designation: "NRI Investor", description: "Managing property from abroad felt risky — but TrustOn handled everything remotely. Clear documentation, video walkthroughs, and a team that actually picks up the phone.", profile_image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop", video_url: FALLBACK_VIDEO },
  { name: "Deepak Pandey", designation: "First-Time Buyer", description: "As a first-time buyer, I had hundreds of questions. The TrustOn team never made me feel rushed. They educated me, showed me options, and helped me make a confident decision.", profile_image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop", video_url: FALLBACK_VIDEO },
];

function VideoCard({ item }: { item: TestimonialItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoUrl = item.video_url || FALLBACK_VIDEO;

  return (
    <div
      className="relative bg-[#060c16] border border-white/8 rounded-[20px] overflow-hidden flex flex-col select-none group shrink-0 hover:border-[#00BFFF]/30 transition-all duration-500"
      style={{
        width: "360px",
        boxShadow: "0 12px 48px rgba(0,0,0,0.65), 0 0 0 1px rgba(0,191,255,0.06), 0 2px 8px rgba(0,0,0,0.4)",
      }}
    >
      {/* Video 16:9 */}
      <div className="relative w-full overflow-hidden bg-[#080d1a]" style={{ aspectRatio: "16/9" }}>
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          loop
          playsInline
          autoPlay
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ opacity: 0.88 }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(180deg, rgba(6,12,22,0) 40%, rgba(6,12,22,0.9) 100%)" }}
        />
        {/* Cyan glow on hover */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ boxShadow: "inset 0 0 0 1px rgba(0,191,255,0.25)" }} />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#04090f]/75 backdrop-blur-sm border border-[#00BFFF]/30 rounded-full px-2.5 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00BFFF] animate-pulse" />
          <span className="text-[9px] uppercase tracking-[0.15em] text-[#00BFFF] font-bold">Video</span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-3 h-3 text-[#00BFFF] fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        <p className="text-white/55 text-sm leading-relaxed flex-1 overflow-hidden line-clamp-3 font-light italic pr-2 mb-4">
          &ldquo;{item.description}&rdquo;
        </p>

        <div className="pt-4 border-t border-white/[0.06] flex items-center gap-3">
          <img
            src={item.profile_image}
            alt={item.name}
            className="w-8 h-8 rounded-full object-cover border border-[#00BFFF]/20"
          />
          <div>
            <p className="font-semibold text-white text-sm">{item.name}</p>
            <p className="text-[#00BFFF]/50 text-[10px] uppercase tracking-widest font-bold">{item.designation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const c = usePageContent("home.testimonials", {
    eyebrow: "Client Narratives",
    title: "Distinguished",
    title_accent: "Partnerships",
    subtitle: "Voices of excellence from our growing network of homeowners, investors, and partners.",
    cta_text: "Join the future of luxury real estate.",
    items: DEFAULT_ITEMS,
  });

  const items: TestimonialItem[] = Array.isArray(c.items) && (c.items as TestimonialItem[]).length > 0
    ? (c.items as TestimonialItem[])
    : DEFAULT_ITEMS;

  const doubled = [...items, ...items];

  return (
    <section className="relative py-32 bg-[#04090f] overflow-hidden">
      <Section3DBackground opacity={0.08} />

      <div className="absolute top-0 left-0 w-96 h-96 opacity-[0.06]"
        style={{ background: "radial-gradient(circle, #00BFFF, transparent)" }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #00BFFF, transparent)" }} />

      {/* Heading */}
      <div className="relative z-10 px-4">
        <Reveal>
          <SectionEyebrow light>{String(c.eyebrow || "Client Narratives")}</SectionEyebrow>
          <h2 className="font-serif text-5xl md:text-7xl text-center text-white mb-4 max-w-4xl mx-auto tracking-tight leading-tight">
            {String(c.title || "Distinguished")}{" "}
            <em className="text-[#00BFFF] italic">{String(c.title_accent || "Partnerships")}</em>
          </h2>
          <p className="text-center text-white/40 mt-4 mb-16 max-w-xl mx-auto font-light text-lg">
            {String(c.subtitle || "Voices of excellence from our growing network of homeowners, investors, and partners.")}
          </p>
        </Reveal>
      </div>

      {/* Infinite marquee */}
      <div className="relative overflow-hidden">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #04090f 0%, transparent 100%)" }} />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #04090f 0%, transparent 100%)" }} />

        <div className="testimonials-marquee-track py-4 px-2">
          {doubled.map((t, idx) => (
            <VideoCard key={t.name + idx} item={t} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 mt-16 text-center px-4">
        <Reveal>
          <p className="font-serif italic text-2xl text-white/30 mb-8">
            {String(c.cta_text || "Join the future of luxury real estate.")}
          </p>
          <button
            onClick={openConsultationModal}
            className="inline-block px-12 py-5 rounded-full text-[11px] uppercase tracking-[0.3em] font-bold transition-all duration-500 border border-[#00BFFF]/40 text-[#00BFFF] hover:bg-[#00BFFF] hover:text-[#04090f]"
          >
            Book a Free Consultation →
          </button>
        </Reveal>
      </div>

      <style>{`
        @keyframes testimonialsScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .testimonials-marquee-track {
          animation: testimonialsScroll 40s linear infinite;
          display: flex;
          gap: 20px;
          width: max-content;
          align-items: stretch;
        }
        .testimonials-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
