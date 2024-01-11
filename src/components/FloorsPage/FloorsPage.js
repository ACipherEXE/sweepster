import React from "react";
import "./FloorsPage.css";

function FloorsPage(props) {
  var { floorData } = props;
  console.log(floorData);
  return (
    <>
      {Object.values(floorData).map((floor) => {
        console.log(floor);
      })}
      <div class="">{props.children}</div>
    </>
  );
}
export default FloorsPage;
