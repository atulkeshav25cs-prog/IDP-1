"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Target, Briefcase } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Soft background blob */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-secondary/60 rounded-full blur-3xl -z-10 opacity-70" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-accent/40 rounded-full blur-3xl -z-10 opacity-50" />

      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="badge-soft mb-6">
                <Sparkles className="w-4 h-4 mr-2 text-primary" />
                AI-Powered Career Intelligence
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="display-title mb-6 text-balance"
            >
              Find the career path that truly fits you.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 text-balance leading-relaxed"
            >
              Stop guessing your future. Our advanced AI analyzes your personality, skills, and goals to provide personalized career guidance for students and professionals.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <Link href="/assess" className="btn-primary w-full sm:w-auto py-4 px-8 text-base">
                Take Free Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link href="/signup" className="btn-secondary w-full sm:w-auto py-4 px-8 text-base">
                Create Account
              </Link>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-12 flex items-center gap-4 text-sm font-medium text-muted-foreground"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-xs overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                  </div>
                ))}
              </div>
              <p>Trusted by 10,000+ users</p>
            </motion.div>
          </div>

          {/* Right Content - Abstract UI Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative lg:ml-auto w-full max-w-lg"
          >
            {/* Main Card */}
            <div className="premium-card p-6 md:p-8 relative z-10 bg-white/80 backdrop-blur-xl border-white/50">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-display font-bold text-xl">Your Best Matches</h3>
                  <p className="text-sm text-muted-foreground">Based on your assessment</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { title: "Product Manager", match: 94, category: "Leadership" },
                  { title: "UX Researcher", match: 88, category: "Design" },
                  { title: "Data Analyst", match: 82, category: "Analytics" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border bg-background hover:border-primary/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{item.title}</h4>
                        <span className="text-xs text-muted-foreground">{item.category}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="block font-bold text-primary">{item.match}%</span>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Match</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Card 1 */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -top-10 -right-4 sm:-right-12 z-20 premium-card p-5 w-52 bg-card shadow-2xl hidden sm:block"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-accent/50 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-accent-foreground" />
                </div>
                <span className="font-bold text-sm">AI Insight</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your strong empathy scores align perfectly with user-centric roles.
              </p>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
