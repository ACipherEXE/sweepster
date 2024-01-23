import React, { useState, useEffect } from "react";
import "./App.css";
import FloorsPage from "./components/FloorsPage/FloorsPage";
import UserLogIn from "./components/UserLogIn";
import hotelExample from "./JSON/hotelExample.json";
import RoomPage from "./components/RoomPage/RoomPage";
import HeaderArea from "./components/HeaderArea/HeaderArea";
import FooterArea from "./components/FooterArea/FooterArea";
import { PageType } from "./Tools/Types";
import { fetchDataInRender } from "./Tools/DatabaseCalls";
function App() {
  //Keep in dev unless wanting to test REST API
  const enviroment = "prod";
  const [currentArea, setCurrentArea] = useState(PageType.login);
  // eslint-disable-next-line
  const [isUserLogedIn, setIsUserLogedIn] = useState(false);
  const [userRequest, setUserRequest] = useState(null);
  const [data, setData] = useState(null);
  // eslint-disable-next-line
  const [hotelNumber, setHotelNumber] = useState("abc69");

  useEffect(() => {
    if (isUserLogedIn) {
      if (enviroment === "prod") {
        fetchDataInRender()
          .then((data) => {
            //Avoid using api while test and building
            setData(data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        setData(hotelExample);
      }
    }
  }, [isUserLogedIn, enviroment]);

  return (
    <div className="App">
      {currentArea === PageType.login && (
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
              currentArea={
                currentArea === PageType.room
                  ? currentArea + " " + userRequest.room
                  : currentArea
              }
              setCurrentArea={setCurrentArea}
            />
            <div className="main-area-container">
              <header className="App-header">
                {currentArea === PageType.floor && (
                  <FloorsPage
                    hotelData={data}
                    hotelNumber={hotelNumber}
                    setCurrentArea={setCurrentArea}
                    setUserRequest={setUserRequest}
                  />
                )}
                {currentArea === PageType.room && (
                  <RoomPage
                    hotelData={data}
                    hotelNumber={hotelNumber}
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
          <header className="loading-header">
            <div>now loading</div>
          </header>
        ))}
    </div>
  );
}

export default App;
