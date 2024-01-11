import "./App.css";
import FloorsPage from "./components/FloorsPage/FloorsPage";
import UserLogIn from "./components/UserLogIn";
import hotelData from "./JSON/hotelExample.json";
function App() {
  var currentArea = "floors";
  return (
    <div className="App">
      {currentArea === "login" && (
        <header className="App-header">
          <UserLogIn />
        </header>
      )}
      {currentArea === "floors" && (
        <header className="App-header">
          <FloorsPage hotelFloorData={hotelData[0].hotel_data.floors} />
        </header>
      )}
      {currentArea === "tasks" && (
        <header className="App-header">
          <div>Hello world</div>
        </header>
      )}
      {currentArea === "roles" && (
        <header className="App-header">
          <div>Hello world</div>
        </header>
      )}
    </div>
  );
}

export default App;
