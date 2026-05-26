"use client";
import { ContainerScroll } from "./ui/container-scroll-animation";

export function WhoWeAre() {
  return (
    <div className="flex flex-col overflow-hidden bg-transparent">
      <ContainerScroll
        titleComponent={
          <>
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-[#00BFFF] mb-4">
              The TrustOn Legacy
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white mb-4">
              Who <em className="text-[#00BFFF] italic">We Are</em>
            </h1>
            <p className="text-white/50 text-sm md:text-lg max-w-2xl mx-auto font-light">
              Building tomorrow&apos;s landmarks with integrity, innovation, and unwavering commitment to excellence.
            </p>
          </>
        }
      >
        {/* Card Content - Who We Are Details */}
        <div className="h-full w-full bg-[#0a0f14] p-6 md:p-10 flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Item 1 */}
            <div className="relative group">
              <span className="text-7xl md:text-8xl font-serif text-white/5 absolute -top-2 -left-2 select-none group-hover:text-[#00BFFF]/10 transition-colors duration-500">
                01
              </span>
              <div className="relative z-10 pt-8 border-t border-white/10 group-hover:border-[#00BFFF]/30 transition-colors duration-500">
                <h3 className="text-xl md:text-2xl font-display text-white mb-4 tracking-wide">
                  Our Heritage
                </h3>
                <p className="text-white/40 text-sm leading-relaxed font-light">
                  Founded on principles of integrity and architectural excellence, TrustOn has been at the forefront of luxury real estate for over a decade.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="relative group">
              <span className="text-7xl md:text-8xl font-serif text-white/5 absolute -top-2 -left-2 select-none group-hover:text-[#00BFFF]/10 transition-colors duration-500">
                02
              </span>
              <div className="relative z-10 pt-8 border-t border-white/10 group-hover:border-[#00BFFF]/30 transition-colors duration-500">
                <h3 className="text-xl md:text-2xl font-display text-white mb-4 tracking-wide">
                  Our Vision
                </h3>
                <p className="text-white/40 text-sm leading-relaxed font-light">
                  We redefine premium living by blending futuristic technology with timeless design, creating spaces that inspire and endure.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="relative group">
              <span className="text-7xl md:text-8xl font-serif text-white/5 absolute -top-2 -left-2 select-none group-hover:text-[#00BFFF]/10 transition-colors duration-500">
                03
              </span>
              <div className="relative z-10 pt-8 border-t border-white/10 group-hover:border-[#00BFFF]/30 transition-colors duration-500">
                <h3 className="text-xl md:text-2xl font-display text-white mb-4 tracking-wide">
                  Our Commitment
                </h3>
                <p className="text-white/40 text-sm leading-relaxed font-light">
                  Every plot we sell is a testament to our commitment to quality, transparency, and long-term investor success.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="mt-8 md:mt-12 flex justify-center gap-12 md:gap-20 pt-8 border-t border-white/5">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-serif text-[#00BFFF]">10+</p>
              <p className="text-[10px] uppercase tracking-widest text-white/30 mt-2">Years Legacy</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-serif text-[#00BFFF]">150+</p>
              <p className="text-[10px] uppercase tracking-widest text-white/30 mt-2">Premium Plots</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-serif text-[#00BFFF]">100%</p>
              <p className="text-[10px] uppercase tracking-widest text-white/30 mt-2">Transparency</p>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}
