import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import { fetchDataInRender, updateHotelData } from "../../Tools/DatabaseCalls";
import "./UserEditorPage.css";

function UserEditorPage(props) {
  // eslint-disable-next-line
  var { userData, data, setData, editMode, hotelNumber } = props;

  const [userRequest, setUserRequest] = useState(null);
  const [removeUser, setRemoveUser] = useState(null);

  function editPermission(userId, newPermission) {
    console.log(hotelNumber);
    fetchDataInRender(hotelNumber)
      .then((data) => {
        //Avoid using api while test and building
        // Find the index of the user with the given ID
        const userIndex = data.Staff_List.findIndex(
          (user) => user.id === userId
        );

        // If user with given ID exists
        if (userIndex !== -1) {
          // Update the permission
          data.Staff_List[userIndex].permission = newPermission;
          console.log(data.Staff_List);
          setData(data);
          updateHotelData(data, hotelNumber).catch((error) => {
            console.error("Error:", error);
          });
          console.log(
            `Permission for user with ID ${userId} updated to ${newPermission}`
          );
        } else {
          console.log(`User with ID ${userId} not found`);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function removeUserById(userId) {
    fetchDataInRender(hotelNumber)
      .then((data) => {
        //Avoid using api while test and building
        // Find the index of the user with the given ID
        const userIndex = data.Staff_List.findIndex(
          (user) => user.id === userId
        );

        // If user with given ID exists
        if (userIndex !== -1) {
          // Remove the user from the array
          data.Staff_List.splice(userIndex, 1);
          setData(data);
          updateHotelData(data, hotelNumber).catch((error) => {
            console.error("Error:", error);
          });
          console.log(`User with ID ${userId} removed successfully`);
        } else {
          console.log(`User with ID ${userId} not found`);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // Find the index of the user with the given ID
  }

  useEffect(() => {
    if (userRequest !== null) {
      editPermission(userRequest.id, userRequest.role);
    }
    // eslint-disable-next-line
  }, [userRequest]);

  useEffect(() => {
    if (removeUser !== null) {
      removeUserById(removeUser.id);
    }
    // eslint-disable-next-line
  }, [removeUser]);

  return (
    <div>
      {userData.map((user) => {
        return (
          <UserCard
            firstName={user.userName}
            lastName={""}
            permission={user.permission}
            userId={user.id}
            editMode={editMode}
            setRemoveUser={setRemoveUser}
            setUserRequest={setUserRequest}
          />
        );
      })}
    </div>
  );
}

export default UserEditorPage;
