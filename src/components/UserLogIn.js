import React from "react";
import "./UserLogIn.css";

function UserLogIn(props) {
  // eslint-disable-next-line
  var { setCurrentArea, setUserRequest } = props;

  return (
    <div>
      <div className="login-image" />
      <div className="default-text">Sweepster</div>
      <button
        className="login-button"
        onClick={() => {
          setCurrentArea("floors");
        }}
      >
        Sign in with Email
      </button>
      <div>
        <button className="google-login-button">Google</button>
        <button className="apple-login-button">Apple ID</button>
      </div>
    </div>
  );
}

export default UserLogIn;
