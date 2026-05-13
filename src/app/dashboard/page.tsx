"use client";

import { motion } from "framer-motion";
import { 
  ClipboardList, Target, TrendingUp, ChevronRight, 
  BookOpen, Star, Clock, Route, MessageSquare, Briefcase, Zap, Sparkles
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import CircularProgress from "@/components/dashboard/CircularProgress";

export default function DashboardPage() {
  const { user } = useUser();
  const firstName = user?.firstName || user?.username || user?.primaryEmailAddress?.emailAddress?.split('@')[0] || "there";

  const [greeting, setGreeting] = useState("Welcome back");
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display font-bold text-3xl md:text-4xl mb-2"
          >
            {greeting}, {firstName}.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl"
          >
            You’re highly aligned with <span className="font-semibold text-foreground">Product Design</span> and <span className="font-semibold text-foreground">Engineering</span> careers. Keep up the great momentum!
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/dashboard/chat" className="btn-primary">
            <Sparkles className="w-4 h-4 mr-2" /> AI Counselor
          </Link>
        </motion.div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="premium-card p-6 flex items-center justify-between group overflow-hidden relative"
        >
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center">
                <Target className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Profile Readiness</span>
            </div>
            <h3 className="font-display font-bold text-3xl mb-1">85<span className="text-xl text-muted-foreground">%</span></h3>
            <p className="text-xs font-medium text-emerald-500 flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> +15% this week</p>
          </div>
          <CircularProgress percent={85} size={80} strokeWidth={6} color="hsl(var(--primary))" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="premium-card p-6 flex flex-col justify-between group overflow-hidden relative"
        >
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Career Matches</span>
              </div>
              <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">3 New</span>
            </div>
            <h3 className="font-display font-bold text-3xl mb-1">12</h3>
            <p className="text-xs font-medium text-muted-foreground">Based on your assessment</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="premium-card p-6 flex flex-col justify-between group overflow-hidden relative"
        >
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Skills to Learn</span>
              </div>
            </div>
            <h3 className="font-display font-bold text-3xl mb-1">8</h3>
            <p className="text-xs font-medium text-muted-foreground">In your active roadmap</p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Action Item */}
          <div className="premium-card p-8 bg-primary text-primary-foreground relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
              <div>
                <span className="badge-soft bg-primary-foreground/20 text-primary-foreground border-none mb-4"><Zap className="w-3 h-3 mr-1" /> Next Step</span>
                <h2 className="font-display font-bold text-2xl mb-2">Complete your technical assessment</h2>
                <p className="text-primary-foreground/80 mb-0 max-w-md">
                  We need a bit more information about your coding skills to unlock 5 new engineering career paths and refine your current matches.
                </p>
              </div>
              <div className="shrink-0 mt-4 md:mt-0">
                <Link href="/dashboard/assessments" className="btn-secondary bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-none px-6 py-3 whitespace-nowrap">
                  Start Assessment
                </Link>
              </div>
            </div>
          </div>

          {/* Top Matches & AI Insights */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-end mb-4">
                <h2 className="font-display font-bold text-xl">Top Career Matches</h2>
                <Link href="/dashboard/matches" className="text-sm text-primary font-medium hover:underline flex items-center">
                  View all
                </Link>
              </div>
              <div className="space-y-3">
                {[
                  { title: "Product Manager", match: 94, tag: "Highly Recommended" },
                  { title: "UX Researcher", match: 88, tag: "Great Fit" },
                  { title: "Frontend Engineer", match: 82, tag: "Good Fit" },
                ].map((career, i) => (
                  <div key={i} className="premium-card p-4 flex items-center justify-between group hover:border-primary/30 cursor-pointer transition-all hover:translate-x-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                        <Star className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground text-sm">{career.title}</h4>
                        <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-0.5">
                          <span className="flex items-center font-bold text-primary"><Target className="w-3 h-3 mr-1" /> {career.match}%</span>
                          <span>•</span>
                          <span>{career.tag}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-4">
                <h2 className="font-display font-bold text-xl flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" /> AI Insights
                </h2>
              </div>
              <div className="premium-card p-5 h-[calc(100%-2.5rem)] bg-card flex flex-col justify-between">
                <p className="text-sm text-muted-foreground leading-relaxed italic mb-6">
                  "Your combination of high empathy and strong analytical skills makes you an excellent candidate for Product Management. To strengthen your profile, consider focusing on Agile methodologies and data-driven decision making."
                </p>
                
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">Recommended Skills to Learn</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Agile (Scrum)", "User Research", "SQL Basics", "Figma"].map(skill => (
                      <span key={skill} className="text-xs px-2.5 py-1 rounded-md border border-border bg-secondary text-muted-foreground">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Area */}
        <div className="space-y-8">
          {/* Active Roadmap Progress */}
          <div className="premium-card p-6 border-primary/20 bg-primary/5">
            <h2 className="font-display font-bold text-lg mb-4">Current Focus</h2>
            <div className="mb-4">
              <h3 className="font-bold text-foreground mb-1">Product Manager</h3>
              <p className="text-xs text-muted-foreground">Phase 2: User Research & Strategy</p>
            </div>
            
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-primary">35% Completed</span>
                <span className="text-muted-foreground">4/12 Steps</span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '35%' }} />
              </div>
            </div>

            <Link href="/dashboard/roadmaps" className="btn-primary w-full text-sm py-2">
              Continue Learning
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="premium-card p-6">
            <h2 className="font-display font-bold text-lg mb-6">Recent Activity</h2>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              {[
                { title: "Started Product Manager Roadmap", time: "2 hours ago", icon: Route, active: true },
                { title: "Completed Personality Test", time: "Yesterday", icon: ClipboardList, active: false },
                { title: "Chatted with AI Counselor", time: "2 days ago", icon: MessageSquare, active: false },
              ].map((activity, i) => {
                const Icon = activity.icon;
                return (
                  <div key={i} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${activity.active ? 'is-active' : ''}`}>
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-[3px] border-background bg-secondary group-[.is-active]:bg-primary text-muted-foreground group-[.is-active]:text-primary-foreground shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] p-3 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                      <div className="font-bold text-xs text-foreground mb-1 line-clamp-1">{activity.title}</div>
                      <div className="text-[10px] text-muted-foreground flex items-center">
                        <Clock className="w-3 h-3 mr-1" /> {activity.time}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
