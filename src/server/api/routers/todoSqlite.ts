import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import * as schema_sqlite from "~/server/db/sqlite/schema";

export const todoSqliteRouter = createTRPCRouter({
  getAll: publicProcedure.input(z.void()).query(({ ctx }) => {
    return ctx.db_sqlite.query.todos.findMany({
      orderBy: [desc(schema_sqlite.todos.id)],
    });
  }),

  add: publicProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .output(z.array(z.object({ id: z.number() })))
    .mutation(({ ctx, input }) => {
      const { text } = input;
      return ctx.db_sqlite
        .insert(schema_sqlite.todos)
        .values({ done: false, text })
        .returning({ id: schema_sqlite.todos.id });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .output(z.array(z.object({ id: z.number() })))
    .mutation(({ ctx, input }) => {
      const { id } = input;
      return ctx.db_sqlite
        .delete(schema_sqlite.todos)
        .where(eq(schema_sqlite.todos.id, id))
        .returning({ id: schema_sqlite.todos.id });
    }),

  done: publicProcedure
    .input(z.object({ id: z.number(), done: z.boolean() }))
    .mutation(({ ctx, input }) => {
      const { id, done } = input;
      return ctx.db_sqlite
        .update(schema_sqlite.todos)
        .set({ done: done, updatedAt: new Date().toISOString() })
        .where(eq(schema_sqlite.todos.id, id));
    }),
});
