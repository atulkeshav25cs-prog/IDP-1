"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Logo({ className = "w-8 h-8", forceDark = false }: { className?: string, forceDark?: boolean }) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // For server-side rendering or before hydration, use a generic class that can handle both via CSS
  // Or just rely on current theme if mounted
  const currentTheme = mounted ? resolvedTheme : "dark";
  const isDark = forceDark || currentTheme === "dark";

  return (
    <svg className={className} viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="carevo-c" x1="0" y1="0" x2="60" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#10b981" /> {/* Teal/Green */}
          <stop offset="100%" stopColor="#0ea5e9" /> {/* Light Blue */}
        </linearGradient>
        <linearGradient id="carevo-v" x1="50" y1="0" x2="110" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e3a8a" /> {/* Deep Blue */}
          <stop offset="100%" stopColor="#3b82f6" /> {/* Blue */}
        </linearGradient>
      </defs>
      {/* The 'C' shape */}
      <path 
        d="M 60 30 C 40 20, 15 25, 15 50 C 15 75, 40 85, 60 75" 
        stroke="url(#carevo-c)" 
        strokeWidth="12" 
        strokeLinecap="round" 
      />
      <path 
        d="M 25 35 C 35 25, 50 25, 60 30" 
        stroke="#10b981" 
        strokeWidth="12" 
        strokeLinecap="round" 
        className="opacity-80"
      />
      {/* The 'V' shape */}
      <path 
        d="M 50 25 L 75 80 L 105 20" 
        stroke={isDark ? "#60a5fa" : "url(#carevo-v)"} 
        strokeWidth="12" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* V inner line */}
      <path 
        d="M 90 25 L 75 60" 
        stroke="#10b981" 
        strokeWidth="12" 
        strokeLinecap="round" 
      />
    </svg>
  );
}
