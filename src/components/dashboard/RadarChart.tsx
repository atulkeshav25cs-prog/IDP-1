/* ============================================
   RadarChart — SVG radar/spider chart
   Phase 5: Animated polygon reveal with axis
   labels and glowing fill
   ============================================ */

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { RadarAxis } from "@/lib/dashboard-data";

interface RadarChartProps {
  axes: RadarAxis[];
  size?: number;
  color?: string;
  delay?: number;
}

export default function RadarChart({
  axes,
  size = 280,
  color = "#7c5cfc",
  delay = 0,
}: RadarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const polygonRef = useRef<SVGPolygonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const center = size / 2;
  const maxRadius = size / 2 - 40;
  const rings = [0.25, 0.5, 0.75, 1];

  /* Calculate polygon points from data */
  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / axes.length - Math.PI / 2;
    const r = (value / 100) * maxRadius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const dataPoints = axes.map((axis, i) => getPoint(i, axis.value));
  const polygonPoints = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  /* Zero-state points for animation start */
  const zeroPoints = axes
    .map((_, i) => {
      const p = getPoint(i, 0);
      return `${p.x},${p.y}`;
    })
    .join(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Animate polygon from center outward */
      if (polygonRef.current) {
        gsap.fromTo(
          polygonRef.current,
          { attr: { points: zeroPoints }, opacity: 0 },
          {
            attr: { points: polygonPoints },
            opacity: 1,
            duration: 1.5,
            delay,
            ease: "power3.out",
          }
        );
      }

      /* Fade in container */
      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, delay, ease: "power2.out" }
        );
      }

      /* Stagger axis labels */
      if (svgRef.current) {
        const labels = svgRef.current.querySelectorAll("[data-radar-label]");
        gsap.fromTo(
          labels,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.4,
            stagger: 0.08,
            delay: delay + 0.3,
            ease: "power2.out",
          }
        );
      }
    });

    return () => ctx.revert();
  }, [polygonPoints, zeroPoints, delay]);

  return (
    <div ref={containerRef} className="relative" style={{ opacity: 0 }}>
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="mx-auto"
      >
        {/* Grid rings */}
        {rings.map((ring) => (
          <polygon
            key={ring}
            points={axes
              .map((_, i) => {
                const p = getPoint(i, ring * 100);
                return `${p.x},${p.y}`;
              })
              .join(" ")}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {axes.map((_, i) => {
          const p = getPoint(i, 100);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={p.x}
              y2={p.y}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
            />
          );
        })}

        {/* Data polygon */}
        <polygon
          ref={polygonRef}
          points={zeroPoints}
          fill={`${color}18`}
          stroke={color}
          strokeWidth="2"
          strokeLinejoin="round"
          style={{ filter: `drop-shadow(0 0 8px ${color}40)` }}
          opacity="0"
        />

        {/* Data points */}
        {dataPoints.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="4"
            fill={color}
            stroke="var(--bg-primary)"
            strokeWidth="2"
            style={{ filter: `drop-shadow(0 0 4px ${color}60)` }}
          />
        ))}

        {/* Axis labels */}
        {axes.map((axis, i) => {
          const labelPoint = getPoint(i, 120);
          return (
            <text
              key={i}
              data-radar-label
              x={labelPoint.x}
              y={labelPoint.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="var(--text-secondary)"
              fontSize="11"
              fontWeight="500"
              fontFamily="var(--font-body)"
              opacity="0"
            >
              {axis.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
