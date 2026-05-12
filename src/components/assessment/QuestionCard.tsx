/* ============================================
   QuestionCard — Animated question display
   Phase 4: Slide/fade transitions between
   questions with staggered option reveals
   ============================================ */

"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import {
  type AssessmentQuestion,
  type AssessmentAnswer,
  CATEGORY_META,
} from "@/lib/assessment-questions";
import { CINEMATIC_EASE } from "@/hooks/useGsapReveal";

interface QuestionCardProps {
  question: AssessmentQuestion;
  currentAnswer: AssessmentAnswer | null;
  direction: "forward" | "backward";
  onSelect: (optionId: string) => void;
}

export default function QuestionCard({
  question,
  currentAnswer,
  direction,
  onSelect,
}: QuestionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const meta = CATEGORY_META[question.category];

  /* ---- Entrance animation on question change ---- */
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const slideX = direction === "forward" ? 60 : -60;

    const ctx = gsap.context(() => {
      /* Card entrance */
      gsap.fromTo(
        card,
        { opacity: 0, x: slideX, scale: 0.97 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.55,
          ease: CINEMATIC_EASE.luxurious,
        }
      );

      /* Question text */
      if (questionRef.current) {
        gsap.fromTo(
          questionRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.1,
            ease: CINEMATIC_EASE.luxurious,
          }
        );
      }

      /* Staggered options */
      if (optionsRef.current) {
        const options = optionsRef.current.querySelectorAll("[data-option]");
        gsap.fromTo(
          options,
          { opacity: 0, y: 20, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            stagger: 0.06,
            delay: 0.2,
            ease: CINEMATIC_EASE.luxurious,
          }
        );
      }
    }, card);

    return () => ctx.revert();
  }, [question.id, direction]);

  const selectedIds = currentAnswer?.selectedIds || [];

  /* Handle keyboard navigation */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, optionId: string) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect(optionId);
      }
    },
    [onSelect]
  );

  return (
    <div ref={cardRef} className="assess-card" style={{ opacity: 0 }}>
      {/* Question header */}
      <div ref={questionRef} className="assess-card-header">
        <h2 className="assess-question">{question.question}</h2>
        {question.subtitle && (
          <p className="assess-subtitle">{question.subtitle}</p>
        )}
        {question.type === "multi" && (
          <p className="assess-hint">
            Select up to {question.maxSelect || 3} •{" "}
            {selectedIds.length} selected
          </p>
        )}
      </div>

      {/* Options grid */}
      <div
        ref={optionsRef}
        className={`assess-options ${
          question.options.length > 4 ? "assess-options-grid" : ""
        }`}
      >
        {question.options.map((option) => {
          const isSelected = selectedIds.includes(option.id);
          return (
            <button
              key={option.id}
              data-option
              className={`assess-option ${isSelected ? "assess-option-selected" : ""}`}
              style={{
                borderColor: isSelected ? meta.color : undefined,
                background: isSelected
                  ? `${meta.color}12`
                  : undefined,
              }}
              onClick={() => onSelect(option.id)}
              onKeyDown={(e) => handleKeyDown(e, option.id)}
              aria-pressed={isSelected}
              role="option"
            >
              {option.icon && (
                <span className="assess-option-icon">{option.icon}</span>
              )}
              <span className="assess-option-label">{option.label}</span>
              {/* Selection indicator */}
              <div
                className="assess-option-check"
                style={{
                  opacity: isSelected ? 1 : 0,
                  background: meta.color,
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
