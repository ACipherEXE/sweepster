import React, { useState } from "react";
import "./LogInFooter.css";
import bcrypt from "bcryptjs";
import { PageType } from "../../Tools/Types";
import {
  fetchDataInRender,
  postUserData,
  updateUserData,
  createHotelData,
  // eslint-disable-next-line
  updateHotelData,
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
    numberOfRooms,
    numberOfFloors,
    setListOfTasks,
    setLoginStep,
    setCurrentArea,
    setIsUserLogedIn,
    setErrorStatus,
    setUserData,
    setHotelNumber,
    setUserName,
    setUserID,
  } = props;

  const [isVisible, setIsVisible] = useState(false);
  // eslint-disable-next-line
  const [data, setData] = useState([]);

  function generateHotelJson(numFloors, roomsPerFloor, tasksList) {
    console.log(userData);
    let hotelData = {
      Staff_List: [
        {
          userName: userData.email,
          id: userData.id,
          permission: "Admin",
        },
      ],
      hotel_data: {
        floors: [],
      },
    };

    for (let i = 1; i <= numFloors; i++) {
      let floor = {
        floor: i === 1 ? "ground" : i.toString(),
        rooms: [],
      };

      for (let j = 1; j <= roomsPerFloor; j++) {
        let room = {
          room: (i === 1 ? "0" : i.toString()) + j.toString().padStart(2, "0"),
          tasks: tasksList,
        };

        floor.rooms.push(room);
      }

      hotelData.hotel_data.floors.push(floor);
    }

    return hotelData;
  }
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
          pass: bcrypt.hashSync(passwordInput, "$2a$10$abcdefghijklmnopqrstuu"),
          hotelId: null,
        }).then((response) => {
          console.log(response);
          setUserData(response);
        });
        setLoginStep("workspace-options");
      }
    }
    if (loginStep === "workspace-join") {
      userData.hotelId = inputValue;
      console.log("USERDATA: " + JSON.stringify(userData));
      fetchDataInRender(userData.hotelId)
        .then((data) => {
          if (data) {
            updateUserData(userData)
              .then((data) => {
                if (data) {
                  console.log(data);
                  setCurrentArea(PageType.floor);
                  setIsUserLogedIn(true);
                  setHotelNumber(data.hotelId);
                  setUserName(data.email);
                  setUserID(userData.id);
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
    if (loginStep === "number-of-floors") {
      setErrorStatus(null);
      setLoginStep("number-of-rooms");
    }
    if (loginStep === "number-of-rooms") {
      setErrorStatus(null);
      setLoginStep("tasks-for-all-rooms");
    }
    if (loginStep === "tasks-for-all-rooms") {
      createHotelData(
        generateHotelJson(numberOfFloors, numberOfRooms, listOfTasks)
      ).then((data) => {
        console.log(data);
        if (data) {
          userData.hotelId = data.id;
          console.log(data);
          updateUserData(userData)
            .then((data) => {
              if (data) {
                setCurrentArea(PageType.floor);
                setIsUserLogedIn(true);
                setHotelNumber(data.hotelId);
                setUserName(data.email);
                setUserID(userData.id);
              }
            })
            .catch((error) => {
              setErrorStatus("No hotel under that ID");
              console.error("Error:", error);
            });
        }
      });
    }
  }
  function goAStepBack() {
    console.log(loginStep);
    if (loginStep === "sign-up-username") {
      setLoginStep("log-in");
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
    if (loginStep === "number-of-floors") {
      setLoginStep("workspace-options");
    }
  }

  return (
    <div className="log-in-footer-container">
      {loginStep !== "log-in" && (
        <button
          className="login-back-step-button"
          onClick={() => {
            goAStepBack();
          }}
        >
          Back
        </button>
      )}
      <button
        className="new-multi-task-button-login"
        onClick={() => setIsVisible(true)}
        style={{
          display: loginStep === "tasks-for-all-rooms" ? "block" : "none",
        }}
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
            listOfTasks={listOfTasks}
            setListOfTasks={setListOfTasks}
          />
        </div>
      )}
      {loginStep !== "log-in" && (
        <button
          className="login-next-step-button"
          onClick={() => {
            goAStepFront();
          }}
        >
          Next
        </button>
      )}
    </div>
  );
}
export default LogInFooter;
