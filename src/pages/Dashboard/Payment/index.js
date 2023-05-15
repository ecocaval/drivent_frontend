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
import {
  NO_ENROLLMENT_MESSAGE
} from './utils/defaultMessages';
import { ConfirmPaymentBlock } from './utils/ConfirmPaymentBlockStyle';
export default function Payment() {
  const [ticketUser, setTicketUser] = useState({});
  const [selectedTicket, setSelectedTicket] = useState({});
  const [selectedTicket2, setSelectedTicket2] = useState({});
  const [ticketType, setTicketType] = useState([]);
  const [userSelect, setUserSelect] = useState(undefined);
  const [abiliter, setAbiliter] = useState(false);
  const [personalInformations, setPersonalInformations] = useState({});
  const token = useToken();
  useEffect(async() => {
    try {
      const arrTicketType = await ticketTypeService(token);
      setTicketType(arrTicketType);

      //pega os tickets
      const tickets = await getTickets(token);
      setTicketUser(tickets);
    } catch (error) { }

    const personalInformations = await getPersonalInformations(token);
    setPersonalInformations(personalInformations);
  }, []);
  const types = () => {
    const amountOfTypes = ticketType.length;
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
          possibleValues['price'] = 200;
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
    setUserSelect(selectedTicket.id);
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
    let body = { ticketTypeId: selectedTicket.id };
    const ticketUserNow = await createTicket(body, token);
    body = { ticketId: ticketUserNow.id, cardData: { number: formData.number, issuer: formData.issuer } };
    const pay = await payTicket(body, token);
    setAbiliter(false);
    const tickets = await getTickets(token);
    setTicketUser(tickets);
  }

  //confirmação de pagamento
  if (ticketUser.status && ticketUser.status === 'PAID') {
    return (
      <ConfirmPaymentBlock/>
    );
  };

  //caso tenha inscrição, mas não possui pagamento
  if (personalInformations) {
    return (
      <>
        <AreaTitle>Ingresso e pagamento</AreaTitle>
        {!userSelect ? (
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
        ) : null}
        {abiliter ? <TitleSection title={'Pagamento'} /> : null}
        {userSelect && abiliter ? <FormCreditCard formData={formData} setFormData={setFormData} /> : null}

        {(selectedTicket.name !== undefined && selectedTicket2.name !== undefined) || selectedTicket.name === 'Online' ? (
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
        { ticketUser.status === 'PAID' ? <ConfirmPaymentBlock/> : (selectedTicket.name !== undefined && selectedTicket2.name !== undefined) || selectedTicket.name === 'Online' ? (
          <GenericButton onClick={userSelect ? pay : reserve}>
            {userSelect ? 'FINALIZAR PAGAMENTO' : 'RESERVAR INGRESSO'}
          </GenericButton>
        ) : null}
      </>
    );
  } else if (!personalInformations) {   //caso não tenha inscrição
    return (
      <PopUp>
        { NO_ENROLLMENT_MESSAGE }
      </PopUp>
    );
  } else {   
    return (
      'loading...'
    );
  };
};

const Pricie = styled.h1`
  font-weight: 400;
  padding-bottom: 17px;
  font-size: 20px;
  color: var(--font-gray);
`;

