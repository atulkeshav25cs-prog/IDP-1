import { ClipboardList } from "lucide-react";
import Link from "next/link";

export default function AssessmentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-3xl mb-2">Your Assessments</h1>
        <p className="text-muted-foreground">View your past career assessments and retake them.</p>
      </div>
      <div className="premium-card p-12 text-center max-w-2xl mx-auto mt-12">
        <ClipboardList className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
        <h2 className="font-display font-bold text-2xl mb-2">Assessment History</h2>
        <p className="text-muted-foreground mb-8">You have completed your initial assessment. Check your matches or retake it to update your profile.</p>
        <Link href="/assess" className="btn-primary">Retake Assessment</Link>
      </div>
    </div>
  );
}
