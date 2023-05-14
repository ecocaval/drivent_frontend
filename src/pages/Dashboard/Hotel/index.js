//? Libraries
import styled from 'styled-components';
import { useState } from 'react';
import useToken from '../../../hooks/useToken';
import { useEffect } from 'react';

//? Styles
import { AreaSubTitle, AreaTitle } from '../../../assets/styles/styledDashboard';

//? Components
import { HotelCard } from '../../../components/HotelCard';
import RoomsCard from '../../../components/RoomCard';

//? Utils
import fetchHotelsWithoutRooms from './utils/fetchHotelsWithoutRooms';
import fetchHotelsWithRooms from './utils/fetchHotelsWithRooms';

export default function Hotel() {
  const token = useToken();

  const [hotelsWithoutRooms, setHotelsWithoutRooms] = useState([]);
  const [hotelsWithRooms, setHotelsWithRooms] = useState([]);

  const [selectedHotel, setSelectedHotel] = useState(null);
  const [idSelectedHotel, setIdSelectedHotel] = useState(null);

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
              idSelectedHotel={idSelectedHotel}
              setIdSelectedHotel={setIdSelectedHotel}
            />
          ))
          : 'Buscando hoteis...'}
      </HotelsWrapper>
      {idSelectedHotel ? <RoomsCard idSelectedHotel={idSelectedHotel} /> : <></>}
    </>
  );
}

const HotelsWrapper = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 30px 0 10px 0;

  &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d675a1;
    border-radius: 100px;
  }
`;
