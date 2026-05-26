# TrustOn Premium Animations Integration Guide

## Quick Start: Implementing Premium Effects

### 1. Add to Home Page Hero Section

**File**: `src/routes/index.tsx`

```tsx
import { AdvancedLuxury3D } from "@/components/AdvancedLuxury3D";

// In your SobhaStyleHero component, add:
function Index() {
  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      {/* Hero Section with 3D Background */}
      <div className="relative h-screen">
        <AdvancedLuxury3D intensity={0.4} interactive={false} />
        <SobhaStyleHero
          height="full"
          title=""
          poster={heroImg}
          videoSources={[{ src: "/intro-video.mp4", type: "video/mp4" }]}
          alt="Aerial view of Prime Estate"
        />
      </div>
      {/* ... rest of content */}
    </div>
  );
}
```

### 2. Create Premium Property Cards

```tsx
import { InteractiveFlipCard, FlipCardGrid } from "@/components/InteractiveFlipCard";
import { NeonGlowButton } from "@/components/PremiumButtons";

function PropertyShowcase() {
  const properties = [
    {
      front: (
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Premium Villa</h3>
          <p className="text-white/60">Luxury Living Space</p>
        </div>
      ),
      back: (
        <div className="text-center">
          <h4 className="text-xl font-semibold text-bronze mb-2">₹5 Cr</h4>
          <p className="text-white/80">2500 sq ft | 3 BHK</p>
          <NeonGlowButton className="mt-4 w-full">View Details</NeonGlowButton>
        </div>
      ),
    },
    // Add more properties...
  ];

  return <FlipCardGrid cards={properties} />;
}
```

### 3. Enhanced "Who We Are" Section

```tsx
import { PremiumGlassCard, ScrollFloat, StaggerContainer } from "@/components/PremiumAnimations";

function EnhancedWhoWeAre() {
  return (
    <section className="py-20 px-8">
      <ScrollFloat offset={100}>
        <PremiumGlassCard className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-luxury mb-6">Who We Are</h2>
          <p className="text-white/80 leading-relaxed">
            TrustOn is redefining luxury real estate...
          </p>
        </PremiumGlassCard>
      </ScrollFloat>
    </section>
  );
}
```

### 4. Testimonials with Animations

```tsx
import { StaggerContainer, HoverLift } from "@/components/PremiumAnimations";

function TestimonialsSection() {
  const testimonials = [
    { name: "John Doe", text: "Exceptional service..." },
    { name: "Jane Smith", text: "Premium quality..." },
    // Add more...
  ];

  return (
    <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map((testimonial, i) => (
        <HoverLift key={i} className="glass-premium p-8 rounded-2xl">
          <p className="text-white/80 mb-4">{testimonial.text}</p>
          <p className="text-bronze font-semibold">{testimonial.name}</p>
        </HoverLift>
      ))}
    </StaggerContainer>
  );
}
```

### 5. CTA Section with Premium Effects

```tsx
import { NeonGlowButton, RippleButton } from "@/components/PremiumButtons";
import { MorphingBlob } from "@/components/PremiumAnimations";

function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <MorphingBlob className="top-0 left-0" size="w-96 h-96" />
      <MorphingBlob className="bottom-0 right-0" size="w-72 h-72" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Ready to Own Your Ground?</h2>
        <p className="text-white/80 mb-8">Invest in legacy. Build your future.</p>

        <div className="flex gap-4 justify-center">
          <NeonGlowButton>Schedule Tour</NeonGlowButton>
          <RippleButton>Learn More</RippleButton>
        </div>
      </div>
    </section>
  );
}
```

### 6. Gallery with Scroll Effects

```tsx
import { ScrollRotate, ScrollScale } from "@/components/PremiumAnimations";

function EnhancedGallery() {
  const images = [
    "/gallery-1.jpg",
    "/gallery-2.jpg",
    // Add more...
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((img, i) => (
        <ScrollScale key={i} minScale={0.9} maxScale={1.1} className="group">
          <div className="relative rounded-2xl overflow-hidden hover-luxury cursor-pointer">
            <img src={img} alt="Property" className="w-full h-80 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </ScrollScale>
      ))}
    </div>
  );
}
```

