/* ============================================
   Assessment Layout — /assess
   Phase 4: SEO metadata for assessment page
   ============================================ */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Assessment — Carevo",
  description:
    "Take our AI-powered career assessment to discover career paths uniquely aligned with your personality, interests, and goals.",
};

export default function AssessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
