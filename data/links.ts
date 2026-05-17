import { db } from "@/db";
import { linksTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function getLinksByUserId(userId: string) {
  return await db
    .select()
    .from(linksTable)
    .where(eq(linksTable.userId, userId))
    .orderBy(desc(linksTable.createdAt))
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

function generateShortCode(_length: number = 8): string {
  return nanoid(_length);
}
