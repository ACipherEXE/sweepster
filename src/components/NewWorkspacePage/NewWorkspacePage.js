import React, { useState } from "react";
import "./NewWorkspacePage.css";
import TaskAddBox from "../TaskAddBox/TaskAddBox";

function NewWorkspacePage(props) {
  // eslint-disable-next-line
  const [createStep, setCreateStep] = useState("tasks-for-all-rooms");
  // eslint-disable-next-line
  const [hasInputNumberOfRooms, setHasInputNumberOfRooms] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div>
      {createStep === "number-of-rooms" && (
        <>
          <div className="text">
            How many floors require schedueled cleaning?
          </div>
          <input
            className="password-input"
            type="text"
            placeholder="Enter Number"
            value={inputValue}
            onChange={handleInputChange}
          />
          {!hasInputNumberOfRooms && (
            <>
              <div className="text">How many floors are on floor X</div>
              <input
                className="password-input"
                type="text"
                placeholder="Enter Number"
                value={inputValue}
                onChange={handleInputChange}
              />
            </>
          )}
        </>
      )}
      {createStep === "tasks-for-all-rooms" && (
        <>
          <div className="text">
            What tasks would you like to add to all rooms?
          </div>
          <TaskAddBox />
        </>
      )}
    </div>
  );
}

export default NewWorkspacePage;
