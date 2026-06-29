import { useEffect, useState } from "react";

let cachedResult: boolean | null = null;

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    if (cachedResult !== null) return cachedResult;
    return window.innerWidth < 768 || "ontouchstart" in window || navigator.maxTouchPoints > 0;
  });

  useEffect(() => {
    const check = () => {
      const val = window.innerWidth < 768 || "ontouchstart" in window || navigator.maxTouchPoints > 0;
      cachedResult = val;
      setIsMobile(val);
    };
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}
