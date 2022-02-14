import React, { useState, useEffect } from "react";
import { TaskForm } from "../../components/TaskForm/TaskForm";
import { TasksList } from "../../components/TasksList/TasksList";
import { TaskSorting } from "../../components/TaskSorting/TaskSorting";
import { ITodo } from "../../interfaces";

declare var confirm: (question: string) => boolean;
declare var prompt: (question: string) => string;

export const TodoPage: React.FunctionComponent = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todos") || "[]") as ITodo[];
    setTodos(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addHendler = (title: string) => {
    const newTask: ITodo = {
      id: Date.now(),
      title: title,
      completed: false,
    };

    setTodos([newTask, ...todos]);
  };

  const toggleHandler = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  };

  const editHandler = (id: number) => {
    const shouldEdit = prompt("Wanna change?");
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          if (shouldEdit !== "" && shouldEdit !== null) {
            todo.title = shouldEdit;
          }
        }
        return todo;
      })
    );
  };

  const removeHandler = (id: number) => {
    const shouldRemove = confirm("Delete task?");
    if (shouldRemove) {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  return (
    <>
      <TaskForm onAdd={addHendler} />
      <TaskSorting />
      <TasksList
        todos={todos}
        onToggle={toggleHandler}
        onRemove={removeHandler}
        onEdit={editHandler}
      />
    </>
  );
};
