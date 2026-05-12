/* ============================================
   CareerMatchCard — Glowing career card
   Phase 5: Glassmorphism card with match ring,
   skill pills, and hover glow interactions
   ============================================ */

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { CareerMatch } from "@/lib/dashboard-data";

interface CareerMatchCardProps {
  career: CareerMatch;
  rank: number;
  delay?: number;
}

export default function CareerMatchCard({
  career,
  rank,
  delay = 0,
}: CareerMatchCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);

  const ringSize = 56;
  const ringStroke = 3;
  const ringRadius = (ringSize - ringStroke) / 2;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset =
    ringCircumference - (career.matchPercent / 100) * ringCircumference;

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Card entrance */
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 30, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay,
            ease: "power3.out",
          }
        );
      }

      /* Ring animation */
      if (ringRef.current) {
        gsap.fromTo(
          ringRef.current,
          { strokeDashoffset: ringCircumference },
          {
            strokeDashoffset: ringOffset,
            duration: 1.2,
            delay: delay + 0.2,
            ease: "power3.out",
          }
        );
      }
    });

    return () => ctx.revert();
  }, [delay, ringCircumference, ringOffset]);

  const demandColors = {
    high: "#10b981",
    medium: "#f59e0b",
    low: "#ef4444",
  };

  return (
    <div
      ref={cardRef}
      className="dash-card dash-card-hover group"
      style={{ opacity: 0 }}
    >
      {/* Glow border on hover */}
      <div
        className="absolute inset-0 rounded-[var(--radius-lg)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${career.color}15, transparent 50%)`,
        }}
      />

      <div className="relative z-10">
        {/* Header: rank + match ring */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{career.icon}</span>
            <div>
              <h3
                className="text-base font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {career.title}
              </h3>
              <span
                className="text-xs font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                #{rank} Match
              </span>
            </div>
          </div>

          {/* Mini match ring */}
          <div className="relative" style={{ width: ringSize, height: ringSize }}>
            <svg
              width={ringSize}
              height={ringSize}
              viewBox={`0 0 ${ringSize} ${ringSize}`}
              className="transform -rotate-90"
            >
              <circle
                cx={ringSize / 2}
                cy={ringSize / 2}
                r={ringRadius}
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth={ringStroke}
              />
              <circle
                ref={ringRef}
                cx={ringSize / 2}
                cy={ringSize / 2}
                r={ringRadius}
                fill="none"
                stroke={career.color}
                strokeWidth={ringStroke}
                strokeLinecap="round"
                strokeDasharray={ringCircumference}
                strokeDashoffset={ringCircumference}
                style={{ filter: `drop-shadow(0 0 4px ${career.color}50)` }}
              />
            </svg>
            <span
              className="absolute inset-0 flex items-center justify-center text-xs font-bold tabular-nums"
              style={{ color: career.color }}
            >
              {career.matchPercent}%
            </span>
          </div>
        </div>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: "var(--text-secondary)" }}
        >
          {career.description}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-4 mb-4 flex-wrap">
          <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
            💰 {career.salary}
          </span>
          <span className="text-xs font-semibold" style={{ color: "#10b981" }}>
            📈 {career.growth} growth
          </span>
          <span
            className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{
              background: `${demandColors[career.demand]}18`,
              color: demandColors[career.demand],
              border: `1px solid ${demandColors[career.demand]}30`,
            }}
          >
            {career.demand} demand
          </span>
        </div>

        {/* Skill pills */}
        <div className="flex flex-wrap gap-1.5">
          {career.skills.map((skill) => (
            <span
              key={skill}
              className="text-[10px] font-medium px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                color: "var(--text-muted)",
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
