import React, { useState, useEffect } from "react";
import "./RoomPage.css";
import Roomcard from "./RoomCard";

function RoomPage(props) {
  var { hotelRoomData } = props;
  //   console.log(hotelRoomData);
  const [taskComplited, setTaskComplited] = useState(null);
  const [roomData, setRoomData] = useState(hotelRoomData);
  useEffect(() => {
    if (taskComplited) {
      toggleIsDone(taskComplited.task);
    }
  }, [taskComplited]);

  // Function to toggle isDone for a specific task
  function toggleIsDone(taskName) {
    const task = roomData.tasks.find((t) => t.task === taskName);

    if (task) {
      task.isDone = !task.isDone;
      setRoomData(roomData);
    } else {
      console.log(`Task "${taskName}" not found.`);
    }
  }

  return (
    <>
      {roomData.tasks.map((task) => {
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
