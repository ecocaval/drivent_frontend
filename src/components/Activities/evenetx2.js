import styled from 'styled-components';
import { CgEnter } from 'react-icons/cg';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { userSelectActivity } from '../../services/activitiesApi';
import { toast } from 'react-toastify';
import useToken from '../../hooks/useToken';

const Eventx2 = ({ element, selections, setEvent }) => {
  const prove = selections.find((e) => e.activityId === element.id);
  const token = useToken();
  return (
    <>
      <EventSession>
        <Description>
          <Title>{element.name}</Title>
          <SubTitle>xx:xx</SubTitle>
        </Description>
        <Status>
          {prove ? (
            prove.activityId === element.id ? (
              <>
                <Check />
                <p>inscrito</p>
              </>
            ) : element.slots > 0 ? (
              <>
                <Enter
                  onClick={() => {
                    userSelectActivity(token, element.id);
                    setEvent(0);
                    toast('Inscrito');
                  }}
                />
                <p>{element.slots} vagas</p>
              </>
            ) : (
              <>
                <Close />
                <p>esgotado</p>
              </>
            )
          ) : element.slots > 0 ? (
            <>
              <Enter
                onClick={() => {
                  userSelectActivity(token, element.id);
                  setEvent(0);
                  toast('Inscrito');
                }}
              />
              <p>{element.slots} vagas</p>
            </>
          ) : (
            <>
              <Close />
              <p>esgotado</p>
            </>
          )}
        </Status>
      </EventSession>
    </>
  );
};

export default Eventx2;

const EventSession = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0 10px;
  width: 265px;
  height: 168px;
  background: var(--card-event-gray);
  border-radius: 5px;
`;

const Description = styled.div`
  padding: 12px 0 0 10px;
  width: 199px;
  height: 168px;
`;
const Title = styled.h1`
  font-weight: 700;
  font-size: 12px;
`;
const SubTitle = styled.p`
  margin-top: 6px;
  font-weight: 400;
  font-size: 12px;
`;
const Status = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 66px;
  height: 90%;
  border-left: solid 1px var(--border-card-gray);
  font-size: 9px;
  //validar status para cor vermelha ou verde =>  color: ${(props) => (props.status ? 'green' : 'red')};
`;

const Enter = styled(CgEnter)`
  color: green;
  font-size: 25px;
`;
const Check = styled(AiOutlineCheckCircle)`
  color: green;
  font-size: 25px;
`;
const Close = styled(AiOutlineCloseCircle)`
  color: red;
  font-size: 25px;
`;
