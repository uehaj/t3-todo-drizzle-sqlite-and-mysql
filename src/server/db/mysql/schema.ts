import { sql } from "drizzle-orm";
import {
  mysqlTable,
  timestamp,
  int,
  text,
  boolean,
} from "drizzle-orm/mysql-core";

export const todos = mysqlTable("todos", {
  id: int("id").primaryKey().autoincrement(),
  text: text("text"),
  done: boolean("done"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  categoryId: int("categories_id").references(() => categories.id),
});

export const categories = mysqlTable("categories", {
  id: int("id").primaryKey().autoincrement(),
  text: text("text"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
