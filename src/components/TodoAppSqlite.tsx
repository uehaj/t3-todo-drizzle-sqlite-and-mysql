import type { FormEvent } from "react";
import { api } from "~/utils/api";
import TodoAppComponent from "./TodoAppComponent";

export default function TodoAppSqlite() {
  const utils = api.useContext();
  const todos = api.todoSqlite.getAllTodo.useQuery();
  const categories = api.todoSqlite.getAllCategories.useQuery();

  const { mutateAsync: addTodoAsync } = api.todoSqlite.addTodo.useMutation({
    onSettled: () => {
      void utils.todoSqlite.invalidate();
    },
  });

  const { mutateAsync: deleteTodoAsync } =
    api.todoSqlite.deleteTodo.useMutation({
      onSettled: () => {
        void utils.todoSqlite.invalidate();
      },
    });

  const { mutateAsync: doneTodoAsync } = api.todoSqlite.doneTodo.useMutation({
    onSettled: () => {
      void utils.todoSqlite.invalidate();
    },
  });

  const { mutateAsync: addCategoryAsync } =
    api.todoSqlite.addCategory.useMutation({
      onSettled: () => {
        void utils.todoSqlite.invalidate();
      },
    });

  function handleAddTodo(e: FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    form.reset();
    void addTodoAsync({
      text: formJson.text as string,
      categoryId: Number.parseInt(formJson.categoryId as string),
    });
  }

  function handleDeleteTodo(id: number) {
    void deleteTodoAsync({ id });
  }

  function handleDoneTodo(id: number, done: boolean) {
    void doneTodoAsync({ id, done });
  }

  function handleAddCategory(e: FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    form.reset();
    void addCategoryAsync(formJson as { text: string });
  }

  return (
    <TodoAppComponent
      title={"TodoApp(Sqlite)"}
      todoList={todos.data}
      categoryList={categories.data}
      handleAddTodo={handleAddTodo}
      handleDoneTodo={handleDoneTodo}
      handleDeleteTodo={handleDeleteTodo}
      handleAddCategory={handleAddCategory}
    />
  );
}
