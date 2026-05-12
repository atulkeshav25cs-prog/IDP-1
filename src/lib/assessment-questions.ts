/* ============================================
   Assessment Questions — Career AI Platform
   Phase 4: Multi-category question bank
   Each question has a category, type, and options
   ============================================ */

/* ---------- Types ---------- */
export type QuestionCategory =
  | "personality"
  | "interests"
  | "work-style"
  | "creativity"
  | "logic"
  | "emotional-intelligence"
  | "communication"
  | "career-goals"
  | "lifestyle";

export type QuestionType = "single" | "scale" | "multi";

export interface QuestionOption {
  id: string;
  label: string;
  /** Optional emoji/icon */
  icon?: string;
  /** Trait weight for scoring */
  trait?: string;
}

export interface AssessmentQuestion {
  id: string;
  category: QuestionCategory;
  type: QuestionType;
  question: string;
  subtitle?: string;
  options: QuestionOption[];
  /** Max selections for 'multi' type */
  maxSelect?: number;
}

export interface AssessmentAnswer {
  questionId: string;
  selectedIds: string[];
  timestamp: number;
}

/* ---------- Category Metadata ---------- */
export const CATEGORY_META: Record<
  QuestionCategory,
  { label: string; icon: string; color: string }
> = {
  personality: { label: "Personality", icon: "🧠", color: "#7c5cfc" },
  interests: { label: "Interests", icon: "✨", color: "#5ce1e6" },
  "work-style": { label: "Work Style", icon: "⚡", color: "#ff6b9d" },
  creativity: { label: "Creativity", icon: "🎨", color: "#f59e0b" },
  logic: { label: "Logic", icon: "🔢", color: "#10b981" },
  "emotional-intelligence": {
    label: "Emotional IQ",
    icon: "💛",
    color: "#f472b6",
  },
  communication: { label: "Communication", icon: "💬", color: "#60a5fa" },
  "career-goals": { label: "Career Goals", icon: "🎯", color: "#a78bfa" },
  lifestyle: { label: "Lifestyle", icon: "🌱", color: "#34d399" },
};

