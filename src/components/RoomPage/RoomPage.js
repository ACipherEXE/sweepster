import React, { useState, useEffect } from "react";
import "./RoomPage.css";
import Roomcard from "./RoomCard";
import { getSpecificRoomTasks } from "../../Tools/Utils";

function RoomPage(props) {
  // eslint-disable-next-line
  var { hotelData, hotelNumber, userRequest, setCurrentArea, setUserRequest } =
    props;

  const [taskComplited, setTaskComplited] = useState(null);
  const [roomData, setRoomData] = useState(
    getSpecificRoomTasks(
      hotelData,
      hotelNumber,
      userRequest.floor,
      userRequest.room
    )
  );

  useEffect(() => {
    if (taskComplited) {
      const task = roomData.find((t) => t.task === taskComplited.task);

      if (task) {
        task.isDone = !task.isDone;
        setRoomData(roomData);
      } else {
        console.log(`Task "${taskComplited.task}" not found.`);
      }
    }
  }, [taskComplited, roomData]);

  return (
    <>
      {roomData.map((task) => {
        return (
          <Roomcard
            hotelRoomTask={task.task}
            taskState={task.isDone}
            setTaskComplited={setTaskComplited}
          />
        );
      })}
    </>
  );
}
export default RoomPage;
