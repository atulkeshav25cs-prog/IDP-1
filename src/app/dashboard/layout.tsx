"use client";

import { useState } from "react";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import DashboardTopbar from "@/components/layout/DashboardTopbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop fixed, Mobile animated */}
      <div className={`fixed inset-y-0 left-0 z-50 transform lg:transform-none lg:opacity-100 transition duration-200 ease-in-out ${
        mobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 lg:translate-x-0"
      }`}>
        <DashboardSidebar />
      </div>

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <DashboardTopbar onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
