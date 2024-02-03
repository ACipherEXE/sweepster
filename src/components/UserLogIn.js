import React, { useState } from "react";
import "./UserLogIn.css";
import { PageType } from "../Tools/Types";
import LogInFooter from "./LogInFooter/LogInFooter";
function UserLogIn(props) {
  // eslint-disable-next-line
  var { setCurrentArea, setUserRequest, setIsUserLogedIn } = props;
  const [loginStep, setLoginStep] = useState("sign-up-password");
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div>
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
          <div>What is your email?</div>
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
          <div>Create a password</div>
          <input
            className="email-input"
            type="text"
            placeholder="Type here..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <input
            className="email-input"
            type="text"
            placeholder="Confirm Password"
            value={inputValue}
            onChange={handleInputChange}
          />
        </>
      )}
      {loginStep !== "login" && (
        <LogInFooter loginStep={loginStep} setLoginStep={setLoginStep} />
      )}
    </div>
  );
}

export default UserLogIn;
