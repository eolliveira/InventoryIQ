import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(to bottom, #ffeb3c, #fffcdc);
  height: 100vh;
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 250px;

  @media (min-width: 600px) {
    max-width: 400px;
  }

  gap: 0.5rem;
  margin: 40px auto;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: rgb(160, 160, 160) 0px 0px 20px;
  background-color: #eeeeee;

  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    background-color: #d1ab00c8;
    color: #fff;
    cursor: pointer;

    &:hover {
      background-color: #d1ab00ea;
    }
  }
`;

export const VersionContainer = styled.div`
  display: flex;
  justify-content: center;
`;
