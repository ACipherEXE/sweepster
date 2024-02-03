import React, { useState } from "react";
import "./TaskAddBox.css";
import TaskAddBoxCard from "./TaskAddBoxCard";
function TaskAddBox(props) {
  return (
    <>
      <div className="task-box">
        <div>
          <TaskAddBoxCard />
        </div>
      </div>
    </>
  );
}
export default TaskAddBox;
