import React from "react";
import "./RemoveOverlay.css";

function RemoveOverlay(props) {
  var { overlayData, setIsVisible, setTaskEraser } = props;
  /**
   * Function that removes tasks from the room
   */
  const taskEraser = () => {
    setTaskEraser(overlayData);
    setIsVisible(true);
  };
  return (
    <div
      className="add-task-overlay"
      onClick={() => {
        setIsVisible(false);
      }}
    >
      <div
        className="add-task-box"
        onClick={(e) => {
          // Stop the event propagation here
          e.stopPropagation();
        }}
      >
        <button
          className="remove-task-button"
          onClick={() => {
            setIsVisible(false);
          }}
        >
          <div className="add-task-question" onClick={taskEraser}>
            Confirm Task Delete
          </div>
        </button>
      </div>
    </div>
  );
}
export default RemoveOverlay;
