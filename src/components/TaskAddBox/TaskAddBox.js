import React from "react";
import "./TaskAddBox.css";
import TaskAddBoxCard from "./TaskAddBoxCard";
function TaskAddBox(props) {
  var { listOfTasks } = props;
  console.log(listOfTasks);
  return (
    <>
      <div className="task-box">
        {listOfTasks.map((task, index) => {
          return <TaskAddBoxCard key={index} />;
        })}
      </div>
    </>
  );
}
export default TaskAddBox;
