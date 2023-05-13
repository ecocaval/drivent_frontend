import axios from 'axios';

export default async function fetchHotelsWithoutRooms(token, setHotelsWithoutRooms) {
  try {
    const fetchedHotels = await axios.get('http://localhost:4000/hotels', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setHotelsWithoutRooms(fetchedHotels.data);
  } catch (error) {
    console.log(error.message);
  }
}
