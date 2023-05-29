import { light } from '@material-ui/core/styles/createPalette';
import { createTheme } from '@mui/material';

export const customTheme = createTheme({
  palette: {
    primary: {
      main: '#4d4d4d',
      dark: '#353535',
      light: '#707070',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#999999',
      dark: '#6b6b6b',
      light: '#adadad',
      contrastText: '#ffffff',
    },
    success: {
      main: '#43a047',
      dark: '#2e7031',
      light: '#68b36b',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#fdd835',
      dark: '#b19725',
      light: '#fddf5d',
      contrastText: '#333333',
    },
    error: {
      main: '#dc3545',
      dark: '#9a2530',
      light: '#e35d6a',
    },
  },
  components: {
    // MuiTab: {
    //   styleOverrides: {
    //     root: {
    //       color: '#424242',
    //       '&.Mui-selected': {
    //         color: 'black',
    //         backgroundColor: 'rgb(103 103 103 / 10%)',
    //         borderRadius: '5px',
    //         fontWeight: '500',
    //         '&:hover': {
    //           backgroundColor: 'rgb(103 103 103 / 20%)',
    //         },
    //       },
    //     },
    //   },
    // },
  },
});
