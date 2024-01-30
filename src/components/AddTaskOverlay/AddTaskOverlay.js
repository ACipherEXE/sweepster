import React from "react";
import "./AddTaskOverlay.css";
import { PageType } from "../../Tools/Types";

function AddTaskOverlay(props) {
  var { currentArea, setCurrentArea } = props;
  return (
    <div className="add-task-overlay">
      <div className="add-task-box">
        <div>hhello world</div>
        <div>hhello world</div>
        <div>hhello world</div>
      </div>
    </div>
  );
}
export default AddTaskOverlay;
