import fetchHotelRooms from './fetchHotelRooms';
import fetchRoomIdsBooked from './fetchRoomIdsBooked';

export default async function fetchHotelsWithRooms(token, hotelsWithoutRooms, setHotelsWithRooms) {
  const hotelsWithRooms = [];

  for (let i = 0; i < hotelsWithoutRooms.length; i++) {
    let hotelWithRooms = await fetchHotelRooms(token, hotelsWithoutRooms[i].id);
    const roomIdsBooked = await fetchRoomIdsBooked(token, hotelsWithoutRooms[i].id);

    hotelWithRooms.Rooms = hotelWithRooms.Rooms.map((room) => {
      if (roomIdsBooked.includes(room.id)) {
        !room.vaccanciesBooked ? (room.vaccanciesBooked = 1) : room.vaccanciesBooked++;
      } else {
        room.vaccanciesBooked = 0;
      }
      return room;
    });
    hotelsWithRooms.push(hotelWithRooms);
  }
  setHotelsWithRooms(hotelsWithRooms);
}
