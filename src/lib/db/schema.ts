import { pgTable, text, integer, jsonb, timestamp } from "drizzle-orm/pg-core";

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userProgress = pgTable("user_progress", {
  id: text("id").primaryKey(),
  accountId: text("account_id")
    .notNull()
    .unique()
    .references(() => accounts.id, { onDelete: "cascade" }),
  versesRead: integer("verses_read").default(0).notNull(),
  streakDays: integer("streak_days").default(0).notNull(),
  lastReadDate: text("last_read_date").default("").notNull(),
  streakHistory: jsonb("streak_history").$type<string[]>().default([]).notNull(),
  milestones: integer("milestones").default(0).notNull(),
  bookmarks: jsonb("bookmarks").$type<object[]>().default([]).notNull(),
  journal: jsonb("journal").$type<object[]>().default([]).notNull(),
  scriptureProgress: jsonb("scripture_progress").$type<Record<string, number>>().default({}).notNull(),
  currentReadingPath: text("current_reading_path").default("bhagavad-gita").notNull(),
  readingPathIndex: integer("reading_path_index").default(0).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Account = typeof accounts.$inferSelect;
export type UserProgressRow = typeof userProgress.$inferSelect;
