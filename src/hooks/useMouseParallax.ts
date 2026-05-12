/* ============================================
   useMouseParallax — Interactive mouse parallax
   Creates depth layers that respond to cursor
   movement for an immersive 3D feel
   ============================================ */

"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

interface UseMouseParallaxOptions {
  /** Movement multiplier — higher = more movement (default: 20) */
  intensity?: number;
  /** Animation smoothness in seconds (default: 0.8) */
  smoothness?: number;
  /** Whether to apply on mobile (default: false) */
  enableOnMobile?: boolean;
}

/**
 * Applies parallax to child elements with data-depth attribute.
 * data-depth="1" = subtle, data-depth="3" = dramatic
 */
export function useMouseParallax<T extends HTMLElement = HTMLDivElement>(
  options: UseMouseParallaxOptions = {}
) {
  const ref = useRef<T>(null);
  const { intensity = 20, smoothness = 0.8, enableOnMobile = false } = options;

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const container = ref.current;
      if (!container) return;

      /* Detect mobile — skip if disabled */
      if (!enableOnMobile && window.innerWidth < 768) return;

      const rect = container.getBoundingClientRect();
      /* Normalize cursor position to -0.5 to 0.5 range */
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const layers = container.querySelectorAll<HTMLElement>("[data-depth]");

      layers.forEach((layer) => {
        const depth = parseFloat(layer.dataset.depth || "1");
        const moveX = x * intensity * depth;
        const moveY = y * intensity * depth;

        gsap.to(layer, {
          x: moveX,
          y: moveY,
          duration: smoothness,
          ease: "power2.out",
        });
      });
    },
    [intensity, smoothness, enableOnMobile]
  );

  const handleMouseLeave = useCallback(() => {
    const container = ref.current;
    if (!container) return;

    const layers = container.querySelectorAll<HTMLElement>("[data-depth]");
    layers.forEach((layer) => {
      gsap.to(layer, {
        x: 0,
        y: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
      });
    });
  }, []);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const onMove = handleMouseMove as EventListener;
    const onLeave = handleMouseLeave as EventListener;

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);

    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return ref;
}
