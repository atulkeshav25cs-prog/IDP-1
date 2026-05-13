/* ============================================
   Constants & Data — Career AI Platform
   All static content and configuration
   ============================================ */

/* ---------- Navigation Links ---------- */
export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Careers", href: "#careers" },
  { label: "Testimonials", href: "#testimonials" },
] as const;

/* ---------- Features Data ---------- */
export const FEATURES = [
  {
    id: "ai-matching",
    icon: "🧠",
    title: "AI Career Matching",
    description:
      "Our neural engine analyzes 50+ data points about your personality, skills, and aspirations to find careers you'll truly love.",
  },
  {
    id: "personality",
    icon: "✨",
    title: "Deep Personality Insight",
    description:
      "Go beyond surface-level assessments. Our AI uncovers hidden strengths, cognitive patterns, and behavioral tendencies.",
  },
  {
    id: "roadmap",
    icon: "🗺️",
    title: "Personalized Roadmaps",
    description:
      "Receive step-by-step career roadmaps with skills to learn, certifications to pursue, and milestones to reach.",
  },
  {
    id: "market",
    icon: "📊",
    title: "Live Market Intelligence",
    description:
      "Real-time salary data, demand trends, and growth projections so you make decisions with full market clarity.",
  },
  {
    id: "mentorship",
    icon: "🤝",
    title: "AI Mentorship Sessions",
    description:
      "Interactive AI-guided sessions that adapt to your progress, answer career questions, and refine your path over time.",
  },
  {
    id: "portfolio",
    icon: "🎯",
    title: "Portfolio & Skill Builder",
    description:
      "Curated project ideas, skill challenges, and portfolio templates aligned to your chosen career trajectory.",
  },
] as const;

/* ---------- How It Works Steps ---------- */
export const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Share Your Story",
    description:
      "Answer immersive, AI-curated questions about your interests, personality, values, and aspirations. No boring forms — just a conversation.",
  },
  {
    step: "02",
    title: "AI Deep Analysis",
    description:
      "Our neural engine processes your responses through advanced personality models, market data, and career mapping algorithms.",
  },
  {
    step: "03",
    title: "Discover Your Path",
    description:
      "Receive a curated set of career matches with compatibility scores, salary insights, growth projections, and custom roadmaps.",
  },
  {
    step: "04",
    title: "Grow & Evolve",
    description:
      "Track your progress, unlock new insights, and refine your career path as you grow. Your AI mentor evolves with you.",
  },
] as const;

/* ---------- Testimonials ---------- */
export const TESTIMONIALS = [
  {
    id: "t1",
    name: "Priya Sharma",
    role: "Computer Science Student → UX Designer",
    quote:
      "Carevo helped me realize that my passion wasn't coding — it was designing experiences. I switched to UX and couldn't be happier.",
    avatar: "PS",
  },
  {
    id: "t2",
    name: "James Rodriguez",
    role: "Marketing Executive → Data Analyst",
    quote:
      "The AI analysis was scarily accurate. It identified patterns in my thinking I never noticed. My new career feels like it was made for me.",
    avatar: "JR",
  },
  {
    id: "t3",
    name: "Aisha Patel",
    role: "Engineering Graduate → Product Manager",
    quote:
      "I was overwhelmed with options after graduation. Carevo gave me clarity, a roadmap, and the confidence to pursue product management.",
    avatar: "AP",
  },
] as const;

/* ---------- Career Cards Data ---------- */
export const CAREER_CARDS = [
  {
    id: "ux",
    title: "UX Designer",
    category: "Design & Creativity",
    match: 94,
    salary: "$85k — $140k",
    growth: "23% growth",
    tags: ["Creative", "Empathetic", "Visual"],
    gradient: "from-purple-500/20 to-blue-500/20",
    borderColor: "border-purple-500/20",
  },
  {
    id: "data",
    title: "Data Scientist",
    category: "Analytics & AI",
    match: 88,
    salary: "$95k — $160k",
    growth: "35% growth",
    tags: ["Analytical", "Mathematical", "Curious"],
    gradient: "from-cyan-500/20 to-teal-500/20",
    borderColor: "border-cyan-500/20",
  },
  {
    id: "pm",
    title: "Product Manager",
    category: "Strategy & Leadership",
    match: 91,
    salary: "$100k — $170k",
    growth: "18% growth",
    tags: ["Strategic", "Communicator", "Leader"],
    gradient: "from-pink-500/20 to-orange-500/20",
    borderColor: "border-pink-500/20",
  },
  {
    id: "dev",
    title: "Full-Stack Developer",
    category: "Engineering & Tech",
    match: 85,
    salary: "$90k — $155k",
    growth: "28% growth",
    tags: ["Logical", "Builder", "Problem-Solver"],
    gradient: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/20",
  },
] as const;

/* ---------- Stats ---------- */
export const PLATFORM_STATS = [
  { value: "50K+", label: "Career Matches Made" },
  { value: "95%", label: "User Satisfaction" },
  { value: "200+", label: "Career Paths Mapped" },
  { value: "12", label: "AI Models Active" },
] as const;
