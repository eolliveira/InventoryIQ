import styled from 'styled-components';

interface ComponentProps {
  isColapsed: boolean;
}

export const SidebarContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export const ButtonColapseContainer = styled.div<ComponentProps>`
  background-color: ${(props) => (props.isColapsed ? '#999' : '#999')};
  justify-content: ${(props) =>
    props.isColapsed ? 'flex-end' : 'space-between'};
  height: 75px;
  display: flex;
  align-items: center;
`;
