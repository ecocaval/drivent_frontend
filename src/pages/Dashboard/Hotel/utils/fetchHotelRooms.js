import axios from 'axios';

export default async function fetchHotelRooms(token, hotelId) {
  try {
    const hotelsWithRooms = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/hotels/${Number(hotelId)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return hotelsWithRooms.data;
  } catch (error) {
    console.log(error.message);
  }
}
