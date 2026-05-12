/* ============================================
   CompletionScreen — Assessment results
   Phase 4: Cinematic completion with animated
   trait summary and personality breakdown
   ============================================ */

"use client";

import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import {
  ASSESSMENT_QUESTIONS,
  CATEGORY_META,
  type AssessmentAnswer,
  type QuestionCategory,
} from "@/lib/assessment-questions";
import { CINEMATIC_EASE } from "@/hooks/useGsapReveal";

interface CompletionScreenProps {
  answers: AssessmentAnswer[];
  onReset: () => void;
}

export default function CompletionScreen({
  answers,
  onReset,
}: CompletionScreenProps) {
  const screenRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  /* ---- Compute trait summary ---- */
  const traitSummary = useMemo(() => {
    const traits: Record<string, number> = {};

    answers.forEach((answer) => {
      const question = ASSESSMENT_QUESTIONS.find(
        (q) => q.id === answer.questionId
      );
      if (!question) return;

      answer.selectedIds.forEach((selectedId) => {
        const option = question.options.find((o) => o.id === selectedId);
        if (option?.trait) {
          traits[option.trait] = (traits[option.trait] || 0) + 1;
        }
      });
    });

    return Object.entries(traits)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([trait, count]) => ({
        trait: trait.replace(/-/g, " "),
        strength: Math.min(100, count * 25 + 50),
      }));
  }, [answers]);

  /* ---- Category completion stats ---- */
  const categoryStats = useMemo(() => {
    const categories = Object.keys(CATEGORY_META) as QuestionCategory[];
    return categories
      .map((cat) => {
        const catQuestions = ASSESSMENT_QUESTIONS.filter(
          (q) => q.category === cat
        );
        const answered = catQuestions.filter((q) =>
          answers.some((a) => a.questionId === q.id)
        ).length;
        return {
          category: cat,
          meta: CATEGORY_META[cat],
          answered,
          total: catQuestions.length,
          percent:
            catQuestions.length > 0
              ? Math.round((answered / catQuestions.length) * 100)
              : 0,
        };
      })
      .filter((s) => s.total > 0);
  }, [answers]);

  /* ---- Entrance animation ---- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: CINEMATIC_EASE.luxurious },
      });

      /* Header celebration reveal */
      if (headerRef.current) {
        const children = headerRef.current.children;
        tl.fromTo(
          children,
          { opacity: 0, y: 40, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.12,
          },
          0.2
        );
      }

      /* Category cards stagger */
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll("[data-stat-card]");
        tl.fromTo(
          cards,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.06,
          },
          0.6
        );

        /* Animate progress bars inside cards */
        const bars = cardsRef.current.querySelectorAll("[data-trait-bar]");
        tl.fromTo(
          bars,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: CINEMATIC_EASE.silky,
          },
          0.9
        );
      }

      /* CTA */
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          1.3
        );
      }
    }, screenRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={screenRef} className="assess-completion">
      {/* Header */}
      <div ref={headerRef} className="text-center mb-12">
        <div
          className="text-6xl mb-6"
          style={{ opacity: 0 }}
        >
          🎉
        </div>
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          style={{ fontFamily: "var(--font-display)", opacity: 0 }}
        >
          Assessment{" "}
          <span className="gradient-text">Complete!</span>
        </h1>
        <p
          className="text-base sm:text-lg max-w-lg mx-auto leading-relaxed"
          style={{ color: "var(--text-secondary)", opacity: 0 }}
        >
          We&apos;ve analyzed your responses across {categoryStats.length}{" "}
          dimensions. Here&apos;s a glimpse of your profile.
        </p>
      </div>

      <div ref={cardsRef} className="space-y-8 max-w-2xl mx-auto">
        {/* Trait strengths */}
        <div>
          <h3
            className="text-sm font-semibold uppercase tracking-wider mb-4"
            style={{
              color: "var(--accent-primary)",
              fontFamily: "var(--font-display)",
            }}
          >
            Your Top Traits
          </h3>
          <div className="space-y-3">
            {traitSummary.map((item) => (
              <div key={item.trait} data-stat-card style={{ opacity: 0 }}>
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className="text-sm font-medium capitalize"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.trait}
                  </span>
                  <span
                    className="text-xs font-semibold tabular-nums"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {item.strength}%
                  </span>
                </div>
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <div
                    data-trait-bar
                    className="h-full rounded-full"
                    style={{
                      width: `${item.strength}%`,
                      background: "var(--gradient-primary)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category breakdown */}
        <div>
          <h3
            className="text-sm font-semibold uppercase tracking-wider mb-4"
            style={{
              color: "var(--accent-secondary)",
              fontFamily: "var(--font-display)",
            }}
          >
            Category Breakdown
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {categoryStats.map((stat) => (
              <div
                key={stat.category}
                data-stat-card
                className="glass-card p-4 text-center"
                style={{ opacity: 0 }}
              >
                <span className="text-2xl block mb-2">
                  {stat.meta.icon}
                </span>
                <span
                  className="text-xs font-semibold block mb-1"
                  style={{ color: stat.meta.color }}
                >
                  {stat.meta.label}
                </span>
                <span
                  className="text-[10px] font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  {stat.answered}/{stat.total} answered
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div
        ref={ctaRef}
        className="text-center mt-12"
        style={{ opacity: 0 }}
      >
        <p
          className="text-sm mb-6"
          style={{ color: "var(--text-secondary)" }}
        >
          Ready to see your personalized career matches?
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/dashboard" className="btn-primary px-8 py-3.5 text-base">
            View Career Matches
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <button
            onClick={onReset}
            className="btn-secondary px-8 py-3.5 text-sm"
          >
            Retake Assessment
          </button>
        </div>
      </div>
    </div>
  );
}
