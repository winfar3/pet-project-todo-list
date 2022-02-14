import "./TaskSorting.scss";
import React from "react";

export const TaskSorting = () => {
  return(
    <div className="TaskSorting">
      <div className="TaskSorting__wrapper">
        <div className="TaskSorting__item">All</div>
        <div className="TaskSorting__item">Active</div>
        <div className="TaskSorting__item">Completed</div>
      </div>
    </div>
  );
}