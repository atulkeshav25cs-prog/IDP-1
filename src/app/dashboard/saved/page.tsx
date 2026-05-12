import { Bookmark } from "lucide-react";
import Link from "next/link";

export default function SavedCareersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-3xl mb-2">Saved Careers</h1>
        <p className="text-muted-foreground">Careers you've bookmarked for later review.</p>
      </div>
      <div className="premium-card p-12 text-center max-w-2xl mx-auto mt-12">
        <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
        <h2 className="font-display font-bold text-2xl mb-2">No Saved Careers</h2>
        <p className="text-muted-foreground mb-8">You haven't bookmarked any careers yet. Explore your matches and save the ones you like.</p>
        <Link href="/dashboard/matches" className="btn-primary">View Matches</Link>
      </div>
    </div>
  );
}
