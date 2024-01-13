import React from "react";
import "./UserLogIn.css";

function UserLogIn() {
  function addQueryParam(url, paramName) {
    const separator = url.includes("?") ? "&" : "?";
    const updatedUrl = `${url}${separator}${encodeURIComponent(paramName)}}`;
    return updatedUrl;
  }
  return (
    <div>
      <div className="login-image" />
      <div className="default-text">Sweepster</div>
      <button
        className="login-button"
        onClick={addQueryParam(window.location.href, "floors")}
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
