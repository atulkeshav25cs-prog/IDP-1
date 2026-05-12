"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function sendMessage(content: string) {
  try {
    const { userId } = await auth();
    const effectiveUserId = userId || "dummy_user_123";

    const user = await prisma.user.findUnique({
      where: { clerkId: effectiveUserId }
    });

    if (!user) return { success: false, error: "Unauthorized" };

    // Save user message
    const userMessage = await prisma.chatHistory.create({
      data: {
        userId: user.id,
        role: "user",
        content
      }
    });

    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate context-aware response based on keywords
    let aiResponse = "I'm your CareerAI Counselor. I can help you understand your career matches, prepare for interviews, or suggest learning resources. What specific area would you like to focus on today?";
    
    const lowerContent = content.toLowerCase();
    if (lowerContent.includes("roadmap") || lowerContent.includes("path")) {
      aiResponse = "I see you're asking about roadmaps! A roadmap is your step-by-step guide to achieving a career. Have you generated one from your Matches page yet? I recommend starting with the Foundations phase.";
    } else if (lowerContent.includes("salary") || lowerContent.includes("money")) {
      aiResponse = "Salary expectations vary by location and experience. However, based on your matches, roles like Product Manager typically range from $90k to $160k. Would you like me to find some negotiation strategies?";
    } else if (lowerContent.includes("interview")) {
      aiResponse = "Interview prep is crucial! For technical roles, I suggest focusing on your portfolio projects and being able to explain your problem-solving process. Should we do a quick mock interview question?";
    }

    // Save AI message
    const aiMessage = await prisma.chatHistory.create({
      data: {
        userId: user.id,
        role: "assistant",
        content: aiResponse
      }
    });

    return { success: true, aiMessage };

  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to send message" };
  }
}

export async function getChatHistory() {
  try {
    const { userId } = await auth();
    const effectiveUserId = userId || "dummy_user_123";

    const user = await prisma.user.findUnique({
      where: { clerkId: effectiveUserId }
    });

    if (!user) return { success: false, messages: [] };

    const messages = await prisma.chatHistory.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'asc' }
    });

    return { success: true, messages };
  } catch (error) {
    console.error(error);
    return { success: false, messages: [] };
  }
}
