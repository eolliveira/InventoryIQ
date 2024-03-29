import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
`;

export const Main = styled.main`
  background-color: rgb(238, 242, 246);
  height: calc(100% - 60px);
  overflow-y: auto;
  padding: 15px;
`;

export const Content = styled.div`
  flex: 1;
  height: 100vh;
  overflow: hidden;
  background-color: '#ffffff';
`;
