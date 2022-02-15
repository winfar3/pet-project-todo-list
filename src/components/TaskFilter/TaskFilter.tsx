import "./TaskFilter.scss";
import React from "react";

type TaskFilterProps = {
  onFilter(completed: boolean): void
  onClear(): void;
}

export const TaskFilter: React.FunctionComponent<TaskFilterProps> = ({ onFilter, onClear }) => {
  const filterHandlerOn = (event: React.MouseEvent) => {
    onFilter(true);
  };

  const filterHandlerOff = (event: React.MouseEvent) => {
    onFilter(false);
  };

  const filterHandlerClear = (event: React.MouseEvent) => {
    onClear();
  }

  return(
    <div className="TaskFilter">
      <form action="" className="TaskFilter__wrapper">
        <input type="radio" name="filter" id="0" />
        <label onClick={filterHandlerClear} htmlFor="0" className="TaskFilter__item">All</label>
        <input type="radio" name="filter" id="1" checked />
        <label onClick={filterHandlerOff} htmlFor="1" className="TaskFilter__item">Active</label>
        <input type="radio" name="filter" id="2" />
        <label onClick={filterHandlerOn} htmlFor="2" className="TaskFilter__item">Completed</label>
      </form>
    </div>
  );
}