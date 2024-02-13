import React from "react";
import "./LogInFooter.css";
import { PageType } from "../../Tools/Types";
import {
  fetchDataInRender,
  postUserData,
  updateUserData,
} from "../../Tools/DatabaseCalls";
function LogInFooter(props) {
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

  function goAStepFront() {
    if (loginStep === "sign-up-username") {
      if (emailInput === "" || emailInput === null) {
        console.log("You must pass a email");
        setErrorStatus("Password must match");
      } else {
        setErrorStatus(null);
        setLoginStep("sign-up-password");
      }
    }
    if (loginStep === "sign-up-password") {
      if (
        passwordInput !== confirmPassword ||
        passwordInput === null ||
        confirmPassword === null ||
        passwordInput === "" ||
        confirmPassword === ""
      ) {
        console.log("Password must match");
        setErrorStatus("Password must match");
      } else {
        setErrorStatus(null);
        postUserData({
          email: emailInput,
          userName: "PlaceHolder",
          pass: passwordInput,
          hotelID: null,
        }).then((response) => {
          console.log(response);
          setUserData(response);
        });
        setLoginStep("workspace-options");
      }
    }
    if (loginStep === "workspace-join") {
      userData.hotelID = inputValue;

      fetchDataInRender(userData.hotelID)
        .then((data) => {
          if (data) {
            console.log(userData);
            updateUserData(userData)
              .then((data) => {
                console.log(data);
                if (data) {
                  console.log(data);
                  setCurrentArea(PageType.floor);
                  setIsUserLogedIn(true);
                  setHotelNumber(data.hotelID);
                }
              })
              .catch((error) => {
                setErrorStatus("No hotel under that ID");
                console.error("Error:", error);
              });
          }
        })
        .catch((error) => {
          console.log("No hotel under that ID");
          setErrorStatus("No hotel under that ID");
          console.error("Error:", error);
        });
    }
  }
  function goAStepBack() {
    if (loginStep === "sign-up-username") {
      setLoginStep("login");
    }
    if (loginStep === "sign-up-password") {
      setLoginStep("sign-up-username");
    }
    if (loginStep === "workspace-join") {
      setLoginStep("workspace-options");
    }
  }
  return (
    <div className="log-in-footer-container">
      <button
        className="login-back-step-button"
        onClick={() => {
          goAStepBack();
        }}
      >
        Back
      </button>
      <button className="new-multi-task-button-login">
        <svg className="new-multi-task-button-icon" viewBox="0 0 448 512">
          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
        </svg>
      </button>
      <button
        className="login-next-step-button"
        onClick={() => {
          goAStepFront();
        }}
      >
        Next
      </button>
    </div>
  );
}
export default LogInFooter;
