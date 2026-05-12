import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-3xl mb-2">Account Settings</h1>
        <p className="text-muted-foreground">Manage your preferences, notifications, and subscription.</p>
      </div>
      <div className="premium-card p-12 text-center max-w-2xl mx-auto mt-12">
        <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
        <h2 className="font-display font-bold text-2xl mb-2">Preferences</h2>
        <p className="text-muted-foreground">Settings module is currently under construction.</p>
      </div>
    </div>
  );
}
