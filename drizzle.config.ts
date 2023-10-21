import { type Config } from "drizzle-kit";

import { env } from "~/env.mjs";

export default {
  schema: "./src/server/db/mysql/schema.ts",
  out: "./drizzle_mysql",
  driver: "mysql2",
  dbCredentials: {
    connectionString: env.DATABASE_URL_MYSQL,
  },
} satisfies Config;
