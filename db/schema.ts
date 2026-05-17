import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const linksTable = pgTable("links", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: text("userId").notNull(),
  originalUrl: varchar("originalUrl", { length: 2048 }).notNull(),
  shortCode: varchar("shortCode", { length: 12 }).notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type Link = typeof linksTable.$inferSelect;
export type NewLink = typeof linksTable.$inferInsert;
