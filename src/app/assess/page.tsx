"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import { submitAssessment } from "@/actions/assessment.actions";

const QUESTIONS = [
  {
    id: "q1",
    category: "Core Interest",
    question: "What type of activities draw you in the most?",
    options: [
      "Technology, coding, and building digital products",
      "Biology, healthcare, and understanding the human body",
      "Finance, commerce, and business strategy",
      "Competitive gaming, esports, and digital entertainment",
      "Physical sports, athletics, and outdoor activities"
    ]
  },
  {
    id: "q2",
    category: "Financial Mindset",
    question: "What is your approach to financial stability and risk?",
    options: [
      "I want a highly stable, guaranteed income (even if it takes years of schooling)",
      "I prefer high-risk, high-reward scenarios (like startups or competitive gaming)",
      "I want to climb the corporate ladder and maximize my salary safely",
      "I prioritize passion and lifestyle over massive financial wealth"
    ]
  },
  {
    id: "q3",
    category: "Physical vs Mental",
    question: "How do you prefer to exert your energy daily?",
    options: [
      "Intense mental focus at a desk (coding, analyzing, researching)",
      "High physical exertion and training (sports, active fieldwork)",
      "A mix of mental strategy and fast reflexes (esports, pilot, surgeon)",
      "Interacting with people, leading meetings, and traveling (business, sales)"
    ]
  },
  {
    id: "q4",
    category: "Work Environment",
    question: "What is your ideal work environment?",
    options: [
      "A quiet, solitary space where I can focus deeply",
      "A high-energy arena or stadium with an audience",
      "A fast-paced corporate office or trading floor",
      "A laboratory, clinic, or research facility",
      "Fully remote, working from my computer anywhere in the world"
    ]
  },
  {
    id: "q5",
    category: "Problem Solving",
    question: "When faced with a difficult challenge, what is your instinct?",
    options: [
      "Analyze the data and find a logical, systemic solution",
      "Train harder, practice the mechanics, and rely on muscle memory",
      "Look at the market trends and find a profitable workaround",
      "Consult scientific literature and run experiments",
      "Collaborate with a team to brainstorm creative approaches"
    ]
  }
];

const THINKING_STAGES = [
  "Analyzing personality...",
  "Matching career patterns...",
  "Evaluating strengths...",
  "Predicting future trends...",
  "Generating personalized roadmap..."
];

