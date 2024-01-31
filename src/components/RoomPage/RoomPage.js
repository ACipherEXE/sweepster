import React, { useState, useEffect } from "react";
import "./RoomPage.css";
import Roomcard from "./RoomCard";
import { getSpecificRoomTasks } from "../../Tools/Utils";
import { updateHotelData, fetchDataInRender } from "../../Tools/DatabaseCalls";
function RoomPage(props) {
  // eslint-disable-next-line
  var {
    hotelData,
    hotelNumber,
    userRequest,
    editMode,
    // eslint-disable-next-line
    setCurrentArea,
    // eslint-disable-next-line
    setUserRequest,
    setData,
    // eslint-disable-next-line
    setHasFetchedData,
  } = props;

  const [taskUpdated, setTaskUpdated] = useState(null);
  const [taskEraser, setTaskEraser] = useState(null);
  const [roomData, setRoomData] = useState(
    getSpecificRoomTasks(hotelData, userRequest.floor, userRequest.room)
  );

  // note: this use effect is cursed
  useEffect(() => {
    if (taskUpdated) {
      const task = roomData.find((t) => t.task === taskUpdated.task);

      if (task) {
        fetchDataInRender(hotelNumber).then((pulledData) => {
          const tasksPulled = getSpecificRoomTasks(
            pulledData,
            userRequest.floor,
            userRequest.room
          );
          console.log("Filtered tasksPulled:", tasksPulled);
          const pulledTask = tasksPulled.find(
            (t) => t.task === taskUpdated.task
          );
          if (pulledTask) {
            if (pulledTask.isDone === taskUpdated.was) {
              pulledTask.isDone = !pulledTask.isDone;
            }

            console.log("Updated tasksPulled:", tasksPulled);
            /**Bloated part but works :) */
            /**Find the floor */
            const floorIndex = pulledData.hotel_data.floors.findIndex(
              (floor) => floor.floor === userRequest.floor
            );
            /**Find the room */
            const roomIndex = pulledData.hotel_data.floors[
              floorIndex
            ].rooms.findIndex((room) => room.room === userRequest.room);
            /**Put the new task list in the correct room and floor */
            pulledData.hotel_data.floors[floorIndex].rooms[roomIndex].tasks =
              tasksPulled;
            /**Bloated part but works :) */
            setData(pulledData);
            setRoomData(
              getSpecificRoomTasks(
                pulledData,
                userRequest.floor,
                userRequest.room
              )
            );
            updateHotelData(pulledData, hotelNumber).catch((error) => {
              console.error("Error:", error);
            });
          } else {
            setData(pulledData);
          }
        });
      } else {
        console.log(`Task "${taskUpdated.task}" not found.`);
      }
    }
    // eslint-disable-next-line
  }, [taskUpdated]);

  // Its bloated but works :(
  // If taskEraserhas changed to pull latest and change values and then push new data.
  useEffect(() => {
    if (taskEraser) {
      fetchDataInRender(hotelNumber)
        .then((pulledData) => {
          // First Remove the task from room data
          const taskList = getSpecificRoomTasks(
            pulledData,
            userRequest.floor,
            userRequest.room
          ).filter((task) => task.task !== taskEraser.task);
          //Avoid using api while test and building
          console.log("PulledLATEST");
          /**Bloated part but works :) */
          /**Find the floor */
          const floorIndex = pulledData.hotel_data.floors.findIndex(
            (floor) => floor.floor === userRequest.floor
          );
          /**Find the room */
          const roomIndex = pulledData.hotel_data.floors[
            floorIndex
          ].rooms.findIndex((room) => room.room === userRequest.room);
          /**Put the new task list in the correct room and floor */
          pulledData.hotel_data.floors[floorIndex].rooms[roomIndex].tasks =
            taskList;
          /**Bloated part but works :) */
          console.log(pulledData);
          /**Set the new data */
          setData(pulledData);
          /**Then send the new data to the API*/
          if (taskList) {
            updateHotelData(pulledData, hotelNumber)
              .then(setRoomData(taskList))
              .catch((error) => {
                console.error("Error:", error);
              });
          } else {
            console.log(`Task "${taskEraser.task}" not found.`);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    // eslint-disable-next-line
  }, [taskEraser]);
  useEffect(() => {
    setRoomData(
      getSpecificRoomTasks(hotelData, userRequest.floor, userRequest.room)
    );
  }, [hotelData]);

  return (
    <>
      {roomData.map((task) => {
        return (
          <Roomcard
            hotelRoomTask={task.task}
            taskState={task.isDone}
            editMode={editMode}
            setTaskUpdated={setTaskUpdated}
            setTaskEraser={setTaskEraser}
          />
        );
      })}
    </>
  );
}
export default RoomPage;
