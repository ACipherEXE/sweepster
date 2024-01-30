import React from "react";
import "./AddTaskOverlay.css";
import { PageType } from "../../Tools/Types";

function AddTaskOverlay(props) {
  var { currentArea, setCurrentArea, setIsVisible } = props;
  return (
    <div className="add-task-overlay">
      <div className="add-task-box">
        <div className="add-task-question">
          What task you would like to add?
        </div>
        <input
          className="add-task-input"
          type="text"
          placeholder="Type here..."
        />
        <button className="add-task-button" onClick={() => setIsVisible(false)}>
          Done
        </button>
      </div>
    </div>
  );
}
export default AddTaskOverlay;
