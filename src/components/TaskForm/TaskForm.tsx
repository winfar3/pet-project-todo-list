import "./TaskForm.scss";
import React, { useState } from "react";

interface TaskFormProps {
  onAdd(title: string): void;
}

export const TaskForm: React.FC<TaskFormProps> = (props) => {
  const [title, setTitle] = useState<string>("");

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && title !== "") {
      props.onAdd(title);
      setTitle("");
    }
  };

  const onAddHandler = (event: React.MouseEvent) => {
    if (title !== "") {
      props.onAdd(title);
    }
    setTitle("");
  };

  return (
    <div className="TaskForm">
      <input
        onChange={changeHandler}
        onKeyPress={keyPressHandler}
        value={title}
        type="text"
        className="TaskForm__input"
        placeholder="Add new task"
      />
      <button onClick={onAddHandler}>
        <img src="./icons/arrow-icon.svg" className="icons icons_arrow" />
      </button>
    </div>
  );
};
