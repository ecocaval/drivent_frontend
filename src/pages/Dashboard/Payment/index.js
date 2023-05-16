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
export default function Payment() {
  const [ticketUser, setTicketUser] = useState({});
  const [selectedTicket, setSelectedTicket] = useState({});
  const [selectedTicket2, setSelectedTicket2] = useState({});
  const [ticketType, setTicketType] = useState([]);
  const [userSelect, setUserSelect] = useState(undefined);
  const [abiliter, setAbiliter] = useState(false);
  const [personalInformations, setPersonalInformations] = useState({});
  const [focis, setFocis] = useState(false);
  const token = useToken();
  console.log(userSelect);
  useEffect(async() => {
    try {
      const arrTicketType = await ticketTypeService(token);
      setTicketType(arrTicketType);

      const tickets = await getTickets(token);
      setTicketUser({ ...arrTicketType.find(e => e.id === tickets.ticketTypeId), status: tickets.status }); 
    } catch (error) {}

    const personalInformations = await getPersonalInformations(token);
    setPersonalInformations(personalInformations);
  }, []);
  const types = () => {
    const amountOfTypes = ticketType.length;
    const valueOfTrueTrue = ticketType.find((e) => e.includesHotel == false && e.isRemote == false);
    const possibilities = [{ id: '', name: 'Presencial', price: 0 }, {}, {}, {}];
    for (let i = 0; i < amountOfTypes; i++) {
      const possibleValues = possibilities[i + 1];
      if (ticketType[i].isRemote === false) {
        if (ticketType[i].includesHotel === false) {
          possibleValues['id'] = ticketType[i].id;
          possibleValues['name'] = 'Sem Hotel';
          possibleValues['price'] = 0;
          possibilities[0].id = ticketType[i].id;
          possibilities[0].name = 'Presencial';
          possibilities[0].price = ticketType[i].price;
        } else {
          possibleValues['id'] = ticketType[i].id;
          possibleValues['name'] = 'Com Hotel';
          possibleValues['price'] = ticketType[i].price - valueOfTrueTrue.price;
        }
      } else {
        possibleValues['id'] = ticketType[i].id;
        possibleValues['name'] = 'Online';
        possibleValues['price'] = ticketType[i].price;
      }
    }
    return possibilities;
  };

  const [formData, setFormData] = useState({
    cvc: '',
    expiry: '',
    name: '',
    number: '',
    issuer: '',
  });

  function reserve() {
    setUserSelect(selectedTicket.name === 'Presencial' ? selectedTicket2 : selectedTicket);
    setAbiliter(true);
  }
  async function pay() {
    if (formData.issuer === 'unknown') return toast('Numero de cartão desconhecido!');
    if (
      formData.issuer === '' ||
      formData.cvc === '' ||
      formData.expiry === '' ||
      formData.name === '' ||
      formData.number === ''
    )
      return toast('Preencha todos os campos do cartão');
    if (formData.name.split(' ').length !== 2) return toast('Isira nome e sobrenome!');
    if (
      Number(formData.expiry.slice(0, 2)) < 1 ||
      Number(formData.expiry.slice(0, 2)) > 12 ||
      Number(formData.expiry.slice(2, 4)) < 1 ||
      Number(formData.expiry.slice(2, 4)) > 80
    )
      return toast('Esta data é invalida!');
    let body = { ticketTypeId: userSelect.id };
    const ticketUserNow = await createTicket(body, token);
    body = { ticketId: ticketUserNow.id, cardData: { number: formData.number, issuer: formData.issuer } };
    const pay = await payTicket(body, token);
    setAbiliter(false);
    setFocis(!focis);
  }   

  //confirmação de pagamento
  if (ticketUser.status && ticketUser.status === 'PAID' && selectedTicket && selectedTicket2) {
    return (
      <>
        <ConfirmPaymentBlock selectedTicket={selectedTicket} selectedTicket2={selectedTicket2} />
      </>
    );
  }

  //caso tenha inscrição, mas não possui pagamento
  if (personalInformations) {
    return (
      <>
        {!abiliter && !userSelect ? (
          <>
            <AreaTitle>Ingresso e pagamento</AreaTitle>

            <Ticket
              types={types}
              ticketType={ticketType}
              setTicketType={setTicketType}
              userSelect={userSelect}
              setUserSelect={setUserSelect}
              selectedTicket={selectedTicket}
              selectedTicket2={selectedTicket2}
              setSelectedTicket={setSelectedTicket}
              setSelectedTicket2={setSelectedTicket2}
            />
          </>
        ) : null}

        {abiliter ? <TitleSection title={'Pagamento'} /> : null}
        {userSelect && abiliter ? (
          <>
            <CardTicketsx2>
              <div>
                {selectedTicket.name} {selectedTicket.name === 'Online' ? null : '+'}{' '}
                {selectedTicket.name === 'Online' ? null : selectedTicket2.name}
              </div>
              <p>R${selectedTicket2.name === 'Com Hotel'?selectedTicket2.price+selectedTicket.price:selectedTicket.name==='Online'? selectedTicket.price : selectedTicket.price }</p>
            </CardTicketsx2>
            <FormCreditCard formData={formData} setFormData={setFormData} />
          </>
        ) : null}
        {(selectedTicket.name !== undefined && selectedTicket2.name !== undefined) ||
        selectedTicket.name === 'Online' ? (
            !userSelect ? (
              <Pricie>
                Fechado! O total ficou em
                <strong>
                  R$ {selectedTicket2.price ? selectedTicket.price + selectedTicket2.price : selectedTicket.price}
                </strong>
                . Agora é só confirmar
              </Pricie>
            ) : null
          ) : null}
        {ticketUser.status === 'PAID' ? (
          <ConfirmPaymentBlock userSelect={userSelect} />
        ) : (!focis ? (
          <GenericButton onClick={userSelect ? pay : reserve}>
            {userSelect ? 'FINALIZAR PAGAMENTO' : 'RESERVAR INGRESSO'}
          </GenericButton>
        ) : null)}
      </>
    );
  } else if (!personalInformations) {
    //caso não tenha inscrição
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
