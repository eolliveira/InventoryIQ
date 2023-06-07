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
    
    .swal2-container { z-index: 9999 } 

    //tabs menu
    /* .Mui-selected {
    color: ${theme.colors.secondary};
    }

    .MuiTabs-indicator {
      background-color: ${theme.colors.yellow};
    } */

`;

//remover
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
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
`;
