import styled from 'styled-components';

export const AreaTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 37px;
`;

export const AreaSubTitle = styled.h3` 
  font-size: 1.2rem;
  margin: ${props => props.margin || '0'};
  color: var(--font-gray);
`;
