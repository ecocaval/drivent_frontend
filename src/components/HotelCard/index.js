import styled from 'styled-components';

export function HotelCard({ hotel, selectedHotel, setSelectedHotel, idSelectedHotel, setIdSelectedHotel }) {
  return (
    <>
      <HotelWrapper
        selectedHotel={selectedHotel}
        hotel={hotel}
        idSelectedHotel={idSelectedHotel}
        onClick={() => {
          setSelectedHotel(hotel);
          setIdSelectedHotel(hotel.id);
        }}
      >
        <HotelImage src={hotel?.image || '#'} alt="Hotel image" />
        <HotelName>{hotel?.name || 'hotel'}</HotelName>
        <HotelSubtitleSection>
          <p>Tipos de acomodação:</p>
          <p></p>
        </HotelSubtitleSection>
        <HotelSubtitleSection>
          <p>Vagas disponíveis:</p>
          <p></p>
        </HotelSubtitleSection>
      </HotelWrapper>
    </>
  );
}

const HotelWrapper = styled.div`
  min-width: 200px;
  height: 250px;
  padding: 15px;
  background-color: ${(props) =>
    props.selectedHotel === props.hotel ? 'var(--selected-hotel-card-bg)' : 'var(--hotel-card-bg)'};
  border-radius: 10px;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: flex-start;

  &:hover {
    cursor: pointer;
  }
`;

const HotelImage = styled.img`
  max-width: 100%;
  max-height: 100px;
  border-radius: 5px;
`;

const HotelName = styled.p`
  color: var(--hotel-light-dark);
  font-size: 1.2rem;
`;

const HotelSubtitleSection = styled.section`
  > p {
    font-size: 0.8rem;
  }
  > p:first-child {
    color: var(--hotel-strong-dark);
    font-weight: bold;
  }
  > p:last-child {
    color: var(--hotel-light-dark);
    margin-top: 5px;
  }
`;
