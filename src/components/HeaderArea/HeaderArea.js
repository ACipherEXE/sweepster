import React from "react";
import "./HeaderArea.css";

function HeaderArea(props) {
  // eslint-disable-next-line
  var { currentArea, setCurrentArea } = props;
  return (
    <div className="header-area">
      <div class="header-container">
        <div class="header-item">
          <button
            onClick={() => {
              setCurrentArea("floors");
            }}
          >
            ||||
          </button>
        </div>
        <div class="header-item">
          <div>Current Area</div>
        </div>
        <div class="header-item">
          <button>profile</button>
        </div>
      </div>
    </div>
  );
}
export default HeaderArea;
