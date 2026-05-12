/* ============================================
   FloatingParticles — Canvas-based particle system
   Lightweight ambient particles with gentle drift
   Phase 3: Adds atmospheric depth to the hero
   ============================================ */

"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  opacityDirection: number;
  hue: number;
}

interface FloatingParticlesProps {
  /** Number of particles (default: 40) */
  count?: number;
  /** Base color hue — 252 = purple, 180 = cyan (default: 252) */
  baseHue?: number;
  /** Maximum particle size in px (default: 2.5) */
  maxSize?: number;
  /** Container className */
  className?: string;
}

export default function FloatingParticles({
  count = 40,
  baseHue = 252,
  maxSize = 2.5,
  className = "",
}: FloatingParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  const initParticles = useCallback(
    (width: number, height: number) => {
      const particles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.2 - 0.1, // slight upward bias
          radius: Math.random() * maxSize + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          opacityDirection: Math.random() > 0.5 ? 1 : -1,
          hue: baseHue + (Math.random() - 0.5) * 40,
        });
      }
      particlesRef.current = particles;
    },
    [count, baseHue, maxSize]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = rect?.width || window.innerWidth;
      height = rect?.height || window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      initParticles(width, height);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach((p) => {
        /* Move */
        p.x += p.vx;
        p.y += p.vy;

        /* Pulse opacity */
        p.opacity += p.opacityDirection * 0.003;
        if (p.opacity >= 0.6) p.opacityDirection = -1;
        if (p.opacity <= 0.08) p.opacityDirection = 1;

        /* Wrap around edges */
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        /* Draw */
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 70%, ${p.opacity})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
}
