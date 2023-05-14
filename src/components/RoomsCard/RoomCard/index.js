import styled from 'styled-components';
import { BsPerson, BsPersonFill } from 'react-icons/bs';

export default function RoomCard({ roomId, vaccanciesBooked, selectedRoom, setSelectedRoom, capacity }) {
  let auxVaccanciesBooked = vaccanciesBooked;

  const people = Array.from({ length: capacity }, (_, i) => {
    // Filla os usuários de acordo com os quartos que já foram reservados
    auxVaccanciesBooked--;
    return auxVaccanciesBooked + 1 > 0 ? <BsPersonFill key={i} size={25} /> : <BsPerson key={i} size={25} />;
  });

  return (
    <>
      <RoomWrapper room={roomId} selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom}>
        <h4>{String(roomId)}</h4>
        <IconContainer>
          <IconBox key={roomId}>{people}</IconBox>
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
  border: 1px solid #cecece;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding: 10px;
  background-color: ${(props) => (props.selectedRoom === props.room ? '#FFEED2' : '#FFFFFF')};
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
