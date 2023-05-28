import { AreaTitle } from '../../../assets/styles/styledDashboard';
import EventArea from '../../../components/Activities/eventArea';
import EventDays from '../../../components/Activities/eventDays';
import { PopUp } from '../../../components/PopUp';

export default function Activities() {
  return (
    <>
      <AreaTitle>Escolha de atividades</AreaTitle>
      <EventDays />
      <EventArea />
      <PopUp>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</PopUp>
      <PopUp>
        Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.
      </PopUp>
    </>
  );
}
