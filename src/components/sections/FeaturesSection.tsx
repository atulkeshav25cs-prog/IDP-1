"use client";

import { motion } from "framer-motion";
import { 
  Compass, BarChart3, LineChart, MessageSquare, 
  FileText, Route, Target, PieChart
} from "lucide-react";

const FEATURES = [
  {
    icon: <Compass className="w-5 h-5 text-primary" />,
    title: "AI Career Guidance",
    description: "Get personalized career recommendations based on deep personality and skill analysis.",
  },
  {
    icon: <BarChart3 className="w-5 h-5 text-primary" />,
    title: "Career Match Analysis",
    description: "See exactly why you match with specific roles through detailed compatibility breakdowns.",
  },
  {
    icon: <LineChart className="w-5 h-5 text-primary" />,
    title: "Skill Gap Detection",
    description: "Identify the exact skills you need to learn to transition into your dream role.",
  },
  {
    icon: <MessageSquare className="w-5 h-5 text-primary" />,
    title: "AI Chat Counselor",
    description: "Chat 24/7 with our AI mentor for interview prep, resume reviews, and career advice.",
  },
  {
    icon: <FileText className="w-5 h-5 text-primary" />,
    title: "Resume Analysis",
    description: "Optimize your resume for ATS systems with AI-driven keyword and structure suggestions.",
  },
  {
    icon: <Route className="w-5 h-5 text-primary" />,
    title: "Learning Roadmaps",
    description: "Follow customized step-by-step learning paths generated for your target career.",
  },
  {
    icon: <Target className="w-5 h-5 text-primary" />,
    title: "Progress Tracking",
    description: "Track your learning milestones, project completions, and overall career readiness.",
  },
  {
    icon: <PieChart className="w-5 h-5 text-primary" />,
    title: "Career Analytics",
    description: "Access real-time market data, salary expectations, and industry growth trends.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="badge-soft mb-4">Platform Features</span>
            <h2 className="section-title mb-4">Everything you need to succeed.</h2>
            <p className="text-lg text-muted-foreground">
              A comprehensive suite of AI tools designed to guide you from uncertainty to your first day on the job.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="premium-card p-6 group"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
