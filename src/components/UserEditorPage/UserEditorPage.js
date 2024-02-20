import React from "react";
import UserCard from "./UserCard";
import "./UserEditorPage.css";

function UserEditorPage(props) {
  var { userData, editMode } = props;
  return (
    <div>
      {userData.map((user) => {
        return (
          <UserCard
            firstName={user.first_name}
            lastName={user.last_name}
            permission={user.permission}
            editMode={editMode}
          />
        );
      })}
    </div>
  );
}

export default UserEditorPage;
