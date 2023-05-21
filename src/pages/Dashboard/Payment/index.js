import { useEffect, useState } from 'react';
import FormCreditCard from '../../../components/FormCreditCard';
import Ticket from '../../../components/Ticket';
import styled from 'styled-components';
import { AreaTitle, GenericButton } from '../../../assets/styles/styledDashboard';
import useToken from '../../../hooks/useToken';
import { createTicket, getTickets, payTicket, ticketTypeService } from '../../../services/ticketApi';
import { toast } from 'react-toastify';
import TitleSection from '../../../components/Titles/TitleSection';
import { getPersonalInformations } from '../../../services/enrollmentApi';
import { PopUp } from '../../../components/PopUp';
import { ConfirmPaymentBlock } from './utils/ConfirmPaymentBlockStyle';
import { NO_ENROLLMENT_MESSAGE } from './utils/defaultMessages';
import { CardTicketsx2 } from '../../../components/Ticket/cardTicket/index.js';
import validationsInputs from '../../../components/FormCreditCard/utils/validationsInputs';
export default function Payment() {
  const [userHaveATicket, setUserHaveATicket] = useState();
  const [personalInformations, setPersonalInformations] = useState();
  const [ticketType, setTicketType] = useState();
  const [firstSelection, setFirstSelection] = useState({});
  const [lastSelection, setLastSelection] = useState({});
  const [userSelect, setUserSelect] = useState();
  const [formData, setFormData] = useState({
    cvc: '',
    expiry: '',
    name: '',
    number: '',
    issuer: '',
  });
  const [payment, setPayment] = useState(true);
  const token = useToken();
  useEffect(async() => {
    try {
      const personalInformations = await getPersonalInformations(token);
      setPersonalInformations(personalInformations);
      const arrTicketType = await ticketTypeService(token);
      setTicketType(arrTicketType);
      const ticketUser = await getTickets(token);
      setUserHaveATicket(ticketUser);
    } catch (error) {
      return <PopUp>Nada disponível no momento</PopUp>;
    }
  }, [payment]);

  if (!ticketType) return <PopUp>Loading...</PopUp>;

  function reserve() {
    setUserSelect(firstSelection.name !== 'Online' ? lastSelection : firstSelection);
  }
  async function pay() {
    try {
      validationsInputs(formData);
    } catch (error) {
      return toast(error.message);
    }
    let body = { ticketTypeId: userSelect.id };
    const ticketUserNow = await createTicket(body, token);
    body = { ticketId: ticketUserNow.id, cardData: { number: formData.number, issuer: formData.issuer } };
    await payTicket(body, token);
    setPayment(!payment);
  }

  //confirmação de pagamento
  if (userHaveATicket) {
    console.log(ticketType.find((e) => e.id === userHaveATicket.ticketTypeId));
    const ticketT = ticketType.find((e) => e.id === userHaveATicket.ticketTypeId);
    return (
      <>
        <ConfirmPaymentBlock ticketT={ticketT} />
      </>
    );
  }

  if (personalInformations) {
    return (
      <>
        <AreaTitle>Ingresso e pagamento</AreaTitle>
        {!userSelect && (
          <Ticket
            ticketType={ticketType}
            firstSelection={firstSelection}
            setFirstSelection={setFirstSelection}
            lastSelection={lastSelection}
            setLastSelection={setLastSelection}
          />
        )}
        {userSelect && (
          <>
            <TitleSection title={'Pagamento'} />
            <>
              <CardTicketsx2>
                <div>
                  {firstSelection.name === 'Online'
                    ? firstSelection.name
                    : `${firstSelection.name} + ${lastSelection.name}`}
                </div>
                <p>
                  R${' '}
                  {firstSelection.name === 'Online' ? firstSelection.price : firstSelection.price + lastSelection.price}
                </p>
              </CardTicketsx2>
              <FormCreditCard formData={formData} setFormData={setFormData} />
            </>
          </>
        )}
        {(firstSelection.name === 'Online' || (firstSelection.name === 'Presencial' && lastSelection.name)) && (
          <>
            <Pricie>
              Fechado! O total ficou em
              <strong>
                R${' '}
                {firstSelection.name === 'Online' ? firstSelection.price : lastSelection.price + firstSelection.price}
              </strong>
              . Agora é só confirmar
            </Pricie>
            <GenericButton onClick={userSelect ? pay : reserve}>
              {userSelect ? 'FINALIZAR PAGAMENTO' : 'RESERVAR INGRESSO'}
            </GenericButton>
          </>
        )}
      </>
    );
  } else if (!personalInformations) {
    return <PopUp>{NO_ENROLLMENT_MESSAGE}</PopUp>;
  } else {
    return 'loading...';
  }
}

const Pricie = styled.h1`
  font-weight: 400;
  padding-bottom: 17px;
  font-size: 20px;
  color: var(--font-gray);
`;
