import React from "react";
import "./UserLogIn.css";

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
          setCurrentArea("floors");
          setIsUserLogedIn(true);
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
