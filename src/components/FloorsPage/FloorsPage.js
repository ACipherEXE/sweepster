import React from "react";
import "./FloorsPage.css";
import FloorDropdown from "./FloorDropdown";

function FloorsPage(props) {
  var { hotelFloorData } = props;
  return (
    <>
      {hotelFloorData.map((floor) => {
        return <FloorDropdown floorData={floor} />;
      })}
    </>
  );
}
export default FloorsPage;
