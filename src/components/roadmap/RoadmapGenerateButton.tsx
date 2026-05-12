"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Route } from "lucide-react";
import { generateRoadmap } from "@/actions/roadmap.actions";

export default function RoadmapGenerateButton({ careerId, className }: { careerId: string, className?: string }) {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await generateRoadmap(careerId);
      if (res.success && res.roadmapId) {
        router.push(`/dashboard/roadmaps/${res.roadmapId}`);
      }
    } catch (error) {
      console.error(error);
      setIsGenerating(false);
    }
  };

  return (
    <button 
      onClick={handleGenerate}
      disabled={isGenerating}
      className={className || "btn-secondary text-sm px-4 py-2"}
    >
      {isGenerating ? (
        <><Loader2 className="w-4 h-4 mr-2 animate-spin inline-block" /> Generating AI Path...</>
      ) : (
        <><Route className="w-4 h-4 mr-2 inline-block" /> Generate Roadmap</>
      )}
    </button>
  );
}