/* ---------- Question Bank ---------- */
export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  /* ---- Personality ---- */
  {
    id: "p1",
    category: "personality",
    type: "single",
    question: "How do you recharge after a long day?",
    subtitle: "There's no wrong answer — just be honest.",
    options: [
      { id: "p1a", label: "Quiet time alone with a book or music", icon: "📚", trait: "introvert" },
      { id: "p1b", label: "Hanging out with close friends", icon: "👥", trait: "ambivert" },
      { id: "p1c", label: "Going to a social event or party", icon: "🎉", trait: "extrovert" },
      { id: "p1d", label: "Creative hobbies like art or coding", icon: "🎨", trait: "creative-introvert" },
    ],
  },
  {
    id: "p2",
    category: "personality",
    type: "single",
    question: "When facing a big decision, you tend to...",
    options: [
      { id: "p2a", label: "Analyze all data before deciding", icon: "📊", trait: "analytical" },
      { id: "p2b", label: "Trust your gut feeling", icon: "💫", trait: "intuitive" },
      { id: "p2c", label: "Ask trusted people for advice", icon: "🤝", trait: "collaborative" },
      { id: "p2d", label: "Sleep on it and decide tomorrow", icon: "🌙", trait: "reflective" },
    ],
  },

  /* ---- Interests ---- */
  {
    id: "i1",
    category: "interests",
    type: "multi",
    question: "Which activities excite you the most?",
    subtitle: "Select up to 3 that resonate with you.",
    maxSelect: 3,
    options: [
      { id: "i1a", label: "Building & creating things", icon: "🔧", trait: "builder" },
      { id: "i1b", label: "Solving complex puzzles", icon: "🧩", trait: "problem-solver" },
      { id: "i1c", label: "Telling stories & writing", icon: "✍️", trait: "storyteller" },
      { id: "i1d", label: "Helping & mentoring others", icon: "🌟", trait: "mentor" },
      { id: "i1e", label: "Exploring data & patterns", icon: "📈", trait: "analyst" },
      { id: "i1f", label: "Designing visual experiences", icon: "🎨", trait: "designer" },
    ],
  },
  {
    id: "i2",
    category: "interests",
    type: "single",
    question: "On a free weekend, you'd most enjoy...",
    options: [
      { id: "i2a", label: "Learning a new skill online", icon: "💻", trait: "learner" },
      { id: "i2b", label: "Exploring nature or traveling", icon: "🏔️", trait: "explorer" },
      { id: "i2c", label: "Working on a passion project", icon: "🚀", trait: "creator" },
      { id: "i2d", label: "Volunteering or community work", icon: "❤️", trait: "humanitarian" },
    ],
  },

  /* ---- Work Style ---- */
  {
    id: "w1",
    category: "work-style",
    type: "single",
    question: "Your ideal work environment is...",
    options: [
      { id: "w1a", label: "A quiet, focused home office", icon: "🏠", trait: "remote" },
      { id: "w1b", label: "A collaborative open office", icon: "🏢", trait: "office" },
      { id: "w1c", label: "Coffee shops and co-working spaces", icon: "☕", trait: "flexible" },
      { id: "w1d", label: "Outdoors or on the move", icon: "🌍", trait: "mobile" },
    ],
  },
  {
    id: "w2",
    category: "work-style",
    type: "single",
    question: "How do you handle deadlines?",
    options: [
      { id: "w2a", label: "Plan everything early, finish ahead", icon: "📋", trait: "planner" },
      { id: "w2b", label: "Steady pace, right on time", icon: "⏱️", trait: "steady" },
      { id: "w2c", label: "Last-minute rush gives me energy", icon: "⚡", trait: "pressure-driven" },
      { id: "w2d", label: "I prefer flexible timelines", icon: "🌊", trait: "flexible" },
    ],
  },

  /* ---- Creativity ---- */
  {
    id: "c1",
    category: "creativity",
    type: "single",
    question: "When you see a blank canvas, you feel...",
    options: [
      { id: "c1a", label: "Excited — endless possibilities!", icon: "🤩", trait: "creative" },
      { id: "c1b", label: "Thoughtful — I need a plan first", icon: "🤔", trait: "structured-creative" },
      { id: "c1c", label: "Indifferent — creativity isn't my thing", icon: "😐", trait: "practical" },
      { id: "c1d", label: "Anxious — I prefer guidelines", icon: "📏", trait: "structured" },
    ],
  },

  /* ---- Logic ---- */
  {
    id: "l1",
    category: "logic",
    type: "single",
    question: "Which statement describes you best?",
    options: [
      { id: "l1a", label: "I love finding patterns in chaos", icon: "🔍", trait: "pattern-thinker" },
      { id: "l1b", label: "I think in systems and frameworks", icon: "🏗️", trait: "systems-thinker" },
      { id: "l1c", label: "I prefer concrete facts over theory", icon: "📌", trait: "practical-thinker" },
      { id: "l1d", label: "I connect ideas across domains", icon: "🌐", trait: "interdisciplinary" },
    ],
  },

  /* ---- Emotional Intelligence ---- */
  {
    id: "e1",
    category: "emotional-intelligence",
    type: "single",
    question: "In a team conflict, you typically...",
    options: [
      { id: "e1a", label: "Mediate and find common ground", icon: "🕊️", trait: "mediator" },
      { id: "e1b", label: "Stand firm on your position", icon: "🛡️", trait: "assertive" },
      { id: "e1c", label: "Step back and observe first", icon: "👁️", trait: "observer" },
      { id: "e1d", label: "Focus on the task, not the drama", icon: "📎", trait: "task-focused" },
    ],
  },

  /* ---- Communication ---- */
  {
    id: "cm1",
    category: "communication",
    type: "single",
    question: "Your preferred way to share ideas is...",
    options: [
      { id: "cm1a", label: "Writing — blogs, docs, or messages", icon: "📝", trait: "writer" },
      { id: "cm1b", label: "Speaking — presentations or debates", icon: "🎤", trait: "speaker" },
      { id: "cm1c", label: "Visuals — diagrams, designs, charts", icon: "📊", trait: "visual" },
      { id: "cm1d", label: "One-on-one deep conversations", icon: "💬", trait: "conversationalist" },
    ],
  },

  /* ---- Career Goals ---- */
  {
    id: "cg1",
    category: "career-goals",
    type: "single",
    question: "What matters most in your ideal career?",
    subtitle: "Think long-term — what drives you?",
    options: [
      { id: "cg1a", label: "Making a meaningful impact", icon: "🌍", trait: "impact-driven" },
      { id: "cg1b", label: "Financial security and growth", icon: "💰", trait: "security-driven" },
      { id: "cg1c", label: "Creative freedom and autonomy", icon: "🎨", trait: "freedom-driven" },
      { id: "cg1d", label: "Continuous learning and mastery", icon: "📚", trait: "growth-driven" },
    ],
  },
  {
    id: "cg2",
    category: "career-goals",
    type: "single",
    question: "Where do you see yourself in 5 years?",
    options: [
      { id: "cg2a", label: "Leading a team or company", icon: "👑", trait: "leader" },
      { id: "cg2b", label: "Deep expert in my field", icon: "🔬", trait: "specialist" },
      { id: "cg2c", label: "Running my own venture", icon: "🚀", trait: "entrepreneur" },
      { id: "cg2d", label: "Doing meaningful freelance work", icon: "🎯", trait: "independent" },
    ],
  },

  /* ---- Lifestyle ---- */
  {
    id: "lf1",
    category: "lifestyle",
    type: "single",
    question: "How important is work-life balance to you?",
    options: [
      { id: "lf1a", label: "Essential — it's non-negotiable", icon: "⚖️", trait: "balance-first" },
      { id: "lf1b", label: "Important but flexible", icon: "🔄", trait: "flexible" },
      { id: "lf1c", label: "I'm happy to hustle for a while", icon: "🔥", trait: "hustle-mode" },
      { id: "lf1d", label: "My work IS my life — I love it", icon: "💜", trait: "passionate" },
    ],
  },
];

/* ---------- Helpers ---------- */
export const TOTAL_QUESTIONS = ASSESSMENT_QUESTIONS.length;

export function getQuestionsByCategory(category: QuestionCategory) {
  return ASSESSMENT_QUESTIONS.filter((q) => q.category === category);
}

export function getCategoryProgress(
  answers: AssessmentAnswer[],
  category: QuestionCategory
) {
  const categoryQuestions = getQuestionsByCategory(category);
  const answered = categoryQuestions.filter((q) =>
    answers.some((a) => a.questionId === q.id)
  );
  return {
    total: categoryQuestions.length,
    completed: answered.length,
    percent:
      categoryQuestions.length > 0
        ? Math.round((answered.length / categoryQuestions.length) * 100)
        : 0,
  };
}
