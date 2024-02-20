import React, { useEffect, useState } from "react";

function UserCard(props) {
  var { firstName, lastName, permission, editMode } = props;
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line
  const [selectedItem, setSelectedItem] = useState(null);
  const toggleDropdown = () => {
    if (editMode) {
      setIsOpen(!isOpen);
    }
  };
  // eslint-disable-next-line
  const selectItem = (item) => {
    setSelectedItem(item);
    toggleDropdown();
  };

  // Reset isOpen if editMode is changed
  useEffect(() => {
    setIsOpen(false);
  }, [editMode]);

  return (
    <div className="user-card-container" onClick={toggleDropdown}>
      <div className="user-card-grid" onClick={toggleDropdown}>
        <div class="grid-item">
          <div className="user-card-name">{`${firstName} ${lastName}`}</div>
        </div>

        <div>
          <div class="grid-item">
            <div className="user-card-permissions-non-edit-mode">
              {permission}
            </div>
          </div>
        </div>
      </div>
      {editMode ? (
        <>
          {isOpen && (
            <div class="user-card-buttons-container">
              <button className="user-card-button">User</button>
              <button className="user-card-button">Manager</button>
              <button className="user-card-button">Admin</button>
              <button className="user-card-button-warning">Delete</button>
            </div>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default UserCard;
