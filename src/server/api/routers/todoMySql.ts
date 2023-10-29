import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { todos, categories } from "~/server/db/mysql/schema";

export const todoMySqlRouter = createTRPCRouter({
  getAllTodo: publicProcedure.input(z.void()).query(async ({ ctx }) => {
    const result = await ctx.db_mysql
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
    .mutation(({ ctx, input }) => {
      const { text, categoryId } = input;
      return ctx.db_mysql
        .insert(todos)
        .values({ done: false, text, categoryId });
    }),

  deleteTodo: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      const { id } = input;
      return ctx.db_mysql.delete(todos).where(eq(todos.id, id));
    }),

  doneTodo: publicProcedure
    .input(z.object({ id: z.number(), done: z.boolean() }))
    .mutation(({ ctx, input }) => {
      const { id, done } = input;
      return ctx.db_mysql
        .update(todos)
        .set({ done: done })
        .where(eq(todos.id, id));
    }),

  getAllCategories: publicProcedure.input(z.void()).query(({ ctx }) => {
    return ctx.db_mysql.query.categories.findMany({
      orderBy: [desc(categories.id)],
    });
  }),

  addCategory: publicProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const { text } = input;
      return ctx.db_mysql.insert(categories).values({ text });
    }),
});
