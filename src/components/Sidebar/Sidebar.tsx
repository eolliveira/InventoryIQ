import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
  sidebarClasses,
} from 'react-pro-sidebar';
import { ButtonColapseContainer, SidebarContainer } from './Sidebar.style';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { Button, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MenuIcon from '@mui/icons-material/Menu';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DevicesIcon from '@mui/icons-material/Devices';
import PeopleIcon from '@mui/icons-material/People';




export default function MenuSidebar() {
  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
    useProSidebar();

  return (
    <SidebarContainer>
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: '#999',
          },
        }}
      >
        <Menu
        menuItemStyles={{
          button: ({ level, active, disabled }) => {
            // only apply styles on first level elements of the tree
            if (level === 1) 
              return {
                color: disabled ? '#b4b4b4' : '#161616',
                backgroundColor: !disabled ? '#31313199' : undefined,
                '&:hover': {
                  backgroundColor: '#9999',
                },
              };
          },
        }}>
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
          <MenuItem icon={<AddTaskIcon />}>Solicitações</MenuItem>
          <SubMenu icon={<DevicesIcon />} label="Ativos">
            <MenuItem>Estação de trabalho</MenuItem>
            <MenuItem>Mobile</MenuItem>
            <MenuItem>Nobreak</MenuItem>
            <MenuItem>Impressora</MenuItem>
            <MenuItem>Licenças</MenuItem>
          </SubMenu>
          <MenuItem icon={<PeopleIcon />}>Usuários</MenuItem>
        </Menu>
      </Sidebar>
    </SidebarContainer>
  );
}

