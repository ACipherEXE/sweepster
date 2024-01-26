import React, { useEffect, useState } from "react";
import "./EditorTool.css";
import { PageType } from "../../Tools/Types";
/**
 * Component that handles the edit mode trigger on the app.
 * @param {String} currentArea - current area the user is at
 * @param {Boolean} editMode - if the user has enabled edit mode. It is set here!
 * @param {useState} setEditMode - To change the boolean of edit mode
 * @returns
 */
function EditorTool(props) {
  const { currentArea, editMode, hotelNumber, setEditMode } = props;
  const [isHotelNumberVisible, setIsHotelNumberVisible] = useState(false);
  useEffect(() => {
    if (currentArea) {
      setEditMode(false);
    }
    // eslint-disable-next-line
  }, [currentArea]);
  return (
    <div>
      {/**
       * Expand here the rooms you want this component to appear
       */}
      {currentArea === PageType.room && (
        <div>
          <div class="editor-tool-container">
            <div class="editor-tool-item">
              <button className="editor-all-button">All</button>
              {editMode ? (
                <button
                  className="editor-edit-button-active"
                  onClick={() => setEditMode(!editMode)}
                >
                  End Edit
                </button>
              ) : (
                <button
                  className="editor-edit-button"
                  onClick={() => setEditMode(!editMode)}
                >
                  Edit
                </button>
              )}
            </div>
            {/**
             * TODO: Make this change when we are in the  user management page
             * TODO: Implement visible and invisible logo.
             */}
            {editMode ? (
              <div className="hotel-id-container">
                <div
                  className="editor-tool-item"
                  onClick={() => setIsHotelNumberVisible(!isHotelNumberVisible)}
                >
                  <div className="editor-hotel-id">
                    {isHotelNumberVisible ? hotelNumber : "Hotel ID"}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div class="editor-tool-item">
                  <button className="editor-reset-button">
                    Reset All Tasks
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default EditorTool;
