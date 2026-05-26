# Sobha Realty-Style Navbar & Scroll Implementation Guide

## Overview

This document outlines the implementation of Sobha Realty-inspired navbar and smooth scroll page behavior for the Truston1 website. The implementation includes enhanced animations, smooth transitions, and sophisticated scroll-triggered effects.

## Components Added

### 1. **SobhaStyleNav.tsx**

Enhanced navbar component with the following features:

- **Centered Logo Layout**: Logo is centered on desktop with optional branding text
- **Centered Navigation**: Navigation links are centered with services dropdown
- **Smooth Scroll Transitions**: Navbar background transitions smoothly from transparent to white
- **Dynamic Height**: Height adjusts from 80px to 68px on scroll
- **Responsive Design**: Mobile hamburger menu with smooth animations
- **Hover Effects**: Smooth underline animations on navigation links
- **Color Transitions**: Text color changes smoothly based on scroll state

**Key Features:**

```typescript
- Fixed positioning at top of page
- Transparent background on hero section
- White background with shadow on scroll
- Smooth 0.5s transitions
- Logo size adjustment on scroll
- Mobile-responsive drawer menu
```

### 2. **SobhaStyleHero.tsx**

Enhanced hero component with sophisticated scroll animations:

- **Parallax Effects**: Background moves at different speed than content
- **Scale Animation**: Background scales up as user scrolls
- **Opacity Transitions**: Content fades out smoothly on scroll
- **Text Animations**: Title and subtitle animate in on page load
- **Scroll Indicator**: Animated scroll hint at bottom right
- **Floating Particles**: Decorative animated particles
- **Corner Accents**: Subtle corner decorations

**Key Features:**

```typescript
- Enhanced parallax: y: ["0%", "40%"], scale: [1, 1.2]
- Smooth opacity transitions
- Text blur and fade effects
- Scroll-triggered animations
- 3D scene integration
- Vignette and gradient overlays
```

### 3. **SmoothScrollReveal.tsx**

Reusable scroll reveal components:

- **SmoothScrollReveal**: Single element reveal with direction options
- **StaggeredContainer**: Multiple elements with staggered animations
- **ParallaxScroll**: Parallax scroll effects for content

**Usage:**

```typescript
<SmoothScrollReveal direction="up" delay={0.1}>
  <h2>Content appears on scroll</h2>
</SmoothScrollReveal>

<StaggeredContainer staggerDelay={0.1}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</StaggeredContainer>
```

### 4. **sobha-animations.css**

Comprehensive CSS animations library with:

- **Scroll Animations**: Fade-in, slide-in from all directions
- **Smooth Transitions**: Color, shadow, blur, and scale transitions
- **Advanced Effects**: Clip-path reveals, circular reveals, morphing shapes
- **Utility Classes**: Ready-to-use animation classes

**Available Classes:**

```css
.fade-in-scroll          /* Fade and slide up on scroll */
.slide-in-left           /* Slide in from left */
.slide-in-right          /* Slide in from right */
.slide-in-top            /* Slide in from top */
.slide-in-bottom         /* Slide in from bottom */
.scale-fade-in           /* Scale and fade in */
.circular-reveal         /* Circular clip-path reveal */
.inset-reveal            /* Inset clip-path reveal */
.polygon-reveal          /* Polygon clip-path reveal */
.hover-scale             /* Scale on hover */
.color-transition        /* Smooth color transition */
.blur-transition         /* Smooth blur transition */
.shadow-transition       /* Smooth shadow transition */
```

## Integration Points

### Root Layout (\_\_root.tsx)

- Imported `SobhaStyleNav` component
- Imported `sobha-animations.css` stylesheet
- Replaced `LuxeNav` with `SobhaStyleNav`

### Home Page (index.tsx)

- Imported `SobhaStyleHero` component
- Replaced `PageHero` with `SobhaStyleHero` for enhanced animations

## Animation Timings

All animations use the custom easing function: `[0.16, 1, 0.3, 1]` (cubic-bezier)

### Standard Durations:

