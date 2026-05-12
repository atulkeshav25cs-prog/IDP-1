"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { 
  LayoutDashboard, ClipboardList, Briefcase, 
  MessageSquare, Route, TrendingUp, Bookmark, 
  User, Settings 
} from "lucide-react";

const SIDEBAR_LINKS = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Assessments", href: "/dashboard/assessments", icon: ClipboardList },
  { name: "Career Matches", href: "/dashboard/matches", icon: Briefcase },
  { name: "Roadmaps", href: "/dashboard/roadmaps", icon: Route },
  { name: "AI Counselor", href: "/dashboard/chat", icon: MessageSquare },
  { name: "Progress", href: "/dashboard/progress", icon: TrendingUp },
  { name: "Saved Careers", href: "/dashboard/saved", icon: Bookmark },
];

const BOTTOM_LINKS = [
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-card h-screen fixed top-0 left-0 flex flex-col z-40 hidden lg:flex">
      {/* Brand */}
      <div className="h-16 border-b border-border flex items-center px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center text-white font-bold text-xs">
            CA
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-foreground">
            CareerAI
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
          Menu
        </div>
        {SIDEBAR_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? "bg-secondary text-primary font-semibold" 
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-primary" : ""}`} />
              {link.name}
            </Link>
          );
        })}

        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2 mt-6">
          Account
        </div>
        {BOTTOM_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? "bg-secondary text-primary font-semibold" 
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-primary" : ""}`} />
              {link.name}
            </Link>
          );
        })}
      </div>

      {/* User Profile Footer */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3 px-2">
          <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground leading-tight">My Account</span>
            <span className="text-xs text-muted-foreground">Manage profile</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
