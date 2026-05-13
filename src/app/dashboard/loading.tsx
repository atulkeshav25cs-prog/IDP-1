"use client";

import { motion } from "framer-motion";

export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div>
        <div className="h-10 w-64 bg-secondary/80 rounded-lg mb-4"></div>
        <div className="h-5 w-96 bg-secondary/50 rounded-md"></div>
      </div>

      {/* Metrics Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="premium-card p-6 h-36 bg-card border-border/50">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-secondary/80"></div>
              <div className="h-6 w-24 bg-secondary/50 rounded-full"></div>
            </div>
            <div>
              <div className="h-8 w-16 bg-secondary/80 rounded-md mb-2"></div>
              <div className="h-4 w-32 bg-secondary/50 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area Skeleton */}
        <div className="lg:col-span-2 space-y-8">
          <div className="premium-card p-8 h-64 bg-secondary/30 border-border/50"></div>
          
          <div>
            <div className="flex justify-between items-end mb-6">
              <div className="h-6 w-48 bg-secondary/80 rounded-md"></div>
              <div className="h-4 w-20 bg-secondary/50 rounded-md"></div>
            </div>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="premium-card p-5 h-20 bg-card border-border/50"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-8">
          <div className="premium-card p-6 min-h-[400px] bg-card border-border/50">
            <div className="h-6 w-32 bg-secondary/80 rounded-md mb-8"></div>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/80 shrink-0"></div>
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-4 w-full bg-secondary/60 rounded-md"></div>
                    <div className="h-3 w-24 bg-secondary/40 rounded-md"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
