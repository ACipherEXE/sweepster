import React from "react";
import "./TaskAddBox.css";
const styles = {
  Container: {
    cursor: "pointer",
    width: "20px",
    height: "20px",
    display: "block",
    position: "relative",
    pointerEvents: "auto",
    borderRadius: "10px",
    boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.08)",
    backgroundColor: "rgba(255, 255, 255, 1)",
    border: "1px solid rgba(30, 144, 255, 1)",
  },
  Check: {
    display: "none",
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "calc(100% - 8px)",
    height: "calc(100% - 8px)",
    transform: "translate(-50%, -50%)",
    transition: "left 0.3s ease",
    borderRadius: "6px",
    backgroundColor: "rgba(30, 144, 255, 1)",
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
function TaskAddBoxCard(props) {
  var { taskName } = props;
  const [isChecked, setIsChecked] = React.useState(false);

  const onClick = () => {
    setIsChecked(!isChecked);
  };
  return (
    <>
      <div className="TaskAddBoxCard-container" onClick={onClick}>
        <div className="task-card-grid">
          <div className="task-card-item">{taskName}</div>
          <div className="task-card-radio">
            <div style={styles.Container}>
              <div
                style={{
                  ...styles.Check,
                  display: isChecked ? "block" : "none",
                }}
              />
              <input type="radio" style={styles.Input} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default TaskAddBoxCard;
