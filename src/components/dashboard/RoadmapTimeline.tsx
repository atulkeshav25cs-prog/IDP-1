/* ============================================
   RoadmapTimeline — Animated career roadmap
   Phase 5: Vertical timeline with phase cards,
   animated connecting line, and status icons
   ============================================ */

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { RoadmapStep } from "@/lib/dashboard-data";

interface RoadmapTimelineProps {
  steps: RoadmapStep[];
  delay?: number;
}

const STATUS_CONFIG = {
  complete: { color: "#10b981", icon: "✓", bg: "#10b98118" },
  current: { color: "#7c5cfc", icon: "→", bg: "#7c5cfc18" },
  upcoming: { color: "var(--text-muted)", icon: "○", bg: "rgba(255,255,255,0.04)" },
};

export default function RoadmapTimeline({
  steps,
  delay = 0,
}: RoadmapTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      /* Animate connecting line */
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0, transformOrigin: "top center" },
          { scaleY: 1, duration: 1.2, delay, ease: "power3.out" }
        );
      }

      /* Stagger step cards */
      const cards = container.querySelectorAll("[data-roadmap-step]");
      gsap.fromTo(
        cards,
        { opacity: 0, x: -25 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.12,
          delay: delay + 0.3,
          ease: "power3.out",
        }
      );
    }, container);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={containerRef} className="relative pl-8">
      {/* Connecting line */}
      <div
        ref={lineRef}
        className="absolute left-[11px] top-2 bottom-2 w-[2px]"
        style={{ background: "rgba(255,255,255,0.06)" }}
      />

      <div className="space-y-6">
        {steps.map((step) => {
          const config = STATUS_CONFIG[step.status];
          return (
            <div
              key={step.id}
              data-roadmap-step
              className="relative"
              style={{ opacity: 0 }}
            >
              {/* Status dot */}
              <div
                className="absolute -left-8 top-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  background: config.bg,
                  border: `2px solid ${config.color}`,
                  color: config.color,
                  boxShadow:
                    step.status === "current"
                      ? `0 0 12px ${config.color}40`
                      : "none",
                }}
              >
                {config.icon}
              </div>

              {/* Card */}
              <div
                className="dash-card"
                style={{
                  borderColor:
                    step.status === "current"
                      ? "rgba(124,92,252,0.2)"
                      : undefined,
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{
                      background: config.bg,
                      color: config.color,
                      border: `1px solid ${config.color}30`,
                    }}
                  >
                    {step.phase}
                  </span>
                  <span
                    className="text-xs font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {step.duration}
                  </span>
                </div>

                <h4
                  className="text-sm font-bold mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {step.title}
                </h4>

                <ul className="space-y-1">
                  {step.tasks.map((task, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <span
                        className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: config.color }}
                      />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
