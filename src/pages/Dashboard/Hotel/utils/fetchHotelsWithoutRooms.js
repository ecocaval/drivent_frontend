import axios from 'axios';

export default async function fetchHotelsWithoutRooms(token, setHotelsWithoutRooms) {
  try {
    const hotelsWithoutRooms = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/hotels`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setHotelsWithoutRooms(hotelsWithoutRooms.data);
  } catch (error) {
    console.log(error.message);
  }
}
