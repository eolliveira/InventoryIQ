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
import { Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

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
            <Button
              style={{ display: 'flex' }}
              startIcon={<MenuIcon />}
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
  isColapsed: boolean
}

const ButtonColapseContainer = styled.div<ComponentProps>`
  background-color: ${props => props.isColapsed ? 'red' : 'blue'};
  display: flex;
 `