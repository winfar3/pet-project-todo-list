import React, { useState, useEffect } from "react";
import { TaskFilter } from "../../components/TaskFilter/TaskFilter";
import { TaskForm } from "../../components/TaskForm/TaskForm";
import { TasksList } from "../../components/TasksList/TasksList";
import { ITodo } from "../../interfaces";

declare var confirm: (question: string) => boolean;
declare var prompt: (question: string) => string;

export const TodoPage: React.FunctionComponent = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [filtred, setFiltred] = useState<ITodo[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todos") || "[]") as ITodo[];
    setTodos(saved);
    setFiltred(saved);
    setFiltred((filtred) => filtred.filter((item) => item.completed === false));
  }, []);
  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  /** TODO: 
   * check for empty string
   * dont show new task in completed list
   */
  const addHendler = (title: string) => {
    const newTask: ITodo = {
      id: Date.now(),
      title: title,
      completed: false,
    };

    setTodos([newTask, ...todos]);
    setFiltred([newTask, ...filtred]);
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

  /** TODO: refactor */
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
    setFiltred(
      filtred.map((todo) => {
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
      setFiltred((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  const filterHandler = (completed: boolean) => {
    setFiltred(todos);
    setFiltred((filtred) => filtred.filter((item) => item.completed === completed));
  };

  const filtredClear = () => {
    setFiltred(todos);
  }

  return (
    <>
      <TaskForm onAdd={addHendler} />
      <TaskFilter 
        onFilter={filterHandler}
        onClear={filtredClear}
      />
      <TasksList
        todos={filtred}
        onToggle={toggleHandler}
        onRemove={removeHandler}
        onEdit={editHandler}
      />
    </>
  );
};
