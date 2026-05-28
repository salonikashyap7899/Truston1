import { Reveal, SectionEyebrow } from "./Reveal";
import { Section3DBackground } from "./Section3DBackground";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { usePageContent } from "@/hooks/usePageContent";
import { openConsultationModal } from "./ConsultationModal";

const testimonials = [
  {
    name: "Ramesh Verma",
    designation: "Plot Owner, Phase 1",
    description:
      "I was skeptical about buying a plot but Prime Estate's team walked me through every document. The land is approved, the location is growing, and the process was completely transparent.",
    profileImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Anil Singh",
    designation: "Homeowner",
    description:
      "We not only bought our plot from Prime Estate, but also got our home designed by their architecture team. The designs were exactly what we imagined — beautiful and within budget.",
    profileImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Mohammed Irfan",
    designation: "Channel Partner",
    description:
      "As a channel partner, I have referred over 20 clients to Prime Estate. The team is responsive, the commission structure is fair, and the product is genuinely good.",
    profileImage:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Priya Sharma",
    designation: "Investor, Phase 2",
    description:
      "I invested in two plots as a long-term asset. TrustOn's team gave me honest ROI projections, explained the infrastructure timeline clearly, and has been available every step of the way.",
    profileImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Vivek Tiwari",
    designation: "Plot Owner — Dubagga",
    description:
      "The location of Prime Estate is genuinely strategic. Within months of buying, I could already see infrastructure work picking up nearby. TrustOn delivered exactly what they promised.",
    profileImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Suman Mishra",
    designation: "NRI Investor",
    description:
      "Managing property from abroad felt risky — but TrustOn handled everything remotely. Clear documentation, video walkthroughs, and a team that actually picks up the phone.",
    profileImage:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Deepak Pandey",
    designation: "First-Time Buyer",
    description:
      "As a first-time buyer, I had hundreds of questions. The TrustOn team never made me feel rushed. They educated me, showed me options, and helped me make a confident decision.",
    profileImage:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
  },
];

function TestimonialCard({
  name,
  designation,
  description,
}: (typeof testimonials)[number]) {
  return (
    <div className="relative bg-[#060c16] border border-white/8 rounded-[24px] overflow-hidden shadow-xl flex flex-col h-[230px] md:h-[250px] select-none group hover:border-[#00BFFF]/20 transition-all duration-500 p-6">
      {/* Quote icon */}
      <div className="absolute top-5 right-5 w-8 h-8 rounded-full border border-[#00BFFF]/15 flex items-center justify-center text-[#00BFFF]/30 text-lg font-serif leading-none">
        &#8220;
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-3.5 h-3.5 text-[#00BFFF] fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Description */}
      <p className="text-white/55 text-sm leading-relaxed flex-1 overflow-hidden line-clamp-3 font-light italic pr-6">
        &ldquo;{description}&rdquo;
      </p>

      {/* Author */}
      <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#00BFFF]/10 border border-[#00BFFF]/20 flex items-center justify-center text-[#00BFFF] text-xs font-bold">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-white text-sm">{name}</p>
          <p className="text-[#00BFFF]/50 text-[10px] uppercase tracking-widest font-bold">{designation}</p>
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
  });

  return (
    <section className="relative py-32 px-4 bg-[#04090f] overflow-hidden">
      <Section3DBackground opacity={0.08} />

      <div className="absolute top-0 left-0 w-96 h-96 opacity-[0.06]"
        style={{ background: "radial-gradient(circle, #00BFFF, transparent)" }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #00BFFF, transparent)" }} />

      <div className="relative mx-auto max-w-7xl z-10">
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

        <Swiper
          grabCursor
          centeredSlides
          loop
          speed={700}
          slidesPerView="auto"
          spaceBetween={24}
          autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          className="testimonials-swiper pb-14"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.name} style={{ width: "clamp(280px, 65vw, 520px)" }}>
              <TestimonialCard {...t} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-16 text-center">
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
      </div>

      <style>{`
        .testimonials-swiper .swiper-pagination-bullet {
          background: rgba(255,255,255,0.2);
          width: 8px; height: 8px;
          opacity: 1;
          transition: all 0.4s;
        }
        .testimonials-swiper .swiper-pagination-bullet-active {
          background: #00BFFF;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
}
