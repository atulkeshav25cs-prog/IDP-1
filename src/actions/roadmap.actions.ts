"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function generateRoadmap(careerId: string) {
  try {
    const { userId } = await auth();
    const effectiveUserId = userId || "dummy_user_123";

    const user = await prisma.user.findUnique({
      where: { clerkId: effectiveUserId }
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    // Check if roadmap already exists
    const existing = await prisma.roadmap.findFirst({
      where: { userId: user.id, careerId }
    });

    if (existing) {
      return { success: true, roadmapId: existing.id };
    }

    // Simulate AI generation time
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Fetch the career to customize the roadmap
    const career = await prisma.career.findUnique({
      where: { id: careerId }
    });

    let content = [];

    // Simulate AI Generation with tailored mock data
    if (career?.title === "Software Engineer") {
      content = [
        { id: "se_1", title: "Master JavaScript & Python", description: "Learn core syntax, async programming, and basic data structures.", estimatedTime: "4-6 weeks", resources: ["FreeCodeCamp", "MDN Web Docs"] },
        { id: "se_2", title: "Data Structures & Algorithms", description: "Understand Big O notation, trees, graphs, and dynamic programming.", estimatedTime: "8-12 weeks", resources: ["LeetCode", "Cracking the Coding Interview"] },
        { id: "se_3", title: "System Design & Architecture", description: "Learn how to build scalable, distributed systems.", estimatedTime: "6-8 weeks", resources: ["ByteByteGo", "Grokking System Design"] },
        { id: "se_4", title: "Open Source & Portfolio", description: "Contribute to a major open source project and build a full-stack SaaS.", estimatedTime: "Ongoing", resources: ["GitHub", "Vercel"] }
      ];
    } else if (career?.title === "Medical Doctor") {
      content = [
        { id: "md_1", title: "Pre-Med & MCAT Prep", description: "Excel in biology and chemistry undergrad courses. Ace the MCAT.", estimatedTime: "3-4 years", resources: ["Khan Academy MCAT", "Kaplan"] },
        { id: "md_2", title: "Medical School (Pre-Clinical)", description: "Intense study of human anatomy, pharmacology, and pathology.", estimatedTime: "2 years", resources: ["Anki", "First Aid for USMLE"] },
        { id: "md_3", title: "Clinical Rotations", description: "Hands-on experience in surgery, pediatrics, and internal medicine.", estimatedTime: "2 years", resources: ["Hospital Placements"] },
        { id: "md_4", title: "Residency Match & Training", description: "Match into your desired specialty and complete grueling residency training.", estimatedTime: "3-7 years", resources: ["NRMP", "Attending Physicians"] }
      ];
    } else if (career?.title === "Esports Pro") {
      content = [
        { id: "esp_1", title: "Mechanical Mastery", description: "Perfect your aim, movement, and game-specific mechanics.", estimatedTime: "Daily 4-6 hours", resources: ["AimLab", "VOD Reviews"] },
        { id: "esp_2", title: "High ELO & Ranked Climbing", description: "Reach the top 0.1% of the ranked ladder to get scouted.", estimatedTime: "6-12 months", resources: ["Ranked Queue", "Meta Analysis"] },
        { id: "esp_3", title: "Scrims & Team Communication", description: "Join an amateur team. Learn shotcalling and macro strategy.", estimatedTime: "Ongoing", resources: ["Discord Scrims", "Coach Feedback"] },
        { id: "esp_4", title: "Streaming & Personal Branding", description: "Build a Twitch following to increase your value to organizations.", estimatedTime: "Ongoing", resources: ["Twitch", "Twitter/X"] }
      ];
    } else if (career?.title === "Investment Banker") {
      content = [
        { id: "ib_1", title: "Advanced Financial Modeling", description: "Master Excel, DCF models, and LBO analysis.", estimatedTime: "2-3 months", resources: ["Wall Street Prep", "Breaking Into Wall Street"] },
        { id: "ib_2", title: "Networking & Coffee Chats", description: "Aggressively network with alumni at boutique and bulge bracket banks.", estimatedTime: "Ongoing", resources: ["LinkedIn", "University Alumni"] },
        { id: "ib_3", title: "The Summer Analyst Internship", description: "Secure a junior summer role and survive the 80-hour work weeks.", estimatedTime: "3 months", resources: ["Internship", "Pitchbooks"] },
        { id: "ib_4", title: "Series 79 & Full-Time Associate", description: "Pass your licensing exams and transition to a full-time M&A role.", estimatedTime: "1-2 years", resources: ["FINRA", "Deal Experience"] }
      ];
    } else if (career?.title === "Product Manager") {
      content = [
        { id: "pm_1", title: "Agile & Scrum Methodologies", description: "Learn how to manage sprints, backlogs, and agile development teams.", estimatedTime: "2-3 weeks", resources: ["Scrum.org", "Atlassian Docs"] },
        { id: "pm_2", title: "User Research & Strategy", description: "Master customer interviews, persona creation, and product strategy.", estimatedTime: "4-6 weeks", resources: ["Lenny's Newsletter", "UX Research Guide"] },
        { id: "pm_3", title: "Data & Metrics", description: "Learn SQL, Mixpanel, and how to define north star metrics for a product.", estimatedTime: "4-8 weeks", resources: ["Amplitude Docs", "SQL for PMs"] },
        { id: "pm_4", title: "Case Studies & Interview Prep", description: "Prepare for PM case interviews and build a product tear-down portfolio.", estimatedTime: "Ongoing", resources: ["Cracking the PM Interview", "Exponent"] }
      ];
    } else if (career?.title === "UX Designer") {
      content = [
        { id: "ux_1", title: "UI Foundations & Typography", description: "Learn color theory, layout grids, and modern web typography.", estimatedTime: "3-4 weeks", resources: ["Refactoring UI", "Google Material Design"] },
        { id: "ux_2", title: "Mastering Figma", description: "Become an expert in Figma auto-layout, components, and prototyping.", estimatedTime: "4-6 weeks", resources: ["Figma Academy", "YouTube Tutorials"] },
        { id: "ux_3", title: "User Psychology & Wireframing", description: "Understand user flows, accessibility, and low-fidelity wireframing.", estimatedTime: "4-5 weeks", resources: ["Nielsen Norman Group", "Laws of UX"] },
        { id: "ux_4", title: "Dribbble Portfolio & Freelancing", description: "Build 3 massive case studies and start taking freelance clients.", estimatedTime: "Ongoing", resources: ["Dribbble", "Behance"] }
      ];
    } else if (career?.title === "Data Analyst") {
      content = [
        { id: "da_1", title: "SQL Mastery", description: "Learn complex JOINs, window functions, and database architecture.", estimatedTime: "4-6 weeks", resources: ["Mode SQL Tutorial", "HackerRank"] },
        { id: "da_2", title: "Python for Data Science", description: "Master Pandas, NumPy, and data manipulation in Python.", estimatedTime: "6-8 weeks", resources: ["Kaggle", "DataCamp"] },
        { id: "da_3", title: "Data Visualization", description: "Learn to build beautiful, insightful dashboards using Tableau or PowerBI.", estimatedTime: "3-5 weeks", resources: ["Tableau Public", "MakeoverMonday"] },
        { id: "da_4", title: "Statistics & A/B Testing", description: "Understand statistical significance and how to design experiments.", estimatedTime: "4-6 weeks", resources: ["Khan Academy Stats", "Optimizely Docs"] }
      ];
    } else if (career?.title === "Professional Athlete") {
      content = [
        { id: "ath_1", title: "Conditioning & Biomechanics", description: "Build elite core strength, agility, and injury prevention habits.", estimatedTime: "Daily", resources: ["Elite Strength Coaches", "Sports Physio"] },
        { id: "ath_2", title: "Sport-Specific Drills", description: "Thousands of hours refining the exact technical movements of your sport.", estimatedTime: "Daily", resources: ["Team Practices", "Skill Coaches"] },
        { id: "ath_3", title: "Nutrition & Recovery", description: "Master macros, sleep optimization, and active recovery techniques.", estimatedTime: "Ongoing", resources: ["Sports Dietitians", "Whoop/Oura"] },
        { id: "ath_4", title: "Combine & Scouting", description: "Perform at peak levels during scouting events or college combines.", estimatedTime: "Seasonal", resources: ["Scouting Camps", "Agent Networking"] }
      ];
    } else if (career?.title === "Game Developer") {
      content = [
        { id: "gd_1", title: "C# and Unity Basics", description: "Learn the fundamentals of the Unity engine and C# scripting.", estimatedTime: "6-8 weeks", resources: ["Unity Learn", "Brackeys"] },
        { id: "gd_2", title: "3D Math & Physics", description: "Understand vectors, quaternions, and rigid body physics.", estimatedTime: "4-6 weeks", resources: ["Khan Academy Math", "Game Dev Math"] },
        { id: "gd_3", title: "Shaders & Rendering", description: "Learn how to write custom shaders for stunning visual effects.", estimatedTime: "6-8 weeks", resources: ["Catlike Coding", "Shader Graph"] },
        { id: "gd_4", title: "Indie Release & Publishing", description: "Polish a small game and publish it on Steam or Itch.io.", estimatedTime: "3-6 months", resources: ["Steamworks", "Game Jams"] }
      ];
    } else if (career?.title === "Aerospace Scientist") {
      content = [
        { id: "aero_1", title: "Advanced Calculus & Physics", description: "Master the mathematical foundation of orbital mechanics and fluid dynamics.", estimatedTime: "2-3 years", resources: ["MIT OpenCourseWare", "University Degree"] },
        { id: "aero_2", title: "CAD & Structural Engineering", description: "Learn to design highly stress-resistant components using SolidWorks.", estimatedTime: "6-12 months", resources: ["SolidWorks Cert", "Engineering Forums"] },
        { id: "aero_3", title: "Propulsion Systems", description: "Deep dive into thermodynamics and jet/rocket propulsion engines.", estimatedTime: "1-2 years", resources: ["NASA Technical Reports"] },
        { id: "aero_4", title: "Clearance & Agency Work", description: "Attain security clearance and apply to NASA, SpaceX, or Lockheed Martin.", estimatedTime: "Ongoing", resources: ["USAJobs", "Industry Networking"] }
      ];
    } else {
      // Generic high-quality fallback
      content = [
        { id: "gen_1", title: "Foundations & Basics", description: `Learn the core principles and terminology of ${career?.title || 'this field'}.`, estimatedTime: "2-4 weeks", resources: ["Coursera", "YouTube Masterclass"] },
        { id: "gen_2", title: "Intermediate Skills & Tools", description: "Master the industry-standard software and methodologies.", estimatedTime: "4-8 weeks", resources: ["Udemy", "Official Documentation"] },
        { id: "gen_3", title: "Portfolio Building", description: "Create 3 real-world projects to showcase your abilities to employers.", estimatedTime: "4-6 weeks", resources: ["GitHub/Behance", "Case Studies"] },
        { id: "gen_4", title: "Interview Prep & Job Hunt", description: "Optimize your resume, practice mock interviews, and apply aggressively.", estimatedTime: "Ongoing", resources: ["LinkedIn", "Mock Interviews"] }
      ];
    }

    const roadmap = await prisma.roadmap.create({
      data: {
        userId: user.id,
        careerId,
        level: "Beginner",
        content: JSON.stringify(content)
      }
    });

    // Create initial progress entries
    for (const step of content) {
      await prisma.progress.create({
        data: {
          roadmapId: roadmap.id,
          stepId: step.id,
          status: "PENDING"
        }
      });
    }

    revalidatePath("/dashboard/roadmaps");
    return { success: true, roadmapId: roadmap.id };

  } catch (error) {
    console.error("Failed to generate roadmap:", error);
    return { success: false, error: "Failed to generate roadmap" };
  }
}
