import React, { useState, useEffect } from "react";
import "./App.css";
import FloorsPage from "./components/FloorsPage/FloorsPage";
import UserLogIn from "./components/UserLogIn";
import hotelGetExample from "./JSON/hotelGetExample.json";
import { fetchData } from "./Tools/Utils";
import RoomPage from "./components/RoomPage/RoomPage";
import HeaderArea from "./components/HeaderArea/HeaderArea";
import FooterArea from "./components/FooterArea/FooterArea";

function App() {
  //Keep in dev unless wanting to test REST API
  const enviroment = "dev";
  const [currentArea, setCurrentArea] = useState("login");
  // eslint-disable-next-line
  const [isUserLogedIn, setIsUserLogedIn] = useState(false);
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
      {currentArea === "login" && (
        <header className="App-login">
          <UserLogIn
            setCurrentArea={setCurrentArea}
            setIsUserLogedIn={setIsUserLogedIn}
            setUserRequest={setUserRequest}
          />
        </header>
      )}
      {isUserLogedIn &&
        (data !== null ? (
          <div>
            <HeaderArea
              currentArea={currentArea}
              setCurrentArea={setCurrentArea}
            />
            <div className="main-area-container">
              <header className="App-header">
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
              </header>
            </div>
            <div className="footer-area">
              <FooterArea
                currentArea={currentArea}
                setCurrentArea={setCurrentArea}
              />
            </div>
          </div>
        ) : (
          <div>now loading</div>
        ))}
    </div>
  );
}

export default App;
