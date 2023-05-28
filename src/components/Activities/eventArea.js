import styled from 'styled-components';
import { AreaSubTitle } from '../../assets/styles/styledDashboard';
import Event from './event';
import Eventx2 from './evenetx2';

const EventArea = () => {
  return (
    <BlockOfTheDay>
      <Block>
        <AreaSubTitle>Auditório Principal</AreaSubTitle>
        <BlockEvent><Event /></BlockEvent>
      </Block>
      <Block>
        <AreaSubTitle>Auditório Principal</AreaSubTitle>
        <BlockEvent><Eventx2 /></BlockEvent>
      </Block>
      <Block>
        <AreaSubTitle>Auditório Principal</AreaSubTitle>
        <BlockEvent><Event /></BlockEvent>
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
  width: 288px;
  height: 55vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid var(--border-card-gray);
  margin-top: 13px;
`;
