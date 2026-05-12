import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Target, Briefcase, TrendingUp, ChevronRight } from "lucide-react";
import Link from "next/link";
import RoadmapGenerateButton from "@/components/roadmap/RoadmapGenerateButton";

export default async function MatchesPage() {
  const { userId } = await auth();
  const effectiveUserId = userId || "dummy_user_123";

  // Fetch user from DB to get their DB ID
  const user = await prisma.user.findUnique({
    where: { clerkId: effectiveUserId }
  });

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="font-display font-bold text-2xl mb-4">No Assessment Data Found</h2>
        <p className="text-muted-foreground mb-8">Take the career assessment to generate your matches.</p>
        <Link href="/assess" className="btn-primary">Take Assessment</Link>
      </div>
    );
  }

  // Fetch their career matches
  const matches = await prisma.careerMatch.findMany({
    where: { userId: user.id },
    include: { career: true },
    orderBy: { matchScore: 'desc' }
  });

  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="font-display font-bold text-2xl mb-4">No Matches Generated Yet</h2>
        <p className="text-muted-foreground mb-8">Complete your assessment to unlock your personalized career paths.</p>
        <Link href="/assess" className="btn-primary">Start Assessment</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-3xl mb-2">Your Career Matches</h1>
        <p className="text-muted-foreground">Based on your assessment, here are the paths where you'll thrive.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match, index) => (
          <div 
            key={match.id} 
            className="premium-card p-6 flex flex-col h-full hover:border-primary/20 transition-colors group animate-fade-in-up"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">{match.career.title}</h3>
                  <span className="text-xs text-muted-foreground">{match.career.category}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="block font-bold text-xl text-primary">{match.matchScore}%</span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Match</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">
              {match.matchReason}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 rounded-lg bg-secondary/50 border border-border/50">
                <span className="text-xs text-muted-foreground block mb-1">Salary</span>
                <span className="font-semibold text-sm text-foreground">
                  ${(match.career.salaryMin / 1000).toFixed(0)}k - ${(match.career.salaryMax / 1000).toFixed(0)}k
                </span>
              </div>
              <div className="p-3 rounded-lg bg-secondary/50 border border-border/50">
                <span className="text-xs text-muted-foreground block mb-1">Demand</span>
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-primary" />
                  <span className="font-semibold text-sm text-foreground">{match.career.demandLevel}</span>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <RoadmapGenerateButton 
                careerId={match.careerId} 
                className="btn-secondary w-full flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all" 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
