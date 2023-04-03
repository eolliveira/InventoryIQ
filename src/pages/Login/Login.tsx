import { requestBackendLogin, saveAuthData } from '../../http/requests';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type FormData = {
  username: string;
  password: string;
};


//imprementar erro na requisição usando um estado

export default function Login() {
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = (formData: FormData) => {
    requestBackendLogin(formData)
      .then((response) => {
        saveAuthData(response.data)
        console.log('sucesso: ' + response);
        navigate('/dashboard')
      })
      .catch((error) => {
        console.log('error:' + error);
      });

    console.log(formData);
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username">Usuário:</label>
      <div>{errors.username?.message}</div>
      <input
        {...register('username', {
            required: 'Login obrigatorio'
        })}
        name="username"
        type="text"
        placeholder="Login"
      />

      <label htmlFor="password">Senha:</label>
      <div>{errors.password?.message}</div>
      <input
        {...register('password', {
            required: 'Informe a senha'
        })}
        name="password"
        type="password"
        placeholder="senha"
      />

      <button type="submit">Entrar</button>
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