export default function AssessmentPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [thinkingStage, setThinkingStage] = useState(0);

  const currentQ = QUESTIONS[currentStep];
  const hasAnsweredCurrent = !!answers[currentQ?.id];

  const handleSelectOption = (questionId: string, option: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
    // Auto-advance after short delay if not last question
    if (currentStep < QUESTIONS.length - 1) {
      setTimeout(() => {
        handleNext();
      }, 400);
    }
  };

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSubmitting || isComplete) return;

      // Number keys 1-9 to select option
      const keyMap: Record<string, number> = {
        '1': 0, '2': 1, '3': 2, '4': 3, '5': 4, '6': 5
      };

      if (e.key in keyMap) {
        const optionIndex = keyMap[e.key];
        if (currentQ.options[optionIndex]) {
          handleSelectOption(currentQ.id, currentQ.options[optionIndex]);
        }
      } else if (e.key === 'Enter') {
        if (hasAnsweredCurrent) {
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, currentQ, hasAnsweredCurrent, isSubmitting, isComplete]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = await submitAssessment(answers);
      if (result.success) {
        setIsComplete(true);
        
        // Cycle through thinking stages
        for (let i = 0; i < THINKING_STAGES.length; i++) {
          setThinkingStage(i);
          await new Promise(res => setTimeout(res, 800));
        }
        
        router.push("/dashboard/matches");
      }
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  const progress = ((currentStep) / QUESTIONS.length) * 100;

  if (isComplete || isSubmitting) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center w-full max-w-md"
        >
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 relative">
            {isComplete ? (
              <CheckCircle2 className="w-12 h-12 text-primary" />
            ) : (
              <>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="absolute inset-0 border-2 border-primary border-t-transparent rounded-full"
                />
                <Sparkles className="w-10 h-10 text-primary animate-pulse" />
              </>
            )}
          </div>
          
          <h2 className="font-display font-bold text-2xl mb-8 h-8">
            <AnimatePresence mode="wait">
              <motion.span
                key={thinkingStage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="block text-foreground"
              >
                {isSubmitting ? "Processing..." : THINKING_STAGES[thinkingStage]}
              </motion.span>
            </AnimatePresence>
          </h2>

          {/* Animated Progress Line */}
          <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden mb-4 relative">
            {isComplete ? (
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: `${(thinkingStage / THINKING_STAGES.length) * 100}%` }}
                animate={{ width: `${((thinkingStage + 1) / THINKING_STAGES.length) * 100}%` }}
                transition={{ duration: 0.8, ease: "linear" }}
              />
            ) : (
              <motion.div 
                className="absolute inset-0 bg-primary/20"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              />
            )}
          </div>
          <p className="text-sm text-muted-foreground">AI is connecting the dots</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary/10">
      {/* Top Progress Bar */}
      <div className="h-1 bg-secondary w-full fixed top-0 z-50">
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div className="flex-1 flex flex-col max-w-3xl w-full mx-auto px-6 py-12 md:py-24">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button 
            onClick={handleBack}
            className={`flex items-center text-sm font-medium transition-all hover:translate-x-[-4px] ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </button>
          <span className="text-sm font-medium text-muted-foreground tracking-wider uppercase">
            {currentStep + 1} / {QUESTIONS.length}
          </span>
        </div>

        {/* Question Area */}
        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  {currentStep + 1}
                </span>
                <span className="text-primary font-medium tracking-wide text-sm">{currentQ.category}</span>
              </div>
              <h1 className="font-display font-bold text-3xl md:text-4xl mb-10 text-balance leading-tight">
                {currentQ.question}
              </h1>

              <div className="space-y-3">
                {currentQ.options.map((option, i) => {
                  const isSelected = answers[currentQ.id] === option;
                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleSelectOption(currentQ.id, option)}
                      className={`w-full text-left p-5 rounded-xl border-2 transition-all flex items-center gap-4 group ${
                        isSelected 
                          ? "border-primary bg-primary/5 text-primary" 
                          : "border-border hover:border-primary/40 text-foreground bg-card hover:bg-card/80"
                      }`}
                    >
                      <div className={`w-6 h-6 rounded border flex items-center justify-center text-xs font-bold transition-colors ${
                        isSelected ? "bg-primary text-primary-foreground border-primary" : "border-muted-foreground/30 text-muted-foreground group-hover:border-primary/40"
                      }`}>
                        {i + 1}
                      </div>
                      <span className={`flex-1 font-medium ${isSelected ? "text-primary" : "text-foreground"}`}>{option}</span>
                      {isSelected && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="mt-12 flex items-center justify-between">
          <div className="text-sm text-muted-foreground hidden sm:flex items-center gap-2">
            <span>Press <kbd className="px-2 py-1 bg-secondary rounded border border-border text-xs font-sans">1</kbd> - <kbd className="px-2 py-1 bg-secondary rounded border border-border text-xs font-sans">{currentQ.options.length}</kbd> to select</span>
            <span>or <kbd className="px-2 py-1 bg-secondary rounded border border-border text-xs font-sans">Enter</kbd> to continue</span>
          </div>
          
          <button
            onClick={handleNext}
            disabled={!hasAnsweredCurrent}
            className={`btn-primary px-8 py-4 ml-auto transition-all ${!hasAnsweredCurrent ? 'opacity-50 cursor-not-allowed scale-95' : 'hover:scale-105 active:scale-95 shadow-lg shadow-primary/20'}`}
          >
            {currentStep === QUESTIONS.length - 1 ? (
              "Submit Assessment"
            ) : (
              <>Continue <ArrowRight className="w-5 h-5 ml-2" /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
