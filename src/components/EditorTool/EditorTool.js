import React, { useEffect, useState } from "react";
import "./EditorTool.css";
import { PageType } from "../../Tools/Types";
import { fetchDataInRender, updateHotelData } from "../../Tools/DatabaseCalls";
import { getSpecificRoomTasks } from "../../Tools/Utils";
/**
 * Component that handles the edit mode trigger on the app.
 * @param {String} currentArea - current area the user is at
 * @param {Boolean} editMode - if the user has enabled edit mode. It is set here!
 * @param {useState} setEditMode - To change the boolean of edit mode
 * @returns
 */
function EditorTool(props) {
  const {
    currentArea,
    editMode,
    hotelNumber,
    userRequest,
    setEditMode,
    setData,
    // eslint-disable-next-line
    userPermissions,
  } = props;
  const [isHotelNumberVisible, setIsHotelNumberVisible] = useState(false);
  useEffect(() => {
    if (currentArea) {
      setEditMode(false);
    }
    // eslint-disable-next-line
  }, [currentArea]);

  function resetAllTasks() {
    fetchDataInRender(hotelNumber)
      .then((pulledData) => {
        var listOfLatestTasks = getSpecificRoomTasks(
          pulledData,
          userRequest.floor,
          userRequest.room
        );
        console.log(JSON.stringify(listOfLatestTasks));
        let updatedTasks = listOfLatestTasks.map((task) => ({
          ...task,
          isDone: false,
        }));
        console.log(JSON.stringify(updatedTasks));
        const floorIndex = pulledData.hotel_data.floors.findIndex(
          (floor) => floor.floor === userRequest.floor
        );
        /**Find the room */
        const roomIndex = pulledData.hotel_data.floors[
          floorIndex
        ].rooms.findIndex((room) => room.room === userRequest.room);
        /**Put the new task list in the correct room and floor */
        pulledData.hotel_data.floors[floorIndex].rooms[roomIndex].tasks =
          updatedTasks;
        // Set it as new data in the app
        setData(pulledData);

        // Update data in the API
        updateHotelData(pulledData, hotelNumber).catch((error) => {
          console.error("Error:", error);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div>
      {/**
       * Expand here the rooms you want this component to appear
       */}

      <div className="editor-tool-center-container">
        <div class="editor-tool-container">
          <div class="editor-tool-item">
            {editMode ? (
              <button
                className="editor-edit-button-active"
                onClick={() => setEditMode(!editMode)}
              >
                <div className="editor-edit-button-active-text">End Edit</div>
              </button>
            ) : (
              <button
                className="editor-edit-button"
                onClick={() => setEditMode(!editMode)}
              >
                <div className="editor-edit-button-active-text">Edit</div>
              </button>
            )}
          </div>
          {/**
           * TODO: Make this change when we are in the  user management page
           * TODO: Implement visible and invisible logo.
           */}
          {currentArea === PageType.userEditor ? (
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
                <button
                  className="editor-reset-button"
                  onClick={() => resetAllTasks()}
                >
                  Reset All Tasks
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default EditorTool;
