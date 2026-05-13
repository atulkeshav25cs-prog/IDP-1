"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import Groq from "groq-sdk";

const groq = new Groq({ 
  apiKey: process.env.GROQ_API_KEY
});

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

    // Fetch the career to customize the roadmap
    const career = await prisma.career.findUnique({
      where: { id: careerId }
    });

    if (!career) {
      return { success: false, error: "Career not found" };
    }

    let content = [];

    try {
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are an expert career counselor. Return ONLY a valid JSON array. Do not include markdown formatting or backticks."
          },
          {
            role: "user",
            content: `Generate a highly detailed learning roadmap for becoming a ${career.title}.
The roadmap must consist of exactly 4 sequential phases.
Return a JSON array where each object has:
- id: string (e.g., "phase_1")
- title: string
- description: string (concise explanation of what to learn)
- estimatedTime: string (e.g., "4-6 weeks")
- resources: Array of objects with 'name' and 'url'. These MUST be real, actual links to high-quality learning resources like freeCodeCamp, Coursera, YouTube, or official documentation.`
          }
        ],
        model: "llama3-70b-8192",
        temperature: 0.2,
      });

      const responseText = completion.choices[0]?.message?.content || "[]";
      // Clean up markdown just in case
      const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      content = JSON.parse(cleanedText);

      // Validate structure
      if (!Array.isArray(content) || content.length === 0) {
        throw new Error("Invalid format");
      }
    } catch (aiError) {
      console.error("AI Generation failed, falling back to mock:", aiError);
      // Generic high-quality fallback
      content = [
        { id: "gen_1", title: "Foundations & Basics", description: `Learn the core principles and terminology of ${career.title}.`, estimatedTime: "2-4 weeks", resources: [{ name: "Coursera", url: "https://www.coursera.org" }, { name: "YouTube Tutorials", url: "https://www.youtube.com" }] },
        { id: "gen_2", title: "Intermediate Skills & Tools", description: "Master the industry-standard software and methodologies.", estimatedTime: "4-8 weeks", resources: [{ name: "Udemy", url: "https://www.udemy.com" }, { name: "Official Documentation", url: "https://developer.mozilla.org" }] },
        { id: "gen_3", title: "Portfolio Building", description: "Create 3 real-world projects to showcase your abilities to employers.", estimatedTime: "4-6 weeks", resources: [{ name: "GitHub", url: "https://github.com" }, { name: "Behance", url: "https://www.behance.net" }] },
        { id: "gen_4", title: "Interview Prep & Job Hunt", description: "Optimize your resume, practice mock interviews, and apply aggressively.", estimatedTime: "Ongoing", resources: [{ name: "LinkedIn", url: "https://linkedin.com" }, { name: "Mock Interviews", url: "https://pramp.com" }] }
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
