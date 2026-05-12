"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
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

export default function AssessmentPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleSelectOption = (questionId: string, option: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = await submitAssessment(answers);
      if (result.success) {
        setIsComplete(true);
        setTimeout(() => {
          router.push("/dashboard/matches");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentQ = QUESTIONS[currentStep];
  const hasAnsweredCurrent = !!answers[currentQ.id];
  const progress = ((currentStep) / QUESTIONS.length) * 100;

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h2 className="font-display font-bold text-3xl mb-4">Analysis Complete!</h2>
          <p className="text-muted-foreground text-lg mb-8">We've found your perfect career matches.</p>
          <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Progress Bar */}
      <div className="h-1 bg-secondary w-full fixed top-0 z-50">
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="flex-1 flex flex-col max-w-3xl w-full mx-auto px-6 py-12 md:py-24">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button 
            onClick={handleBack}
            className={`flex items-center text-sm font-medium transition-opacity ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </button>
          <span className="text-sm font-medium text-muted-foreground">
            Step {currentStep + 1} of {QUESTIONS.length}
          </span>
        </div>

        {/* Question Area */}
        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <span className="badge-soft mb-6">{currentQ.category}</span>
              <h1 className="font-display font-bold text-3xl md:text-4xl mb-10 text-balance leading-tight">
                {currentQ.question}
              </h1>

              <div className="space-y-4">
                {currentQ.options.map((option, i) => {
                  const isSelected = answers[currentQ.id] === option;
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelectOption(currentQ.id, option)}
                      className={`w-full text-left p-5 rounded-xl border-2 transition-all ${
                        isSelected 
                          ? "border-primary bg-primary/5 text-primary font-semibold" 
                          : "border-border hover:border-primary/30 text-foreground bg-card shadow-sm hover:shadow-md"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="mt-auto pt-12 flex justify-end">
          <button
            onClick={handleNext}
            disabled={!hasAnsweredCurrent || isSubmitting}
            className={`btn-primary px-8 py-4 ${(!hasAnsweredCurrent || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Analyzing...</>
            ) : currentStep === QUESTIONS.length - 1 ? (
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
