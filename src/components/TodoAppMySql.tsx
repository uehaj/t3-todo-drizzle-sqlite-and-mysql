import type { FormEvent } from "react";
import { api } from "~/utils/api";
import TodoAppComponent from "./TodoAppComponent";

export default function TodoAppMySql() {
  const utils = api.useContext();
  const todos = api.todoMySql.getAll.useQuery();

  const { mutateAsync: todoAddAsync } = api.todoMySql.add.useMutation({
    onSettled: () => {
      void utils.todoMySql.invalidate();
    },
  });

  const { mutateAsync: todoDeleteAsync } = api.todoMySql.delete.useMutation({
    onSettled: () => {
      void utils.todoMySql.invalidate();
    },
  });

  const { mutateAsync: todoDoneAsync } = api.todoMySql.done.useMutation({
    onSettled: () => {
      void utils.todoMySql.invalidate();
    },
  });

  function handleAddTodo(e: FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    form.reset();
    void todoAddAsync(formJson as { text: string });
  }

  function handleDeleteTodo(id: number) {
    void todoDeleteAsync({ id });
  }

  function handleDoneTodo(id: number, done: boolean) {
    void todoDoneAsync({ id, done });
  }

  return (
    <TodoAppComponent
      title={"TodoApp(MySQL)"}
      todos={todos}
      handleAddTodo={handleAddTodo}
      handleDoneTodo={handleDoneTodo}
      handleDeleteTodo={handleDeleteTodo}
    />
  );
}
