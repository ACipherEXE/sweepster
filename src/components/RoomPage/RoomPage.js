import React, { useState, useEffect } from "react";
import "./RoomPage.css";
import Roomcard from "./RoomCard";
import { getSpecificRoomTasks } from "../../Tools/Utils";
import { updateHotelData } from "../../Tools/DatabaseCalls";
function RoomPage(props) {
  // eslint-disable-next-line
  var {
    hotelData,
    hotelNumber,
    userRequest,
    editMode,
    setCurrentArea,
    setUserRequest,
    setData,
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
        task.isDone = !task.isDone;

        setRoomData(roomData);
        console.log(roomData);
        updateHotelData(hotelData, hotelNumber).catch((error) => {
          console.error("Error:", error);
        });
      } else {
        console.log(`Task "${taskUpdated.task}" not found.`);
      }
    }
    // eslint-disable-next-line
  }, [taskUpdated]);
  // Its bloated but works :(
  useEffect(() => {
    if (taskEraser) {
      const taskList = roomData.filter((task) => task.task !== taskEraser.task);
      const floorIndex = hotelData.hotel_data.floors.findIndex(
        (floor) => floor.floor === userRequest.floor
      );
      const roomIndex = hotelData.hotel_data.floors[floorIndex].rooms.findIndex(
        (room) => room.room === userRequest.room
      );

      hotelData.hotel_data.floors[floorIndex].rooms[roomIndex].tasks = taskList;
      console.log(hotelData);
      setData(hotelData);
      if (taskList) {
        updateHotelData(hotelData, hotelNumber)
          .then(setRoomData(taskList))
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        console.log(`Task "${taskUpdated.task}" not found.`);
      }
    }
    // eslint-disable-next-line
  }, [taskEraser]);

  return (
    <>
      {roomData?.map((task) => {
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
