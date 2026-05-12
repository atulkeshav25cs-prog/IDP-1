/* ============================================
   useMagnetic — Magnetic cursor attraction hook
   Creates premium interactive feel on hover
   Elements gently pull toward the cursor
   ============================================ */

"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

interface UseMagneticOptions {
  /** Attraction strength — 0.2 = subtle, 0.5 = strong (default: 0.3) */
  strength?: number;
  /** Return-to-center duration in seconds (default: 0.6) */
  returnDuration?: number;
  /** Easing for return animation (default: "elastic.out(1, 0.4)") */
  returnEase?: string;
}

export function useMagnetic<T extends HTMLElement = HTMLDivElement>(
  options: UseMagneticOptions = {}
) {
  const ref = useRef<T>(null);
  const { strength = 0.3, returnDuration = 0.6, returnEase = "elastic.out(1, 0.4)" } = options;

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(el, {
        x: deltaX,
        y: deltaY,
        duration: 0.4,
        ease: "power2.out",
      });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    gsap.to(el, {
      x: 0,
      y: 0,
      duration: returnDuration,
      ease: returnEase,
    });
  }, [returnDuration, returnEase]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = handleMouseMove as EventListener;
    const onLeave = handleMouseLeave as EventListener;

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return ref;
}
