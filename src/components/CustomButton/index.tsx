import styled from 'styled-components';

type CustomButtonProps = {
  text: string;
};

export default function CustomButton({ text }: CustomButtonProps) {
  return <Button>{text}</Button>;
}

export const Button = styled.button`
    border: none;
  padding: 0 15px;
  color: white;
  background-color: #2b2222;

  &:hover {
    background-color: aqua;
  }
`;
