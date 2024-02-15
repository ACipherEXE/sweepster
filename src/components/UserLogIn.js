import React, { useState } from "react";
import "./UserLogIn.css";
import { PageType } from "../Tools/Types";
import LogInFooter from "./LogInFooter/LogInFooter";
import NewWorkspacePage from "./NewWorkspacePage/NewWorkspacePage";

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
          <NewWorkspacePage
            loginStep={loginStep}
            passwordInput={passwordInput}
            confirmPassword={confirmPassword}
            emailInput={emailInput}
            inputValue={inputValue}
            userData={userData}
            setLoginStep={setLoginStep}
            setCurrentArea={setCurrentArea}
            setIsUserLogedIn={setIsUserLogedIn}
            setErrorStatus={setErrorStatus}
            setUserData={setUserData}
            setHotelNumber={setHotelNumber}
          />
        </>
      )}

      {loginStep !== "login" &&
        loginStep !== "workspace-options" &&
        loginStep !== "workspace-create" && (
          <LogInFooter
            loginStep={loginStep}
            passwordInput={passwordInput}
            confirmPassword={confirmPassword}
            emailInput={emailInput}
            inputValue={inputValue}
            userData={userData}
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
