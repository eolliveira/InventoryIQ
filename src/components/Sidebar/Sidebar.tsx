import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
  sidebarClasses,
} from 'react-pro-sidebar';
import { theme } from '../../style/Theme';
import { ButtonColapseContainer, SidebarContainer } from './Sidebar.style';
import { Button, Typography } from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MenuIcon from '@mui/icons-material/Menu';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DevicesIcon from '@mui/icons-material/Devices';
import PeopleIcon from '@mui/icons-material/People';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import SpeedIcon from '@mui/icons-material/Speed';

export default function MenuSidebar() {
  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
    useProSidebar();

  return (
    <SidebarContainer>
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: `${theme.colors.primary}`,
          },
        }}
      >
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              // only apply styles on first level elements of the tree
              if (level === 1)
                return {
                  color: disabled ? '#b4b4b4' : `${theme.colors.black}`,
                  backgroundColor: !disabled ? '#31313199' : undefined,
                  '&:hover': {
                    backgroundColor: '#9999',
                  },
                };
            },
          }}
        >
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
          <Divider color="#161616" />
          <MenuItem
            component={<Link to={'/dashboard'} />}
            icon={<SpeedIcon />}
          >
            Dashboard
          </MenuItem>
          <SubMenu icon={<DevicesIcon />} label="Ativos">
            <MenuItem component={<Link to={'/workstation'} />}>
              Estação de trabalho
            </MenuItem>
            <MenuItem component={<Link to={'/mobile'} />}>Mobile</MenuItem>
            <MenuItem component={<Link to={'/nobreak'} />}>Nobreak</MenuItem>
            <MenuItem component={<Link to={'/printer'} />}>Impressora</MenuItem>
            <MenuItem component={<Link to={'/license'} />}>Licenças</MenuItem>
          </SubMenu>
          <MenuItem icon={<PeopleIcon />} component={<Link to={'/user'} />}>
            Usuários
          </MenuItem>
        </Menu>
      </Sidebar>
    </SidebarContainer>
  );
}
