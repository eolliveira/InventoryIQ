import { AuthContext } from '../../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { requestBackendLogin } from '../../http/requests';
import { saveAuthData } from '../../utils/LocalStorage';
import { getTokenData } from '../../utils/Auth';
import { Container, Form, LogoContainer, VersionContainer } from './style';
import Logo from '../../assets/img/logo.gif';
import Swal from 'sweetalert2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import packageJson from '../../../package.json';
import './style';

type LoginData = {
  login: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();
  const { setAuthContextData } = useContext(AuthContext);

  const onSubmit = (formData: LoginData) => {
    setIsLoading(true);
    requestBackendLogin(formData)
      .then((response) => {
        saveAuthData(response.data);
        setAuthContextData({
          authenticated: true,
          tokenData: getTokenData(),
        });
        navigate('/license');
      })
      .catch((error) => {
        Swal.fire({
          title: 'Atenção!',
          text: `${error.response.data.message}`,
          icon: 'warning',
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Container>
      <LogoContainer>
        <img width={200} src={Logo} alt="Logo" />
      </LogoContainer>
      <Box>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Typography color={'GrayText'}>USUÁRIO</Typography>
          <input
            {...register('login', {
              required: 'Campo obrigatório!',
            })}
            name="login"
            type="text"
            placeholder="Informe o usuário"
          />
          <Typography color={'error'} variant="subtitle2">
            {errors.login?.message}
          </Typography>
          <Typography color={'GrayText'}>SENHA</Typography>
          <input
            {...register('password', {
              required: 'Campo obrigatório!',
            })}
            name="password"
            type="password"
            placeholder="Informe a senha"
          />
          <Typography color={'error'} variant="subtitle2">
            {errors.password?.message}
          </Typography>
          <LoadingButton sx={{ color: '#d1ab00c8' }} type="submit" loading={isLoading}>
            <Typography textTransform={'none'}>Entrar</Typography>
          </LoadingButton>
        </Form>
      </Box>
      <VersionContainer>
        <Typography fontWeight={'bold'} variant="subtitle2">
          versão {packageJson.version}
        </Typography>
      </VersionContainer>
    </Container>
  );
}
