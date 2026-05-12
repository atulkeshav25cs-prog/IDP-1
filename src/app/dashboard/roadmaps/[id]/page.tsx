import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { CheckCircle2, Circle, Clock, BookOpen, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import RoadmapProgressButton from "@/components/roadmap/RoadmapProgressButton";

export default async function RoadmapDetailPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const resolvedParams = await params;
  
  const { userId } = await auth();
  const effectiveUserId = userId || "dummy_user_123";

  const user = await prisma.user.findUnique({
    where: { clerkId: effectiveUserId }
  });

  if (!user) return <div>Please sign in</div>;

  const roadmap = await prisma.roadmap.findFirst({
    where: { id: resolvedParams.id, userId: user.id },
    include: { career: true, progress: true }
  });

  if (!roadmap) return notFound();

  let content;
  try {
    content = JSON.parse(roadmap.content as string);
  } catch (e) {
    content = [];
  }

  const completedSteps = roadmap.progress.filter(p => p.status === "COMPLETED").length;
  const totalSteps = content.length;
  const percent = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  return (
    <div className="space-y-8 max-w-4xl">
      <Link href="/dashboard/roadmaps" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Roadmaps
      </Link>

      <div className="premium-card p-8 bg-card relative overflow-hidden border-primary/10">
        <div className="absolute right-0 top-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10">
          <span className="badge-soft mb-4">{roadmap.level} Path</span>
          <h1 className="font-display font-bold text-3xl mb-4 text-foreground">{roadmap.career.title} Master Roadmap</h1>
          <p className="text-muted-foreground mb-8 max-w-2xl text-lg">Follow this AI-curated step-by-step path to acquire the necessary skills and launch your career as a {roadmap.career.title}.</p>
          
          <div className="flex items-center gap-4">
            <div className="w-full max-w-md h-3 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${percent}%` }} />
            </div>
            <span className="text-sm font-bold text-primary">{percent}% Complete</span>
          </div>
        </div>
      </div>

      <div className="mt-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-border before:via-border before:to-transparent space-y-8">
        {content.map((step: any, index: number) => {
          const progressData = roadmap.progress.find(p => p.stepId === step.id);
          const isCompleted = progressData?.status === "COMPLETED";
          const isActive = index === completedSteps; // The current step they are on
          
          return (
            <div key={step.id} className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group">
              {/* Timeline Marker */}
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-card shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10 transition-colors ${
                isCompleted ? 'bg-primary border-primary/20 text-white' : isActive ? 'border-primary text-primary' : 'text-muted-foreground'
              }`}>
                {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <span className="font-bold text-sm">{index + 1}</span>}
              </div>

              {/* Content Card */}
              <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] premium-card p-6 transition-all ${
                isActive ? 'border-primary shadow-md scale-[1.02]' : isCompleted ? 'opacity-70' : ''
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>Phase {index + 1}</span>
                  <div className="flex items-center text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-md ml-auto">
                    <Clock className="w-3 h-3 mr-1" /> {step.estimatedTime}
                  </div>
                </div>
                
                <h3 className={`font-display font-bold text-xl mb-3 ${isCompleted ? 'text-foreground/80' : 'text-foreground'}`}>{step.title}</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{step.description}</p>
                
                <div className="space-y-3 mb-6">
                  <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> Learning Resources</h4>
                  <ul className="space-y-2">
                    {step.resources.map((res: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground bg-secondary/30 p-2 rounded-md">
                        <ExternalLink className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="hover:text-foreground cursor-pointer transition-colors">{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-border">
                  <RoadmapProgressButton 
                    progressId={progressData?.id || ""} 
                    isCompleted={isCompleted} 
                    disabled={!isActive && !isCompleted && index !== 0} 
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
