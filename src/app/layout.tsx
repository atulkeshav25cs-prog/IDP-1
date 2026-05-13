import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Carevo — Discover Careers That Fit You",
  description: "AI-powered personalized career guidance platform. Discover Careers That Fit You.",
};

import { ClerkProvider } from '@clerk/nextjs'

import { ThemeProvider } from "@/components/ThemeProvider";
import FloatingAIAssistant from "@/components/ui/FloatingAIAssistant";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="antialiased min-h-screen bg-background text-foreground transition-colors duration-300">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <FloatingAIAssistant />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
