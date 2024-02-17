import React, { useState, useEffect } from "react";
import "./TaskAddBox.css";
import TaskAddBoxCard from "./TaskAddBoxCard";
function TaskAddBox(props) {
  const { listOfTasks } = props;
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    console.log(listOfTasks);
    setTasks(listOfTasks);
  }, [listOfTasks]);

  return (
    <div className="task-box">
      {tasks.map((task, index) => (
        <TaskAddBoxCard key={index} taskName={task.task} />
      ))}
    </div>
  );
}

export default TaskAddBox;
