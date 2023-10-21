import { sql } from "drizzle-orm";
import {
  bigint,
  mysqlTable,
  timestamp,
  uniqueIndex,
  varchar,
  int,
  text,
  boolean,
} from "drizzle-orm/mysql-core";

export const todos = mysqlTable("todos", {
  id: int("id").primaryKey().autoincrement(),
  text: text("name"),
  done: boolean("done"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
