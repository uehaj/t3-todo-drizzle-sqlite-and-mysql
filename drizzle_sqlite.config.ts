import type { Config } from "drizzle-kit";
import { env } from "~/env.mjs";

export default {
  schema: "./src/server/db/sqlite/schema.ts",
  out: "./drizzle_sqlite",
  driver: "better-sqlite",
  dbCredentials: {
    url: env.DATABASE_URL_SQLITE,
  },
} satisfies Config;
