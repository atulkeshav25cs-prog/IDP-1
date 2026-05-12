"use client";

import { motion } from "framer-motion";
import { 
  ClipboardList, Target, TrendingUp, ChevronRight, 
  BookOpen, Star, Clock, Route, MessageSquare
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function DashboardPage() {
  const { user } = useUser();
  const firstName = user?.firstName || user?.username || user?.primaryEmailAddress?.emailAddress?.split('@')[0] || "there";

  // Mock data for UI
  const metrics = [
    { label: "Profile Completion", value: "85%", icon: Target, trend: "+15% this week" },
    { label: "Career Matches", value: "12", icon: BriefcaseIcon, trend: "3 new matches" },
    { label: "Skills to Learn", value: "8", icon: BookOpen, trend: "In your roadmap" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display font-bold text-3xl mb-2">Welcome back, {firstName}</h1>
        <p className="text-muted-foreground">Here is what's happening with your career journey today.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="premium-card p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-medium text-muted-foreground bg-secondary/50 px-2 py-1 rounded-full">
                  {metric.trend}
                </span>
              </div>
              <div>
                <h3 className="font-display font-bold text-3xl mb-1">{metric.value}</h3>
                <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Action Item */}
          <div className="premium-card p-8 bg-primary text-primary-foreground relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="relative z-10">
              <span className="badge-soft bg-white/20 text-white border-none mb-4">Next Step</span>
              <h2 className="font-display font-bold text-2xl mb-2">Complete your technical assessment</h2>
              <p className="text-primary-foreground/80 mb-6 max-w-md">
                We need a bit more information about your coding skills to unlock 5 new engineering career paths.
              </p>
              <Link href="/dashboard/assessments" className="btn-secondary bg-white text-primary hover:bg-white/90 border-none">
                Start Assessment
              </Link>
            </div>
          </div>

          {/* Top Matches */}
          <div>
            <div className="flex justify-between items-end mb-6">
              <h2 className="font-display font-bold text-xl">Top Career Matches</h2>
              <Link href="/dashboard/matches" className="text-sm text-primary font-medium hover:underline flex items-center">
                View all <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {[
                { title: "Product Manager", match: 94, salary: "$120k", tag: "Highly Recommended" },
                { title: "UX Researcher", match: 88, salary: "$95k", tag: "Great Fit" },
              ].map((career, i) => (
                <div key={i} className="premium-card p-5 flex items-center justify-between group hover:border-primary/30 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                      <Star className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">{career.title}</h4>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center"><Target className="w-3 h-3 mr-1" /> {career.match}% Match</span>
                        <span>•</span>
                        <span className="text-primary font-medium">{career.tag}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Area */}
        <div className="space-y-8">
          {/* Recent Activity */}
          <div className="premium-card p-6">
            <h2 className="font-display font-bold text-lg mb-6">Recent Activity</h2>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              {[
                { title: "Started Product Manager Roadmap", time: "2 hours ago", icon: Route },
                { title: "Completed Personality Test", time: "Yesterday", icon: ClipboardList },
                { title: "Chatted with AI Counselor", time: "2 days ago", icon: MessageSquare },
              ].map((activity, i) => {
                const Icon = activity.icon;
                return (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-secondary group-[.is-active]:bg-primary text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-border bg-card shadow-sm">
                      <div className="flex items-center justify-between space-x-2 mb-1">
                        <div className="font-bold text-sm text-foreground">{activity.title}</div>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center">
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

// Temporary icon component since Briefcase isn't imported correctly above
function BriefcaseIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}
