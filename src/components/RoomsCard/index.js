import styled from 'styled-components';
import { AreaSubTitle, AreaTitle } from '../../assets/styles/styledDashboard';
import RoomCard from './RoomCard';

export default function RoomsCard({ idSelectedHotel, hotel, selectedRoom, setSelectedRoom, roomIsReserved }) {
  const filteredHotelsArray = hotel.filter((hotel) => hotel.id === idSelectedHotel);
  return (
    <>
      <AreaTitle margin={'0 0 30px 0'}></AreaTitle>
      {!roomIsReserved && <AreaSubTitle>Ótima pedida! Agora escolha seu quarto:</AreaSubTitle>}
      <Room roomIsReserved={roomIsReserved}>
        {filteredHotelsArray[0].Rooms.map((room, index) =>
          roomIsReserved ? (
            selectedRoom === room && (
              <RoomCard
                key={index * 2}
                room={room}
                selectedRoom={selectedRoom}
                setSelectedRoom={setSelectedRoom}
                roomIsReserved={roomIsReserved}
              />
            )
          ) : (
            <RoomCard
              key={index * 2}
              room={room}
              selectedRoom={selectedRoom}
              setSelectedRoom={setSelectedRoom}
              roomIsReserved={roomIsReserved}
            />
          )
        )}
      </Room>
    </>
  );
}

const Room = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 250px;
  flex-wrap: wrap;
  margin-top: ${(props) => (props.roomIsReserved ? '1rem' : '2rem')};
`;
