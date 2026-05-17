import { db } from "@/db";
import { linksTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getLinksByUserId(userId: string) {
  return await db
    .select()
    .from(linksTable)
    .where(eq(linksTable.userId, userId))
    .orderBy(linksTable.createdAt);
}
