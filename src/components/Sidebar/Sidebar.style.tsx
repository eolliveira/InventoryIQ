import styled from 'styled-components';
import { theme } from '../../style/Theme';

interface Props {
  iscollapsed?: string;
}

export const SidebarContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export const ButtonColapseContainer = styled.div<Props>`
  background-color: ${theme.colors.primary};
  justify-content: ${(props) =>
    props.iscollapsed ? 'flex-end' : 'space-between'};
  height: 70px;
  display: flex;
  align-items: center;
`;
