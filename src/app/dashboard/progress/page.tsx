"use client";

import { motion } from "framer-motion";
import { TrendingUp, Award, Flame, Target, CheckCircle2, Clock, Calendar } from "lucide-react";
import CircularProgress from "@/components/dashboard/CircularProgress";

export default function ProgressPage() {
  const weeklyData = [
    { day: "Mon", hours: 2 },
    { day: "Tue", hours: 4 },
    { day: "Wed", hours: 1.5 },
    { day: "Thu", hours: 5 },
    { day: "Fri", hours: 3 },
    { day: "Sat", hours: 0 },
    { day: "Sun", hours: 2.5 },
  ];

  const maxHours = Math.max(...weeklyData.map(d => d.hours));

  const badges = [
    { title: "Fast Learner", desc: "Completed 3 modules in one day", icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10" },
    { title: "Consistent", desc: "7 day learning streak", icon: Calendar, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Goal Setter", desc: "Created first roadmap", icon: Target, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Top 10%", desc: "Scored 90%+ on assessment", icon: Award, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  return (
    <div className="space-y-8 max-w-6xl pb-12">
      <div>
        <h1 className="font-display font-bold text-3xl mb-2">Learning Progress</h1>
        <p className="text-muted-foreground">Detailed analytics of your roadmap progression and skill acquisition.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="premium-card p-6 md:col-span-2 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Overall Roadmap Completion</h3>
            <div className="flex items-end gap-3 mb-2">
              <span className="font-display font-bold text-4xl">42%</span>
              <span className="text-sm font-medium text-emerald-500 mb-1 flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> +8% this week</span>
            </div>
            <p className="text-xs text-muted-foreground">Product Manager Path</p>
          </div>
          <CircularProgress percent={42} size={100} strokeWidth={8} color="hsl(var(--primary))" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="premium-card p-6 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
              <Flame className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h4 className="font-bold">Current Streak</h4>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-display font-bold text-3xl">4</span>
            <span className="text-muted-foreground">days</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="premium-card p-6 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-bold">Milestones</h4>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-display font-bold text-3xl">12</span>
            <span className="text-muted-foreground">total</span>
          </div>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Weekly Activity Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="premium-card p-6 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-display font-bold text-xl">Weekly Activity</h3>
            <span className="text-sm font-medium text-muted-foreground bg-secondary px-3 py-1 rounded-full">18 Hours Total</span>
          </div>
          
          <div className="h-48 flex items-end justify-between gap-2 mt-4 relative">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none border-b border-border">
              <div className="border-t border-border/50 border-dashed w-full" />
              <div className="border-t border-border/50 border-dashed w-full" />
              <div className="border-t border-border/50 border-dashed w-full" />
            </div>
            
            {weeklyData.map((data, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1 group z-10">
                <div className="w-full relative flex justify-center">
                  {/* Tooltip */}
                  <div className="absolute -top-8 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {data.hours} hrs
                  </div>
                  {/* Bar */}
                  <div 
                    className="w-full max-w-[40px] bg-primary/20 group-hover:bg-primary transition-colors rounded-t-sm"
                    style={{ height: `${(data.hours / maxHours) * 160}px` }}
                  />
                </div>
                <span className="text-xs font-medium text-muted-foreground">{data.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Phase Completion */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="premium-card p-6 md:p-8">
          <h3 className="font-display font-bold text-xl mb-6">Phase Completion</h3>
          
          <div className="space-y-6">
            {[
              { name: "Agile & Scrum Methodologies", percent: 100 },
              { name: "User Research & Strategy", percent: 75 },
              { name: "Data & Metrics", percent: 20 },
              { name: "Case Studies & Interview Prep", percent: 0 },
            ].map((phase, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-sm font-medium ${phase.percent === 100 ? 'text-primary' : 'text-foreground'}`}>{phase.name}</span>
                  <span className="text-xs font-bold text-muted-foreground">{phase.percent}%</span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${phase.percent === 100 ? 'bg-primary' : 'bg-primary/60'}`}
                    style={{ width: `${phase.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Achievement Badges */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="premium-card p-6 md:p-8">
        <h3 className="font-display font-bold text-xl mb-6">Achievement Badges</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <div key={i} className="p-4 rounded-xl border border-border bg-card/50 hover:bg-card transition-colors flex flex-col items-center text-center group cursor-pointer">
                <div className={`w-16 h-16 rounded-full ${badge.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-8 h-8 ${badge.color}`} />
                </div>
                <h4 className="font-bold text-sm mb-1">{badge.title}</h4>
                <p className="text-xs text-muted-foreground">{badge.desc}</p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
