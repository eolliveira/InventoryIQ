import { ReactNode } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import MenuSidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { Content, Main, Wrapper } from './style';

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
