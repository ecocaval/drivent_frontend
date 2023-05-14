export default function getRoomsDescription(hotel) {
  let { Rooms: rooms } = hotel;

  let roomsHashTable = {};
  let roomsDescription = '';

  rooms = rooms.sort((a, b) => {
    if (a.capacity > b.capacity) return 1;
    else if (a.capacity < b.capacity) return -1;
    else return 0;
  });

  for (let i = 0; i < rooms.length; i++) {
    const roomCapacity = rooms[i].capacity;

    if (roomsHashTable[String(roomCapacity)] === undefined) {
      roomsHashTable[String(roomCapacity)] = true;

      if (roomCapacity === 1) {
        roomsDescription += 'Single';        
      } else if (roomCapacity === 2) {
        if (roomsDescription.length > 0) {
          roomsDescription += ', Double';
        } else {
          roomsDescription += 'Double';
        }
      } else if (roomCapacity === 3) {        
        if (roomsDescription.length > 0) {
          roomsDescription += ', Triple';
        } else {
          roomsDescription += 'Triple';
        }
      }
    }
  }
  return roomsDescription;
}
