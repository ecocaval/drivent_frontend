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
    width: 90%;
    max-width: 900px;
    border-radius: 10px;
  
    display: grid;
    place-items: center;
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;    padding: 20px;
    .alertTitle{
      font-size: 20px;
      color: var(--font-gray);
    }
  } 
`;
