import axios from 'axios';

export default async function fetchRoomIdsBooked(token, hotelId) {
  try {
    const roomsBooked = await axios.get(`http://localhost:4000/booking/hotel/${Number(hotelId)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const roomIdsBooked = roomsBooked.data.map((room) => room.roomId);
    return roomIdsBooked;
  } catch (error) {
    console.log(error.message);
  }
}
