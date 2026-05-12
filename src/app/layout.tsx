import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CareerAI — Find Your True Calling",
  description: "AI-powered personalized career guidance platform for students and professionals.",
};

import { ClerkProvider } from '@clerk/nextjs'

import { ThemeProvider } from "@/components/ThemeProvider";

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
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
