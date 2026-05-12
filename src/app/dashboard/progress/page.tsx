import { TrendingUp } from "lucide-react";

export default function ProgressPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-3xl mb-2">Learning Progress</h1>
        <p className="text-muted-foreground">Detailed analytics of your roadmap progression.</p>
      </div>
      <div className="premium-card p-12 text-center max-w-2xl mx-auto mt-12">
        <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
        <h2 className="font-display font-bold text-2xl mb-2">Coming Soon</h2>
        <p className="text-muted-foreground">Detailed charts and analytics for your skill progression are being built.</p>
      </div>
    </div>
  );
}
