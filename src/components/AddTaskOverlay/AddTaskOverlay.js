import React, { useState } from "react";
import "./AddTaskOverlay.css";
// eslint-disable-next-line
import { PageType } from "../../Tools/Types";
import { fetchDataInRender, updateHotelData } from "../../Tools/DatabaseCalls";
import { getSpecificRoomTasks } from "../../Tools/Utils";

function AddTaskOverlay(props) {
  var {
    // eslint-disable-next-line
    currentArea,
    userRequest,
    hotelNumber,
    // eslint-disable-next-line
    data,
    // eslint-disable-next-line
    setCurrentArea,
    listOfTasks,
    setIsVisible,
    setData,
    variant = false,
    setListOfTasks,
  } = props;

  const [inputValue, setInputValue] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  function addNewTask() {
    if (variant) {
      const task = listOfTasks?.find((t) => t.task === inputValue);

      // To avoid making mutiple tasks of the same name
      if (!task) {
        // listOfTasks?.push({ task: inputValue, isDone: false });
        setListOfTasks([...listOfTasks, { task: inputValue, isDone: false }]);
        console.log(listOfTasks);
      }
      // Remove overlay
      setIsVisible(false);
    } else {
      if (inputValue) {
        fetchDataInRender(hotelNumber)
          .then((pulledData) => {
            var listOfLatestTasks = getSpecificRoomTasks(
              pulledData,
              userRequest.floor,
              userRequest.room
            );
            const task = listOfLatestTasks.find((t) => t.task === inputValue);

            // To avoid making mutiple tasks of the same name
            if (!task) {
              // Then add it to the list if its not in it
              listOfLatestTasks.push({ task: inputValue, isDone: false });
              console.log(listOfLatestTasks);
              const floorIndex = pulledData.hotel_data.floors.findIndex(
                (floor) => floor.floor === userRequest.floor
              );
              /**Find the room */
              const roomIndex = pulledData.hotel_data.floors[
                floorIndex
              ].rooms.findIndex((room) => room.room === userRequest.room);
              /**Put the new task list in the correct room and floor */
              pulledData.hotel_data.floors[floorIndex].rooms[roomIndex].tasks =
                listOfLatestTasks;
              // Set it as new data in the app
              setData(pulledData);
              // Remove overlay
              setIsVisible(false);
              // Update data in the API
              updateHotelData(pulledData, hotelNumber).catch((error) => {
                console.error("Error:", error);
              });
              /**Bloated part but works :) */
            } else {
              setErrorMessage("Task already exists");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        setErrorMessage("Type a task in the box");
      }
    }
  }

  return (
    <div
      className="add-task-overlay"
      onClick={() => {
        setIsVisible(false);
      }}
    >
      <div
        className="add-task-box"
        onClick={(e) => {
          // Stop the event propagation here
          e.stopPropagation();
        }}
      >
        <div className="add-task-question">
          What task you would like to add?
        </div>
        <input
          className="add-task-input"
          type="text"
          placeholder="Type here..."
          value={inputValue}
          onChange={handleInputChange}
        />
        {errorMessage && <div className="add-task-error">{errorMessage}</div>}
        <button
          className="add-task-button"
          onClick={() => {
            addNewTask();
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
}
export default AddTaskOverlay;
