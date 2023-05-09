import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { theme } from './style/Theme';
import { GlobalStyles } from './style/GlobalStyles';
import { BrowserRouter } from 'react-router-dom';
import { CustomTheme } from './style/CustomTheme';
import { ThemeProvider } from '@mui/material/styles';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={CustomTheme}>
    <GlobalStyles />
    <ProSidebarProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ProSidebarProvider>
  </ThemeProvider>
);
