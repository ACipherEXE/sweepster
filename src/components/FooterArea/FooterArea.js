import React from "react";
import "./FooterArea.css";

function FooterArea(props) {
  // eslint-disable-next-line
  var { currentArea, setCurrentArea } = props;
  return (
    <div class="footer-container">
      <div class="footer-item">
        <button
          onClick={() => {
            setCurrentArea("floors");
          }}
        >
          ||||
        </button>
      </div>
      <div class="footer-item">
        <div>Current Area</div>
      </div>
      <div class="footer-item">
        <button>profile</button>
      </div>
    </div>
  );
}
export default FooterArea;
