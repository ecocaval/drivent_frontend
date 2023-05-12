//? Libraries
import styled from 'styled-components';
import { useState } from 'react';

//? Templates
import { HOTELS_ARRAY_TEMPLATE } from './utils/hotelsArrayTemplate';

//? Styles
import { AreaSubTitle, AreaTitle } from '../../../assets/styles/styledDashboard';

//? Components
import { HotelCard } from '../../../components/HotelCard';

export default function Hotel() {
  const [selectedHotel, setSelectedHotel] = useState(null);

  return (
    <>
      <AreaTitle margin={'0 0 30px 0'}> Escolha de hotel e quarto</AreaTitle>
      <AreaSubTitle>Primeiro, escolha seu hotel</AreaSubTitle>
      <HotelsWrapper>
        {/* Static implementation */}
        {HOTELS_ARRAY_TEMPLATE.map((hotel, index) => (
          <HotelCard 
            key={index} 
            hotel={hotel} 
            selectedHotel={selectedHotel}
            setSelectedHotel={setSelectedHotel} 
          />
        ))}
      </HotelsWrapper>
    </>
  );
}

const HotelsWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
`;
