import type { FormEvent } from "react";
import { api } from "~/utils/api";
import TodoAppComponent from "./TodoAppComponent";

export default function TodoAppSqlite() {
  const utils = api.useContext();
  const todos = api.todoSqlite.getAll.useQuery();

  const { mutateAsync: todoAddAsync } = api.todoSqlite.add.useMutation({
    onSettled: () => {
      void utils.todoSqlite.invalidate();
    },
  });

  const { mutateAsync: todoDeleteAsync } = api.todoSqlite.delete.useMutation({
    onSettled: () => {
      void utils.todoSqlite.invalidate();
    },
  });

  const { mutateAsync: todoDoneAsync } = api.todoSqlite.done.useMutation({
    onSettled: () => {
      void utils.todoSqlite.invalidate();
    },
  });

  async function handleAddTodo(e: FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    form.reset();
    const result = await todoAddAsync(formJson as { text: string });
    console.log(`result=`, result[0]);
  }

  function handleDeleteTodo(id: number) {
    void todoDeleteAsync({ id });
  }

  function handleDoneTodo(id: number, done: boolean) {
    void todoDoneAsync({ id, done });
  }

  return (
    <TodoAppComponent
      title={"TodoApp(Sqlite)"}
      todos={todos}
      handleAddTodo={handleAddTodo}
      handleDoneTodo={handleDoneTodo}
      handleDeleteTodo={handleDeleteTodo}
    />
  );
}
