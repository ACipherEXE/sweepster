import React from "react";
import "./HeaderArea.css";

function HeaderArea(props) {
  // eslint-disable-next-line
  var { currentArea, setCurrentArea } = props;
  return (
    <div className="header-area">
      <div className="header-container">
        <div className="header-item">
        </div>
        <div className="header-item">
          <div>{currentArea ? currentArea : ""}</div>
        </div>
      </div>
    </div>
  );
}
export default HeaderArea;
