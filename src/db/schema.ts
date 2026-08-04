// One row per completed interview. There is deliberately no `users` table:
// `userId` holds the Clerk user id verbatim, which avoids syncing a mirror of
// Clerk's user store over webhooks just to satisfy a foreign key.

import {
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import type { ChatMessage, RunResult } from "@/lib/api";
import type { Evaluation } from "@/lib/prompt";

export const interviews = pgTable(
  "interviews",
  {
    // uuid, not serial: these ids appear in /history/<id> URLs, and sequential
    // ints would be enumerable even though every read also filters on userId.
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").notNull(),
    problemId: varchar("problem_id", { length: 64 }).notNull(),
    // Title and difficulty are denormalised because getProblem() falls back to
    // the first problem for unknown ids — without these, renaming or removing a
    // problem would silently relabel every historical interview for it.
    problemTitle: text("problem_title").notNull(),
    difficulty: varchar("difficulty", { length: 8 }).notNull(),
    language: varchar("language", { length: 24 }).notNull(),
    transcript: jsonb("transcript").$type<ChatMessage[]>().notNull(),
    code: text("code").notNull(),
    evaluation: jsonb("evaluation").$type<Evaluation>().notNull(),
    lastRun: jsonb("last_run").$type<RunResult | null>(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  // The only query shape either history page uses. A plain user_id index would
  // satisfy the filter but still force a sort; this serves both in one scan.
  // Nothing else is indexed — every extra index is write cost on the one hot path.
  (t) => [index("interviews_user_created_idx").on(t.userId, t.createdAt.desc())]
);

export type InterviewRow = typeof interviews.$inferSelect;
