"use client";

import { motion } from "framer-motion";
import { ClipboardList, BrainCircuit, Map } from "lucide-react";

const STEPS = [
  {
    icon: <ClipboardList className="w-6 h-6 text-primary" />,
    title: "1. Answer Questions",
    description: "Take our engaging, psychologically-backed assessment covering your interests, skills, and work preferences.",
  },
  {
    icon: <BrainCircuit className="w-6 h-6 text-primary" />,
    title: "2. AI Analyzes You",
    description: "Our neural engine maps your unique profile against thousands of successful career trajectories.",
  },
  {
    icon: <Map className="w-6 h-6 text-primary" />,
    title: "3. Get Your Roadmap",
    description: "Receive personalized career matches and step-by-step roadmaps to achieve your goals.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="badge-soft mb-4">How It Works</span>
          <h2 className="section-title mb-4">Your journey to clarity.</h2>
          <p className="text-lg text-muted-foreground">
            Three simple steps to transform career uncertainty into a clear, actionable direction.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[1px] bg-border -z-10" />

          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-secondary border border-border flex items-center justify-center mb-6 group-hover:-translate-y-1 transition-transform duration-300">
                {step.icon}
              </div>
              <h3 className="font-display font-bold text-xl mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed px-4">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
