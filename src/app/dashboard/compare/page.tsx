"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, ArrowLeft, Check, X, ShieldAlert, Zap, Globe, BookOpen } from "lucide-react";
import Link from "next/link";

const CAREER_DATA = [
  {
    id: "c1",
    title: "AI Engineer",
    salary: "$120k - $200k",
    growth: "Very High",
    wlb: "Medium",
    creativity: "High",
    aiRisk: "Low",
    demand: "Very High",
    remote: "High",
    difficulty: "Hard",
    color: "#3b82f6"
  },
  {
    id: "c2",
    title: "Product Manager",
    salary: "$100k - $180k",
    growth: "High",
    wlb: "Medium",
    creativity: "High",
    aiRisk: "Medium",
    demand: "High",
    remote: "Medium",
    difficulty: "Medium",
    color: "#8b5cf6"
  },
  {
    id: "c3",
    title: "UI/UX Designer",
    salary: "$80k - $150k",
    growth: "High",
    wlb: "High",
    creativity: "Very High",
    aiRisk: "High",
    demand: "Medium",
    remote: "High",
    difficulty: "Medium",
    color: "#ec4899"
  },
  {
    id: "c4",
    title: "Data Scientist",
    salary: "$110k - $170k",
    growth: "High",
    wlb: "Medium",
    creativity: "Medium",
    aiRisk: "Low",
    demand: "Very High",
    remote: "High",
    difficulty: "Hard",
    color: "#10b981"
  }
];

export default function ComparePage() {
  const [selectedCareers, setSelectedCareers] = useState<string[]>(["c1", "c2"]);

  const toggleCareer = (id: string) => {
    if (selectedCareers.includes(id)) {
      setSelectedCareers(prev => prev.filter(c => c !== id));
    } else {
      if (selectedCareers.length < 3) {
        setSelectedCareers(prev => [...prev, id]);
      }
    }
  };

  const getMetricColor = (val: string) => {
    if (["Low", "High", "Very High"].includes(val)) {
      if (val === "Low" || val === "Medium") return "text-emerald-500";
      return "text-emerald-500";
    }
    return "text-muted-foreground";
  };

  const renderMetricRow = (label: string, key: keyof typeof CAREER_DATA[0], icon: any) => {
    const Icon = icon;
    return (
      <div className="flex items-center justify-between py-4 border-b border-border/50 group hover:bg-secondary/20 transition-colors rounded-lg px-2 -mx-2">
        <div className="flex items-center gap-2 w-1/4">
          <Icon className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
        </div>
        <div className="flex flex-1 gap-4 justify-between">
          <AnimatePresence>
            {selectedCareers.map(id => {
              const career = CAREER_DATA.find(c => c.id === id)!;
              return (
                <motion.div 
                  key={id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, width: 0 }}
                  className="flex-1 text-center font-semibold text-sm"
                >
                  {career[key]}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/matches" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-display font-bold text-3xl mb-1">Compare Careers</h1>
          <p className="text-muted-foreground text-sm">Select up to 3 careers to compare side-by-side.</p>
        </div>
      </div>

      {/* Selector */}
      <div className="flex flex-wrap gap-3">
        {CAREER_DATA.map(career => {
          const isSelected = selectedCareers.includes(career.id);
          const isDisabled = !isSelected && selectedCareers.length >= 3;
          return (
            <button
              key={career.id}
              onClick={() => toggleCareer(career.id)}
              disabled={isDisabled}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                isSelected 
                  ? "border-primary bg-primary/10 text-primary" 
                  : isDisabled 
                    ? "border-border/50 text-muted-foreground opacity-50 cursor-not-allowed"
                    : "border-border hover:border-primary/30 hover:bg-secondary"
              }`}
            >
              {isSelected && <Check className="w-4 h-4" />}
              {career.title}
            </button>
          );
        })}
      </div>

      {/* Comparison Table */}
      {selectedCareers.length > 0 ? (
        <div className="premium-card overflow-hidden mt-8">
          {/* Header Row */}
          <div className="flex border-b border-border bg-secondary/30 p-6">
            <div className="w-1/4"></div>
            <div className="flex flex-1 gap-4 justify-between">
              <AnimatePresence>
                {selectedCareers.map(id => {
                  const career = CAREER_DATA.find(c => c.id === id)!;
                  return (
                    <motion.div 
                      key={id}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20, width: 0 }}
                      className="flex-1 text-center relative"
                    >
                      <button 
                        onClick={() => toggleCareer(id)}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive/10 text-destructive flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-destructive hover:text-white transition-all"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <div className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: `${career.color}15`, color: career.color }}>
                        <Scale className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-lg">{career.title}</h3>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Data Rows */}
          <div className="p-6">
            {renderMetricRow("Salary Range", "salary", Zap)}
            {renderMetricRow("Career Growth", "growth", Zap)}
            {renderMetricRow("Work-Life Balance", "wlb", Scale)}
            {renderMetricRow("Creativity Needed", "creativity", Zap)}
            {renderMetricRow("AI Automation Risk", "aiRisk", ShieldAlert)}
            {renderMetricRow("Market Demand", "demand", Zap)}
            {renderMetricRow("Remote Friendly", "remote", Globe)}
            {renderMetricRow("Learning Difficulty", "difficulty", BookOpen)}
          </div>
        </div>
      ) : (
        <div className="premium-card p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
            <Scale className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-display font-bold text-xl mb-2">Select careers to compare</h3>
          <p className="text-muted-foreground">Choose at least one career from above to see the comparison.</p>
        </div>
      )}
    </div>
  );
}
