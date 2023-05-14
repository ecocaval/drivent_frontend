import axios from 'axios';

export default async function fetchHotelRooms(token, hotelId) {
  try {
    const hotelsWithRooms = await axios.get(`http://localhost:4000/hotels/${Number(hotelId)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return hotelsWithRooms.data;
  } catch (error) {
    console.log(error.message);
  }
}
