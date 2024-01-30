import React, { useEffect, useState } from "react";
import "./RoomPage.css";
const styles = {
  Container: {
    cursor: "pointer",
    display: "block",
    position: "relative",
    width: "40px",
    height: "20px",
    pointerEvents: "auto",
    borderRadius: "100px",
    boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.08)",
    backgroundColor: "rgba(127, 127, 127, 1)",
    border: 0,
  },
  Toggle: {
    display: "block",
    position: "absolute",
    top: "50%",
    left: "3px",
    width: "calc(50% - 6px)",
    height: "calc(100% - 6px)",
    transform: "translate(0%, -50%)",
    fontSize: "14px",
    transition: "left 0.3s ease",
    borderRadius: "100px",
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  Input: {
    position: "absolute",
    opacity: 0,
    visibility: "hidden",
    width: "1px",
    height: "1px",
    pointerEvents: "none",
  },
};

function Roomcard(props) {
  var { hotelRoomTask, taskState, editMode, setTaskUpdated, setTaskEraser } =
    props;
  const [isToggled, setIsToggled] = useState(taskState);
  /**
   * Function that handles the task data that has been changed by user. Normally false to true or the other way.
   */
  const taskHandler = () => {
    setIsToggled(!isToggled);
    setTaskUpdated({ task: hotelRoomTask, isDone: !taskState, was: taskState });
  };
  /**
   * Function that removes tasks from the room
   */
  const taskEraser = () => {
    setTaskEraser({ task: hotelRoomTask });
  };

  return (
    <>
      <div className="room-task-card">
        <div className="room-task-name">{hotelRoomTask}</div>
        {editMode ? (
          <div className="room-card-remove-button" onClick={taskEraser}>
            <svg style={styles.Icon} viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"></path>
            </svg>
          </div>
        ) : (
          <div style={styles.Container} onClick={taskHandler}>
            <div
              style={{
                ...styles.Toggle,
                left: taskState ? "calc(50% + 3px)" : "3px",
              }}
            />

            <input type="checkbox" style={styles.Input} />
          </div>
        )}
      </div>
    </>
  );
}
export default Roomcard;
