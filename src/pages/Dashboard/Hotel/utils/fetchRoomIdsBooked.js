import axios from 'axios';

export default async function fetchRoomIdsBooked(token, hotelId) {
  try {
    const roomsBooked = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/booking/hotel/${Number(hotelId)}`, {
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
