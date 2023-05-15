import styled from 'styled-components';

import { AiFillCheckCircle } from 'react-icons/ai';
import { AreaTitle } from '../../../../assets/styles/styledDashboard';
import TitleSection from '../../../../components/Titles/TitleSection';
import { CardTicketsx2 } from '../../../../components/Ticket/cardTicket/index.js';

export function ConfirmPaymentBlock({ selectedTicket, selectedTicket2 }) {
  return (
    <ConfirmPaymentBlockStyle>
      <AreaTitle>Ingresso e pagamento</AreaTitle>
      <CardTicketsx2>
        <div>
          {selectedTicket.name} {selectedTicket.name === 'Online' ? null : '+'} {selectedTicket.name === 'Online' ? null : selectedTicket2.name}
        </div>
        <p>R${selectedTicket.price}</p>
      </CardTicketsx2>
      <TitleSection title={'Pagamento'} />
      <ConfirmPayment>
        <div>
          <AiFillCheckCircle style={{ marginRight: '20px', color: 'green', width: '40px', height: '40px' }} />
        </div>
        <div>
          <h1 className="titlePaymentConfirm">
            Pagamento confirmado!
          </h1>
          <p>Prossiga para escolha de hospedagem e atividades</p>
        </div>
      </ConfirmPayment>
    </ConfirmPaymentBlockStyle>
  );
};

const ConfirmPaymentBlockStyle = styled.div`  
`;

const ConfirmPayment = styled.div`
  display: flex;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  h1{
    font-size: 20px;
  }
  
  p {
    color: var(--font-gray);

  }
  margin-bottom: 17px;
`;
