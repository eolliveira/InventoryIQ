import { ReactNode } from 'react';
import styled from 'styled-components';
import Header from './components/Header/Header';
import MenuSidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <Layout>
      <MenuSidebar />
      <Content>
        <Header />
        <Main>
          <Rotas></Rotas>
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
