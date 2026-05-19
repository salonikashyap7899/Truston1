import { useEffect, useRef, useState } from "react";

export type VideoSource = { src: string; type?: string; media?: string };

interface LazyVideoProps {
  sources?: VideoSource[];
  poster: string;
  alt: string;
  className?: string;
  mediaClassName?: string;
  threshold?: number;
}

/**
 * Optimized cinematic background media.
 * - Starts with poster image on both server and client (no hydration mismatch)
 * - After mount, checks device/connection capabilities before loading video
 * - Defers video load until the element is in the viewport
 * - Skips video on Save-Data, reduced-motion, slow connections, or no sources
 * - Falls back gracefully to poster on error
 */
export function LazyVideo({
  sources = [],
  poster,
  alt,
  className = "",
  mediaClassName = "",
  threshold = 0.15,
}: LazyVideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [allowVideo, setAllowVideo] = useState(false); // MUST start false — matches SSR
  const [shouldLoad, setShouldLoad] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  // Step 1: after mount, decide if this device/connection supports video.
  // Runs only on the client, so there is no SSR/hydration mismatch.
  useEffect(() => {
    if (sources.length === 0) return;
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    if (nav.connection?.saveData) return;
    if (nav.connection?.effectiveType && ["slow-2g", "2g"].includes(nav.connection.effectiveType))
      return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    setAllowVideo(true);
  }, [sources.length]);

  // Step 2: once video is allowed, watch for intersection to actually load it
  useEffect(() => {
    if (!allowVideo) return;
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShouldLoad(true);
            obs.disconnect();
          }
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [allowVideo, threshold]);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      {/* Poster always present — server render, LCP, and video fallback */}
      <img
        src={poster}
        alt={alt}
        loading="eager"
        decoding="async"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          videoReady ? "opacity-0" : "opacity-100"
        } ${mediaClassName}`}
      />
      {allowVideo && shouldLoad && !videoFailed && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoFailed(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoReady ? "opacity-100" : "opacity-0"
          } ${mediaClassName}`}
        >
          {sources.map((s, i) => (
            <source key={i} src={s.src} type={s.type} media={s.media} />
          ))}
        </video>
      )}
    </div>
  );
}
