/**
 * Here is where we bring functions that will be used around the app
 */
/**
 * Used to put a single variable to pushstate
 * @param {*} variable
 * @param {*} value
 */
export function addQueryParam(variable, value) {
  const params = new URLSearchParams(window.location.search);
  if (!params.has(variable)) {
    params.append(variable, value);
    window.history.pushState({ [variable]: value }, "", `?${params}`);
  }
}

export function addFloorAndRoom(floor, room) {
  const params = new URLSearchParams(window.location.search);
  if (
    !params.has("floor") ||
    params.get("floor") !== floor ||
    !params.has("room") ||
    params.get("room") !== room
  ) {
    params.append("floor", floor);
    params.append("room", room);
    window.history.pushState({ floor: floor, room: room }, "", `?${params}`);
  }
}
export const fetchData = async () => {
  console.warn("You are in PROD");
  var myHeaders = new Headers();
  myHeaders.append(
    "X-Master-Key",
    "$2a$10$7gwEQXoNUtq1xYVezuzlGu52yskhaM8Z4VPAc8H7ZYkp2uecTgmiy"
  );
  myHeaders.append(
    "X-Access-Key",
    "$2a$10$dIXfCIH69HlYoMR0CRgaNuCexeafEoLT4xN7ZEdGpQo6/Pl3QHu8i"
  );
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    console.warn("You are in PROD");
    // Fetch data from an API (replace 'apiEndpoint' with your actual API endpoint)
    const response = await fetch(
      "https://api.jsonbin.io/v3/b/65a15f611f5677401f1bd031",
      requestOptions
    )
      .then((result) => {
        return result;
      })
      .catch((error) => console.log("error", error));
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export function getTasks(hotelData, hotelNumber, floor, room) {
  const hotel = hotelData.record.find((h) => h.Hotel_Number === hotelNumber);

  if (hotel) {
    const targetFloor = hotel.hotel_data.floors.find((f) => f.floor === floor);

    if (targetFloor) {
      const targetRoom = targetFloor.rooms.find((r) => r.room === room);

      if (targetRoom) {
        return targetRoom;
      } else {
        console.log(`Room "${room}" not found on Floor "${floor}".`);
      }
    } else {
      console.log(`Floor "${floor}" not found.`);
    }
  } else {
    console.log(`Hotel "${hotelNumber}" not found.`);
  }

  return null;
}
