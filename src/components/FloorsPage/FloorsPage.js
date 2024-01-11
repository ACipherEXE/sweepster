import React from "react";
import "./FloorsPage.css";

function FloorsPage(props) {
  var { floorData } = props;
  console.log(Object.keys(floorData).length);
  return (
    <>
      <div class="">{props.children}</div>
    </>
  );
}
export default FloorsPage;
