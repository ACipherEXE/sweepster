import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import "./UserEditorPage.css";

function UserEditorPage(props) {
  var { userData, setData, editMode } = props;
  console.log(userData);
  const [userRequest, setUserRequest] = useState(null);
  const [removeUser, setRemoveUser] = useState(null);
  
  function editPermission(userId, newPermission) {
    // Find the index of the user with the given ID
    const userIndex = userData.findIndex((user) => user.id === userId);

    // If user with given ID exists
    if (userIndex !== -1) {
      // Update the permission
      userData[userIndex].permission = newPermission;
      console.log(
        `Permission for user with ID ${userId} updated to ${newPermission}`
      );
    } else {
      console.log(`User with ID ${userId} not found`);
    }
  }

  function removeUserById(userId) {
    // Find the index of the user with the given ID
    const userIndex = userData.findIndex((user) => user.id === userId);

    // If user with given ID exists
    if (userIndex !== -1) {
      // Remove the user from the array
      userData.splice(userIndex, 1);
      console.log(`User with ID ${userId} removed successfully`);
    } else {
      console.log(`User with ID ${userId} not found`);
    }
  }

  useEffect(() => {
    if (userRequest !== null) {
      editPermission(userRequest.id, userRequest.role);
    }
  }, [userRequest]);

  useEffect(() => {
    if (removeUser !== null) {
      removeUserById(removeUser.id);
    }
  }, [removeUser]);

  return (
    <div>
      {userData.map((user) => {
        return (
          <UserCard
            firstName={user.userName}
            lastName={""}
            permission={user.permission}
            userid={user.id}
            editMode={editMode}
            setRemoveUser={setRemoveUser}
            setUserRequest={setRemoveUser}
          />
        );
      })}
    </div>
  );
}

export default UserEditorPage;
