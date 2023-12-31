"use client";

import { useState, useEffect } from "react";
import AddTodo from "@/components/AddTodo";
import TodoList from "@/components/TodoList";
import StatusSelect from "@/components/StatusSelect";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filterTodo, setFilterTodo] = useState([]);

  useEffect(() => {
    const initialState = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(initialState);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    filterHandler();
  }, [todos, status]);

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilterTodo(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilterTodo(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilterTodo(todos);
        break;
    }
  };

  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Todo List App</h1>
        <div className="flex justify-between ">
          <AddTodo todos={todos} setTodos={setTodos} />
          <StatusSelect setStatus={setStatus} />
        </div>
      </div>
      <TodoList todos={todos} setTodos={setTodos} filterTodo={filterTodo} />
    </main>
  );
}
