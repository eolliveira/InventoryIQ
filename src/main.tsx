import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import { ThemeProvider } from 'styled-components';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { theme } from './Theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ProSidebarProvider>
        <App />
      </ProSidebarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
