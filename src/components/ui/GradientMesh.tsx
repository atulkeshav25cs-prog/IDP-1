/* ============================================
   GradientMesh — Animated gradient mesh background
   Phase 3: Cinematic ambient light show
   Multiple overlapping radial gradients that
   shift position and opacity over time
   ============================================ */

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function GradientMesh() {
  const meshRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = meshRef.current;
    if (!container) return;

    const blobs = container.querySelectorAll<HTMLElement>("[data-mesh-blob]");

    const ctx = gsap.context(() => {
      blobs.forEach((blob, i) => {
        /* Each blob drifts in a unique organic path */
        const xRange = 40 + i * 15;
        const yRange = 30 + i * 10;
        const duration = 15 + i * 5;
        const delay = i * 2;

        /* Organic drift */
        gsap.to(blob, {
          x: `+=${xRange}`,
          y: `-=${yRange}`,
          duration: duration / 2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay,
        });

        /* Scale breathing */
        gsap.to(blob, {
          scale: 1 + (i % 2 === 0 ? 0.15 : -0.1),
          duration: duration / 3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: delay + 1,
        });

        /* Opacity pulse */
        gsap.to(blob, {
          opacity: parseFloat(blob.dataset.maxOpacity || "0.5"),
          duration: duration / 4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: delay + 2,
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={meshRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Primary — Large purple aurora */}
      <div
        data-mesh-blob
        data-max-opacity="0.18"
        className="absolute"
        style={{
          width: "800px",
          height: "800px",
          top: "-20%",
          left: "20%",
          background:
            "radial-gradient(circle, rgba(124, 92, 252, 0.12) 0%, rgba(124, 92, 252, 0.04) 40%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.1,
          willChange: "transform, opacity",
        }}
      />

      {/* Secondary — Cyan nebula */}
      <div
        data-mesh-blob
        data-max-opacity="0.14"
        className="absolute"
        style={{
          width: "600px",
          height: "600px",
          top: "10%",
          right: "-5%",
          background:
            "radial-gradient(circle, rgba(92, 225, 230, 0.1) 0%, rgba(92, 225, 230, 0.03) 40%, transparent 70%)",
          filter: "blur(70px)",
          opacity: 0.08,
          willChange: "transform, opacity",
        }}
      />

      {/* Tertiary — Pink warmth */}
      <div
        data-mesh-blob
        data-max-opacity="0.1"
        className="absolute"
        style={{
          width: "500px",
          height: "500px",
          bottom: "0%",
          left: "40%",
          background:
            "radial-gradient(circle, rgba(255, 107, 157, 0.08) 0%, rgba(255, 107, 157, 0.02) 40%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.05,
          willChange: "transform, opacity",
        }}
      />

      {/* Quaternary — Subtle white highlight */}
      <div
        data-mesh-blob
        data-max-opacity="0.06"
        className="absolute"
        style={{
          width: "400px",
          height: "400px",
          top: "30%",
          left: "5%",
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 60%)",
          filter: "blur(60px)",
          opacity: 0.03,
          willChange: "transform, opacity",
        }}
      />
    </div>
  );
}
