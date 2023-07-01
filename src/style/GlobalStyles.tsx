import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

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

`;

export const BaseCard = styled.div`
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
`;
