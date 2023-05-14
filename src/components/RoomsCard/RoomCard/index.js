import styled from 'styled-components';
import { BsPerson, BsPersonFill } from 'react-icons/bs';

export default function RoomCard({ room, selectedRoom, setSelectedRoom, roomIsReserved }) {
  let { vaccanciesBooked, capacity } = room;
  let auxVaccanciesBooked = vaccanciesBooked;

  const roomIsFull = vaccanciesBooked >= capacity;

  const people = Array.from({ length: capacity }, (_, i) => {
    auxVaccanciesBooked--;

    return auxVaccanciesBooked + 1 > 0 ? (
      <BsPersonFill
        key={i}
        color={
          // Filla os usuários de acordo com os quartos que já foram reservados e/ou estão cheios
          roomIsFull ? 'var(--card-default-strong-gray)' : '#000000'
        }
        size={25}
      />
    ) : selectedRoom === room && i === capacity - 1 ? (
      <BsPersonFill key={i} color={'var(--page-pink-theme)'} size={25} />
    ) : (
      <BsPerson key={i} size={25} />
    );
  });

  return (
    <>
      <RoomWrapper
        room={room}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
        roomIsFull={room.vaccanciesBooked >= room.capacity}
        onClick={() => {
          if (!roomIsFull && !roomIsReserved) {
            selectedRoom === room ? setSelectedRoom(null) : setSelectedRoom(room);
          }
        }}
      >
        <h4>{String(room.name)}</h4>
        <IconContainer>
          <IconBox key={room.id}>{people}</IconBox>
        </IconContainer>
      </RoomWrapper>
    </>
  );
}

const RoomWrapper = styled.button`
  width: 190px;
  height: 45px;
  border-width: medium;
  border-style: solid;
  border: 1px solid var(--card-default-gray);
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding: 10px;
  background-color: ${(props) =>
    props.roomIsFull
      ? 'var(--card-default-light-gray)'
      : props.selectedRoom === props.room
        ? 'var(--selected-card-bg)'
        : '#FFFFFF'};
  cursor: pointer;

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

const IconBox = styled.div``;
