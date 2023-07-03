import styled from 'styled-components';

interface Props {
  iscollapsed?: string;
}

export const SidebarContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export const ButtonColapseContainer = styled.div<Props>`
  background-color: 'rgb(255, 255, 255)';
  justify-content: ${(props) =>
    props.iscollapsed ? 'flex-end' : 'space-between'};
  height: 70px;
  display: flex;
  align-items: center;
`;
