import styled from 'styled-components';

export default function TitleSection({ title }) {
  return (
    <TitleSectionStyle>
      <h1>{title}</h1>
    </TitleSectionStyle>
  );
}

const TitleSectionStyle = styled.div`
  font-weight: 400;
  padding-bottom: 17px;
  font-size: 20px;
  color: var(--font-gray);
`;
