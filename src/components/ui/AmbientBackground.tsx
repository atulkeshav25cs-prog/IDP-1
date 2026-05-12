/* ============================================
   AmbientBackground — Layered parallax depth system
   Phase 2: GSAP-powered parallax orbs + grid overlay
   Creates immersive cinematic atmosphere
   ============================================ */

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AmbientBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const orbs = container.querySelectorAll<HTMLElement>("[data-parallax-speed]");

    const ctx = gsap.context(() => {
      /* Layered parallax: each orb moves at its own depth speed */
      orbs.forEach((orb) => {
        const speed = parseFloat(orb.dataset.parallaxSpeed || "0.1");
        gsap.to(orb, {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      });

      /* Ambient slow drift animations for each orb */
      orbs.forEach((orb, i) => {
        const xRange = 20 + i * 8;
        const yRange = 15 + i * 6;
        const duration = 18 + i * 4;

        gsap.to(orb, {
          x: `+=${xRange}`,
          y: `-=${yRange}`,
          duration: duration / 2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Layer 1 — Deepest: Primary purple orb (slowest parallax) */}
      <div
        data-parallax-speed="-0.08"
        className="absolute rounded-full"
        style={{
          width: "700px",
          height: "700px",
          top: "-12%",
          left: "-12%",
          background:
            "radial-gradient(circle, rgba(124, 92, 252, 0.09) 0%, transparent 70%)",
          filter: "blur(90px)",
          willChange: "transform",
        }}
      />

      {/* Layer 2 — Mid: Cyan orb (medium parallax) */}
      <div
        data-parallax-speed="-0.15"
        className="absolute rounded-full"
        style={{
          width: "550px",
          height: "550px",
          top: "25%",
          right: "-10%",
          background:
            "radial-gradient(circle, rgba(92, 225, 230, 0.07) 0%, transparent 70%)",
          filter: "blur(80px)",
          willChange: "transform",
        }}
      />

      {/* Layer 3 — Mid: Warm pink orb */}
      <div
        data-parallax-speed="-0.2"
        className="absolute rounded-full"
        style={{
          width: "450px",
          height: "450px",
          bottom: "8%",
          left: "12%",
          background:
            "radial-gradient(circle, rgba(255, 107, 157, 0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
          willChange: "transform",
        }}
      />

      {/* Layer 4 — Nearest: Small accent orb (fastest parallax) */}
      <div
        data-parallax-speed="-0.28"
        className="absolute rounded-full"
        style={{
          width: "300px",
          height: "300px",
          top: "55%",
          left: "50%",
          transform: "translateX(-50%)",
          background:
            "radial-gradient(circle, rgba(124, 92, 252, 0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
          willChange: "transform",
        }}
      />

      {/* Layer 5 — Secondary accent glow near bottom */}
      <div
        data-parallax-speed="-0.12"
        className="absolute rounded-full"
        style={{
          width: "500px",
          height: "500px",
          top: "70%",
          right: "20%",
          background:
            "radial-gradient(circle, rgba(92, 225, 230, 0.04) 0%, transparent 70%)",
          filter: "blur(100px)",
          willChange: "transform",
        }}
      />

      {/* Grid overlay for spatial depth */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%)",
        }}
      />

      {/* Noise texture overlay for film grain feel */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}