### 7. Form Inputs with Premium Styling

```tsx
function ContactForm() {
  return (
    <form className="space-y-6 max-w-xl mx-auto">
      <div>
        <label className="block text-sm font-semibold text-white mb-2">Name</label>
        <input type="text" className="input-luxury w-full" placeholder="Your name" />
      </div>

      <div>
        <label className="block text-sm font-semibold text-white mb-2">Email</label>
        <input type="email" className="input-luxury w-full" placeholder="your@email.com" />
      </div>

      <NeonGlowButton className="w-full">Send Message</NeonGlowButton>
    </form>
  );
}
```

### 8. Statistics Section with Counters

```tsx
import { ScrollCounter } from "@/components/PremiumAnimations";

function StatisticsSection() {
  const stats = [
    { label: "Properties Sold", value: 500 },
    { label: "Happy Clients", value: 1200 },
    { label: "Years Experience", value: 15 },
  ];

  return (
    <div className="grid grid-cols-3 gap-8 py-16">
      {stats.map((stat, i) => (
        <div key={i} className="text-center">
          <h3 className="text-4xl font-bold text-luxury mb-2">{stat.value}+</h3>
          <p className="text-white/60">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
```

## CSS Classes Quick Reference

### Apply Glass Morphism

```jsx
<div className="glass-premium p-8 rounded-3xl">Content</div>
```

### Add Luxury Shadow

```jsx
<div className="shadow-luxury-lg rounded-2xl">Elevated Content</div>
```

### Glowing Effects

```jsx
<div className="glow-neon">Neon Glowing Element</div>
<div className="glow-bronze-bright">Bronze Glow</div>
```

### Text Effects

```jsx
<p className="text-luxury">Luxury gradient text</p>
<p className="text-luxury-shimmer">Shimmer effect text</p>
```

### Hover Effects

```jsx
<div className="hover-luxury">Hover for lift effect</div>
<div className="hover-luxury-lift">More dramatic lift</div>
```

### Floating Animations

```jsx
<div className="float-luxury">Gently floating element</div>
<div className="glimmer">Glimmering effect</div>
```

### Custom Borders

```jsx
<div className="border-luxury p-6 rounded-xl">Gradient border</div>
<div className="border-luxury-glow p-6 rounded-xl">Glowing border</div>
```

### Blur Effects

```jsx
<div className="blur-premium-md">Medium blur</div>
<div className="blur-premium-2xl">Maximum blur</div>
```

## Animation Timeline

All animations are:

- **Performance optimized** with GPU acceleration
- **Accessible** with prefers-reduced-motion support
- **Mobile responsive** with adaptive settings
- **Semantic** using OKLch color space

## Customization

### Override Colors

```css
:root {
  --bronze: oklch(0.55 0.15 30); /* Change primary color */
  --gold: oklch(0.65 0.2 65); /* Change accent */
  --glass-blur: 16px; /* Adjust blur */
}
```

### Adjust Animation Speed

Add to your component:

```tsx
const variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8 }, // Customize here
  },
};
```

## Best Practices

1. **Don't Overuse**: Apply effects strategically for maximum impact
2. **Performance**: Test on lower-end devices
3. **Accessibility**: Always include text alternatives
4. **Mobile**: Simplify effects on small screens
5. **Contrast**: Maintain readability with effects
6. **Loading**: Lazy-load 3D components when possible

## Troubleshooting

### 3D Not Rendering?

- Check WebGL support in browser
- Verify Three.js is installed
- Check canvas container has dimensions

### Effects Not Animating?

- Verify Framer Motion import
- Check prefers-reduced-motion setting
- Ensure elements are in viewport

### Performance Issues?

- Reduce particle count in 3D scenes
- Simplify animations on mobile
- Use will-change CSS property sparingly

## Support

For more examples, check:

- `PREMIUM_ANIMATIONS_GUIDE.md`
- Individual component files in `src/components/`
- CSS definitions in `src/styles/luxury-premium.css`
