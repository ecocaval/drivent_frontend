import styled from 'styled-components';
import MuiButton from '@material-ui/core/Button';
import { AiFillGithub as GithubLogo } from 'react-icons/ai';

export default function GitLogin() {
  return (
    <GitHubButton variant='contained' fullWidth>
      <GithubLogo size={36}/>
      <span>Entrar com GitHub</span>
    </GitHubButton>
  );
}

export const GitHubButton = styled(MuiButton)`
  border: 1px solid grey;
  
  span{
    margin-left: 0.25rem;
  }
`;
