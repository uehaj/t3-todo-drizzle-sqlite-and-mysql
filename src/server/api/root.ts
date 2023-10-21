import { createTRPCRouter } from "~/server/api/trpc";
import { todoSqliteRouter } from "~/server/api/routers/todoSqlite";
import { todoMySqlRouter } from "~/server/api/routers/todoMySql";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  todoSqlite: todoSqliteRouter,
  todoMySql: todoMySqlRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
