export default function calculateHotelVacancies(hotel) {
  const { Rooms: rooms } = hotel;

  let totalVacancies = 0;

  for (let i = 0; i < rooms.length; i++) {
    totalVacancies += rooms[i].capacity;
    totalVacancies -= rooms[i].vaccanciesBooked;
  }

  return totalVacancies;
}
