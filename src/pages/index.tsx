import { type NextPage } from "next";
import Head from "next/head";
import type { FormEvent } from "react";
import { api } from "~/utils/api";

const TodoApp: NextPage = () => {
  const utils = api.useContext();
  const todos = api.todo.getAll.useQuery();

  const { mutateAsync: todoAddAsync } = api.todo.add.useMutation({
    onSettled: () => {
      void utils.todo.invalidate();
    },
  });

  const { mutateAsync: todoDeleteAsync } = api.todo.delete.useMutation({
    onSettled: () => {
      void utils.todo.invalidate();
    },
  });

  const { mutateAsync: todoDoneAsync } = api.todo.done.useMutation({
    onSettled: () => {
      void utils.todo.invalidate();
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
    <>
      <Head>
        <title>TodoApp</title>
        <meta name="description" content="TodoApp by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto p-4">
        <h1 className="mb-4 text-4xl font-bold">Todoアプリ</h1>
        <div>
          <form className="flex" onSubmit={handleAddTodo}>
            <input
              className="mb-4 mr-4 flex-grow rounded border p-2"
              type="text"
              name="text"
              placeholder="新しいタスクを入力"
            />
            <button className="mb-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
              タスクを追加
            </button>
          </form>
        </div>
        <ul id="taskList" className="list-inside list-disc">
          <ul>
            {todos.data?.map((todo) => (
              <li
                className="mb-2 flex items-center rounded bg-white p-2"
                key={todo.id}
              >
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={!!todo.done}
                  onChange={() => handleDoneTodo(todo.id, !todo.done)}
                />
                <div className={todo.done ? "line-through" : ""}>
                  {todo.text}
                </div>
                <button
                  className="ml-auto rounded bg-red-500 px-2 py-1 font-bold text-white hover:bg-red-700"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </ul>
      </div>
    </>
  );
};
export default TodoApp;
