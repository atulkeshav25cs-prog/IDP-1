"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, BookOpen, ExternalLink } from "lucide-react";
import RoadmapProgressButton from "@/components/roadmap/RoadmapProgressButton";

interface RoadmapTimelineProps {
  content: any[];
  progress: any[];
  completedSteps: number;
}

export default function RoadmapTimeline({ content, progress, completedSteps }: RoadmapTimelineProps) {
  return (
    <div className="mt-16 relative before:absolute before:inset-0 before:ml-[1.4rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-primary/20 before:via-border before:to-transparent space-y-12">
      {content.map((step: any, index: number) => {
        const progressData = progress.find(p => p.stepId === step.id);
        const isCompleted = progressData?.status === "COMPLETED";
        const isActive = index === completedSteps; // The current step they are on
        
        return (
          <motion.div 
            key={step.id} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group"
          >
            {/* Timeline Marker */}
            <div className={`flex items-center justify-center w-12 h-12 rounded-full border-4 border-background bg-card shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10 transition-all duration-500 ${
              isCompleted ? 'bg-primary border-primary/20 text-white scale-110 shadow-primary/20 shadow-lg' : isActive ? 'border-primary text-primary scale-110 shadow-lg' : 'text-muted-foreground hover:scale-105'
            }`}>
              {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <span className="font-bold text-sm">{index + 1}</span>}
            </div>

            {/* Content Card */}
            <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] premium-card p-6 md:p-8 transition-all duration-500 hover:shadow-xl ${
              isActive ? 'border-primary shadow-lg scale-[1.02] bg-card/90 backdrop-blur-sm' : isCompleted ? 'opacity-80' : 'hover:border-primary/20 hover:-translate-y-1'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${isActive ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'}`}>Phase {index + 1}</span>
                <div className="flex items-center text-xs font-medium text-muted-foreground bg-secondary/50 px-2.5 py-1 rounded-full ml-auto">
                  <Clock className="w-3.5 h-3.5 mr-1.5 text-primary" /> {step.estimatedTime}
                </div>
              </div>
              
              <h3 className={`font-display font-bold text-2xl mb-3 ${isCompleted ? 'text-foreground/80' : 'text-foreground'}`}>{step.title}</h3>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed text-balance">{step.description}</p>
              
              <div className="space-y-3 mb-8 bg-background/50 rounded-xl p-4 border border-border/50">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5 mb-3"><BookOpen className="w-3.5 h-3.5 text-primary" /> Learning Resources</h4>
                <ul className="space-y-2">
                  {step.resources.map((res: any, i: number) => {
                    const isObject = typeof res === 'object';
                    const name = isObject ? res.name : res;
                    const url = isObject ? res.url : "#";
                    
                    return (
                      <li key={i}>
                        <a href={url} target="_blank" rel="noreferrer" className="flex items-start gap-2 text-sm text-muted-foreground bg-secondary/50 p-2.5 rounded-lg hover:bg-secondary transition-colors group/link cursor-pointer block">
                          <ExternalLink className="w-4 h-4 text-primary shrink-0 mt-0.5 group-hover/link:scale-110 transition-transform inline" />
                          <span className="hover:text-foreground transition-colors leading-tight inline-block align-top ml-1">{name}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="pt-4 border-t border-border">
                <RoadmapProgressButton 
                  progressId={progressData?.id || ""} 
                  isCompleted={isCompleted} 
                  disabled={!isActive && !isCompleted && index !== 0} 
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
