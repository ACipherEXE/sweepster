import React, { useState, useEffect } from "react";
import "./App.css";
import FloorsPage from "./components/FloorsPage/FloorsPage";
import UserLogIn from "./components/UserLogIn";
import hotelGetExample from "./JSON/hotelGetExample.json";
import { fetchData, getTasks, handlePopstate } from "./Tools/Utils";
import RoomPage from "./components/RoomPage/RoomPage";
function App() {
  //Keep in dev unless wanting to test REST API
  const enviroment = "dev";
  var currentArea = "floors";
  const [data, setData] = useState(null);

  useEffect(() => {
    if (enviroment === "prod") {
      fetchData()
        .then((data) => {
          //Avoid using api while test and building
          setData(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setData(hotelGetExample);
    }
  }, []);
  window.addEventListener("popstate", handlePopstate);

  //console.log(getTasks(data, "abc000", "ground", "001"));
  return (
    <div className="App">
      <header className="App-header">
        {currentArea === "login" && <UserLogIn />}
        {data !== null ? (
          <div>
            {currentArea === "floors" && (
              <FloorsPage hotelFloorData={data.record[0].hotel_data.floors} />
            )}
            {currentArea === "room" && (
              <RoomPage
                hotelRoomData={data.record[0].hotel_data.floors[0].rooms[0]}
              />
            )}
            {currentArea === "tasks" && <div>Hello world</div>}
            {currentArea === "roles" && <div>Hello world</div>}
          </div>
        ) : (
          <div>now loading</div>
        )}
      </header>
    </div>
  );
}

export default App;
