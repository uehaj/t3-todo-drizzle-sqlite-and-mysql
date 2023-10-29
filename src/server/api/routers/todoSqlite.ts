import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { todos, categories } from "~/server/db/sqlite/schema";

export const todoSqliteRouter = createTRPCRouter({
  getAllTodo: publicProcedure.input(z.void()).query(async ({ ctx }) => {
    const result = await ctx.db_sqlite
      .select()
      .from(todos)
      .leftJoin(categories, eq(categories.id, todos.categoryId))
      .orderBy(desc(todos.id))
      .execute();
    return result.map(({ todos, categories }) => ({
      ...todos,
      categoryId: categories?.id,
      category: categories?.text,
    }));
  }),

  addTodo: publicProcedure
    .input(
      z.object({
        text: z.string(),
        categoryId: z.number(),
      }),
    )
    .output(z.array(z.object({ id: z.number() })))
    .mutation(({ ctx, input }) => {
      const { text, categoryId } = input;
      return ctx.db_sqlite
        .insert(todos)
        .values({ done: false, text, categoryId })
        .returning({ id: todos.id });
    }),

  deleteTodo: publicProcedure
    .input(z.object({ id: z.number() }))
    .output(z.array(z.object({ id: z.number() })))
    .mutation(({ ctx, input }) => {
      const { id } = input;
      return ctx.db_sqlite
        .delete(todos)
        .where(eq(todos.id, id))
        .returning({ id: todos.id });
    }),

  doneTodo: publicProcedure
    .input(z.object({ id: z.number(), done: z.boolean() }))
    .mutation(({ ctx, input }) => {
      const { id, done } = input;
      return ctx.db_sqlite
        .update(todos)
        .set({ done: done, updatedAt: new Date().toISOString() })
        .where(eq(todos.id, id));
    }),

  getAllCategories: publicProcedure.input(z.void()).query(({ ctx }) => {
    return ctx.db_sqlite.query.categories.findMany({
      orderBy: [desc(categories.id)],
    });
  }),

  addCategory: publicProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .output(z.array(z.object({ id: z.number() })))
    .mutation(({ ctx, input }) => {
      const { text } = input;
      return ctx.db_sqlite
        .insert(categories)
        .values({ text })
        .returning({ id: categories.id });
    }),
});
