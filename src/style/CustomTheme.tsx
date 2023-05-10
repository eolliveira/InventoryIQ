import { createTheme } from '@mui/material';

export const CustomTheme = createTheme({
  palette: {
    primary: {
      main: '#4D4D4D',
      dark: '#353535',
      light: '#707070',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#d9d9d9',
      dark: '#979797',
      light: '#e0e0e0',
      contrastText: '#333333',
    },
  },
});
