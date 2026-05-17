import { db } from "@/db";
import { linksTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { randomBytes } from "crypto";

export async function getLinksByUserId(userId: string) {
  return await db
    .select()
    .from(linksTable)
    .where(eq(linksTable.userId, userId))
    .orderBy(linksTable.createdAt);
}

export async function createLink(input: {
  userId: string;
  originalUrl: string;
  shortCode?: string;
}): Promise<{ id: number }> {
  const [link] = await db
    .insert(linksTable)
    .values({
      userId: input.userId,
      originalUrl: input.originalUrl,
      shortCode: input.shortCode || generateShortCode(),
    })
    .returning({ id: linksTable.id });

  return { id: link.id };
}

function generateShortCode(length: number = 8): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const bytes = randomBytes(length);
  return Array.from(bytes, (b) => chars[b % chars.length]).join("");
}
