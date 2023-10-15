import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import * as schema from "~/server/db/schema";

export const todoRouter = createTRPCRouter({
  getAll: publicProcedure.input(z.void()).query(({ ctx }) => {
    return ctx.db.query.todos.findMany({
      orderBy: [desc(schema.todos.id)],
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
      return ctx.db.insert(schema.todos).values({ done: false, text });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      const { id } = input;
      return ctx.db.delete(schema.todos).where(eq(schema.todos.id, id));
    }),

  done: publicProcedure
    .input(z.object({ id: z.number(), done: z.boolean() }))
    .mutation(({ ctx, input }) => {
      const { id, done } = input;
      return ctx.db
        .update(schema.todos)
        .set({ done: done })
        .where(eq(schema.todos.id, id));
    }),
});
