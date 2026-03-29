import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

export function useScroll(onProgress: (progress: number) => void): void {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    const getTotalHeight = () =>
      Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);

    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      const progress = scroll / getTotalHeight();
      onProgress(Math.max(0, Math.min(1, progress)));
    });

    onProgress(window.scrollY / getTotalHeight());

    function raf(time: number): void {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafRef.current);
      lenis.destroy();
    };
  }, [onProgress]);
}
