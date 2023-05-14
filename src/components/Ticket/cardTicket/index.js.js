import styled from 'styled-components';
export const CardTicket = ({ e, selectedTicket, setSelectedTicket }) => {
  return (
    <>
      <CardTickets onClick={() => setSelectedTicket(e)} selectedTicket={selectedTicket} e={e}>
        {e}
      </CardTickets>
    </>
  );
};
export const CardTickets = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 145px;
  height: 145px;
  background-color: ${(props) => (props.selectedTicket === props.e ? 'var(--card-default-grayx2)' : 'var(while)')};
  border: 1px solid var(--card-default-gray);
  border-radius: 20px;
  margin: 0 24px 44px 0;
`;
