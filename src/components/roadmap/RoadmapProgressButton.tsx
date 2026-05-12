"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";
import { markStepComplete } from "@/actions/progress.actions";

export default function RoadmapProgressButton({ 
  progressId, 
  isCompleted,
  disabled
}: { 
  progressId: string;
  isCompleted: boolean;
  disabled: boolean;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    if (!progressId || disabled) return;
    setIsLoading(true);
    try {
      await markStepComplete(progressId, !isCompleted);
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isCompleted) {
    return (
      <button 
        onClick={handleToggle}
        disabled={isLoading}
        className="flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
      >
        {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle2 className="w-4 h-4 mr-2" />}
        Completed
      </button>
    );
  }

  return (
    <button 
      onClick={handleToggle}
      disabled={disabled || isLoading}
      className={`btn-primary w-full justify-center ${disabled ? 'opacity-50 cursor-not-allowed bg-secondary text-muted-foreground border-transparent' : ''}`}
    >
      {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
      {disabled ? "Locked" : "Mark as Complete"}
    </button>
  );
}
