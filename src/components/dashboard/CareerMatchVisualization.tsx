"use client";

import { motion } from "framer-motion";
import { Brain, Zap, Target, Users, Code2, Lightbulb } from "lucide-react";

interface Trait {
  name: string;
  value: number;
  icon: any;
  color: string;
}

const TRAITS: Trait[] = [
  { name: "Logic", value: 85, icon: Brain, color: "#3b82f6" },
  { name: "Creativity", value: 70, icon: Lightbulb, color: "#8b5cf6" },
  { name: "Leadership", value: 65, icon: Target, color: "#f59e0b" },
  { name: "Communication", value: 80, icon: Users, color: "#10b981" },
  { name: "Tech Skills", value: 90, icon: Code2, color: "#6366f1" },
  { name: "Problem Solving", value: 88, icon: Zap, color: "#ec4899" },
];

export default function CareerMatchVisualization() {
  // SVG Radar Chart Logic
  const size = 300;
  const center = size / 2;
  const radius = (size / 2) - 40;
  const angleStep = (Math.PI * 2) / TRAITS.length;

  const points = TRAITS.map((trait, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const x = center + radius * Math.cos(angle) * (trait.value / 100);
    const y = center + radius * Math.sin(angle) * (trait.value / 100);
    return `${x},${y}`;
  }).join(" ");

  const bgPolygons = [20, 40, 60, 80, 100].map((level) => {
    return TRAITS.map((_, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const x = center + radius * Math.cos(angle) * (level / 100);
      const y = center + radius * Math.sin(angle) * (level / 100);
      return `${x},${y}`;
    }).join(" ");
  });

  return (
    <div className="grid lg:grid-cols-2 gap-8 mb-12">
      {/* Radar Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="premium-card p-6 flex flex-col items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
        <h3 className="font-display font-bold text-xl w-full mb-6">Trait Alignment</h3>
        
        <div className="relative w-[300px] h-[300px]">
          <svg width={size} height={size} className="overflow-visible">
            {/* Background Grid */}
            {bgPolygons.map((points, i) => (
              <polygon
                key={i}
                points={points}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-border/50"
              />
            ))}
            
            {/* Axes */}
            {TRAITS.map((_, i) => {
              const angle = i * angleStep - Math.PI / 2;
              const x2 = center + radius * Math.cos(angle);
              const y2 = center + radius * Math.sin(angle);
              return (
                <line
                  key={`axis-${i}`}
                  x1={center}
                  y1={center}
                  x2={x2}
                  y2={y2}
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-border/50"
                  strokeDasharray="4 4"
                />
              );
            })}

            {/* Data Polygon */}
            <motion.polygon
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              style={{ transformOrigin: "center" }}
              points={points}
              fill="rgba(var(--primary-rgb, 120, 119, 198), 0.2)"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
            />

            {/* Data Points */}
            {TRAITS.map((trait, i) => {
              const angle = i * angleStep - Math.PI / 2;
              const x = center + radius * Math.cos(angle) * (trait.value / 100);
              const y = center + radius * Math.sin(angle) * (trait.value / 100);
              return (
                <motion.circle
                  key={`point-${i}`}
                  initial={{ opacity: 0, r: 0 }}
                  animate={{ opacity: 1, r: 4 }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                  cx={x}
                  cy={y}
                  fill="hsl(var(--primary))"
                />
              );
            })}
          </svg>

          {/* Labels */}
          {TRAITS.map((trait, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const x = center + (radius + 25) * Math.cos(angle);
            const y = center + (radius + 25) * Math.sin(angle);
            const Icon = trait.icon;
            
            return (
              <motion.div
                key={`label-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
                style={{ left: x, top: y }}
              >
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shadow-sm border border-border/50">
                  <Icon className="w-4 h-4 text-primary" style={{ color: trait.color }} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap bg-background/80 backdrop-blur-sm px-1 rounded">
                  {trait.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Skill Alignment Graphs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="premium-card p-6 flex flex-col"
      >
        <h3 className="font-display font-bold text-xl mb-6">Personality & Skill Mapping</h3>
        
        <div className="space-y-6 flex-1 justify-center flex flex-col">
          {TRAITS.map((trait, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-2">
                  <trait.icon className="w-4 h-4" style={{ color: trait.color }} />
                  <span className="text-sm font-semibold">{trait.name}</span>
                </div>
                <span className="text-xs font-bold text-muted-foreground">{trait.value}%</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${trait.value}%` }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: trait.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
