import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
  sidebarClasses,
} from 'react-pro-sidebar';
import styled from 'styled-components';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { Button, collapseClasses, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MenuIcon from '@mui/icons-material/Menu';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


export default function MenuSidebar() {
  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
    useProSidebar();

  return (
    <SidebarContainer>
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: '#e0e0e0',
          },
        }}
      >
        <Menu>
          <ButtonColapseContainer isColapsed={collapsed}>
            {!collapsed ? <LinkedInIcon fontSize="large" /> : ''}
            {!collapsed ? (
              <Typography variant="h6">LinkedInIcon</Typography>
            ) : (
              ''
            )}
            <Button
              style={{ display: 'flex' }}
              startIcon={
                collapsed ? (
                  <MenuIcon color="action" />
                ) : (
                  <ArrowBackIosNewIcon color="action" />
                )
              }
              onClick={() => collapseSidebar()}
            ></Button>
          </ButtonColapseContainer>
          <SubMenu icon={<AddTaskIcon />} label="Charts">
            <MenuItem> Pie charts </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
          <MenuItem icon={<AddTaskIcon />}> Documentation </MenuItem>
          <MenuItem icon={<AddTaskIcon />}> Calendar </MenuItem>
        </Menu>
      </Sidebar>
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  display: flex;
  height: 100vh;
`;

interface ComponentProps {
  isColapsed: boolean;
}

const ButtonColapseContainer = styled.div<ComponentProps>`
  background-color: ${(props) => (props.isColapsed ? '#999' : '#999')};
  justify-content: ${(props) => (props.isColapsed ? 'flex-end' : 'space-between')};
  height: 50px;
  display: flex;
  align-items: center;
`;
