/* ============================================
   MagneticButton — Interactive CTA with magnetic pull
   Phase 3: Premium button with glow, shimmer,
   and magnetic cursor attraction
   ============================================ */

"use client";

import { useRef, useCallback, useEffect, type ReactNode } from "react";
import { gsap } from "gsap";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
  /** Magnetic strength 0-1 (default: 0.35) */
  strength?: number;
}

export default function MagneticButton({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  strength = 0.35,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = buttonRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(el, {
        x: deltaX,
        y: deltaY,
        duration: 0.35,
        ease: "power2.out",
      });

      /* Move inner glow to follow cursor within button */
      if (glowRef.current) {
        const localX = e.clientX - rect.left;
        const localY = e.clientY - rect.top;
        gsap.to(glowRef.current, {
          left: localX,
          top: localY,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const el = buttonRef.current;
    if (!el) return;

    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 1, duration: 0.3 });
    }
  }, []);

  const handleMouseLeaveGlow = useCallback(() => {
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
    }
  }, []);

  useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;

    const onMove = handleMouseMove as EventListener;
    const onLeave = handleMouseLeave as EventListener;
    const onEnter = handleMouseEnter as EventListener;
    const onLeaveGlow = handleMouseLeaveGlow as EventListener;

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeaveGlow);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeaveGlow);
    };
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter, handleMouseLeaveGlow]);

  const baseClass =
    variant === "primary"
      ? "magnetic-btn-primary"
      : "magnetic-btn-secondary";

  const content = (
    <>
      {/* Cursor-following glow */}
      <div
        ref={glowRef}
        className="magnetic-btn-glow"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={`${baseClass} ${className}`}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      className={`${baseClass} ${className}`}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
