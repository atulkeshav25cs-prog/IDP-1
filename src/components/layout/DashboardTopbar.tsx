"use client";

import { useState, useRef, useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import { Bell, Menu, Search, X, MessageSquare, Briefcase, ChevronRight } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardTopbar({ 
  onMenuClick 
}: { 
  onMenuClick: () => void 
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchResults = [
    { title: "Product Manager Roadmap", type: "Roadmap", link: "/dashboard/roadmaps", icon: Briefcase },
    { title: "Technical Interview Prep", type: "AI Chat", link: "/dashboard/chat", icon: MessageSquare },
  ];

  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8 transition-colors">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        {/* Search */}
        <div className="hidden md:block relative" ref={searchRef}>
          <div className="relative flex items-center">
            <Search className="w-4 h-4 absolute left-3 text-muted-foreground" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search careers, skills, roadmaps..." 
              className="pl-9 pr-8 py-2 bg-secondary border border-border focus:border-primary focus:bg-background rounded-full text-sm outline-none transition-all w-64 focus:w-80"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <AnimatePresence>
            {isSearchFocused && searchQuery && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 mt-2 w-full max-w-sm bg-popover border border-border rounded-xl shadow-lg overflow-hidden z-50"
              >
                <div className="p-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-secondary/50">
                  Search Results
                </div>
                <div className="p-2 flex flex-col gap-1">
                  {searchResults.map((res, i) => (
                    <Link 
                      key={i} 
                      href={res.link}
                      onClick={() => setIsSearchFocused(false)}
                      className="flex items-center justify-between p-2 hover:bg-secondary rounded-lg group transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                          <res.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-foreground">{res.title}</div>
                          <div className="text-xs text-muted-foreground">{res.type}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <ThemeToggle />
        
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-2 rounded-lg transition-colors ${showNotifications ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary/80 hover:text-foreground'}`}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-background"></span>
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full right-0 mt-2 w-80 bg-popover border border-border rounded-xl shadow-lg overflow-hidden z-50 origin-top-right"
              >
                <div className="p-4 border-b border-border flex items-center justify-between bg-card">
                  <h3 className="font-bold text-foreground">Notifications</h3>
                  <button className="text-xs text-primary font-medium hover:underline">Mark all as read</button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  <div className="p-4 border-b border-border hover:bg-secondary/50 transition-colors cursor-pointer">
                    <p className="text-sm font-medium text-foreground mb-1">New Career Match!</p>
                    <p className="text-xs text-muted-foreground">Based on your recent skills update, you are a 92% match for Product Manager.</p>
                    <span className="text-[10px] text-muted-foreground mt-2 block">2 hours ago</span>
                  </div>
                  <div className="p-4 hover:bg-secondary/50 transition-colors cursor-pointer">
                    <p className="text-sm font-medium text-foreground mb-1">Roadmap Milestone</p>
                    <p className="text-xs text-muted-foreground">You completed Phase 1 of the UX Designer roadmap. Great job!</p>
                    <span className="text-[10px] text-muted-foreground mt-2 block">Yesterday</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="h-6 w-px bg-border hidden sm:block"></div>
        
        <div className="flex items-center gap-2 pl-2">
          <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "w-8 h-8 ring-2 ring-transparent hover:ring-primary/20 transition-all" } }} />
        </div>
      </div>
    </header>
  );
}
