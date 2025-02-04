import React, { useState, useEffect } from "react";
import "./App.css";
import FloorsPage from "./components/FloorsPage/FloorsPage";
import UserLogIn from "./components/UserLogIn";
// eslint-disable-next-line
import hotelGetExample from "./JSON/hotelGetExample.json";
// eslint-disable-next-line
import usersExample from "./JSON/exampleUsers.json";
import hotelExample from "./JSON/hotelExample.json";
import RoomPage from "./components/RoomPage/RoomPage";
import HeaderArea from "./components/HeaderArea/HeaderArea";
import FooterArea from "./components/FooterArea/FooterArea";
import { PageType } from "./Tools/Types";
// eslint-disable-next-line
import { fetchDataInRender, updateHotelData } from "./Tools/DatabaseCalls";
import EditorTool from "./components/EditorTool/EditorTool";
import UserEditorPage from "./components/UserEditorPage/UserEditorPage";
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
  const [userPermissions, setUserPermissions] = useState("Undefined");
  const [userID, setUserID] = useState(null);
  // eslint-disable-next-line
  const [userName, setUserName] = useState(null);

  // eslint-disable-next-line
  const [hotelNumber, setHotelNumber] = useState("c3a7");
  // To handle when changes happen
  // eslint-disable-next-line
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
    // eslint-disable-next-line
  }, [isUserLogedIn, enviroment]);

  useEffect(() => {
    if (isUserLogedIn) {
      if (data) {
        if (data.Staff_List) {
          // eslint-disable-next-line
          const userIndex = data.Staff_List.findIndex(
            (user) => user.id === userID
          );

          console.log(userID);
          if (userIndex === -1) {
            data.Staff_List = [
              ...data.Staff_List,
              {
                userName: userName,
                id: userID,
                permission: "Undefined",
              },
            ];
            console.log(data.Staff_List);
            updateHotelData(data, hotelNumber).then(() => {
              setData(data);
            });
          } else {
            if (data.Staff_List[userIndex].permission === "Undefined") {
              console.log("USER MUST BE AUTHORIZED");
            }
            //   console.log(data.Staff_List[userIndex].permission);
            setUserPermissions(data.Staff_List[userIndex].permission);
            // setUserPermissions("Admin");
          }
        }
      }
    }

    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    if (isUserLogedIn) {
      if (currentArea === PageType.floor) {
        // setUserRequest(null);
      }
    }

    // eslint-disable-next-line
  }, [currentArea]);
  function refresh() {
    fetchDataInRender(hotelNumber)
      .then((data) => {
        //Avoid using api while test and building
        console.log("UPDATE");
        setData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  return (
    <div className="App">
      {currentArea === PageType.login && (
        <header className="App-login">
          <UserLogIn
            setCurrentArea={setCurrentArea}
            setIsUserLogedIn={setIsUserLogedIn}
            setUserRequest={setUserRequest}
            setHotelNumber={setHotelNumber}
            setUserID={setUserID}
            setUserName={setUserName}
          />
        </header>
      )}
      {isUserLogedIn &&
        (data !== null && userPermissions !== "Undefined" ? (
          <div className="base">
            <HeaderArea
              currentArea={
                currentArea === PageType.room
                  ? currentArea + " " + userRequest.room
                  : currentArea
              }
              setCurrentArea={setCurrentArea}
              userPermissions={userPermissions}
            />

            {console.log(userPermissions)}
            {(currentArea === PageType.room ||
              currentArea === PageType.userEditor) &&
            (userPermissions === "Admin" || userPermissions === "Manager") ? (
              <EditorTool
                currentArea={currentArea}
                editMode={editMode}
                hotelNumber={hotelNumber}
                userRequest={userRequest}
                setEditMode={setEditMode}
                setData={setData}
                userPermissions={userPermissions}
              />
            ) : (
              <>
                <div style={{ opacity: "0", visibility: "hidden" }}>
                  <EditorTool
                    currentArea={currentArea}
                    editMode={editMode}
                    hotelNumber={hotelNumber}
                    userRequest={userRequest}
                    setEditMode={setEditMode}
                    setData={setData}
                    userPermissions={userPermissions}
                  />
                </div>
              </>
            )}
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
                    editMode={editMode}
                    setCurrentArea={setCurrentArea}
                    setUserRequest={setUserRequest}
                    setData={setData}
                  />
                )}

                {currentArea === PageType.userEditor && (
                  <UserEditorPage
                    hotelNumber={hotelNumber}
                    userData={data.Staff_List}
                    data={data}
                    setData={setData}
                    editMode={editMode}
                  />
                )}
              </header>
            </div>
            <div className="footer-area">
              <FooterArea
                hotelNumber={hotelNumber}
                currentArea={currentArea}
                userRequest={userRequest}
                userPermissions={userPermissions}
                editMode={editMode}
                setCurrentArea={setCurrentArea}
                setData={setData}
              />
            </div>
          </div>
        ) : (
          <header className="loading-header">
            <div>
              {userPermissions !== "Undefined"
                ? "now loading"
                : "Ask Admin for permissions"}
            </div>
            {console.log(userPermissions)}
            {userPermissions === "Undefined" && (
              <div>
                <button onClick={refresh}>Refresh</button>
              </div>
            )}
          </header>
        ))}
    </div>
  );
}

export default App;
