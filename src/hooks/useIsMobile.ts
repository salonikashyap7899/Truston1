import { useEffect, useState } from "react";

export function useIsMobile(): boolean {
  // Always start with false — matches SSR output, avoids hydration mismatch.
  // useEffect updates to the real value after hydration (client-only).
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(
        window.innerWidth < 768 ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0
      );
    };
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}
