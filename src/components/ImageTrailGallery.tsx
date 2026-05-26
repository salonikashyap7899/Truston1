'use client';

import { useRef } from "react";
import { ImageTrail } from "@/components/ui/image-trail";
import { motion } from "framer-motion";
import { Reveal, SectionEyebrow } from "./Reveal";
import { Section3DBackground } from "./Section3DBackground";

const images = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1613977257363-707ba9348227",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
].map(url => `${url}?auto=format&fit=crop&w=300&q=80`);

export function ImageTrailGallery() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden bg-background min-h-[80vh]">
      <Section3DBackground opacity={0.2} />
      
      <div className="mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <Reveal delay={0}>
          <SectionEyebrow>Gallery</SectionEyebrow>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl md:text-7xl text-center text-white mt-8 mb-6 tracking-tight">
            Visual <em className="text-luxe-cyan italic font-serif">Excellence</em>
          </h2>
          <p className="text-center text-white/40 max-w-2xl mx-auto mb-12 font-light text-lg">
            Explore the architectural brilliance and natural beauty of Prime Estate through our
            curated collection of premium imagery. Move your cursor to reveal.
          </p>
        </Reveal>
      </div>

      {/* Image Trail Area */}
      <div 
        className="relative w-full h-[60vh] flex justify-center items-center overflow-hidden cursor-none"
        ref={ref}
      >
        <div className="absolute inset-0 z-0">
          <ImageTrail 
            containerRef={ref}
            rotationRange={20}
            interval={80}
          >
            {images.map((url, index) => (
              <div
                key={index}
                className="flex relative overflow-hidden w-28 h-28 md:w-36 md:h-36 rounded-xl shadow-xl"
              >
                <img
                  src={url}
                  alt={`Gallery image ${index + 1}`}
                  className="object-cover absolute inset-0 w-full h-full"
                  crossOrigin="anonymous"
                />
              </div>
            ))}
          </ImageTrail>
        </div>
        
        {/* Center Text */}
        <motion.h1 
          className="text-6xl md:text-9xl font-display font-bold z-10 select-none pointer-events-none"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-luxe-cyan to-white">
            PRIME
          </span>
        </motion.h1>
      </div>

      {/* View All CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-center mt-16 relative z-10"
      >
        <button className="btn-magnetic btn-luxe px-12">
          View Full Gallery
          <span className="ml-3">→</span>
        </button>
      </motion.div>
    </section>
  );
}
