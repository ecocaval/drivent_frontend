import styled from 'styled-components';
import { useState } from 'react';
import { BsPerson } from 'react-icons/bs';
import { AreaSubTitle, AreaTitle } from '../../assets/styles/styledDashboard';
import { ROOMS_ARRAY_TEMPLATE } from '../../pages/Dashboard/Hotel/utils/roomsArrayTemplate';

export default function RoomsCard({ idSelectedHotel }) {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const filteredHotelsArray = ROOMS_ARRAY_TEMPLATE.filter((hotel) => hotel.id === idSelectedHotel);
  return (
    <>
      <AreaTitle margin={'0 0 30px 0'}></AreaTitle>
      <AreaSubTitle>Ótima pedida! Agora escolha seu quarto:</AreaSubTitle>
      <Room>
        {filteredHotelsArray[0].Rooms.map((r, index) => (
          <RoomCard
            key={index * 2}
            room={r.id}
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
            capacity={r.capacity}
          />
        ))}
      </Room>
    </>
  );
}

function RoomCard({ room, selectedRoom, setSelectedRoom, capacity }) {
  return (
    <>
      <RoomWrapper room={room} selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} onClick={() => setSelectedRoom(room)}>
        <h4>{room}</h4>
        <IconContainer>
          <IconBox key={room}>
            <BsPerson key={room*2} size={25} />
          </IconBox>
        </IconContainer>
      </RoomWrapper>
    </>
  );
}

const Room = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 250px;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const RoomWrapper = styled.button`
  width: 190px;
  height: 45px;
  border-width: medium;
  border-style: solid;
  border: 1px solid #cecece;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  cursor: pointer;
  background-color: ${(props) =>
    props.selectedRoom === props.room ?
      '#FFEED2':
      '#FFFFFF'
};

  padding: 10px;

  h4 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
  }
`;

const IconContainer = styled.div`
  display: flex;
`;

const IconBox = styled.div`

`;
