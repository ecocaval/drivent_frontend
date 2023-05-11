import { AiFillCheckCircle } from 'react-icons/ai';
import { useState } from 'react';
import FormCreditCard from '../../../components/FormCreditCard';
import TitleSection from '../../../components/Titles/TitleSection';
import Ticket from '../../../components/Ticket';
import styled from 'styled-components';

export default function Payment() {
  const [ticket, setTicket] = useState({
    id: '',
    TicketType: {
      id: '',
      name: '',
      price: '',
      isRemote: '',
      includesHotel: '',
      createdAt: '',
      updatedAt: '',
    },
    enrollmentId: '',
    status: '',
    createdAt: '',
    updatedAt: '',
  });

  const [formData, setFormData] = useState({
    cvc: '',
    expiry: '',
    name: '',
    number: '',
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Faça algo com os dados do formulário completo, incluindo o PaymentForm
    console.log(formData);
  };

  const selectionTitle = {
    one: 'Primeiro, escolha sua modalidade de ingresso',
    thow: 'Ótimo! Agora escolha sua modalidade de hospedagem',
    three: 'Ingresso escolhido',
    b1: 'RESERVAR INGRESSO',
    b2: 'FINALIZAR PEDIDO',
  };

  return (
    <>
      <h1 style={{ fontSize: '34px', marginBottom: '37px' }}>Ingresso e pagamento</h1>
      <Ticket ticket={ticket} setTicket={setTicket} selectionTitle={selectionTitle} />
      <FormCreditCard formData={formData} setFormData={setFormData} />
      <ConfirmPayment>
        <div>
          <AiFillCheckCircle style={{ marginRight: '20px', color: 'green', width: '40px', height: '40px' }} />
        </div>
        <div>
          <h3>Pagamento confirmado!</h3>
          <p>Prossiga para escolha de hospedagem e atividades</p>
        </div>
      </ConfirmPayment>

      <button >
        <h2>{selectionTitle.b1}</h2>
      </button>
    </>
  );
}

const ConfirmPayment = styled.div`
  display: flex;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  p {
  }
  margin-bottom: 17px;
`;
