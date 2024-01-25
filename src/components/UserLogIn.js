import React from "react";
import "./UserLogIn.css";
import { PageType } from "../Tools/Types";

function UserLogIn(props) {
  // eslint-disable-next-line
  var { setCurrentArea, setUserRequest, setIsUserLogedIn } = props;

  return (
    <div>
      <div className="login-image" />
      <div className="default-text">Sweepster</div>
      <button
        className="login-button"
        onClick={() => {
          setCurrentArea(PageType.floor);
          setIsUserLogedIn(true);
        }}
      >
        Sign in with Email
      </button>
    </div>
  );
}

export default UserLogIn;
