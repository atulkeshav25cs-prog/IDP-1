"use client";

import { Bookmark } from "lucide-react";
import { useState } from "react";
import { toggleSavedCareer } from "@/actions/saved-careers.actions";
import { useRouter } from "next/navigation";

export default function SaveCareerButton({ careerId, initialSaved = false }: { careerId: string, initialSaved?: boolean }) {
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleToggle = async () => {
    setIsLoading(true);
    // Optimistic UI update
    setIsSaved(!isSaved);
    try {
      const result = await toggleSavedCareer(careerId);
      if (result.success) {
        setIsSaved(!!result.saved);
        router.refresh();
      } else {
        // Revert on failure
        setIsSaved(isSaved);
      }
    } catch (e) {
      setIsSaved(isSaved);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleToggle}
      disabled={isLoading}
      className={`p-2 rounded-lg transition-colors border ${isSaved ? 'bg-primary/10 border-primary/30 text-primary hover:bg-primary/20' : 'bg-background border-border text-muted-foreground hover:text-foreground hover:bg-secondary'}`}
      aria-label="Save Career"
    >
      <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-primary' : ''}`} />
    </button>
  );
}
