import { FormEvent, useState } from "react";

type Props = {
  title: string;
  todoList?: any[];
  categoryList?: any[];
  handleAddTodo: (e: FormEvent) => void;
  handleDoneTodo: (id: number, done: boolean) => void;
  handleDeleteTodo: (id: number) => void;
  handleAddCategory: (e: FormEvent) => void;
};

export default function TodoAppComponent({
  title,
  todoList,
  categoryList,
  handleAddTodo,
  handleDoneTodo,
  handleDeleteTodo,
  handleAddCategory,
}: Props) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-4xl font-bold">{title}</h1>
      <div>
        <form className="flex" onSubmit={handleAddTodo}>
          <input
            className="mb-4 mr-4 flex-grow rounded border p-2"
            type="text"
            name="text"
            placeholder="新しいタスクを入力"
          />
          <select
            className="mb-4 mr-4 rounded border p-2"
            defaultValue={categoryList?.[0].id}
            name="categoryId"
          >
            {categoryList?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.text}
              </option>
            ))}
          </select>
          <button className="mb-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
            タスクを追加
          </button>
        </form>
      </div>
      <ul id="taskList" className="list-inside list-disc">
        <ul>
          {todoList?.map((todo) => (
            <li
              className="mb-2 flex items-center justify-between rounded bg-white p-2"
              key={todo.id}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={!!todo.done}
                  onChange={() => handleDoneTodo(todo.id, !todo.done)}
                />
                <div className={todo.done ? "line-through" : ""}>
                  {todo.text}
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-4 rounded bg-green-300 px-2 text-sm">
                  {todo.category}
                </div>
                <button
                  className="ml-auto rounded bg-red-500 px-2 py-1 font-bold text-white hover:bg-red-700"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  ×
                </button>
              </div>
            </li>
          ))}
        </ul>
        <form className="flex" onSubmit={(e) => handleAddCategory(e)}>
          <input
            className="mb-4 mr-4 flex-grow rounded border p-2"
            type="text"
            name="text"
            placeholder="新しいカテゴリを入力"
          />
          <button className="mb-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
            カテゴリを追加
          </button>
        </form>
      </ul>
    </div>
  );
}
