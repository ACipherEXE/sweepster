import React, { useState } from "react";
import "./FloorsPage.css";
import FloorDropdown from "./FloorDropdown";
import { getfloors } from "../../Tools/Utils";

/**
 *
 * @param {*} props
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
