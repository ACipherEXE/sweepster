import React, { useState, useEffect } from "react";
import "./App.css";
import FloorsPage from "./components/FloorsPage/FloorsPage";
import UserLogIn from "./components/UserLogIn";
// eslint-disable-next-line
import hotelGetExample from "./JSON/hotelGetExample.json";
import hotelExample from "./JSON/hotelExample.json";
import RoomPage from "./components/RoomPage/RoomPage";
import HeaderArea from "./components/HeaderArea/HeaderArea";
import FooterArea from "./components/FooterArea/FooterArea";
import { PageType } from "./Tools/Types";
import { fetchDataInRender } from "./Tools/DatabaseCalls";
import EditorTool from "./components/EditorTool/EditorTool";
function App() {
  //Keep in dev unless wanting to test REST API
  const enviroment = "prod";
  // Current area the user is at. This is normally set in components.
  const [currentArea, setCurrentArea] = useState(PageType.login);
  // eslint-disable-next-line
  // Safety check if user is signed in. Will be used in the UserLogIn Componmment in the future.
  const [isUserLogedIn, setIsUserLogedIn] = useState(false);
  // Used to tell components that they should be in edit mode
  const [editMode, setEditMode] = useState(false);
  // User request is set in the floors component
  const [userRequest, setUserRequest] = useState(null);
  const [data, setData] = useState(null);
  // eslint-disable-next-line
  const [hotelNumber, setHotelNumber] = useState("c3a6");
  // To handle when changes happen
  const [hasFetchedData, setHasFetchedData] = useState(false);

  useEffect(() => {
    if (isUserLogedIn) {
      if (enviroment === "prod" && hotelNumber) {
        fetchDataInRender(hotelNumber)
          .then((data) => {
            //Avoid using api while test and building
            console.log("UPDATE");
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
                <EditorTool
                  currentArea={currentArea}
                  editMode={editMode}
                  hotelNumber={hotelNumber}
                  setEditMode={setEditMode}
                />
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
                    editMode={editMode}
                    setCurrentArea={setCurrentArea}
                    setUserRequest={setUserRequest}
                    setData={setData}
                  />
                )}
                {currentArea === "tasks" && <div>Hello world</div>}
                {currentArea === "roles" && <div>Hello world</div>}
              </header>
            </div>
            <div className="footer-area">
              <FooterArea
                hotelNumber={hotelNumber}
                currentArea={currentArea}
                userRequest={userRequest}
                editMode={editMode}
                setCurrentArea={setCurrentArea}
                setData={setData}
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
