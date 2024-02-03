import React, { useState } from "react";
import "./UserLogIn.css";
import { PageType } from "../Tools/Types";
import LogInFooter from "./LogInFooter/LogInFooter";
import NewWorkspacePage from "./NewWorkspacePage/NewWorkspacePage";
function UserLogIn(props) {
  // eslint-disable-next-line
  var { setCurrentArea, setUserRequest, setIsUserLogedIn } = props;
  const [loginStep, setLoginStep] = useState("workspace-create");
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
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
            value={inputValue}
            onChange={handleInputChange}
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
            value={inputValue}
            onChange={handleInputChange}
          />
          <input
            className="password-confirm-input"
            type="text"
            placeholder="Confirm Password"
            value={inputValue}
            onChange={handleInputChange}
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
              // setCurrentArea(PageType.floor);
              // setIsUserLogedIn(true);
            }}
          >
            Create New Workspace
          </button>
          <button
            className="join-workspace-button"
            onClick={() => {
              // setCurrentArea(PageType.floor);
              // setIsUserLogedIn(true);
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
          <NewWorkspacePage />
        </>
      )}

      {loginStep !== "login" && (
        <LogInFooter loginStep={loginStep} setLoginStep={setLoginStep} />
      )}
    </div>
  );
}

export default UserLogIn;
