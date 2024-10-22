import React from "react";
import "./HeaderArea.css";

function HeaderArea(props) {
  // eslint-disable-next-line
  var { currentArea, setCurrentArea, userPermissions } = props;
  return (
    <div className="header-area">
      <div className="header-container">
        <div className="hotel-name">Sweepster</div>{" "}
        {/* Enter hotel name here */}
        <div className="header-item"></div>
        <div className="header-item">
          <div>{currentArea ? currentArea : ""}</div>
        </div>
      </div>
    </div>
  );
}
export default HeaderArea;
