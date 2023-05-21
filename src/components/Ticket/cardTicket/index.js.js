import styled from 'styled-components';
export const CardTicket = ({ e, firstSelection, setFirstSelection, setLastSelection }) => {
  return (
    <>
      <CardTickets
        onClick={() => {
          setFirstSelection(e);
        }}
        firstSelection={firstSelection.name}
        e={e.name}
      >
        <div>{e.name}</div>
        <p>R${e.price}</p>
      </CardTickets>
    </>
  );
};

export const CardTickets = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 145px;
  height: 145px;
  background-color: ${(props) => (props.firstSelection === props.e ? 'var(--card-default-grayx2)' : 'while')};
  border: 1px solid var(--card-default-gray);
  border-radius: 20px;
  margin: 0 24px 44px 0;

  font-size: 1em;
  :hover {
    cursor: pointer;
  }

  > p {
    display: inline-block;
    color: var(--font-gray);
    font-size: 0.8em;
    margin: 5px;
  }
`;

export const CardTicketsx2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 290px;
  height: 145px;
  background-color: var(--card-default-grayx2);
  border: 1px solid var(--card-default-gray);
  border-radius: 20px;
  margin: 0 24px 44px 0;

  font-size: 1em;
  :hover {
    cursor: pointer;
  }

  > p {
    display: inline-block;
    color: var(--font-gray);
    font-size: 0.8em;
    margin: 5px;
  }
`;
