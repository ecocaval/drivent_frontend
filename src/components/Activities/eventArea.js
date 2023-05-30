import styled from 'styled-components';
import { AreaSubTitle } from '../../assets/styles/styledDashboard';
import Event from './event';
import Eventx2 from './evenetx2';
import { useEffect, useState } from 'react';
import { getUserSelections } from '../../services/activitiesApi';

const EventArea = ({ activities, token, setEvent }) => {
  const [userSelections, setUserSelectios] = useState();
  useEffect(async() => {
    const selections = await getUserSelections(token);
    setUserSelectios(selections);
  }, []);
  return (
    <BlockOfTheDay>
      <Block>
        <AreaSubTitle>Auditório Principal</AreaSubTitle>
        <BlockEvent>
          {activities
            .filter((e) => e.location === 'MAIN')
            .map((e) => (
              <Event key={e.id} element={e} selections={userSelections} setEvent={setEvent}/>
            ))}
        </BlockEvent>
      </Block>
      <Block>
        <AreaSubTitle>Auditório Principal</AreaSubTitle>
        <BlockEvent>
          {activities
            .filter((e) => e.location === 'LATERAL')
            .map((e) => (
              <Eventx2 key={e.id} element={e} selections={userSelections} setEvent={setEvent}/>
            ))}
        </BlockEvent>
      </Block>
      <Block>
        <AreaSubTitle>Auditório Principal</AreaSubTitle>
        <BlockEvent>
          {activities
            .filter((e) => e.location === 'WORKSHOP')
            .map((e) => (
              <Event key={e.id} element={e} selections={userSelections} setEvent={setEvent}/>
            ))}
        </BlockEvent>
      </Block>
    </BlockOfTheDay>
  );
};

export default EventArea;

const BlockOfTheDay = styled.main`
  display: flex;
  flex-direction: wrap;
`;
const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BlockEvent = styled.div`
  overflow: auto;
  width: 288px;
  height: 53vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid var(--border-card-gray);
  margin-top: 13px;
`;
