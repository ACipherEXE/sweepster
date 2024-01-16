import React from "react";
import "./FooterArea.css";

function FooterArea(props) {
  var { currentArea, setCurrentArea } = props;
  return (
    <div class="footer-container">
      <div class="footer-item">
        <button onClick={() => {}}>||||</button>
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
