type Props = {
  title: string;
  todos: any;
  handleAddTodo: any;
  handleDoneTodo: any;
  handleDeleteTodo: any;
};

export default function TodoAppCOmponent({
  title,
  todos,
  handleAddTodo,
  handleDoneTodo,
  handleDeleteTodo,
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
          <button className="mb-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
            タスクを追加
          </button>
        </form>
      </div>
      <ul id="taskList" className="list-inside list-disc">
        <ul>
          {todos.data?.map((todo: any) => (
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
              <div className={todo.done ? "line-through" : ""}>{todo.text}</div>
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
  );
}
