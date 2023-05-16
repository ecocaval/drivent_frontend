//? Libraries
import styled from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';
import useToken from '../../../hooks/useToken';

//? Styles
import { AreaSubTitle, AreaTitle, GenericButton } from '../../../assets/styles/styledDashboard';

//? Components
import { HotelCard } from '../../../components/HotelCard';
import RoomsCard from '../../../components/RoomsCard';

//? Utils
import fetchHotelsWithoutRooms from './utils/fetchHotelsWithoutRooms';
import fetchHotelsWithRooms from './utils/fetchHotelsWithRooms';
import fetchUserTickets from './utils/fetchUserTickets';
import {
  SEARCHING_HOTELS_MESSAGE,
  TICKET_DOES_NOT_INCLUDE_HOTEL_MESSAGE,
  TICKET_NOT_PAID_MESSAGE,
} from './utils/defaultMessages';

export default function Hotel() {
  const token = useToken();

  const [hotelsWithoutRooms, setHotelsWithoutRooms] = useState([]);
  const [hotelsWithRooms, setHotelsWithRooms] = useState([]);
  const [userTicketIncludesHotel, setUserTicketIncludesHotel] = useState(true);
  const [userTicketIsPaid, setUserTicketIsPaid] = useState(true);

  const [roomIsReserved, setRoomIsReserved] = useState(false);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);

  useEffect(() => {
    fetchHotelsWithoutRooms(token, setHotelsWithoutRooms);
    fetchUserTickets(token, setUserTicketIncludesHotel, setUserTicketIsPaid);
  }, []); 
  useEffect(() => {
    if (hotelsWithoutRooms.length > 0 && hotelsWithRooms.length === 0) {
      fetchHotelsWithRooms(token, hotelsWithoutRooms, setHotelsWithRooms);
    }
  }, [hotelsWithoutRooms]);
  console.log('userTicketIncludesHotel', userTicketIncludesHotel);
  console.log('userTicketIsPaid', userTicketIsPaid);
  console.log('hotelsWithoutRooms', hotelsWithoutRooms);

  return (
    <>
      <AreaWrapper>
        <AreaTitle margin={'0 0 30px 0'}> Escolha de hotel e quarto</AreaTitle>
        <AreaSubTitle>{!roomIsReserved ? 'Primeiro, escolha seu hotel' : ('Você já escolheu seu quarto:')}</AreaSubTitle>
        <HotelsWrapper userTicketIncludesHotel={userTicketIncludesHotel}>
          {hotelsWithRooms.length > 0 ? (
            hotelsWithRooms.map((hotel, index) =>
              roomIsReserved ? (
                selectedHotel === hotel && (
                  <HotelCard
                    key={index}
                    hotel={hotel}
                    selectedHotel={selectedHotel}
                    setSelectedHotel={setSelectedHotel}
                    setSelectedRoom={setSelectedRoom}
                    roomIsReserved={roomIsReserved}
                  />
                )
              ) : (
                <HotelCard
                  key={index}
                  hotel={hotel}
                  selectedHotel={selectedHotel}
                  setSelectedHotel={setSelectedHotel}
                  setSelectedRoom={setSelectedRoom}
                  roomIsReserved={roomIsReserved}
                />
              )
            )
          ) : userTicketIncludesHotel && userTicketIsPaid ? (
            <p>{SEARCHING_HOTELS_MESSAGE}</p>
          ) : !userTicketIncludesHotel ? (
            <p>{TICKET_DOES_NOT_INCLUDE_HOTEL_MESSAGE}</p>
          ) : (
            <p>{TICKET_NOT_PAID_MESSAGE}</p>
          )}
        </HotelsWrapper>
        {selectedHotel && (
          <>
            <RoomsCard
              idSelectedHotel={selectedHotel.id}
              hotel={hotelsWithRooms}
              selectedRoom={selectedRoom}
              setSelectedRoom={setSelectedRoom}
              roomIsReserved={roomIsReserved}
            />
            <GenericButton
              disabled={!selectedRoom}
              margin={'20px 0 0 0'}
              onClick={() => setRoomIsReserved(!roomIsReserved)}
            >
              {roomIsReserved ? 'TROCAR DE QUARTO' : 'RESERVAR QUARTO'}
            </GenericButton>
          </>
        )}
      </AreaWrapper>
    </>
  );
}

const AreaWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 15px;

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--page-yellow-theme);
  }
`;

const HotelsWrapper = styled.div`
  display: flex;
  height: ${(props) => !props.userTicketIncludesHotel && '70%'};
  justify-content: ${(props) => !props.userTicketIncludesHotel && 'center'};
  align-items: ${(props) => !props.userTicketIncludesHotel && 'center'};
  gap: 20px;
  overflow-x: auto;
  padding: 30px 0 10px 0;
  margin-bottom: 20px;

  > p {
    color: (--var(--font-gray));
    font-size: 20px;
    text-align: center;
    padding: ${(props) => !props.userTicketIncludesHotel && '0 100px'};
  }

  &::-webkit-scrollbar {
    height: 7px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--page-pink-theme);
  }
`;
