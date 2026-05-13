"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Target, Briefcase, Code, PenTool, BarChart } from "lucide-react";
import { useEffect, useState } from "react";

// Animated Counter Component
function AnimatedCounter({ end, suffix = "" }: { end: number, suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section 
      className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden group"
      onMouseMove={handleMouseMove}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Mouse Follow Gradient */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(120, 119, 198, 0.05),
              transparent 80%
            )
          `,
        }}
      />

      {/* Soft background blob */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-secondary/60 rounded-full blur-3xl -z-10 opacity-70 animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-accent/40 rounded-full blur-3xl -z-10 opacity-50 animate-pulse-slow" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="badge-soft mb-6 hover:bg-secondary/80 transition-colors cursor-default">
                <Sparkles className="w-4 h-4 mr-2 text-primary animate-pulse" />
                AI-Powered Career Intelligence
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="display-title mb-6 text-balance"
            >
              Find the career path that truly fits you.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-muted-foreground mb-10 text-balance leading-relaxed"
            >
              Stop guessing your future. Our advanced AI analyzes your personality, skills, and goals to provide personalized career guidance for students and professionals.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <Link href="/assess" className="btn-primary w-full sm:w-auto py-4 px-8 text-base group relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Take Free Assessment
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link href="/signup" className="btn-secondary w-full sm:w-auto py-4 px-8 text-base hover:-translate-y-0.5 transition-transform">
                Create Account
              </Link>
            </motion.div>

            {/* Social Proof & Animated Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6 text-sm font-medium text-muted-foreground"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-xs overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                  </div>
                ))}
              </div>
              <div className="flex gap-6">
                <div>
                  <span className="block text-xl font-bold text-foreground"><AnimatedCounter end={10000} suffix="+" /></span>
                  <span>Users Guided</span>
                </div>
                <div className="w-px h-10 bg-border hidden sm:block" />
                <div>
                  <span className="block text-xl font-bold text-foreground"><AnimatedCounter end={95} suffix="%" /></span>
                  <span>Accuracy Rate</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Abstract UI Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:ml-auto w-full max-w-lg h-[500px]"
          >
            {/* Main Card */}
            <div className="absolute inset-0 m-auto h-fit premium-card p-6 md:p-8 z-10 bg-white/80 dark:bg-card/80 backdrop-blur-xl border-white/50 dark:border-border/50">
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
                  { title: "Product Manager", match: 94, category: "Leadership", icon: Briefcase },
                  { title: "UX Researcher", match: 88, category: "Design", icon: PenTool },
                  { title: "Data Analyst", match: 82, category: "Analytics", icon: BarChart },
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + (i * 0.1), duration: 0.5 }}
                    className="flex items-center justify-between p-4 rounded-xl border border-border bg-background hover:border-primary/30 transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                        <item.icon className="w-5 h-5 text-primary" />
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
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating Cards */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute -top-4 -right-8 z-20 premium-card p-4 w-48 bg-card shadow-xl border-border/50 hidden sm:flex items-center gap-3 backdrop-blur-md"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Code className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <p className="text-xs font-bold">AI Engineer</p>
                <p className="text-[10px] text-muted-foreground">High Match</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
              className="absolute top-32 -left-12 z-20 premium-card p-4 w-48 bg-card shadow-xl border-border/50 hidden sm:flex items-center gap-3 backdrop-blur-md"
            >
              <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                <PenTool className="w-4 h-4 text-purple-500" />
              </div>
              <div>
                <p className="text-xs font-bold">UI/UX Designer</p>
                <p className="text-[10px] text-muted-foreground">Creative Profile</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 2 }}
              className="absolute -bottom-8 right-10 z-20 premium-card p-4 w-48 bg-card shadow-xl border-border/50 hidden sm:flex items-center gap-3 backdrop-blur-md"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <BarChart className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs font-bold">Data Scientist</p>
                <p className="text-[10px] text-muted-foreground">Analytical</p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
