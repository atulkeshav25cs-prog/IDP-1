/* ============================================
   useGsapReveal — Reusable GSAP scroll reveal hook
   Cinematic viewport-triggered animations
   Supports: fade-up, blur, scale, stagger
   ============================================ */

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ---------- Cinematic Easing Presets ---------- */
export const CINEMATIC_EASE = {
  smooth: "power2.out",
  luxurious: "power3.out",
  dramatic: "power4.out",
  silky: "expo.out",
  gentle: "sine.out",
} as const;

/* ---------- Animation Types ---------- */
export type RevealType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "blur-up"
  | "scale-up"
  | "scale-fade"
  | "blur-scale";

interface UseGsapRevealOptions {
  /** Animation type preset */
  type?: RevealType;
  /** Duration in seconds (default: 1) */
  duration?: number;
  /** Delay in seconds (default: 0) */
  delay?: number;
  /** GSAP easing (default: luxurious) */
  ease?: string;
  /** Y translate distance (default: 60) */
  distance?: number;
  /** Start trigger position (default: "top 88%") */
  start?: string;
  /** Toggle actions (default: "play none none none") */
  toggleActions?: string;
  /** Whether animation fires once (default: true) */
  once?: boolean;
}

/**
 * Single-element GSAP scroll reveal with cinematic easing.
 * Returns a ref to attach to the target element.
 */
export function useGsapReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseGsapRevealOptions = {}
) {
  const ref = useRef<T>(null);

  const {
    type = "fade-up",
    duration = 1,
    delay = 0,
    ease = CINEMATIC_EASE.luxurious,
    distance = 60,
    start = "top 88%",
    toggleActions = "play none none none",
    once = true,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Build 'from' state based on animation type */
    const fromState = getFromState(type, distance);

    const ctx = gsap.context(() => {
      gsap.fromTo(el, fromState, {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        filter: "blur(0px)",
        duration,
        delay,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions,
          once,
        },
      });
    });

    return () => ctx.revert();
  }, [type, duration, delay, ease, distance, start, toggleActions, once]);

  return ref;
}

/* ---------- Staggered Children Reveal ---------- */
interface UseGsapStaggerOptions extends UseGsapRevealOptions {
  /** CSS selector for children to stagger */
  childSelector?: string;
  /** Stagger delay between children (default: 0.1) */
  stagger?: number;
}

/**
 * Staggered GSAP reveal for container children.
 * Animates matched children sequentially on scroll.
 */
export function useGsapStagger<T extends HTMLElement = HTMLDivElement>(
  options: UseGsapStaggerOptions = {}
) {
  const ref = useRef<T>(null);

  const {
    type = "fade-up",
    duration = 0.9,
    delay = 0,
    ease = CINEMATIC_EASE.luxurious,
    distance = 50,
    start = "top 85%",
    childSelector = ":scope > *",
    stagger = 0.1,
    once = true,
  } = options;

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const children = container.querySelectorAll(childSelector);
    if (!children.length) return;

    const fromState = getFromState(type, distance);

    const ctx = gsap.context(() => {
      gsap.fromTo(children, fromState, {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        filter: "blur(0px)",
        duration,
        delay,
        ease,
        stagger,
        scrollTrigger: {
          trigger: container,
          start,
          once,
        },
      });
    });

    return () => ctx.revert();
  }, [type, duration, delay, ease, distance, start, childSelector, stagger, once]);

  return ref;
}

/* ---------- Parallax Scroll Effect ---------- */
interface UseGsapParallaxOptions {
  /** Parallax speed multiplier (default: 0.3) — lower = subtler */
  speed?: number;
  /** Direction of parallax movement */
  direction?: "vertical" | "horizontal";
}

/**
 * Lightweight parallax scroll effect using GSAP.
 */
export function useGsapParallax<T extends HTMLElement = HTMLDivElement>(
  options: UseGsapParallaxOptions = {}
) {
  const ref = useRef<T>(null);
  const { speed = 0.3, direction = "vertical" } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const property = direction === "vertical" ? "yPercent" : "xPercent";

    const ctx = gsap.context(() => {
      gsap.to(el, {
        [property]: speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [speed, direction]);

  return ref;
}

/* ---------- Floating Depth Motion ---------- */
interface UseFloatingOptions {
  /** Y-axis float range in px (default: 12) */
  amplitude?: number;
  /** Duration of one full cycle in seconds (default: 6) */
  cycleDuration?: number;
  /** Slight rotation amount in degrees (default: 0) */
  rotation?: number;
}

/**
 * Continuous floating animation — ambient depth motion.
 */
export function useFloating<T extends HTMLElement = HTMLDivElement>(
  options: UseFloatingOptions = {}
) {
  const ref = useRef<T>(null);
  const { amplitude = 12, cycleDuration = 6, rotation = 0 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: -amplitude,
        rotation,
        duration: cycleDuration / 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, [amplitude, cycleDuration, rotation]);

  return ref;
}

/* ---------- Helper: Build 'from' state ---------- */
function getFromState(type: RevealType, distance: number) {
  const base = { opacity: 0 };

  switch (type) {
    case "fade-up":
      return { ...base, y: distance };
    case "fade-down":
      return { ...base, y: -distance };
    case "fade-left":
      return { ...base, x: -distance };
    case "fade-right":
      return { ...base, x: distance };
    case "blur-up":
      return { ...base, y: distance * 0.6, filter: "blur(12px)" };
    case "scale-up":
      return { ...base, scale: 0.92 };
    case "scale-fade":
      return { ...base, scale: 0.88, y: distance * 0.4 };
    case "blur-scale":
      return { ...base, scale: 0.94, filter: "blur(10px)" };
    default:
      return { ...base, y: distance };
  }
}
