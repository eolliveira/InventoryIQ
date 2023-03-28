import { ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <Layout>
      <MenuSidebar />
      <Content>
        <Header />
        <Main>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/workstation" element={<WorkstationList />} />
            <Route path="/workstation/:id" element={<WorkstationData />} />

            <Route path="/license" element={<License />} />
            <Route path="/mobile" element={<Mobile />} />
            <Route path="/nobreak" element={<Nobreak />} />
            <Route path="/printer" element={<Printer />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </Main>
      </Content>
    </Layout>
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
