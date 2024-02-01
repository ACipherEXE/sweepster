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
    <div className="user-card-container" onClick={toggleDropdown}>
      <div className="user-card-grid" onClick={toggleDropdown}>
        <div class="grid-item">
          <div className="user-card-name">Cipher Negron</div>
        </div>

        <div>
          <div class="grid-item">
            <div className="user-card-permissions-non-edit-mode">Manager</div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div class="user-card-buttons-container">
          <button className="user-card-button"> ello world</button>
          <button className="user-card-button"> ello world</button>
          <button className="user-card-button"> ello world</button>
          <button className="user-card-button"> ello world</button>
        </div>
      )}
    </div>
  );
}

export default UserCard;
