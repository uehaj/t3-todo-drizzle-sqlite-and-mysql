import type { FormEvent } from "react";
import { api } from "~/utils/api";
import TodoAppComponent from "./TodoAppComponent";

export default function TodoAppMySql() {
  const utils = api.useContext();
  const todos = api.todoMySql.getAllTodo.useQuery();
  const categories = api.todoMySql.getAllCategories.useQuery();

  const { mutateAsync: addTodoAsync } = api.todoMySql.addTodo.useMutation({
    onSettled: () => {
      void utils.todoMySql.invalidate();
    },
  });

  const { mutateAsync: deleteTodoAsync } = api.todoMySql.deleteTodo.useMutation(
    {
      onSettled: () => {
        void utils.todoMySql.invalidate();
      },
    },
  );

  const { mutateAsync: doneTodoAsync } = api.todoMySql.doneTodo.useMutation({
    onSettled: () => {
      void utils.todoMySql.invalidate();
    },
  });

  const { mutateAsync: addCategoryAsync } =
    api.todoMySql.addCategory.useMutation({
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
      title={"TodoApp(MySQL)"}
      todoList={todos.data}
      categoryList={categories.data}
      handleAddTodo={handleAddTodo}
      handleDoneTodo={handleDoneTodo}
      handleDeleteTodo={handleDeleteTodo}
      handleAddCategory={handleAddCategory}
    />
  );
}
