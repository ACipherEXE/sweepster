import React, { useState } from "react";
import "./NewWorkspacePage.css";
import TaskAddBox from "../TaskAddBox/TaskAddBox";
import LogInFooter from "../LogInFooter/LogInFooter";
function NewWorkspacePage(props) {
  var {
    loginStep,
    confirmPassword,
    passwordInput,
    emailInput,
    userData,
    inputValue,
    setLoginStep,
    setCurrentArea,
    setIsUserLogedIn,
    setErrorStatus,
    setUserData,
    setHotelNumber,
  } = props;
  // eslint-disable-next-line
  const [createStep, setCreateStep] = useState("number-of-floors");
  // eslint-disable-next-line
  const [hasInputNumberOfRooms, setHasInputNumberOfRooms] = useState(false);
  const [roomValue, setRoomValue] = useState("");
  const roomInputChange = (e) => {
    setRoomValue(e.target.value);
  };
  const [floorInput, setFloorInput] = useState("");
  const floorInputChange = (e) => {
    setFloorInput(e.target.value);
  };

  return (
    <div>
      {createStep === "number-of-floors" && (
        <>
          <div className="text">
            How many floors require schedueled cleaning?
          </div>
          <input
            className="password-input"
            type="text"
            placeholder="Enter Number"
            value={floorInput}
            onChange={floorInputChange}
          />
        </>
      )}
      {createStep === "number-of-rooms" && (
        <>
          <>
            <div className="text">How many rooms are on eatch floor</div>
            <input
              className="password-input"
              type="text"
              placeholder="Enter Number"
              value={roomValue}
              onChange={roomInputChange}
            />
          </>
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
      <LogInFooter
        loginStep={createStep}
        passwordInput={passwordInput}
        confirmPassword={confirmPassword}
        emailInput={emailInput}
        inputValue={inputValue}
        userData={userData}
        numberOfFloors={floorInput}
        numberOfRooms={roomValue}
        setLoginStep={setCreateStep}
        setCurrentArea={setCurrentArea}
        setIsUserLogedIn={setIsUserLogedIn}
        setErrorStatus={setErrorStatus}
        setUserData={setUserData}
        setHotelNumber={setHotelNumber}
      />
    </div>
  );
}

export default NewWorkspacePage;
