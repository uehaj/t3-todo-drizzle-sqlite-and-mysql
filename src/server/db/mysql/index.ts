import { MySql2Database, drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { env } from "~/env.mjs";
import * as schema from "./schema";

const connection = mysql.createConnection(env.DATABASE_URL_MYSQL);

export const db: MySql2Database<typeof schema> = drizzle(connection, {
  schema: schema,
  mode: "default",
  logger: true,
});

migrate(db, { migrationsFolder: "./drizzle_mysql" });
