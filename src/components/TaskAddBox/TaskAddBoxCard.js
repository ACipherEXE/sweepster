import React from "react";
import "./TaskAddBox.css";

function TaskAddBoxCard(props) {
  var { taskName } = props;
  return (
    <>
      <div className="TaskAddBoxCard-container" style={{marginBottom: '10px'}}>
        <div className="task-card-grid">
          <div className="task-card-item" style={{textAlign: 'center'}}>{taskName}</div>
          </div>
        </div>
    </>
  );
}
export default TaskAddBoxCard;
