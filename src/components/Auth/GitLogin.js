import QueryString from 'qs';
import styled from 'styled-components';
import MuiButton from '@material-ui/core/Button';
import { AiFillGithub as GithubLogo } from 'react-icons/ai';

export default function GitLogin() {
  function redirectToGitHub() {
    const GITHUB_URL = 'https://github.com/login/oauth/authorize';
    const params = {
      client_id: process.env.REACT_APP_CLIENT_ID,
      redirect_uri: process.env.REACT_APP_REDIRECT_URI,
      scope: 'user repo',
      response_type: 'code',
    };

    const queryString = QueryString.stringify(params);

    window.location.href = `${GITHUB_URL}?${queryString}`;
  }

  return (
    <GitHubButton variant="contained" fullWidth onClick={redirectToGitHub}>
      <GithubLogo size={36} />
      <span>Entrar com GitHub</span>
    </GitHubButton>
  );
}

export const GitHubButton = styled(MuiButton)`
  border: 1px solid grey;

  span {
    margin-left: 0.25rem;
  }
`;
