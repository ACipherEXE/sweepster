import React, { useState } from "react";
import bcrypt from "bcryptjs"; // Import bcrypt
import "./UserLogIn.css";
import { PageType } from "../Tools/Types";
import LogInFooter from "./LogInFooter/LogInFooter";
// eslint-disable-next-line
import NewWorkspacePage from "./NewWorkspacePage/NewWorkspacePage";
// eslint-disable-next-line
import TaskAddBox from "./TaskAddBox/TaskAddBox";
import TaskAddBoxCard from "./TaskAddBox/TaskAddBoxCard";
import { userLogIn } from "../Tools/DatabaseCalls";
function UserLogIn(props) {
  // eslint-disable-next-line
  var {
    setCurrentArea,
    setUserRequest,
    setIsUserLogedIn,
    setHotelNumber,
    setUserID,
    setUserName,
  } = props;

  // Add state for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
  // Sample user accounts
  // eslint-disable-next-line
  const users = {
    "user1@example.com":
      "$2a$10$abcdefghijklmnopqrstuuYM7o1imBU7mkUzbM6NuCUs0Y1ieI2YC", //Password is Test321
    "user2@example.com":
      "$2a$10$Hd33/vB0XDilIIZrzGK80OtOmpMuJ0JlL6ed5oeo3M6htMB2WNJi6", //Password is Test123
  };

  const handleLogin = () => {
    console.log(bcrypt.hashSync(password, "$2a$10$abcdefghijklmnopqrstuu"));
    if (password && email) {
      userLogIn(
        email,
        bcrypt.hashSync(password, "$2a$10$abcdefghijklmnopqrstuu")
      ).then((data) => {
        setUserData(data);
        if (data.userId) {
          console.log(data);
          if (data.hotelId === null || !data.hotelId) {
            setUserID(data.userId);
            console.log("NO HOTEL ID");
            setLoginStep("workspace-options");
          } else {
            setCurrentArea(PageType.floor);
            setIsUserLogedIn(true);
            setHotelNumber(data.hotelId);
            setUserID(data.userId);
            setUserName(data.email);
          }
        } else {
          alert("Email and/or password not found");
        }
      });
    }
    // DO not delete!
    // if (users[email]) {
    //   // Check if the email exists in the users object
    //   if (bcrypt.compareSync(password, users[email])) {
    //     // Compare the entered password with the hashed password
    //     // setCurrentArea(PageType.floor);
    //     // setIsUserLogedIn(true);
    //     console.log("Valid password");
    //     bcrypt.hash(password, 0, function (err, hash) {
    //       // Store hash in your password DB.

    //       if (bcrypt.compareSync(password, hash)) {
    //         console.log("Valid password1");
    //       }
    //     });
    //   } else {
    //     alert("Invalid password");
    //   }
    // } else {
    //   alert("Email not found");
    // }
  };

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

  return (
    <div className="user-login-container">
      <div className="login-image" />
      <div className="default-text">Sweepster</div>

      {loginStep === "login" && (
        <>
          <button
            className="login-button"
            onClick={() => {
              // setCurrentArea(PageType.floor);
              // setIsUserLogedIn(true);
              setLoginStep("log-in");
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
      {loginStep === "log-in" && (
        <>
          {/* Add fields for email and password */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" onClick={handleLogin}>
            Sign in with Email
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
          <button
            className="create-workspace-button"
            onClick={() => {
              setLoginStep("number-of-floors");
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
            Join Existing Workspace
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

      {/* {loginStep === "workspace-create" && (
        <>
          <>
            <div className="text">
              How many floors require scheduled cleaning?
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
      )} */}
      {loginStep === "number-of-floors" && (
        <>
          <div className="text">
            How many floors require scheduled cleaning?
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
            <div className="text">How many rooms are on each floor?</div>
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
          setUserName={setUserName}
        />
      )}
    </div>
  );
}

export default UserLogIn;
