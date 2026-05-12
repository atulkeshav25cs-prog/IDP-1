"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitAssessment(answers: Record<string, any>) {
  try {
    const { userId } = await auth();
    
    // For local testing without valid Clerk keys, use a dummy userId if null
    const effectiveUserId = userId || "dummy_user_123";

    // Ensure user exists in our DB (upsert)
    let user = await prisma.user.findUnique({
      where: { clerkId: effectiveUserId }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          clerkId: effectiveUserId,
          email: `${effectiveUserId}@example.com`, // Dummy email
        }
      });
    }

    // Create new assessment record
    const assessment = await prisma.assessment.create({
      data: {
        userId: user.id,
        status: "COMPLETED",
        completedAt: new Date(),
      }
    });

    // We don't have predefined Questions seeded yet, 
    // so in a real app we would map answers to Question IDs.
    // For now, we will just store the raw JSON in the database in a generic way,
    // or simulate generating CareerMatches directly based on the submission.
    
    // Simulate AI Processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate Mock Career Matches based on submission
    const allCareers = await ensureMockCareersExist();
    
    // Analyze answers to pick the best careers
    let matchedCareers = [...allCareers];
    const a1 = answers["q1"] || "";
    const a2 = answers["q2"] || "";
    const a3 = answers["q3"] || "";
    const a4 = answers["q4"] || "";
    const a5 = answers["q5"] || "";

    // Simple keyword matching for the mock AI
    if (a1.includes("Technology") || a3.includes("desk")) {
      matchedCareers = allCareers.filter(c => ["Software Engineer", "Game Developer", "Product Manager"].includes(c.title));
    } else if (a1.includes("Biology") || a4.includes("laboratory")) {
      matchedCareers = allCareers.filter(c => ["Medical Doctor", "Aerospace Scientist", "Data Analyst"].includes(c.title));
    } else if (a1.includes("Finance") || a2.includes("climb")) {
      matchedCareers = allCareers.filter(c => ["Investment Banker", "Product Manager", "Data Analyst"].includes(c.title));
    } else if (a1.includes("gaming") || a3.includes("reflexes")) {
      matchedCareers = allCareers.filter(c => ["Esports Pro", "Game Developer", "UX Designer"].includes(c.title));
    } else if (a1.includes("Physical sports") || a3.includes("physical exertion")) {
      matchedCareers = allCareers.filter(c => ["Professional Athlete", "Esports Pro", "Investment Banker"].includes(c.title));
    }

    // Fallback if filtering resulted in empty array
    if (matchedCareers.length === 0) {
      matchedCareers = allCareers.slice(0, 3);
    } else {
      matchedCareers = matchedCareers.slice(0, 3); // Top 3
    }

    // Delete any existing mock matches for this user to allow retaking the assessment
    await prisma.careerMatch.deleteMany({
      where: { userId: user.id }
    });

    for (const career of matchedCareers) {
      await prisma.careerMatch.create({
        data: {
          userId: user.id,
          careerId: career.id,
          matchScore: Math.floor(Math.random() * 15) + 80, // 80-95 score
          matchReason: `Based on your answers indicating a preference for ${a1.split(",")[0].toLowerCase()} and ${a3.split(" ")[0].toLowerCase()} environments, this career is a highly compatible fit for your goals.`,
        }
      });
    }

    revalidatePath("/dashboard");
    return { success: true, assessmentId: assessment.id };

  } catch (error) {
    console.error("Failed to submit assessment:", error);
    return { success: false, error: "Failed to process assessment" };
  }
}

async function ensureMockCareersExist() {
  const count = await prisma.career.count();
  if (count < 10) {
    // Delete existing limited mock careers to re-seed the full list
    await prisma.career.deleteMany();
    
    // Seed expanded diverse careers
    await prisma.career.createMany({
      data: [
        {
          title: "Software Engineer",
          category: "Technology",
          description: "Design, develop, and maintain complex software systems.",
          salaryMin: 90000,
          salaryMax: 200000,
          demandLevel: "Very High",
          growthPotential: "Excellent",
          requiredSkills: JSON.stringify(["Algorithms", "System Design", "JavaScript/Python"]),
        },
        {
          title: "Medical Doctor",
          category: "Healthcare",
          description: "Diagnose illnesses, prescribe treatments, and improve patient health.",
          salaryMin: 150000,
          salaryMax: 400000,
          demandLevel: "Very High",
          growthPotential: "Stable",
          requiredSkills: JSON.stringify(["Anatomy", "Diagnostics", "Empathy"]),
        },
        {
          title: "Investment Banker",
          category: "Finance",
          description: "Help corporate clients raise capital and manage mergers & acquisitions.",
          salaryMin: 120000,
          salaryMax: 350000,
          demandLevel: "High",
          growthPotential: "Excellent",
          requiredSkills: JSON.stringify(["Financial Modeling", "Negotiation", "High Stress Tolerance"]),
        },
        {
          title: "Esports Pro",
          category: "Entertainment",
          description: "Compete at the highest level in professional gaming tournaments.",
          salaryMin: 50000,
          salaryMax: 500000,
          demandLevel: "Medium",
          growthPotential: "Volatile",
          requiredSkills: JSON.stringify(["Fast Reflexes", "Strategy", "Team Communication"]),
        },
        {
          title: "Professional Athlete",
          category: "Sports",
          description: "Train rigorously and compete in physical sports professionally.",
          salaryMin: 60000,
          salaryMax: 1000000,
          demandLevel: "Low",
          growthPotential: "Volatile",
          requiredSkills: JSON.stringify(["Peak Physical Fitness", "Discipline", "Mental Toughness"]),
        },
        {
          title: "Aerospace Scientist",
          category: "STEM",
          description: "Research and design aircraft, spacecraft, and advanced propulsion.",
          salaryMin: 100000,
          salaryMax: 180000,
          demandLevel: "High",
          growthPotential: "Strong",
          requiredSkills: JSON.stringify(["Physics", "Mathematics", "Engineering Design"]),
        },
        {
          title: "Game Developer",
          category: "Technology",
          description: "Create immersive digital worlds and interactive entertainment.",
          salaryMin: 70000,
          salaryMax: 140000,
          demandLevel: "High",
          growthPotential: "Strong",
          requiredSkills: JSON.stringify(["C++ / C#", "Game Engines (Unity/Unreal)", "Creativity"]),
        },
        {
          title: "Product Manager",
          category: "Management",
          description: "Guide product strategy from conception to launch.",
          salaryMin: 90000,
          salaryMax: 160000,
          demandLevel: "Very High",
          growthPotential: "Excellent",
          requiredSkills: JSON.stringify(["Agile", "Strategy", "Communication"]),
        },
        {
          title: "Data Analyst",
          category: "Data",
          description: "Analyze complex datasets to drive business decisions.",
          salaryMin: 70000,
          salaryMax: 120000,
          demandLevel: "High",
          growthPotential: "Strong",
          requiredSkills: JSON.stringify(["SQL", "Python", "Tableau"]),
        },
        {
          title: "UX Designer",
          category: "Design",
          description: "Create user-centric interfaces and experiences.",
          salaryMin: 75000,
          salaryMax: 130000,
          demandLevel: "High",
          growthPotential: "Steady",
          requiredSkills: JSON.stringify(["Figma", "Research", "Prototyping"]),
        }
      ]
    });
  }
  return prisma.career.findMany();
}
