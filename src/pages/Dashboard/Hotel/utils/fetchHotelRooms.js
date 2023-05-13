import axios from 'axios';

export default async function fetchHotelRooms(token, hotelId) {
  try {
    const fetchedHotelsWithRooms = await axios.get(`http://localhost:4000/hotels/${Number(hotelId)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return fetchedHotelsWithRooms.data;
  } catch (error) {
    console.log(error.message);
  }
}
