import styled from 'styled-components';
import TitleSection from '../Titles/TitleSection';
import { useState } from 'react';
import { CardTicket } from './cardTicket/index.js';

const Ticket = ({
  ticketType,
  setUserSelect,
  selectedTicket,
  selectedTicket2,
  setSelectedTicket,
  setSelectedTicket2,
}) => {
  const type = ['Presencial', 'Online'];
  const withHotel = ['Sem Hotel', 'Com Hotel'];
  return (
    <>
      <TitleSection title={'Primeiro, escolha sua modalidade de ingresso'} />
      <CardSection>
        {type.map((e) => (
          <CardTicket key={e} e={e} selectedTicket={selectedTicket} setSelectedTicket={setSelectedTicket} />
        ))}
      </CardSection>
      <TitleSection title={'Ótimo! Agora escolha sua modalidade de hospedagem'} />
      {selectedTicket!== null ? <CardSection>
        {withHotel.map((e) => (
          <CardTicket key={e} e={e} selectedTicket={selectedTicket2} setSelectedTicket={setSelectedTicket2} />
        ))}
      </CardSection>: null}
    </>
  );
};

export default Ticket;

const CardSection = styled.div`
  display: flex;
`;
