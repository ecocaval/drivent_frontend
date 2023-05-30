import { useEffect, useState } from 'react';
import { getTickets, ticketTypeService } from '../../../services/ticketApi';
import { AreaTitle } from '../../../assets/styles/styledDashboard';
import EventArea from '../../../components/Activities/eventArea';
import EventDays from '../../../components/Activities/eventDays';
import { PopUp } from '../../../components/PopUp';
import useToken from '../../../hooks/useToken';
import { getActivities, getDates } from '../../../services/activitiesApi';

export default function Activities() {
  const [event, setEvent] = useState(0);
  const [dates, setDates] = useState([]);
  const [activities, setActivities] = useState([]);
  const [userPaid, setUserPaid] = useState(undefined);
  const [userSelections, setUserSelections] = useState(undefined);
  const token = useToken();
  useEffect(async() => {
    const pay = await getTickets(token);
    if(pay) setUserPaid(pay);
    const ticketsTypes = await ticketTypeService(token);
    if(ticketsTypes) setUserSelections(ticketsTypes);
    const datesServer = await getDates();
    if (!datesServer) return <PopUp>Sem datas disponíveis</PopUp>;
    setDates(datesServer.reverse());

    const ActivitiesServer = await getActivities();
    if (!ActivitiesServer || ActivitiesServer.length === 0) return <PopUp>Sem atividades disponíveis</PopUp>;
    setActivities(ActivitiesServer.filter((e) => e.dateId === event));
  }, [event]);
  
  if (!userPaid || !userSelections) {
    return 'Loading...';
  } else if (userPaid.status !== 'PAID') {
    return <PopUp>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</PopUp>;
  } else if (userSelections.find((e) => e.id === userPaid.ticketTypeId).isRemote === true) {
    return (
      <PopUp>
        Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.
      </PopUp>
    );
  } else {
    return (
      <>
        <AreaTitle>Escolha de atividades</AreaTitle>
        <EventDays dates={dates} event={event} setEvent={setEvent} />
        {event !== 0 ? <EventArea activities={activities} token={token} setEvent={setEvent} /> : null}
      </>
    );
  }
}
