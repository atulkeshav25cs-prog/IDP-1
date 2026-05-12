"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function markStepComplete(progressId: string, completed: boolean) {
  try {
    const { userId } = await auth();
    const effectiveUserId = userId || "dummy_user_123";

    const user = await prisma.user.findUnique({
      where: { clerkId: effectiveUserId }
    });

    if (!user) return { success: false, error: "Not found" };

    // Verify ownership
    const progress = await prisma.progress.findUnique({
      where: { id: progressId },
      include: { roadmap: true }
    });

    if (!progress || progress.roadmap.userId !== user.id) {
      return { success: false, error: "Unauthorized" };
    }

    await prisma.progress.update({
      where: { id: progressId },
      data: {
        status: completed ? "COMPLETED" : "PENDING",
        completedAt: completed ? new Date() : null
      }
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
