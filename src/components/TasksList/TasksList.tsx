import "./TasksList.scss";
import React from "react";
import { ITodo } from "../../interfaces";

type TasksListProps = {
  todos: ITodo[]
  onToggle(id: number): void
  onRemove(id: number): void
  onEdit(id: number): void
  onPriority(id: number, priority: number): void
};

export const TasksList: React.FC<TasksListProps> = ({ todos, onToggle, onRemove, onEdit, onPriority }) => {
  if (todos.length === 0) {
    return(
      <p className="eptyListText">Not any task yet</p>
    );
  }

  const editHandler = (event: React.MouseEvent, id: number) => {
    event.preventDefault();
    onEdit(id);
  }

  const removeHandler = (event: React.MouseEvent, id: number) => {
    event.preventDefault();
    onRemove(id);
  }

  return (
    <div className="TasksList">
      <div className="TasksList__wrapper">
        <ul className="TasksList__list">
          {todos.map((todo) => {
            return (
              <li key={todo.id} className="TasksList__item task-item">
                <select 
                    value={todo.priority}
                    onChange={(event) => {
                      const selectedOption = Number(event.target.value);
                      onPriority(todo.id, selectedOption);
                    }}
                    name="prioritySelect" 
                    id="prioritySelect" 
                    className={`task-item__select task-item__select_${todo.priority}`}
                  >
                    <option value="0">Unimportant</option>
                    <option value="1">Usual</option>
                    <option value="2">Important</option>
                    <option value="3">First of all</option>
                  </select>
                <label>
                  <input 
                    type="checkbox" 
                    checked={todo.completed} 
                    onChange={onToggle.bind(null, todo.id)}
                  />
                  <span className="task-item__title">{todo.title}</span>
                  <span onClick={event => editHandler(event, todo.id)}>
                    <img src="./icons/edit-icon.svg" alt="edit icon" className="icons"/>
                  </span>
                  <span onClick={event => removeHandler(event, todo.id)}>
                    <img src="./icons/delete-icon.svg" alt="delete icon" className="icons"/>
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
