import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Target, Briefcase, TrendingUp, Sparkles, Scale, Search } from "lucide-react";
import Link from "next/link";
import RoadmapGenerateButton from "@/components/roadmap/RoadmapGenerateButton";
import CareerMatchVisualization from "@/components/dashboard/CareerMatchVisualization";
import SaveCareerButton from "@/components/dashboard/SaveCareerButton";

export default async function MatchesPage() {
  const { userId } = await auth();
  const effectiveUserId = userId || "dummy_user_123";

  // Fetch user from DB to get their DB ID
  const user = await prisma.user.findUnique({
    where: { clerkId: effectiveUserId }
  });

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center max-w-lg mx-auto">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <Search className="w-10 h-10 text-primary" />
        </div>
        <h2 className="font-display font-bold text-3xl mb-4">Discover Your Path</h2>
        <p className="text-muted-foreground mb-8 text-lg">Take our AI-powered assessment to reveal careers perfectly matched to your unique personality and skills.</p>
        <Link href="/assess" className="btn-primary w-full sm:w-auto px-8 py-4 text-base">
          Start Assessment Now
        </Link>
      </div>
    );
  }

  // Fetch their career matches
  const matches = await prisma.careerMatch.findMany({
    where: { userId: user.id },
    include: { career: true },
    orderBy: { matchScore: 'desc' }
  });

  // Fetch saved careers
  const savedCareers = await prisma.savedCareer.findMany({
    where: { userId: user.id },
    select: { careerId: true }
  });
  const savedCareerIds = new Set(savedCareers.map(sc => sc.careerId));

  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center max-w-lg mx-auto">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 relative">
          <div className="absolute inset-0 border-2 border-primary border-dashed rounded-full animate-[spin_10s_linear_infinite]" />
          <Sparkles className="w-10 h-10 text-primary" />
        </div>
        <h2 className="font-display font-bold text-3xl mb-4">Awaiting Analysis</h2>
        <p className="text-muted-foreground mb-8 text-lg">Your profile is ready. Complete the assessment to unlock your personalized AI career recommendations.</p>
        <Link href="/assess" className="btn-primary w-full sm:w-auto px-8 py-4 text-base">
          Take Assessment
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 className="font-display font-bold text-3xl mb-2">Career Analysis</h1>
          <p className="text-muted-foreground">Based on your assessment, here are the paths where you'll thrive.</p>
        </div>
        <Link href="/dashboard/compare" className="btn-secondary whitespace-nowrap">
          <Scale className="w-4 h-4 mr-2" />
          Compare Careers
        </Link>
      </div>

      <CareerMatchVisualization />

      <div>
        <h2 className="font-display font-bold text-2xl mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-primary" />
          Top Recommendations
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match, index) => (
            <div 
              key={match.id} 
              className="premium-card p-6 flex flex-col h-full hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg leading-tight">{match.career.title}</h3>
                    <span className="text-xs text-muted-foreground">{match.career.category}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="block font-bold text-2xl text-primary">{match.matchScore}%</span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Match</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">
                {match.matchReason}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 rounded-xl bg-secondary/30 border border-border/50 group-hover:bg-secondary/60 transition-colors">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">Salary</span>
                  <span className="font-semibold text-sm text-foreground">
                    ${(match.career.salaryMin / 1000).toFixed(0)}k - ${(match.career.salaryMax / 1000).toFixed(0)}k
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-secondary/30 border border-border/50 group-hover:bg-secondary/60 transition-colors">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">Demand</span>
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-primary" />
                    <span className="font-semibold text-sm text-foreground">{match.career.demandLevel}</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto flex items-center gap-3">
                <RoadmapGenerateButton 
                  careerId={match.careerId} 
                  className="btn-secondary flex-1 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300" 
                />
                <SaveCareerButton careerId={match.careerId} initialSaved={savedCareerIds.has(match.careerId)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
