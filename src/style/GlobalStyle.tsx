import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import { theme } from './Theme';

export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
      font-family: 'Roboto', sans-serif;
    }

    li, a {
        list-style-type: none;
        text-decoration: none;
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

