import styled from 'styled-components';
import TitleSection from '../Titles/TitleSection';
import { CardTicket } from './cardTicket/index.js';
import types from '../../pages/Dashboard/Payment/utils/separationsOfTypes';

const Ticket = ({ ticketType, firstSelection, setFirstSelection, lastSelection, setLastSelection }) => {
  const type = types(ticketType);
  return (
    <>
      <TitleSection title={'Primeiro, escolha sua modalidade de ingresso'} />
      <CardSection>
        {type.slice(0, 2).map((e, index) => (
          <CardTicket
            key={e.name}
            e={e}
            firstSelection={firstSelection}
            setFirstSelection={setFirstSelection}
            setLastSelection={setLastSelection}
          />
        ))}
      </CardSection>
      { firstSelection.name === 'Presencial' &&
        <>
          <TitleSection title={'Ótimo! Agora escolha sua modalidade de hospedagem'} />
          <CardSection>
            {type.slice(2, 4).map((e, index) => (
              <CardTicket key={e.name} e={e} firstSelection={lastSelection} setFirstSelection={setLastSelection} />
            ))}
          </CardSection>
        </>
      }
    </>
  );
};

export default Ticket;

const CardSection = styled.div`
  display: flex;
`;
