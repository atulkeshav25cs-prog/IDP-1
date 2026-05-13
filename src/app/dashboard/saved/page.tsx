import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Bookmark, Briefcase, TrendingUp, Search } from "lucide-react";
import Link from "next/link";
import RoadmapGenerateButton from "@/components/roadmap/RoadmapGenerateButton";
import SaveCareerButton from "@/components/dashboard/SaveCareerButton";

export default async function SavedCareersPage() {
  const { userId } = await auth();
  const effectiveUserId = userId || "dummy_user_123";

  const user = await prisma.user.findUnique({
    where: { clerkId: effectiveUserId }
  });

  if (!user) {
    return null;
  }

  // Fetch saved careers along with the career details and the user's match score for that career if it exists
  const savedCareers = await prisma.savedCareer.findMany({
    where: { userId: user.id },
    include: { career: true },
    orderBy: { createdAt: 'desc' }
  });

  // Fetch match scores for these careers
  const careerIds = savedCareers.map(sc => sc.careerId);
  const matches = await prisma.careerMatch.findMany({
    where: { userId: user.id, careerId: { in: careerIds } }
  });
  
  const matchMap = new Map(matches.map(m => [m.careerId, m.matchScore]));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-3xl mb-2">Saved Careers</h1>
        <p className="text-muted-foreground">Careers you've bookmarked for later review.</p>
      </div>

      {savedCareers.length === 0 ? (
        <div className="premium-card p-12 text-center max-w-2xl mx-auto mt-12">
          <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h2 className="font-display font-bold text-2xl mb-2">No Saved Careers</h2>
          <p className="text-muted-foreground mb-8">You haven't bookmarked any careers yet. Explore your matches and save the ones you like.</p>
          <Link href="/dashboard/matches" className="btn-primary">View Matches</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedCareers.map((saved, index) => {
            const career = saved.career;
            const matchScore = matchMap.get(career.id);

            return (
              <div 
                key={saved.id} 
                className="premium-card p-6 flex flex-col h-full hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight">{career.title}</h3>
                      <span className="text-xs text-muted-foreground">{career.category}</span>
                    </div>
                  </div>
                  {matchScore && (
                    <div className="text-right shrink-0">
                      <span className="block font-bold text-2xl text-primary">{matchScore}%</span>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Match</span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow line-clamp-3">
                  {career.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-secondary/30 border border-border/50 group-hover:bg-secondary/60 transition-colors">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">Salary</span>
                    <span className="font-semibold text-sm text-foreground">
                      ${(career.salaryMin / 1000).toFixed(0)}k - ${(career.salaryMax / 1000).toFixed(0)}k
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-secondary/30 border border-border/50 group-hover:bg-secondary/60 transition-colors">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">Demand</span>
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-primary" />
                      <span className="font-semibold text-sm text-foreground">{career.demandLevel}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto flex items-center gap-3">
                  <RoadmapGenerateButton 
                    careerId={career.id} 
                    className="btn-secondary flex-1 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300" 
                  />
                  <SaveCareerButton careerId={career.id} initialSaved={true} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
