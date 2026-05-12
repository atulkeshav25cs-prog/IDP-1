/* ============================================
   AssessmentProgress — Animated progress bar
   Phase 4: Glass morphism progress with
   category indicator and step counter
   ============================================ */

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  ASSESSMENT_QUESTIONS,
  CATEGORY_META,
  type QuestionCategory,
} from "@/lib/assessment-questions";

interface AssessmentProgressProps {
  currentIndex: number;
  total: number;
  category: QuestionCategory;
}

export default function AssessmentProgress({
  currentIndex,
  total,
  category,
}: AssessmentProgressProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const meta = CATEGORY_META[category];
  const percent = ((currentIndex + 1) / total) * 100;

  /* Animate progress bar width */
  useEffect(() => {
    if (barRef.current) {
      gsap.to(barRef.current, {
        width: `${percent}%`,
        duration: 0.6,
        ease: "power3.out",
      });
    }
  }, [percent]);

  return (
    <div className="assess-progress">
      {/* Category badge + step counter */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-base">{meta.icon}</span>
          <span
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: meta.color }}
          >
            {meta.label}
          </span>
        </div>
        <span
          className="text-xs font-medium tabular-nums"
          style={{ color: "var(--text-muted)" }}
        >
          {currentIndex + 1} / {total}
        </span>
      </div>

      {/* Progress bar track */}
      <div className="assess-progress-track">
        {/* Filled bar */}
        <div
          ref={barRef}
          className="assess-progress-fill"
          style={{
            background: `linear-gradient(90deg, ${meta.color}, var(--accent-secondary))`,
            width: "0%",
          }}
        />

        {/* Step dots */}
        <div className="assess-progress-dots">
          {ASSESSMENT_QUESTIONS.map((_, i) => (
            <div
              key={i}
              className="assess-progress-dot"
              style={{
                left: `${((i + 1) / total) * 100}%`,
                background:
                  i <= currentIndex
                    ? meta.color
                    : "rgba(255,255,255,0.1)",
                transform: i === currentIndex ? "scale(1.5)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
