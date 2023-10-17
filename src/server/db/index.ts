import { BetterSQLite3Database, drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { env } from "~/env.mjs";
import * as schema from "./schema";

const url = env.DATABASE_URL.replace(/^file:\/\//, "").replace(/^file:/, "");

console.log(`url=`, url);
const sqlite = new Database(url);
export const db: BetterSQLite3Database<typeof schema> = drizzle(sqlite, {
  schema,
  logger: true,
});
// migrate(db, { migrationsFolder: "./drizzle" });
