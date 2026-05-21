# Truston1

Premium Real Estate Platform with Advanced 3D Animations & Luxury Effects

## 🌟 Premium Features

### 3D Animations & Visual Effects
- **AdvancedLuxury3D** - Interactive 3D scenes with metallic materials, particle systems, and advanced lighting
- **InteractiveFlipCard** - 3D flip cards with mouse-tracking parallax effects
- **ScrollTriggers** - Scroll-based morphing text and parallax depth animations
- **Advanced Scroll Animations** - Floating, rotating, scaling effects tied to scroll position

### Premium UI Components
- **PremiumAnimations** - Glass morphism cards, gradient text, glitch effects, typewriter animations
- **PremiumButtons** - Magnetic buttons, ripple effects, neon glow, expandable buttons, split text reveals
- **Luxury Glass Cards** - Semi-transparent frosted glass UI with premium shadows

### Global Luxury Styling
- **luxury-premium.css** - Comprehensive luxury CSS utilities with:
  - Glass morphism effects
  - Premium gradients (OKLch color space)
  - Multi-level shadow systems
  - Neon glow effects
  - Premium hover states
  - Smooth animations optimized for 60fps

### Advanced Features
- Cinematic page transitions
- Smooth scroll with Lenis
- Custom cursor effects
- Preloader with animations
- Progressive scroll animations
- Mobile-optimized performance

## 📚 Documentation

For comprehensive guides, see:
- **[PREMIUM_ANIMATIONS_GUIDE.md](PREMIUM_ANIMATIONS_GUIDE.md)** - Component reference and usage
- **[INTEGRATION_EXAMPLES.md](INTEGRATION_EXAMPLES.md)** - Real-world implementation examples
- **[SOBHA_STYLE_IMPLEMENTATION.md](SOBHA_STYLE_IMPLEMENTATION.md)** - Design system

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 📦 Key Files

### Components
- `src/components/AdvancedLuxury3D.tsx` - 3D scenes
- `src/components/InteractiveFlipCard.tsx` - 3D flip cards
- `src/components/PremiumAnimations.tsx` - Animation utilities
- `src/components/PremiumButtons.tsx` - Enhanced buttons
- `src/components/ScrollTriggers.tsx` - Scroll animations

### Styles
- `src/styles/luxury-premium.css` - Global luxury CSS (9.7KB)
- `src/styles/sobha-animations.css` - Brand animations
- `src/styles/styles.css` - Base styles

### Pages
- `src/routes/index.tsx` - Home page
- `src/routes/about-us.tsx` - About page
- `src/routes/services.tsx` - Services page
- `src/routes/contact.tsx` - Contact page

## 🎨 Color System

Using OKLch color space for perceptually uniform colors:
- **Bronze** - Primary (`oklch(0.55 0.15 30)`)
- **Amber** - Accent (`oklch(0.60 0.18 50)`)
- **Gold** - Highlight (`oklch(0.65 0.20 65)`)
- **Sky** - Secondary (`oklch(0.50 0.155 245)`)

## ⚡ Performance

- GPU-accelerated CSS animations
- Optimized 3D rendering (adjustable DPR)
- Mobile-adaptive animations
- Lazy-loading support
- <100KB gzipped additional CSS

## 🔧 Tech Stack

- React 19
- Three.js + React Three Fiber - 3D scenes
- Framer Motion - Advanced animations
- Tailwind CSS - Base styling
- TanStack Router - Routing
- Supabase - Backend

## 🎯 Usage Example

```tsx
import { AdvancedLuxury3D } from '@/components/AdvancedLuxury3D';
import { InteractiveFlipCard } from '@/components/InteractiveFlipCard';
import { NeonGlowButton } from '@/components/PremiumButtons';
import { PremiumGlassCard } from '@/components/PremiumAnimations';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <div className="relative h-screen">
        <AdvancedLuxury3D intensity={0.4} />
        <div className="relative z-10 flex items-center justify-center h-full">
          <PremiumGlassCard className="max-w-2xl">
            <h1 className="text-4xl font-bold text-luxury mb-6">
              Own the Ground
            </h1>
            <p className="text-white/80 mb-8">
              Build your legacy with premium real estate
            </p>
            <NeonGlowButton>Explore Properties</NeonGlowButton>
          </PremiumGlassCard>
        </div>
      </div>
    </div>
  );
}
```

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Chrome Android 90+

## 📱 Mobile Optimization

All components are mobile-responsive with:
- Adaptive animation speeds
- Reduced particle counts
- Optimized blur effects
- Touch-friendly interactions

## 🔐 Security

- Environment variables for sensitive data
- Secure Supabase integration
- CORS configured
- Input validation on forms

## 📞 Support

For detailed implementation guides, see:
1. Start with `INTEGRATION_EXAMPLES.md` for real-world usage
2. Reference `PREMIUM_ANIMATIONS_GUIDE.md` for component docs
3. Check individual component files for TypeScript types

---

Built with ❤️ for TrustOn Real Estate
