import { createTheme } from '@mui/material';

export const CustomTheme = createTheme({
  palette: {
    primary: {
      main: '#D9D9D9',
      dark: '#bdbdbd',
      light: '#e6e3e3',
      contrastText: '#333333',
    },
    secondary: {
      main: '#4D4D4D',
      dark: '#3b3b3b',
      light: '#616161',
      contrastText: '#ffffff',
    }
  },
});
