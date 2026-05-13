"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function toggleSavedCareer(careerId: string) {
  try {
    const { userId } = await auth();
    const effectiveUserId = userId || "dummy_user_123";

    const user = await prisma.user.findUnique({
      where: { clerkId: effectiveUserId }
    });

    if (!user) return { success: false, error: "Unauthorized" };

    const existing = await prisma.savedCareer.findUnique({
      where: {
        userId_careerId: {
          userId: user.id,
          careerId
        }
      }
    });

    if (existing) {
      await prisma.savedCareer.delete({
        where: { id: existing.id }
      });
      revalidatePath("/dashboard/saved");
      revalidatePath("/dashboard/matches");
      return { success: true, saved: false };
    } else {
      await prisma.savedCareer.create({
        data: {
          userId: user.id,
          careerId
        }
      });
      revalidatePath("/dashboard/saved");
      revalidatePath("/dashboard/matches");
      return { success: true, saved: true };
    }
  } catch (error) {
    console.error("Failed to toggle saved career:", error);
    return { success: false, error: "Failed to save career" };
  }
}
