import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { CheckCircle2, Circle, Clock, BookOpen, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import RoadmapTimeline from "@/components/roadmap/RoadmapTimeline";

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

      <RoadmapTimeline content={content} progress={roadmap.progress} completedSteps={completedSteps} />
    </div>
  );
}
