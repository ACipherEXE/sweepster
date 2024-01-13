import React, { useState } from "react";
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
  var { hotelRoomTask, setTaskComplited, taskState } = props;
  const [isToggled, setIsToggled] = useState(taskState);

  const onClick = () => {
    setIsToggled(!isToggled);
    setTaskComplited({ task: hotelRoomTask, isDone: !isToggled });
  };

  return (
    <>
      <div className="room-task-card">
        <div className="room-task-name">{hotelRoomTask}</div>
        <div style={styles.Container} onClick={onClick}>
          <div
            style={{
              ...styles.Toggle,
              left: isToggled ? "calc(50% + 3px)" : "3px",
            }}
          />
          <input type="checkbox" style={styles.Input} />
        </div>
      </div>
    </>
  );
}
export default Roomcard;
