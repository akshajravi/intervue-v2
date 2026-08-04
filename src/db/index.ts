// Module-scope singleton, same shape as the Anthropic client in the API routes.
// neon-http speaks HTTP rather than TCP, so there's no connection pool to
// manage across serverless invocations.

import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing. Copy .env.local.example to .env.local.");
}

export const db = drizzle(process.env.DATABASE_URL, { schema });
