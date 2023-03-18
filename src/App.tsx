import Workstation from './pages/Workstation/Workstation';
import { ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header/Header';
import MenuSidebar from './components/Sidebar/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import License from './pages/License/License';
import Mobile from './pages/Mobile/Mobile';
import Nobreak from './pages/Nobreak/Nobreak';
import Printer from './pages/Printer/Printer';
import User from './pages/User/User';

function App() {
  return (
    <Layout>
      <MenuSidebar />
      <Content>
        <Header />
        <Main>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/workstation" element={<Workstation />} />
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
`;

const ContentWrapper = styled.div`
  flex: 1;
  height: 100vh;
  overflow: hidden;
  background-color: red;
  padding: 10px;
`;

const Rotas = styled.div`
  width: 100%;
  height: 100%;
  background-color: darkgreen;
`;
