import React, { useState, useEffect } from "react";
import "./EditorTool.css";

function EditorTool() {
  return (
    <div class="editor-tool-container">
      <div class="editor-tool-item">
        <button className="editor-all-button">All</button>
        <button className="editor-edit-button">Edit</button>
      </div>
      <div class="editor-tool-item">
        <button className="editor-reset-button">Reset All Tasks</button>
      </div>
    </div>
  );
}
export default EditorTool;
