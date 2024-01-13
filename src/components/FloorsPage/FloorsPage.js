import React from "react";
import "./FloorsPage.css";
import FloorDropdown from "./FloorDropdown";

function FloorsPage(props) {
  var { hotelFloorData, pageHandler } = props;
  return (
    <>
      {hotelFloorData.map((floor) => {
        return <FloorDropdown floorData={floor} pageHandler={pageHandler} />;
      })}
    </>
  );
}
export default FloorsPage;
