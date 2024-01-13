import React, { useState, useEffect } from "react";
import "./RoomPage.css";
import Roomcard from "./RoomCard";
import { getTasks } from "../../Tools/Utils";

function RoomPage(props) {
  var { hotelRoomData } = props;
  //   console.log(hotelRoomData);
  const [taskComplited, setTaskComplited] = useState(null);
  const [roomData, setRoomData] = useState(
    getTasks(hotelRoomData, "abc000", "ground", "001")
  );

  useEffect(() => {
    if (taskComplited) {
      const task = roomData.tasks.find((t) => t.task === taskComplited.task);

      if (task) {
        task.isDone = !task.isDone;
        setRoomData(roomData);
      } else {
        console.log(`Task "${taskComplited.task}" not found.`);
      }
    }
  }, [taskComplited]);

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
