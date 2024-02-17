import React, { useEffect, useState } from "react";
import "./UserLogIn.css";
import { PageType } from "../Tools/Types";
import LogInFooter from "./LogInFooter/LogInFooter";
import NewWorkspacePage from "./NewWorkspacePage/NewWorkspacePage";
import TaskAddBox from "./TaskAddBox/TaskAddBox";
import TaskAddBoxCard from "./TaskAddBox/TaskAddBoxCard";
function UserLogIn(props) {
  // eslint-disable-next-line
  var { setCurrentArea, setUserRequest, setIsUserLogedIn, setHotelNumber } =
    props;
  const [loginStep, setLoginStep] = useState("login");
  const [inputValue, setInputValue] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // eslint-disable-next-line
  const [errorStatus, setErrorStatus] = useState(null);
  const [userData, setUserData] = useState(null);

  // eslint-disable-next-line
  const [hasInputNumberOfRooms, setHasInputNumberOfRooms] = useState(false);
  const [listOfTasks, setListOfTasks] = useState([]);

  const [roomValue, setRoomValue] = useState("");
  const roomInputChange = (e) => {
    const newValue = e.target.value.replace(/\D/g, "");
    setRoomValue(newValue);
  };
  const [floorInput, setFloorInput] = useState("");
  const floorInputChange = (e) => {
    const newValue = e.target.value.replace(/\D/g, "");
    setFloorInput(newValue);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmailInput(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    console.log("UPDATE");
  }, [listOfTasks]);
  return (
    <div className="user-login-container">
      <div className="login-image" />
      <div className="default-text">Sweepster</div>
      {loginStep === "login" && (
        <>
          <button
            className="login-button"
            onClick={() => {
              setCurrentArea(PageType.floor);
              setIsUserLogedIn(true);
            }}
          >
            Sign in with Email
          </button>
          <button
            className="sign-up-button"
            onClick={() => {
              setLoginStep("sign-up-username");
            }}
          >
            Create a account
          </button>
        </>
      )}
      {loginStep === "sign-up-username" && (
        <>
          <div className="text">What is your email?</div>
          <input
            className="email-input"
            type="text"
            placeholder="Type here..."
            value={emailInput}
            onChange={handleEmailChange}
          />
        </>
      )}
      {loginStep === "sign-up-password" && (
        <>
          <div className="text">Create a password</div>
          <input
            className="password-input"
            type="text"
            placeholder="Type here..."
            value={passwordInput}
            onChange={handlePasswordChange}
          />
          <input
            className="password-confirm-input"
            type="text"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </>
      )}
      {loginStep === "workspace-options" && (
        <>
          <div className="text">
            Joining and existing workspace? Or creating a new one?
          </div>
          <button
            className="create-workspace-button"
            onClick={() => {
              setLoginStep("workspace-create");
            }}
          >
            Create New Workspace
          </button>
          <button
            className="join-workspace-button"
            onClick={() => {
              setLoginStep("workspace-join");
            }}
          >
            Join Exsisting Workspace
          </button>
        </>
      )}
      {loginStep === "workspace-join" && (
        <>
          <div className="text">
            Enter the ID code for your organization provided by management.
          </div>
          <input
            className="password-input"
            type="text"
            placeholder="Type here..."
            value={inputValue}
            onChange={handleInputChange}
          />
        </>
      )}

      {loginStep === "workspace-create" && (
        <>
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
        </>
      )}
      {loginStep === "number-of-floors" && (
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
      {loginStep === "number-of-rooms" && (
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
      {loginStep === "tasks-for-all-rooms" && (
        <>
          <div className="text">
            What tasks would you like to add to all rooms?
          </div>
          <div className="task-box">
            {listOfTasks?.map((task) => (
              <TaskAddBoxCard taskName={task.task} />
            ))}
          </div>
        </>
      )}
      {loginStep !== "login" && loginStep !== "workspace-options" && (
        <LogInFooter
          loginStep={loginStep}
          passwordInput={passwordInput}
          confirmPassword={confirmPassword}
          emailInput={emailInput}
          inputValue={inputValue}
          userData={userData}
          numberOfFloors={floorInput}
          numberOfRooms={roomValue}
          listOfTasks={listOfTasks}
          setListOfTasks={setListOfTasks}
          setLoginStep={setLoginStep}
          setCurrentArea={setCurrentArea}
          setIsUserLogedIn={setIsUserLogedIn}
          setErrorStatus={setErrorStatus}
          setUserData={setUserData}
          setHotelNumber={setHotelNumber}
        />
      )}
    </div>
  );
}

export default UserLogIn;
