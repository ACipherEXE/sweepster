import React, { useState } from "react";
import "./FloorsPage.css";
import { addFloorAndRoom } from "../../Tools/Utils";
function FloorDropdown(props) {
  var { floorData } = props;
  const [isFloorCardOpen, setIsFloorCardOpen] = useState(false);

  return (
    <>
      <div className="floor-card">
        <button className="floor-button">
          <svg className="floor-icon" viewBox="0 0 640 512">
            <path d="M176 288C220.1 288 256 252.1 256 208S220.1 128 176 128S96 163.9 96 208S131.9 288 176 288zM544 128H304C295.2 128 288 135.2 288 144V320H64V48C64 39.16 56.84 32 48 32h-32C7.163 32 0 39.16 0 48v416C0 472.8 7.163 480 16 480h32C56.84 480 64 472.8 64 464V416h512v48c0 8.837 7.163 16 16 16h32c8.837 0 16-7.163 16-16V224C640 170.1 597 128 544 128z"></path>
          </svg>
        </button>
        <div className="floor-text">Floor {floorData.floor}</div>

        <svg className="floor-arrow-icon" viewBox="0 0 320 512">
          <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>
        </svg>
      </div>
      <div className="floor-card-open">
        {floorData.rooms.map((room) => {
          return (
            <div
              className="room-button"
              onClick={() => {
                addFloorAndRoom(floorData.floor, room.room);
              }}
            >
              {room.room}
            </div>
          );
        })}
      </div>
    </>
  );
}
export default FloorDropdown;
