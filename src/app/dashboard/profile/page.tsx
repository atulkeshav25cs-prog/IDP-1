import { User } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-3xl mb-2">My Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and resume data.</p>
      </div>
      <div className="premium-card p-12 text-center max-w-2xl mx-auto mt-12">
        <User className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
        <h2 className="font-display font-bold text-2xl mb-2">Profile Details</h2>
        <p className="text-muted-foreground">This feature is powered by Clerk Auth. You can manage your profile by clicking your avatar in the sidebar.</p>
      </div>
    </div>
  );
}
