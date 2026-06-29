import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { LuxeNav } from "@/components/LuxeNav";
import { SobhaStyleNav } from "@/components/SobhaStyleNav";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { IntroScreen } from "@/components/IntroScreen";
import { CursorGlow } from "@/components/CursorGlow";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { ConsultationModal } from "@/components/ConsultationModal";
import Lenis from "lenis";
import { useEffect } from "react";

import appCss from "../styles.css?url";
import sobhaAnimationsCss from "../styles/sobha-animations.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TrustOn — Premium Real Estate & Luxury Living" },
      {
        name: "description",
        content: "Prime Estate by TrustOn — Jila Panchayat approved luxury township in Lucknow.",
      },
      { name: "author", content: "TrustOn Developers" },
      { property: "og:title", content: "TrustOn — Own the Ground. Build the Legacy." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "stylesheet", href: sobhaAnimationsCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap",
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

// Single persistent Lenis instance shared across all pages
let globalLenis: Lenis | null = null;

function useLenis(isAdmin: boolean) {
  useEffect(() => {
    if (isAdmin) {
      // Clean up if navigating to admin
      if (globalLenis) { globalLenis.destroy(); globalLenis = null; }
      return;
    }

    if (!globalLenis) {
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      globalLenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        lerp: 0.08,
        wheelMultiplier: 1.0,
        touchMultiplier: isTouch ? 1.2 : 1.5,
        infinite: false,
      });

      let rafId: number;
      function raf(time: number) {
        globalLenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      // Store cleanup ref on lenis instance for teardown
      (globalLenis as unknown as { _rafId: number })._rafId = rafId;
    }

    return () => {
      // Don't destroy on unmount — keep alive across navigation
    };
  }, [isAdmin]);
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  useLenis(isAdmin);

  // Scroll to top on every page navigation — smooth via Lenis
  useEffect(() => {
    if (isAdmin) return;
    if (globalLenis) {
      globalLenis.scrollTo(0, { immediate: false, duration: 0.6 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, isAdmin]);

  if (isAdmin) {
    return (
      <QueryClientProvider client={queryClient}>
        <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
        <Outlet />
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ScrollProgressBar />
      <CursorGlow />
      <IntroScreen />
      <SobhaStyleNav />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <SiteFooter />
      <WhatsAppButton />
      <ConsultationModal />
    </QueryClientProvider>
  );
}
