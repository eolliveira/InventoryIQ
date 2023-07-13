import FormControl from '@mui/material/FormControl';
import styled from 'styled-components';

export const FormControlCustom = styled(FormControl)`
  width: 25vh;

  @media (min-width: 250px) {
    width: 30vh;
  }
  @media (min-width: 400px) {
    width: 40vh;
  }

  @media (min-width: 768px) {
    width: 80vh;
  }

  @media (min-width: 1000px) {
    width: 100vh;
  }
`;
