import styled from 'styled-components';

export const AreaTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 37px;
`;

export const AreaSubTitle = styled.h3`
  font-size: 1.2rem;
  margin: ${(props) => props.margin || '0'};
  color: var(--font-gray);
`;

export const ProceedButton = styled.button`
  width: 182px;
  height: 37px;
  background: var(--button-proceed);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;
`;
