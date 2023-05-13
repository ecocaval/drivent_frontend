import fetchHotelRooms from './fetchHotelRooms';

export default async function fetchHotelsWithRooms(token, hotelsWithoutRooms, setHotelsWithRooms) {
  const hotelsWithRooms = [];
  for (let i = 0; i < hotelsWithoutRooms.length; i++) {
    const hotelWithRooms = await fetchHotelRooms(token, hotelsWithoutRooms[i].id);
    hotelsWithRooms.push(hotelWithRooms);
  }
  setHotelsWithRooms(hotelsWithRooms);
}
