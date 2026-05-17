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

export async function updateLink(
  linkId: number,
  input: { originalUrl: string; shortCode?: string },
): Promise<{ id: number }> {
  const [link] = await db
    .update(linksTable)
    .set({
      originalUrl: input.originalUrl,
      shortCode: input.shortCode ?? linksTable.shortCode,
      updatedAt: new Date(),
    })
    .where(eq(linksTable.id, linkId))
    .returning({ id: linksTable.id });

  return { id: link.id };
}

export async function deleteLink(linkId: number): Promise<void> {
  await db
    .delete(linksTable)
    .where(eq(linksTable.id, linkId));
}

function generateShortCode(_length: number = 8): string {
  return nanoid(_length);
}
