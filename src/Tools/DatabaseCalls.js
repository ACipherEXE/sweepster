import { ApiType } from "./Types";
var apiType = ApiType.local;
export const fetchDataInRender = async (hotelNumber) => {
  console.warn(
    apiType === ApiType.prod ? "You are in PROD" : "You are in LOCAL"
  );
  var myHeaders = new Headers();
  myHeaders.append("x-master-key", "your_master_key");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${apiType}/api/hotels/${hotelNumber}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error", error);
    // You can choose to handle or rethrow the error as needed
  }
};
/**
 * Sends the new json to the API
 * @param {JSON} hotelData = The updated Hotel Data you want to push.
 */
export const updateHotelData = async (hotelData) => {
  console.warn(
    apiType === ApiType.prod ? "You are in PROD" : "You are in LOCAL"
  );
  var myHeaders = new Headers();
  myHeaders.append("x-master-key", "your_master_key");
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(hotelData),
    redirect: "follow",
  };

  try {
    fetch(`${apiType}/api/hotels/${hotelData.id}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response;
      })
      .catch((error) => console.error("Error:", error));
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const fetchUserData = async () => {
  console.warn(
    apiType === ApiType.prod ? "You are in PROD" : "You are in LOCAL"
  );
  var myHeaders = new Headers();
  myHeaders.append("x-master-key", "your_master_key");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(`${apiType}/api/users/`, requestOptions);

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
/**
 * Sends a new user to the DB
 * @param {JSON} userData = A json of the data the user has created when making a account
 */
export const postUserData = async (userData) => {
  console.warn(
    apiType === ApiType.prod ? "You are in PROD" : "You are in LOCAL"
  );
  var myHeaders = new Headers();
  myHeaders.append("x-master-key", "your_master_key");
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(userData),
    redirect: "follow",
  };

  try {
    const response = await fetch(`${apiType}/api/users/`, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const updateUserData = async (userData) => {
  console.warn(
    apiType === ApiType.prod ? "You are in PROD" : "You are in LOCAL"
  );
  var myHeaders = new Headers();
  myHeaders.append("x-master-key", "your_master_key");
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(userData),
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${apiType}/api/users/${userData.id}`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
