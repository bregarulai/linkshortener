"use server"

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createLink } from "@/data/links";

export type CreateLinkInput = {
  originalUrl: string;
  shortCode?: string;
};

const createSchema = z.object({
  originalUrl: z.string().url(),
  shortCode: z.string().optional(),
});

export async function createLinkAction(input: CreateLinkInput) {
  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized" };
  }

  const result = createSchema.safeParse({
    originalUrl: input.originalUrl,
    shortCode: input.shortCode || undefined,
  });

  if (!result.success) {
    return { error: "Invalid input", details: result.error.flatten() };
  }

  const link = await createLink({
    userId,
    originalUrl: result.data.originalUrl,
    shortCode: result.data.shortCode,
  });

  return { success: true, id: link.id };
}
