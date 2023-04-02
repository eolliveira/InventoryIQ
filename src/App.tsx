import { ReactNode } from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import { theme } from './style/Theme';
import styled from 'styled-components';
import Header from './components/Header/Header';
import MenuSidebar from './components/Sidebar/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import License from './pages/License/License';
import Mobile from './pages/Mobile/Mobile';
import Nobreak from './pages/Nobreak/Nobreak';
import Printer from './pages/Printer/PrinterData';
import User from './pages/User/User';
import WorkstationList from './pages/Workstation/WorkstationList';
import WorkstationData from './pages/Workstation/WorkstationData';
import Login from './pages/Login/Login';
import RouteManager from './RouteManager';

function App() {
  return (
    <>
      {true ? (
        <Login />
      ) : (
        <Layout>
          <MenuSidebar />
          <Content>
            <Header />
            <Main>
              <RouteManager />
            </Main>
          </Content>
        </Layout>
      )}
    </>
  );
}

export default App;

export const Layout = styled.div`
  height: 100%;
  display: flex;
`;

export function Content({ children }: { children: ReactNode }) {
  return <ContentWrapper>{children}</ContentWrapper>;
}

export const Main = styled.main`
  height: calc(100% - 60px);
  overflow-y: auto;
  padding: 10px;
`;

const ContentWrapper = styled.div`
  flex: 1;
  height: 100vh;
  overflow: hidden;
  background-color: '#FDFDFD';
  //padding: 10px;
`;
