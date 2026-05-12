/* ============================================
   SmoothScrollProvider — Lenis + GSAP integration
   Provides cinematic smooth scrolling globally
   ============================================ */

"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    /* Initialize Lenis with cinematic settings */
    const lenis = new Lenis({
      duration: 1.2,           // Smooth interpolation duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Cinematic ease-out
      touchMultiplier: 2,      // Mobile touch sensitivity
      infinite: false,
    });

    lenisRef.current = lenis;

    /* Sync Lenis with GSAP ScrollTrigger */
    lenis.on("scroll", ScrollTrigger.update);

    /* Use GSAP ticker for RAF loop — better performance than manual rAF */
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000); // GSAP ticker uses seconds, Lenis uses ms
    };
    gsap.ticker.add(tickerCallback);

    /* Disable Lenis internal RAF since we use GSAP ticker */
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
