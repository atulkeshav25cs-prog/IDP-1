"use client";

import { motion } from "framer-motion";
import { ArrowRight, Briefcase, TrendingUp } from "lucide-react";
import Link from "next/link";

const CAREERS = [
  {
    title: "Frontend Developer",
    match: 96,
    salary: "$80k - $130k",
    demand: "High",
    skills: ["React", "TypeScript", "Tailwind"],
  },
  {
    title: "UI/UX Designer",
    match: 92,
    salary: "$75k - $120k",
    demand: "High",
    skills: ["Figma", "User Research", "Prototyping"],
  },
  {
    title: "Product Manager",
    match: 88,
    salary: "$100k - $160k",
    demand: "Very High",
    skills: ["Strategy", "Agile", "Analytics"],
  },
  {
    title: "Data Analyst",
    match: 85,
    salary: "$70k - $110k",
    demand: "Medium",
    skills: ["SQL", "Python", "Tableau"],
  },
];

export default function CareersSection() {
  return (
    <section id="careers" className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="badge-soft mb-4">Career Matches</span>
          <h2 className="section-title mb-4">Discover paths made for you.</h2>
          <p className="text-lg text-muted-foreground">
            Explore hundreds of tech and non-tech careers, complete with live market data and compatibility scores.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {CAREERS.map((career, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="premium-card p-6 flex flex-col h-full hover:border-primary/20 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg">{career.title}</h3>
                </div>
                <div className="text-right">
                  <span className="block font-bold text-xl text-primary">{career.match}%</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Match</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 rounded-lg bg-secondary/50 border border-border/50">
                  <span className="text-xs text-muted-foreground block mb-1">Avg. Salary</span>
                  <span className="font-semibold text-sm">{career.salary}</span>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50 border border-border/50">
                  <span className="text-xs text-muted-foreground block mb-1">Market Demand</span>
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-primary" />
                    <span className="font-semibold text-sm">{career.demand}</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <span className="text-xs font-medium text-muted-foreground block mb-2">Key Skills</span>
                <div className="flex flex-wrap gap-2">
                  {career.skills.map((skill) => (
                    <span key={skill} className="px-2.5 py-1 rounded-md bg-secondary text-xs font-medium text-foreground border border-border">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/assess" className="btn-secondary">
            View All Careers <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
