import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: linear-gradient(to bottom, #ffeb3c, #fffcdc);
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

export const Message = styled.p`
  font-size: 18px;
  margin-bottom: 32px;
`;

export const BackButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background-color: #d1ab00c8;
  border-radius: 0.3rem;
  color: #1a1a1a;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #d1ab00ea;
  }
`;
