import { ReactNode } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import MenuSidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';

export default function Layout() {
  return (
    <Wrapper>
      <MenuSidebar />
      <Content>
        <Header />
        <Main>
          <Outlet />
        </Main>
      </Content>
    </Wrapper>
  );
}

export const Wrapper = styled.div`
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
