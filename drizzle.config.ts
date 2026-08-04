import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Secrets live in .env.local (Next reads it automatically; drizzle-kit does
// not, and `dotenv/config` would look at .env instead).
config({ path: ".env.local" });

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL! },
});
