import { getHotelData } from "../Tools/Utils";
import { ApiType } from "./Types";
var apiType = ApiType.prod;
export const fetchDataInRender = async () => {
  console.warn("You are in PROD");
  var myHeaders = new Headers();
  myHeaders.append("x-master-key", "your_master_key");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(`${apiType}/api/hotels`, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error", error);
    throw error; // You can choose to handle or rethrow the error as needed
  }
};

export const updateHotelData = async (hotelData, hotelNumber) => {
  var currentHotelData = getHotelData(hotelData, hotelNumber);
  console.warn("You are in PROD");
  var myHeaders = new Headers();
  myHeaders.append("x-master-key", "your_master_key");
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(currentHotelData),
    redirect: "follow",
  };

  try {
    fetch(`${apiType}/api/hotels/${currentHotelData.id}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then((result) => console.log(result))
      .catch((error) => console.error("Error:", error));
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
