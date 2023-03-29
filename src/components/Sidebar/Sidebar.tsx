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
import { Button, IconButton, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MenuIcon from '@mui/icons-material/Menu';
import DevicesIcon from '@mui/icons-material/Devices';
import PeopleIcon from '@mui/icons-material/People';
import Divider from '@mui/material/Divider';
import { Link, useLocation } from 'react-router-dom';
import SpeedIcon from '@mui/icons-material/Speed';
import { NavLink } from 'react-router-dom';
import Image from './image.png';
import DescriptionIcon from '@mui/icons-material/Description';
export default function MenuSidebar() {
  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
    useProSidebar();

  const location = useLocation();

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
            icon: ({ active, open }) => ({
              scale: active ? '1.2' : '1.0',
              color: 'black',
            }),
            button: ({ level, active, disabled }) => {
              ///menu interno
              if (level === 1)
                return {
                  color: disabled ? 'black' : 'black',
                  fontWeight: active ? 'bold' : 'normal',
                  backgroundColor: `${theme.colors.primary}`,
                };

              //menu externo(fora)
              if (level === 0)
                return {
                  color: disabled ? 'black' : 'black',
                  fontWeight: active ? 'bold' : 'normal',
                  '&:hover': {},
                };
            },
          }}
        >
          <ButtonColapseContainer isColapsed={collapsed}>
            {!collapsed ? (
              <img
                style={{ marginLeft: '10px' }}
                width={'150px'}
                src={Image}
                alt="Logo"
              />
            ) : (
              ''
            )}

            <Button
              style={{ display: 'flex' }}
              startIcon={
                collapsed ? (
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="menu"
                    sx={{ mr: 0, color: 'black' }}
                  >
                    <MenuIcon />
                  </IconButton>
                ) : (
                  <ArrowBackIosNewIcon style={{ color: 'black' }} />
                )
              }
              onClick={() => collapseSidebar()}
            ></Button>
          </ButtonColapseContainer>
          <Divider color="#161616" />
          <MenuItem
            active={location.pathname === '/dashboard'}
            component={<Link to={'/dashboard'} />}
            icon={<SpeedIcon />}
          >
            Dashboard
          </MenuItem>
          <SubMenu icon={<DevicesIcon />} label="Ativos">
            <MenuItem
              active={location.pathname === '/workstation'}
              component={<NavLink to={'/workstation'} />}
            >
              Estação de trabalho
            </MenuItem>
            <MenuItem
              active={location.pathname === '/mobile'}
              component={<Link to={'/mobile'} />}
            >
              Mobile
            </MenuItem>
            <MenuItem
              active={location.pathname === '/nobreak'}
              component={<Link to={'/nobreak'} />}
            >
              Nobreak
            </MenuItem>
            <MenuItem
              active={location.pathname === '/printer'}
              component={<Link to={'/printer'} />}
            >
              Impressora
            </MenuItem>
          </SubMenu>
          <MenuItem
            icon={<DescriptionIcon />}
            active={location.pathname === '/license'}
            component={<Link to={'/license'} />}
          >
            Licenças
          </MenuItem>
          <MenuItem
            active={location.pathname === '/user'}
            icon={<PeopleIcon />}
            component={<Link to={'/user'} />}
          >
            Usuários
          </MenuItem>
        </Menu>
      </Sidebar>
    </SidebarContainer>
  );
}
