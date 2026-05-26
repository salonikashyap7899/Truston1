import { Reveal, SectionEyebrow } from "./Reveal";
import { Section3DBackground } from "./Section3DBackground";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

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
    designation: "Homeowners",
    description:
      "We not only bought our plot from Prime Estate, but also got our home designed by their architecture team. The designs were exactly what we imagined beautiful and within budget.",
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
];

function TestimonialCard({
  name,
  designation,
  description,
  profileImage,
}: (typeof testimonials)[number]) {
  return (
    <div className="relative bg-[#04090f] border border-white/5 rounded-[24px] overflow-hidden shadow-2xl flex h-[220px] md:h-[240px] select-none group">
      {/* Project plot image - smaller size */}
      <div className="w-[100px] md:w-[120px] flex-shrink-0 relative overflow-hidden">
        <img
          src="/plot-project.jpg"
          alt="Project plot"
          className="w-full h-full object-cover brightness-75 group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a121e]" />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-6 flex-1 overflow-hidden">
        {/* Stars */}
        <div className="flex gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-4 h-4 text-[#00BFFF] fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Quote */}
        <p className="text-white/60 text-xs md:text-sm leading-relaxed flex-1 overflow-hidden line-clamp-4 font-light italic">
          &ldquo;{description}&rdquo;
        </p>

        {/* Author */}
        <div className="mt-4 pt-4 border-t border-white/5">
          <p className="font-bold text-white text-sm tracking-wide">{name}</p>
          <p className="text-[#00BFFF]/50 text-[10px] uppercase tracking-widest mt-1 font-bold">{designation}</p>
        </div>
      </div>

      {/* Quote badge */}
      <div className="absolute bottom-4 right-4 w-9 h-9 bg-[#04090f] border border-[#00BFFF]/20 rounded-full flex items-center justify-center text-[#00BFFF] text-lg font-serif leading-none shadow-lg">
        ❝
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="relative py-32 px-4 bg-[#04090f] overflow-hidden">
      <Section3DBackground opacity={0.08} />

      <div
        className="absolute top-0 left-0 w-96 h-96 opacity-[0.06]"
        style={{ background: "radial-gradient(circle, #00BFFF, transparent)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #00BFFF, transparent)" }}
      />

      <div className="relative mx-auto max-w-7xl z-10">
        <Reveal>
          <SectionEyebrow light>Client Narratives</SectionEyebrow>
          <h2 className="font-serif text-5xl md:text-7xl text-center text-white mb-4 max-w-4xl mx-auto tracking-tight leading-tight">
            Distinguished{" "}
            <em className="text-[#00BFFF] italic">Partnerships</em>
          </h2>
          <p className="text-center text-white/40 mt-4 mb-16 max-w-xl mx-auto font-light text-lg">
            Voices of excellence from our growing network of homeowners, investors, and partners.
          </p>
        </Reveal>

        {/* Swiper coverflow carousel */}
        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          speed={800}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Autoplay, Pagination]}
          className="testimonials-swiper pb-14"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.name} style={{ width: "clamp(300px, 70vw, 580px)" }}>
              <TestimonialCard {...t} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-16 text-center">
          <Reveal>
            <p className="font-serif italic text-2xl text-white/30 mb-8">
              Join the future of luxury real estate.
            </p>
            <a
              href="tel:+919616061166"
              className="inline-block px-12 py-5 rounded-full text-[11px] uppercase tracking-[0.3em] font-bold transition-all duration-500 border border-[#00BFFF]/40 text-[#00BFFF] hover:bg-[#00BFFF] hover:text-[#04090f]"
            >
              Speak to an Expert →
            </a>
          </Reveal>
        </div>
      </div>

      <style>{`
        .testimonials-swiper .swiper-pagination-bullet {
          background: rgba(255,255,255,0.25);
          width: 8px;
          height: 8px;
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
