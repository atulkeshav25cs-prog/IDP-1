/* ============================================
   SectionWrapper — Reusable section container
   Handles viewport-triggered fade-in animations
   ============================================ */

"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { ReactNode } from "react";

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
  stagger?: boolean;
}

export default function SectionWrapper({
  id,
  children,
  className = "",
  stagger = false,
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      className={`section-padding ${className}`}
      variants={stagger ? staggerContainer : fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <div className="section-container">{children}</div>
    </motion.section>
  );
}
