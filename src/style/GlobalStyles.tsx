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

    .swal2-confirm.swal2-styled {
      background-color: #43a047;
    }

    .swal2-cancel.swal2-styled {
      background-color: #dc3545;
    }

    .ps-sidebar-root.css-1satt3r {
      border-right-style: none;
    }

`;

export const BaseCard = styled.div`
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
`;
