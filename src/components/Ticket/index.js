import styled from 'styled-components';
import TitleSection from '../Titles/TitleSection';
import { CardTicket } from './cardTicket/index.js';

const Ticket = ({
  ticketType,
  setUserSelect,
  selectedTicket,
  selectedTicket2,
  setSelectedTicket,
  setSelectedTicket2,
  types,
}) => {
  const type = types();
  return (
    <>
      <TitleSection title={'Primeiro, escolha sua modalidade de ingresso'} />
      <CardSection>
        {type.slice(0, 2).map((e, index) => (
          <CardTicket
            key={index}
            e={e}
            selectedTicket={selectedTicket}
            setSelectedTicket={setSelectedTicket}
            setSelectedTicket2={setSelectedTicket2}
          />
        ))}
      </CardSection>
      {selectedTicket.name !== undefined && selectedTicket.name === 'Presencial' ? 
        <TitleSection title={'Ótimo! Agora escolha sua modalidade de hospedagem'} /> : ''}
      {selectedTicket.name !== undefined && selectedTicket.name === 'Presencial' ? (
        <CardSection>
          {type.slice(2, 4).map((e, index) => (
            <CardTicket key={index} e={e} selectedTicket={selectedTicket2} setSelectedTicket={setSelectedTicket2} />
          ))}
        </CardSection>
      ) : null}
    </>
  );
};

export default Ticket;

const CardSection = styled.div`
  display: flex;
`;
