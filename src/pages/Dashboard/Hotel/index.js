//? Libraries
import styled from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';
import useToken from '../../../hooks/useToken';

//? Styles
import { AreaSubTitle, AreaTitle, GenericButton } from '../../../assets/styles/styledDashboard';

//? Components
import { HotelCard } from '../../../components/HotelCard';

//? Utils
import fetchHotelsWithoutRooms from './utils/fetchHotelsWithoutRooms';
import fetchHotelsWithRooms from './utils/fetchHotelsWithRooms';
import RoomsCard from '../../../components/RoomCard';

export default function Hotel() {
  const token = useToken();

  const [hotelsWithoutRooms, setHotelsWithoutRooms] = useState([]);
  const [hotelsWithRooms, setHotelsWithRooms] = useState([]);

  const [selectedHotel, setSelectedHotel] = useState(null);

  useEffect(() => {
    fetchHotelsWithoutRooms(token, setHotelsWithoutRooms);
  }, []);

  useEffect(() => {
    if (hotelsWithoutRooms.length > 0 && hotelsWithRooms.length === 0) {
      fetchHotelsWithRooms(token, hotelsWithoutRooms, setHotelsWithRooms);
    }
  }, [hotelsWithoutRooms]);

  return (
    <>
      <AreaWrapper>
        <AreaTitle margin={'0 0 30px 0'}> Escolha de hotel e quarto</AreaTitle>
        <AreaSubTitle>Primeiro, escolha seu hotel</AreaSubTitle>
        <HotelsWrapper>
          {hotelsWithRooms.length > 0
            ? hotelsWithRooms.map((hotel, index) => (
              <HotelCard
                key={index}
                hotel={hotel}
                selectedHotel={selectedHotel}
                setSelectedHotel={setSelectedHotel}
              />
            ))
            : 'Buscando hoteis...'}
        </HotelsWrapper>
        {selectedHotel ? (
          <>
            <RoomsCard idSelectedHotel={selectedHotel.id} hotel={hotelsWithRooms} />
            <GenericButton margin={'20px 0 0 0'}> RESERVAR QUARTO </GenericButton>
          </>
        ) : (
          <></>
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
    background-color: #e3ae75;
    border-radius: 100px;
  }
`;

const HotelsWrapper = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 30px 0 10px 0;
  margin-bottom: 20px;

  &::-webkit-scrollbar {
    height: 7px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d675a1;
    border-radius: 100px;
  }
`;
