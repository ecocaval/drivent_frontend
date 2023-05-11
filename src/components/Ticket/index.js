import styled from 'styled-components';
import TitleSection from '../Titles/TitleSection';

const Ticket = ({ ticket, setTicket, selectionTitle }) => {
  return (
    <>
      <TitleSection title={selectionTitle.one} />
      <Card>remoto ou presencial</Card>
      <TitleSection title={selectionTitle.thow} />
      <Card>com ou sem hotel</Card>
      <TitleSection title={selectionTitle.three} />
      <Cardx2>um mais + outro</Cardx2>
    </>
  );
};

export default Ticket;

export const Card = styled.div`
  display: flex;
  align-items: center;
  width: 145px;
  height: 145px;
  //  background-color: (selecionado)? while : var(--color-Cardx2);
  border: 1px solid var(--color-Card);
  border-radius: 20px;
  margin-bottom: 30px;
`;

export const Cardx2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 290px;
  height: 145px;
  background-color: var(--color-Cardx2);
  border: 1px solid var(--color-Card);
  border-radius: 20px;
  margin-bottom: 30px;
`;
