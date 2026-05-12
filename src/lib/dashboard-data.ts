/* ============================================
   Dashboard Data — Career AI Platform
   Phase 5: Mock recommendation data for the
   futuristic career dashboard
   ============================================ */

/* ---------- Types ---------- */
export interface CareerMatch {
  id: string;
  title: string;
  matchPercent: number;
  salary: string;
  growth: string;
  demand: "high" | "medium" | "low";
  description: string;
  icon: string;
  color: string;
  skills: string[];
}

export interface SkillData {
  name: string;
  level: number; /* 0-100 */
  category: "strength" | "growing" | "develop";
}

export interface RadarAxis {
  label: string;
  value: number; /* 0-100 */
}

export interface RoadmapStep {
  id: string;
  phase: string;
  title: string;
  duration: string;
  tasks: string[];
  status: "complete" | "current" | "upcoming";
}

export interface TrendData {
  label: string;
  current: number;
  projected: number;
  growth: string;
  icon: string;
}

export interface AIInsight {
  id: string;
  type: "strength" | "opportunity" | "action" | "warning";
  title: string;
  description: string;
  icon: string;
}

/* ---------- Career Matches ---------- */
export const CAREER_MATCHES: CareerMatch[] = [
  {
    id: "ux-designer",
    title: "UX Designer",
    matchPercent: 94,
    salary: "$85k — $145k",
    growth: "+22%",
    demand: "high",
    description:
      "Design intuitive, beautiful digital experiences that solve real human problems. Your creativity and empathy make this a perfect fit.",
    icon: "🎨",
    color: "#7c5cfc",
    skills: ["User Research", "Figma", "Prototyping", "Design Systems", "A/B Testing"],
  },
  {
    id: "product-manager",
    title: "Product Manager",
    matchPercent: 88,
    salary: "$95k — $165k",
    growth: "+18%",
    demand: "high",
    description:
      "Lead cross-functional teams to build products people love. Your strategic thinking and communication skills align perfectly.",
    icon: "🚀",
    color: "#5ce1e6",
    skills: ["Strategy", "Roadmapping", "Analytics", "Stakeholder Mgmt", "Agile"],
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    matchPercent: 81,
    salary: "$90k — $160k",
    growth: "+28%",
    demand: "high",
    description:
      "Uncover insights from complex data to drive decisions. Your analytical mind and pattern recognition are key assets.",
    icon: "📊",
    color: "#f59e0b",
    skills: ["Python", "Machine Learning", "SQL", "Statistics", "Visualization"],
  },
  {
    id: "creative-director",
    title: "Creative Director",
    matchPercent: 76,
    salary: "$100k — $180k",
    growth: "+12%",
    demand: "medium",
    description:
      "Shape the creative vision for brands and campaigns. Your artistic eye and leadership qualities set you apart.",
    icon: "✨",
    color: "#ff6b9d",
    skills: ["Branding", "Art Direction", "Team Leadership", "Storytelling", "Visual Design"],
  },
];

/* ---------- Skill Analysis ---------- */
export const SKILLS_DATA: SkillData[] = [
  { name: "Creative Thinking", level: 92, category: "strength" },
  { name: "Communication", level: 88, category: "strength" },
  { name: "Problem Solving", level: 85, category: "strength" },
  { name: "Empathy", level: 90, category: "strength" },
  { name: "Data Analysis", level: 65, category: "growing" },
  { name: "Technical Skills", level: 58, category: "growing" },
  { name: "Leadership", level: 72, category: "growing" },
  { name: "Project Management", level: 45, category: "develop" },
  { name: "Public Speaking", level: 40, category: "develop" },
];

/* ---------- Radar Chart Axes ---------- */
export const RADAR_AXES: RadarAxis[] = [
  { label: "Creativity", value: 92 },
  { label: "Analytical", value: 68 },
  { label: "Social", value: 85 },
  { label: "Technical", value: 55 },
  { label: "Leadership", value: 72 },
  { label: "Adaptability", value: 80 },
];

/* ---------- Career Roadmap ---------- */
export const ROADMAP_STEPS: RoadmapStep[] = [
  {
    id: "r1",
    phase: "Phase 1",
    title: "Foundation",
    duration: "0 — 3 months",
    tasks: [
      "Complete UX Design fundamentals course",
      "Learn Figma and prototyping tools",
      "Build 2 portfolio case studies",
    ],
    status: "complete",
  },
  {
    id: "r2",
    phase: "Phase 2",
    title: "Skill Building",
    duration: "3 — 6 months",
    tasks: [
      "Take advanced interaction design course",
      "Learn user research methodologies",
      "Complete a real-world project",
    ],
    status: "current",
  },
  {
    id: "r3",
    phase: "Phase 3",
    title: "Portfolio & Network",
    duration: "6 — 9 months",
    tasks: [
      "Build 4+ case studies with process docs",
      "Join design communities and events",
      "Start freelancing for experience",
    ],
    status: "upcoming",
  },
  {
    id: "r4",
    phase: "Phase 4",
    title: "Career Launch",
    duration: "9 — 12 months",
    tasks: [
      "Apply to target companies",
      "Prepare for design challenges",
      "Negotiate and land your first role",
    ],
    status: "upcoming",
  },
];

/* ---------- Future Trends ---------- */
export const TREND_DATA: TrendData[] = [
  { label: "AI/ML Design", current: 45, projected: 89, growth: "+98%", icon: "🤖" },
  { label: "UX Research", current: 62, projected: 85, growth: "+37%", icon: "🔬" },
  { label: "Design Systems", current: 55, projected: 78, growth: "+42%", icon: "🏗️" },
  { label: "Voice UI", current: 28, projected: 65, growth: "+132%", icon: "🎙️" },
];

/* ---------- AI Insights ---------- */
export const AI_INSIGHTS: AIInsight[] = [
  {
    id: "ins1",
    type: "strength",
    title: "Exceptional Creative Profile",
    description:
      "Your creativity score is in the top 8% of all users. This positions you perfectly for design and product roles.",
    icon: "💎",
  },
  {
    id: "ins2",
    type: "opportunity",
    title: "Growing AI/UX Intersection",
    description:
      "The AI-enhanced design field is growing 98% YoY. Your profile aligns with this emerging opportunity.",
    icon: "📈",
  },
  {
    id: "ins3",
    type: "action",
    title: "Strengthen Technical Skills",
    description:
      "Adding basic coding (HTML/CSS) and data literacy would boost your match scores by ~12%.",
    icon: "⚡",
  },
  {
    id: "ins4",
    type: "warning",
    title: "Portfolio Gap Detected",
    description:
      "Employers prioritize case studies with measurable outcomes. Add metrics to your project descriptions.",
    icon: "⚠️",
  },
];
