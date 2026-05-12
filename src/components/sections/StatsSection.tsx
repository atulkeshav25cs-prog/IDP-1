"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "10,000+", label: "Assessments Taken" },
  { value: "150+", label: "Career Paths Mapped" },
  { value: "92%", label: "User Accuracy Rating" },
  { value: "50+", label: "Industry Domains" },
];

export default function StatsSection() {
  return (
    <section className="py-12 border-y border-border bg-card">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-border">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center px-4"
            >
              <h3 className="font-display font-bold text-3xl md:text-4xl text-primary mb-2">
                {stat.value}
              </h3>
              <p className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
