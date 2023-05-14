export default function getRoomsDescription(hotel) {
  let { Rooms: rooms } = hotel;

  let roomsHashTable = {};
  let roomsDescription = '';

  rooms = rooms.sort((a, b) => {
    return a.capacity - b.capacity;
  });

  console.log(rooms);

  for (let i = 0; i < rooms.length; i++) {
    const roomCapacity = rooms[i].capacity;

    if (roomsHashTable[String(roomCapacity)] === undefined) {
      roomsHashTable[String(roomCapacity)] = true;

      if (roomCapacity === 1) {
        roomsDescription += 'Single';
      } else if (roomCapacity === 2) {
        roomsDescription += roomsDescription.length > 0 ? ', Double' : 'Double';
      } else if (roomCapacity === 3) {
        roomsDescription += roomsDescription.length > 0 ? ', Triple' : 'Triple';
      }
    }
  }
  return roomsDescription;
}
