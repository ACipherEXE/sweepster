import React from "react";
import "./FloorsPage.css";
import FloorDropdown from "./FloorDropdown";

function FloorsPage(props) {
  var { hotelFloorData, setCurrentArea, setUserRequest } = props;
  return (
    <>
      {hotelFloorData.map((floor) => {
        return (
          <FloorDropdown
            floorData={floor}
            setCurrentArea={setCurrentArea}
            setUserRequest={setUserRequest}
          />
        );
      })}
    </>
  );
}
export default FloorsPage;
