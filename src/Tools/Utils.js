// export const fetchData = async () => {
//   console.warn("You are in PROD");
//   var myHeaders = new Headers();
//   myHeaders.append(
//     "X-Master-Key",
//     "$2a$10$7gwEQXoNUtq1xYVezuzlGu52yskhaM8Z4VPAc8H7ZYkp2uecTgmiy"
//   );
//   myHeaders.append(
//     "X-Access-Key",
//     "$2a$10$dIXfCIH69HlYoMR0CRgaNuCexeafEoLT4xN7ZEdGpQo6/Pl3QHu8i"
//   );
//   var requestOptions = {
//     method: "GET",
//     headers: myHeaders,
//     redirect: "follow",
//   };
//   try {
//     console.warn("You are in PROD");
//     // Fetch data from an API (replace 'apiEndpoint' with your actual API endpoint)
//     const response = await fetch(
//       "https://api.jsonbin.io/v3/b/65a15f611f5677401f1bd031",
//       requestOptions
//     )
//       .then((result) => {
//         return result;
//       })
//       .catch((error) => console.log("error", error));
//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

export function getSpecificRoom(hotelData, floor, room) {
  if (hotelData) {
    const targetFloor = hotelData.hotel_data.floors.find(
      (f) => f.floor === floor
    );

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
    console.log(`Hotel  not found.`);
  }

  return null;
}

export function getSpecificRoomTasks(hotelData, floor, room) {
  if (hotelData) {
    const targetFloor = hotelData.hotel_data.floors.find(
      (f) => f.floor === floor
    );

    if (targetFloor) {
      const targetRoom = targetFloor.rooms.find((r) => r.room === room);

      if (targetRoom) {
        return targetRoom.tasks;
      } else {
        console.log(`Room "${room}" not found on Floor "${floor}".`);
      }
    } else {
      console.log(`Floor "${floor}" not found.`);
    }
  } else {
    console.log(`Hotel  tasks not found.`);
  }

  return null;
}
export function getSpecificFloor(hotelData, floor) {
  if (hotelData) {
    return hotelData.hotel_data.floors.find((f) => f.floor === floor);
  } else {
    console.log(`Floor "${floor}" not found.`);
  }

  return null;
}
export function getfloors(hotelData) {
  if (hotelData) {
    return hotelData.hotel_data.floors;
  } else {
    console.log(`This hotel does not have floors`);
  }

  return null;
}
export function getHotelData(hotelData) {
  if (hotelData) {
    return hotelData;
  } else {
    console.log(`Hotel data was not found.`);
  }

  return null;
}
