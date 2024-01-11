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
      <div class="login-image" />
      <div class="default-text">Sweepster</div>
      <button
        class="login-button"
        onClick={addQueryParam(window.location.href, "floors")}
      >
        Sign in with Email
      </button>
      <div>
        <button class="google-login-button">Google</button>
        <button class="apple-login-button">Apple ID</button>
      </div>
    </div>
  );
}

export default UserLogIn;
