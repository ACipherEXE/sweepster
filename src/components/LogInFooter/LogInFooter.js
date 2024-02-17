import React, { useEffect, useState } from "react";
import "./LogInFooter.css";
import { PageType } from "../../Tools/Types";
import {
  fetchDataInRender,
  postUserData,
  updateUserData,
} from "../../Tools/DatabaseCalls";
import AddTaskOverlay from "../AddTaskOverlay/AddTaskOverlay";
function LogInFooter(props) {
  var {
    loginStep,
    confirmPassword,
    passwordInput,
    emailInput,
    userData,
    inputValue,
    listOfTasks,
    setListOfTasks,
    setLoginStep,
    setCurrentArea,
    setIsUserLogedIn,
    setErrorStatus,
    setUserData,
    setHotelNumber,
  } = props;
  const [data, setData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setListOfTasks(data);
  }, [data]);
  function goAStepFront() {
    console.log(loginStep);
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
            updateUserData(userData)
              .then((data) => {
                if (data) {
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
    if (loginStep === "workspace-create") {
      setErrorStatus(null);
      setLoginStep("number-of-rooms");
    }
    if (loginStep === "number-of-rooms") {
      setErrorStatus(null);
      setLoginStep("tasks-for-all-rooms");
    }
    if (loginStep === "tasks-for-all-rooms") {
      console.log(
        "This is wher we will genrate the hotel with the amount to floors and room with tasks inside them."
      );
    }
  }
  function goAStepBack() {
    console.log(loginStep);
    if (loginStep === "sign-up-username") {
      setLoginStep("login");
    }
    if (loginStep === "sign-up-password") {
      setLoginStep("sign-up-username");
    }
    if (loginStep === "workspace-join") {
      setLoginStep("workspace-options");
    }
    if (loginStep === "number-of-floors") {
      setLoginStep("workspace-options");
    }
    if (loginStep === "number-of-rooms") {
      setErrorStatus(null);
      setLoginStep("number-of-floors");
    }
    if (loginStep === "tasks-for-all-rooms") {
      setLoginStep("number-of-rooms");
    }
    if (loginStep === "workspace-create") {
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
      <button
        className="new-multi-task-button-login"
        onClick={() => setIsVisible(true)}
      >
        <svg className="new-multi-task-button-icon" viewBox="0 0 448 512">
          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
        </svg>
      </button>
      {isVisible && (
        <div>
          <AddTaskOverlay
            variant={true}
            setIsVisible={setIsVisible}
            data={data}
            setData={setData}
          />
        </div>
      )}
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
