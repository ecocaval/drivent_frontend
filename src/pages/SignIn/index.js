import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import AuthLayout from '../../layouts/Auth';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import Link from '../../components/Link';
import { Row, Title, Label } from '../../components/Auth';
import GitLogin from '../../components/Auth/GitLogin';

import EventInfoContext from '../../contexts/EventInfoContext';
import UserContext from '../../contexts/UserContext';

import useSignIn from '../../hooks/api/useSignIn';
import { useEffect } from 'react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loadingSignIn, signIn } = useSignIn();

  const { eventInfo } = useContext(EventInfoContext);
  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      gitHubLogin(code);
    }
  }, []);

  async function gitHubLogin(code) {
    try {
      const userData = await getGitHubData(code);
      completeLogin(userData);
      console.log(userData);
    } catch (error) {
      toast('Não foi possível fazer o login');
    }
  }

  async function getGitHubData(code) {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/sign-in/github`, { code });
      console.log(data);
      return data;
    } catch (error) {
      return error;
    }
  }

  async function submit(event) {
    event.preventDefault();

    try {
      const userData = await signIn(email, password);
      completeLogin(userData);
    } catch (err) {
      toast('Não foi possível fazer o login!');
    }
  }

  async function completeLogin(userData) {
    setUserData(userData);
    toast('Login realizado com sucesso!');
    navigate('/dashboard');
  }

  return (
    <AuthLayout background={eventInfo.backgroundImageUrl}>
      <Row>
        <img src={eventInfo.logoImageUrl} alt="Event Logo" width="60px" />
        <Title>{eventInfo.title}</Title>
      </Row>
      <Row>
        <Label>Entrar</Label>
        <form onSubmit={submit}>
          <Input label="E-mail" type="text" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input
            label="Senha"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" color="primary" fullWidth disabled={loadingSignIn}>
            Entrar
          </Button>
          <GitLogin />
        </form>
      </Row>
      <Row>
        <Link to="/enroll">Não possui login? Inscreva-se</Link>
      </Row>
    </AuthLayout>
  );
}
