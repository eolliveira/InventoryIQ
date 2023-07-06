import { AuthContext } from '../../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useContext } from 'react';
import { requestBackendLogin } from '../../http/requests';
import { saveAuthData } from '../../utils/LocalStorage';
import { getTokenData } from '../../utils/Auth';
import Swal from 'sweetalert2';

type FormData = {
  login: string;
  password: string;
};

//imprementar erro na requisição usando um estado

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { setAuthContextData } = useContext(AuthContext);

  const onSubmit = (formData: FormData) => {
    requestBackendLogin(formData)
      .then((response) => {
        saveAuthData(response.data);
        setAuthContextData({
          authenticated: true,
          tokenData: getTokenData(),
        });
        navigate('/dashboard');
      })
      .catch((error) => {
        Swal.fire({
          title: 'Falha',
          text: `${error.response.data.message}`,
          icon: 'warning',
          confirmButtonColor: '#999999',
        });
      });
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="login">Usuário:</label>
      <div>{errors.login?.message}</div>
      <input
        {...register('login', {
          required: 'Login obrigatorio',
        })}
        name="login"
        type="text"
        placeholder="Login"
      />

      <label htmlFor="password">Senha:</label>
      <div>{errors.password?.message}</div>
      <input
        {...register('password', {
          required: 'Informe a senha',
        })}
        name="password"
        type="password"
        placeholder="senha"
      />

      <button>Entrar</button>
    </FormWrapper>
  );
}

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 2rem;
  padding: 2rem;
  border: 2px solid #ccc;
  border-radius: 0.5rem;

  label {
    font-weight: bold;
  }

  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    background-color: #0077ff;
    color: #fff;
    cursor: pointer;

    &:hover {
      background-color: #0055ff;
    }
  }
`;
