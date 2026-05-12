/* ============================================
   SkillBars — Animated horizontal skill bars
   Phase 5: Staggered GSAP reveal with
   category-colored fills and glow
   ============================================ */

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { SkillData } from "@/lib/dashboard-data";

interface SkillBarsProps {
  skills: SkillData[];
  delay?: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  strength: "#10b981",
  growing: "#f59e0b",
  develop: "#ef4444",
};

const CATEGORY_LABELS: Record<string, string> = {
  strength: "Strength",
  growing: "Growing",
  develop: "To Develop",
};

export default function SkillBars({ skills, delay = 0 }: SkillBarsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      /* Stagger rows */
      const rows = container.querySelectorAll("[data-skill-row]");
      gsap.fromTo(
        rows,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.06,
          delay,
          ease: "power3.out",
        }
      );

      /* Animate bar fills */
      const bars = container.querySelectorAll("[data-skill-fill]");
      gsap.fromTo(
        bars,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1,
          stagger: 0.06,
          delay: delay + 0.2,
          ease: "power3.out",
        }
      );
    }, container);

    return () => ctx.revert();
  }, [delay]);

  /* Group by category */
  const grouped = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, SkillData[]>
  );

  return (
    <div ref={containerRef} className="space-y-6">
      {Object.entries(grouped).map(([category, categorySkills]) => (
        <div key={category}>
          {/* Category header */}
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: CATEGORY_COLORS[category] }}
            />
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: CATEGORY_COLORS[category] }}
            >
              {CATEGORY_LABELS[category]}
            </span>
          </div>

          {/* Skill rows */}
          <div className="space-y-2.5">
            {categorySkills.map((skill) => (
              <div key={skill.name} data-skill-row style={{ opacity: 0 }}>
                <div className="flex items-center justify-between mb-1">
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {skill.name}
                  </span>
                  <span
                    className="text-xs font-semibold tabular-nums"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {skill.level}%
                  </span>
                </div>
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <div
                    data-skill-fill
                    className="h-full rounded-full"
                    style={{
                      width: `${skill.level}%`,
                      background: `linear-gradient(90deg, ${CATEGORY_COLORS[category]}, ${CATEGORY_COLORS[category]}88)`,
                      boxShadow: `0 0 8px ${CATEGORY_COLORS[category]}40`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
