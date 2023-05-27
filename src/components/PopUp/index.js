import styled from 'styled-components';

export function PopUp({ children }) {
  return (
    <PopUpStyle>
      <div className="cardPopUp">
        <h1 className="alertTitle">
          {children}
        </h1>
      </div>
    </PopUpStyle>
  );
};

const PopUpStyle = styled.div` 
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  
  display: grid;
  place-items: center;
  
  .cardPopUp{
    background-color: white;
    min-height: 300px;
    max-width: 900px;
    border-radius: 10px;
  
    display: grid;
    place-items: center;
    .alertTitle{
      text-align: center;
      font-size: 20px;
      color: var(--font-gray);
    }
  } 
`;
