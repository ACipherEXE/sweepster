import React, { useState } from "react";
import bcrypt from 'bcryptjs'; // Import bcrypt
import "./UserLogIn.css";
import { PageType } from "../Tools/Types";

function UserLogIn(props) {
  var { setCurrentArea, setUserRequest, setIsUserLogedIn } = props;

  // Add state for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Sample user accounts
  const users = {
    "user1@example.com": "$2a$10$lgmb1VMFn43V3WqojJgG9uO9tk9Urd.pF2AvTs4OS9zuZ9DBV5ysG", //Password is Test321
    "user2@example.com": "$2a$10$Hd33/vB0XDilIIZrzGK80OtOmpMuJ0JlL6ed5oeo3M6htMB2WNJi6" //Password is Test123
  };

  const handleLogin = () => {
    if (users[email]) { // Check if the email exists in the users object
      if (bcrypt.compareSync(password, users[email])) { // Compare the entered password with the hashed password
        setCurrentArea(PageType.floor);
        setIsUserLogedIn(true);
      } else {
        alert("Invalid password");
      }
    } else {
      alert("Email not found");
    }
  };
  

  return (
    <div>
      <div className="login-image" />
      <div className="default-text">Sweepster</div>

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

      <button
        className="login-button"
        onClick={handleLogin}
      >
        Sign in with Email
      </button>
    </div>
  );
}

export default UserLogIn;
