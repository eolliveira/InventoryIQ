import styled from 'styled-components';
import MenuSidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <Layout>
      <MenuSidebar />
    </Layout>
  );
}

export default App;

export const Layout = styled.div`
  height: 100%;
  display: flex;
`;
