import { type NextPage } from "next";
import Head from "next/head";
import TodoAppSqlite from "~/components/TodoAppSqlite";
import TodoAppMySql from "~/components/TodoAppMySql";

const TodoApp: NextPage = () => {
  return (
    <>
      <Head>
        <title>TodoApp</title>
        <meta name="description" content="TodoApp by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen w-full">
        <div className="w-1/2 bg-gray-200 p-4">
          <TodoAppSqlite></TodoAppSqlite>
        </div>
        <div className="w-1/2 bg-gray-300 p-4">
          <TodoAppMySql></TodoAppMySql>
        </div>
      </div>
    </>
  );
};
export default TodoApp;
