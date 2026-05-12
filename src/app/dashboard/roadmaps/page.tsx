import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Route, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import RoadmapGenerateButton from "@/components/roadmap/RoadmapGenerateButton";

export default async function RoadmapsPage() {
  const { userId } = await auth();
  const effectiveUserId = userId || "dummy_user_123";

  const user = await prisma.user.findUnique({
    where: { clerkId: effectiveUserId }
  });

  if (!user) {
    return <div>Please sign in.</div>;
  }

  const roadmaps = await prisma.roadmap.findMany({
    where: { userId: user.id },
    include: { 
      career: true,
      progress: true 
    },
    orderBy: { createdAt: 'desc' }
  });

  // Also fetch matches so we can suggest generating a roadmap
  const matches = await prisma.careerMatch.findMany({
    where: { userId: user.id },
    include: { career: true },
    take: 3
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-3xl mb-2">Your Roadmaps</h1>
        <p className="text-muted-foreground">Track your progress and follow your AI-generated learning paths.</p>
      </div>

      {roadmaps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmaps.map(roadmap => {
            const completedSteps = roadmap.progress.filter(p => p.status === "COMPLETED").length;
            const totalSteps = roadmap.progress.length;
            const percent = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

            return (
              <Link key={roadmap.id} href={`/dashboard/roadmaps/${roadmap.id}`}>
                <div className="premium-card p-6 flex flex-col h-full hover:border-primary/20 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Route className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{roadmap.career.title}</h3>
                      <span className="text-xs text-muted-foreground">{roadmap.level} Path</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Progress</span>
                      <span className="text-primary">{percent}%</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${percent}%` }} />
                    </div>
                    <p className="text-xs text-muted-foreground pt-1">{completedSteps} of {totalSteps} steps completed</p>
                  </div>

                  <div className="mt-auto flex items-center text-sm font-medium text-primary">
                    Continue Learning <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="premium-card p-12 text-center max-w-2xl mx-auto mt-12">
          <Route className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h2 className="font-display font-bold text-2xl mb-2">No Roadmaps Yet</h2>
          <p className="text-muted-foreground mb-8">You haven't generated any learning paths yet. Generate one from your career matches below!</p>
        </div>
      )}

      {matches.length > 0 && (
        <div className="mt-12">
          <h2 className="font-display font-bold text-xl mb-6">Suggested Paths from Matches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matches.map(match => {
              // Don't show if roadmap already exists
              const hasRoadmap = roadmaps.some(r => r.careerId === match.careerId);
              if (hasRoadmap) return null;

              return (
                <div key={match.id} className="premium-card p-5 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold">{match.career.title}</h4>
                    <span className="text-sm text-muted-foreground">{match.matchScore}% Match</span>
                  </div>
                  <RoadmapGenerateButton careerId={match.careerId} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
