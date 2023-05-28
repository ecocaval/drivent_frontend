import styled from 'styled-components';
import { AreaSubTitle } from '../../assets/styles/styledDashboard';

const EventDays = () => {
  return (
    <>
      <AreaSubTitle>Primeiro, filtre pelo dia do evento:</AreaSubTitle>
      <Day>Day, {'DD/MM'}</Day>
      <Day>Day, {'DD/MM'}</Day>
      <Day>Day, {'DD/MM'}</Day>
    </>
  );
};

export default EventDays;

const Day = styled.button`
  margin: 27px 17px 61px 0;  
  width: 182px;
  height: 37px;
  font-weight: 400;
  font-size: 14px;
  background: var(--button-proceed);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;

  &:hover{
    cursor: pointer;
  }
`;
