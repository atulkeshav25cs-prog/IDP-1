"use client";

import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative">
      <div className="mb-8">
        <Link href="/" className="flex items-center gap-2 group justify-center">
          <Logo className="w-8 h-8 group-hover:scale-105 transition-transform" />
          <span className="font-display font-bold text-xl text-foreground uppercase tracking-widest mt-0.5">Carevo</span>
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="font-display font-bold text-3xl text-foreground mb-2">
            Welcome back
          </h1>
          <p className="text-muted-foreground">
            Sign in to continue to your dashboard
          </p>
        </div>

        <div className="flex justify-center">
          <SignIn 
            appearance={{
              elements: {
                card: "shadow-sm border border-border rounded-2xl bg-card",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground",
                footerActionLink: "text-primary hover:text-primary/90",
              }
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
