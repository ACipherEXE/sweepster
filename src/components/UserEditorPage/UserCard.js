import React, { useState } from "react";

function UserCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectItem = (item) => {
    setSelectedItem(item);
    toggleDropdown();
  };
  const editMode = false;
  return (
    <div className="user-card-container">
      <div class="grid-item">
        <div className="user-card-name ">Cipher Negron</div>
      </div>
      {!editMode ? (
        <div class="grid-item">
          <div className="user-card-permissions-non-edit-mode">Manager</div>
        </div>
      ) : (
        <div class="grid-item">
          <div className={`dropdown ${isOpen ? "active" : ""}`}>
            <span
              className="user-card-permissions-chosen"
              onClick={toggleDropdown}
            >
              {selectedItem ? selectedItem : "User"}
            </span>
            <div className="dropdown-content">
              <div className="dropdown-item" onClick={() => selectItem("User")}>
                <div className="user-card-permissions">User</div>
              </div>
              <div
                className="dropdown-item"
                onClick={() => selectItem("Manager")}
              >
                <div className="user-card-permissions">Manager</div>
              </div>
              <div
                className="dropdown-item"
                onClick={() => selectItem("Admin")}
              >
                <div className="user-card-permissions">Admin</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserCard;
