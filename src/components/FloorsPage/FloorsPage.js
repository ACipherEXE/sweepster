import React, { useState, useEffect } from "react";
import "./FloorsPage.css";
import FloorDropdown from "./FloorDropdown";
import { getfloors } from "../../Tools/Utils";

/**
 *
 * @param {JSON} hotelData - Pass the whole JSON from the server
 * @param {String} hotelNumber - Pass the hotelNumber the user is working at
 * @param {string} setCurrentArea - Where you want to send the user after they click a room.
 * @param {JSON} setUserRequest - Pass here a JSON of the room the user pressed on. EX: { floor: 1, room: 101 }
 * @returns
 */
function FloorsPage(props) {
  var { hotelData, hotelNumber, setCurrentArea, setUserRequest } = props;
  // eslint-disable-next-line
  const [hotelFloors, setHotelFloors] = useState(
    getfloors(hotelData, hotelNumber)
  );

  return (
    <>
      {hotelFloors.map((floor) => {
        return (
          <div>
            <FloorDropdown
              floorData={floor}
              setCurrentArea={setCurrentArea}
              setUserRequest={setUserRequest}
            />
          </div>
        );
      })}
    </>
  );
}
export default FloorsPage;
