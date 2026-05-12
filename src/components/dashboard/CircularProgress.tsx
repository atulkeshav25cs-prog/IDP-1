/* ============================================
   CircularProgress — Animated ring indicator
   Phase 5: SVG-based circular progress with
   GSAP stroke animation and glowing center
   ============================================ */

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface CircularProgressProps {
  percent: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  sublabel?: string;
  delay?: number;
}

export default function CircularProgress({
  percent,
  size = 160,
  strokeWidth = 8,
  color = "#7c5cfc",
  label,
  sublabel,
  delay = 0,
}: CircularProgressProps) {
  const circleRef = useRef<SVGCircleElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference - (percent / 100) * circumference;

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Animate stroke */
      if (circleRef.current) {
        gsap.fromTo(
          circleRef.current,
          { strokeDashoffset: circumference },
          {
            strokeDashoffset: targetOffset,
            duration: 1.8,
            delay,
            ease: "power3.out",
          }
        );
      }

      /* Animate number counter */
      if (numberRef.current) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: percent,
          duration: 1.8,
          delay,
          ease: "power3.out",
          onUpdate: () => {
            if (numberRef.current) {
              numberRef.current.textContent = `${Math.round(obj.val)}%`;
            }
          },
        });
      }

      /* Container fade-in */
      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.6, delay, ease: "power3.out" }
        );
      }
    });

    return () => ctx.revert();
  }, [percent, circumference, targetOffset, delay]);

  return (
    <div
      ref={containerRef}
      className="relative inline-flex flex-col items-center"
      style={{ width: size, opacity: 0 }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        {/* Progress ring */}
        <circle
          ref={circleRef}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          style={{
            filter: `drop-shadow(0 0 6px ${color}60)`,
          }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          ref={numberRef}
          className="text-3xl font-bold tabular-nums"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--text-primary)",
          }}
        >
          0%
        </span>
        {label && (
          <span
            className="text-xs font-medium mt-0.5"
            style={{ color: "var(--text-muted)" }}
          >
            {label}
          </span>
        )}
      </div>

      {sublabel && (
        <span
          className="text-sm font-semibold mt-3"
          style={{ color, fontFamily: "var(--font-display)" }}
        >
          {sublabel}
        </span>
      )}
    </div>
  );
}
