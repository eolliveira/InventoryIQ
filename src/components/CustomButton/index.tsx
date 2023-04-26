import { theme } from '../../style/Theme';
import styled from 'styled-components';

type CustomButtonProps = {
  text: string;
};

export default function CustomButton({ text }: CustomButtonProps) {
  return <Button>{text}</Button>;
}

export const Button = styled.button`
    border: none;
    border-radius: 5px;
    padding: 0 15px;
    color: white;
   background-color: ${theme.colors.secondary};

  &:hover {
    background-color: #3f3f3f;
  }

  &:active {
    background-color: #686565;
  }
`;
