import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import * as schema_mysql from "~/server/db/mysql/schema";

export const todoMySqlRouter = createTRPCRouter({
  getAll: publicProcedure.input(z.void()).query(({ ctx }) => {
    return ctx.db_mysql.query.todos.findMany({
      orderBy: [desc(schema_mysql.todos.id)],
    });
  }),

  add: publicProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const { text } = input;
      return ctx.db_mysql
        .insert(schema_mysql.todos)
        .values({ done: false, text });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      const { id } = input;
      return ctx.db_mysql
        .delete(schema_mysql.todos)
        .where(eq(schema_mysql.todos.id, id));
    }),

  done: publicProcedure
    .input(z.object({ id: z.number(), done: z.boolean() }))
    .mutation(({ ctx, input }) => {
      const { id, done } = input;
      return ctx.db_mysql
        .update(schema_mysql.todos)
        .set({ done: done })
        .where(eq(schema_mysql.todos.id, id));
    }),
});
