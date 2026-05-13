"use client";

import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { motion } from "framer-motion";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 group">
        <Logo className="w-8 h-8 group-hover:scale-105 transition-transform" />
        <span className="font-display font-bold text-xl text-foreground uppercase tracking-widest mt-0.5">Carevo</span>
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="font-display font-bold text-3xl text-foreground mb-2">
            Create an account
          </h1>
          <p className="text-muted-foreground">
            Join thousands of professionals finding clarity
          </p>
        </div>

        <div className="flex justify-center">
          <SignUp 
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
