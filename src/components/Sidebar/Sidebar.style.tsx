import styled from 'styled-components';
import { theme } from '../../style/Theme';

interface Props {
  isColapsed: boolean;
}

export const SidebarContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export const ButtonColapseContainer = styled.div<Props>`
  background-color: ${theme.colors.primary};
  justify-content: ${(props) =>
    props.isColapsed ? 'flex-end' : 'space-between'};
  height: 70px;
  display: flex;
  align-items: center;
`;
