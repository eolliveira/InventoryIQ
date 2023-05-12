import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import { theme } from './Theme';

export const GlobalStyles = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
      font-family: 'Roboto', sans-serif;
    }
    
`;

//estilo base para inputs
export const Input = styled.input`
  padding: 5px;
  border-radius: 3px;
  background-color: unset;
  font-size: ${theme.size.sm};
  color: ${theme.colors.black};
  border: 1px solid ${theme.colors.secondary};
`;

export const Label = styled.label`
  font-weight: bold;
  background-color: unset;
  font-size: ${theme.size.sm};
  color: ${theme.colors.black};
`;


export const Field = styled.div`
  display: flex;
  flex-direction: column;
`;


export const BaseCard = styled.div`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid ${theme.colors.primary};
  background-color: #f8f8f8;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.25);
`;
