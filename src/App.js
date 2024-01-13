import React, { useState, useEffect } from "react";
import "./App.css";
import FloorsPage from "./components/FloorsPage/FloorsPage";
import UserLogIn from "./components/UserLogIn";
import hotelGetExample from "./JSON/hotelGetExample.json";
import { fetchData } from "./Tools/Utils";
import RoomPage from "./components/RoomPage/RoomPage";

function App() {
  //Keep in dev unless wanting to test REST API
  const enviroment = "prod";
  const [currentArea, setCurrentArea] = useState("login");
  // eslint-disable-next-line
  const [isUserLogedIn, setIsUserLogedIn] = useState(true);
  const [userRequest, setUserRequest] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    if (isUserLogedIn) {
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
    }
  }, [isUserLogedIn]);

  return (
    <div className="App">
      <header className="App-header">
        {currentArea === "login" && (
          <UserLogIn
            setCurrentArea={setCurrentArea}
            setUserRequest={setUserRequest}
          />
        )}
        {data !== null || !isUserLogedIn ? (
          <div>
            {currentArea === "floors" && (
              <FloorsPage
                hotelFloorData={data.record[0].hotel_data.floors}
                setCurrentArea={setCurrentArea}
                setUserRequest={setUserRequest}
              />
            )}
            {currentArea === "room" && (
              <RoomPage
                hotelRoomData={data}
                userRequest={userRequest}
                setCurrentArea={setCurrentArea}
                setUserRequest={setUserRequest}
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
