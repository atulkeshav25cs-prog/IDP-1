/* ============================================
   useAssessment — Assessment state management
   Phase 4: Handles question flow, answers,
   auto-save to localStorage, and progress
   ============================================ */

"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import {
  ASSESSMENT_QUESTIONS,
  TOTAL_QUESTIONS,
  type AssessmentAnswer,
} from "@/lib/assessment-questions";

const STORAGE_KEY = "careerai-assessment";

export type AssessmentStatus = "intro" | "in-progress" | "complete";

interface AssessmentState {
  currentIndex: number;
  answers: AssessmentAnswer[];
  status: AssessmentStatus;
  startedAt: number | null;
}

const INITIAL_STATE: AssessmentState = {
  currentIndex: 0,
  answers: [],
  status: "intro",
  startedAt: null,
};

export function useAssessment() {
  const [state, setState] = useState<AssessmentState>(INITIAL_STATE);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  /* ---- Load from localStorage on mount ---- */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as AssessmentState;
        /* Only restore if not completed — allow re-take */
        if (parsed.status !== "complete") {
          setState(parsed);
        }
      }
    } catch {
      /* Silently fail — start fresh */
    }
  }, []);

  /* ---- Auto-save to localStorage on state change ---- */
  useEffect(() => {
    if (state.status === "intro") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* Storage full or unavailable — skip */
    }
  }, [state]);

  /* ---- Derived values ---- */
  const currentQuestion = useMemo(
    () => ASSESSMENT_QUESTIONS[state.currentIndex] || null,
    [state.currentIndex]
  );

  const progress = useMemo(
    () => ({
      current: state.currentIndex + 1,
      total: TOTAL_QUESTIONS,
      percent: Math.round(((state.currentIndex) / TOTAL_QUESTIONS) * 100),
      completedPercent: Math.round(
        (state.answers.length / TOTAL_QUESTIONS) * 100
      ),
    }),
    [state.currentIndex, state.answers.length]
  );

  const currentAnswer = useMemo(
    () =>
      currentQuestion
        ? state.answers.find((a) => a.questionId === currentQuestion.id) || null
        : null,
    [state.answers, currentQuestion]
  );

  const isLastQuestion = state.currentIndex >= TOTAL_QUESTIONS - 1;
  const isFirstQuestion = state.currentIndex === 0;
  const canGoNext = currentAnswer !== null;

  /* ---- Actions ---- */
  const startAssessment = useCallback(() => {
    setState((prev) => ({
      ...prev,
      status: "in-progress",
      startedAt: prev.startedAt || Date.now(),
    }));
    setDirection("forward");
  }, []);

  const selectOption = useCallback(
    (optionId: string) => {
      if (!currentQuestion) return;

      setState((prev) => {
        const existing = prev.answers.find(
          (a) => a.questionId === currentQuestion.id
        );

        if (currentQuestion.type === "multi") {
          /* Toggle selection for multi-select */
          const currentIds = existing?.selectedIds || [];
          const maxSelect = currentQuestion.maxSelect || 3;

          let newIds: string[];
          if (currentIds.includes(optionId)) {
            newIds = currentIds.filter((id) => id !== optionId);
          } else if (currentIds.length < maxSelect) {
            newIds = [...currentIds, optionId];
          } else {
            return prev; /* Max reached */
          }

          const newAnswer: AssessmentAnswer = {
            questionId: currentQuestion.id,
            selectedIds: newIds,
            timestamp: Date.now(),
          };

          return {
            ...prev,
            answers: existing
              ? prev.answers.map((a) =>
                  a.questionId === currentQuestion.id ? newAnswer : a
                )
              : [...prev.answers, newAnswer],
          };
        }

        /* Single select */
        const newAnswer: AssessmentAnswer = {
          questionId: currentQuestion.id,
          selectedIds: [optionId],
          timestamp: Date.now(),
        };

        return {
          ...prev,
          answers: existing
            ? prev.answers.map((a) =>
                a.questionId === currentQuestion.id ? newAnswer : a
              )
            : [...prev.answers, newAnswer],
        };
      });
    },
    [currentQuestion]
  );

  const goNext = useCallback(() => {
    if (!canGoNext) return;
    setDirection("forward");

    if (isLastQuestion) {
      setState((prev) => ({ ...prev, status: "complete" }));
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
      return;
    }

    setState((prev) => ({
      ...prev,
      currentIndex: Math.min(prev.currentIndex + 1, TOTAL_QUESTIONS - 1),
    }));
  }, [canGoNext, isLastQuestion]);

  const goBack = useCallback(() => {
    if (isFirstQuestion) return;
    setDirection("backward");
    setState((prev) => ({
      ...prev,
      currentIndex: Math.max(prev.currentIndex - 1, 0),
    }));
  }, [isFirstQuestion]);

  const resetAssessment = useCallback(() => {
    setState(INITIAL_STATE);
    setDirection("forward");
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  return {
    /* State */
    ...state,
    direction,
    currentQuestion,
    currentAnswer,
    progress,
    isLastQuestion,
    isFirstQuestion,
    canGoNext,

    /* Actions */
    startAssessment,
    selectOption,
    goNext,
    goBack,
    resetAssessment,
  };
}