- **Navbar transitions**: 500ms
- **Hero animations**: 800ms - 1300ms
- **Scroll reveals**: 600ms - 800ms
- **Hover effects**: 300ms - 500ms

## Scroll Behavior

### Smooth Scroll

The page uses Lenis for smooth scrolling (already integrated):

```typescript
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});
```

### Scroll-Triggered Animations

Using Framer Motion's `useScroll` and `useInView` hooks:

```typescript
const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
```

## Navbar Behavior

### Desktop View

- Logo centered with branding text
- Navigation links centered
- CTA button on the right
- Services dropdown with smooth transitions

### Mobile View

- Hamburger menu icon (animated)
- Full-screen drawer menu
- Stacked navigation items
- Services submenu with toggle

### Scroll States

**Transparent State (Top of Page):**

- Background: transparent
- Text: white/white-85
- Height: 80px
- Logo: 12px height

**Scrolled State (Below 60px):**

- Background: white with shadow
- Text: gray-700
- Height: 68px
- Logo: 10px height

## Hero Animation Timeline

1. **0-3s**: Intro screen displays
2. **3s**: Navbar slides in from top
3. **3.2s**: Eyebrow text fades in with line
4. **3.3s**: Main title animates in
5. **3.6s**: Subtitle fades in
6. **3.8s**: CTA buttons appear
7. **4.2s**: Scroll indicator animates in

## Performance Considerations

- All animations use GPU-accelerated properties (transform, opacity)
- Framer Motion handles animation optimization
- CSS animations use `will-change` for performance
- Scroll events use passive listeners
- Lazy loading for images and videos

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 13+)
- Mobile browsers: Full support with smooth scroll

## Customization Guide

### Changing Navbar Colors

Edit `SobhaStyleNav.tsx`:

```typescript
// Transparent state text color
isTransparent ? "text-white" : "text-[var(--bronze)]";

// Scrolled state background
scrolled ? "bg-white shadow-lg" : "bg-transparent";
```

### Adjusting Animation Speeds

Edit component transition values:

```typescript
transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
// Change duration from 0.5 to desired value
```

### Modifying Scroll Parallax

Edit `SobhaStyleHero.tsx`:

```typescript
const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
// Change "40%" to adjust parallax intensity
```

### Adding Scroll Reveals to Sections

Use the `SmoothScrollReveal` component:

```typescript
<SmoothScrollReveal direction="up" delay={0.2}>
  <section>Your content here</section>
</SmoothScrollReveal>
```

## Testing Checklist

- [ ] Navbar appears fixed at top
- [ ] Navbar background transitions on scroll
- [ ] Logo size adjusts on scroll
- [ ] Navigation links have hover effects
- [ ] Mobile menu opens/closes smoothly
- [ ] Hero background parallax works
- [ ] Hero content fades on scroll
- [ ] Scroll indicator animates
- [ ] All animations are smooth (60fps)
- [ ] Mobile responsive layout works
- [ ] Touch interactions are smooth
- [ ] Page scrolls smoothly with Lenis

## Deployment Notes

1. Ensure all CSS files are imported in root layout
2. Verify Framer Motion is installed: `npm install framer-motion`
3. Verify Lenis is installed: `npm install lenis`
4. Test on multiple browsers and devices
5. Check performance with DevTools (Lighthouse)
6. Verify smooth scroll works on all pages

## Future Enhancements

- Add scroll-triggered counter animations
- Implement section-based navbar color changes
- Add more parallax effects to sections
- Create reusable scroll reveal library
- Add keyboard navigation for accessibility
- Implement reduced motion preferences

## References

- Sobha Realty website: https://www.sobharealty.com
- Framer Motion docs: https://www.framer.com/motion
- Lenis smooth scroll: https://lenis.studiofreight.com
- CSS animations: https://developer.mozilla.org/en-US/docs/Web/CSS/animation

## Support

For issues or questions about the implementation:

1. Check the component files for inline comments
2. Review the animation CSS file for available classes
3. Test in browser DevTools for animation timing
4. Verify all dependencies are installed
