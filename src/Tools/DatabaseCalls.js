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
    const response = await fetch(
      "https://sweepster-api.onrender.com/api/hotels",
      requestOptions
    );

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
