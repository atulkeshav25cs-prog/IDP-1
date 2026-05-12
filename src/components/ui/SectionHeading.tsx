/* ============================================
   SectionHeading — Consistent section titles
   Gradient text with subtitle support
   ============================================ */

"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({
  badge,
  title,
  highlight,
  subtitle,
  centered = true,
}: SectionHeadingProps) {
  return (
    <motion.div
      className={`mb-16 ${centered ? "text-center" : ""}`}
      variants={fadeInUp}
    >
      {/* Optional badge */}
      {badge && (
        <span
          className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase rounded-full"
          style={{
            background: "rgba(124, 92, 252, 0.1)",
            border: "1px solid rgba(124, 92, 252, 0.2)",
            color: "var(--accent-primary)",
          }}
        >
          {badge}
        </span>
      )}

      {/* Title with optional gradient highlight */}
      <h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}{" "}
        {highlight && <span className="gradient-text">{highlight}</span>}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p
          className="mt-5 text-base sm:text-lg max-w-2xl leading-relaxed"
          style={{
            color: "var(--text-secondary)",
            margin: centered ? "1.25rem auto 0" : "1.25rem 0 0",
          }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
