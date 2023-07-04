import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
  sidebarClasses,
} from 'react-pro-sidebar';
import { ButtonColapseContainer, SidebarContainer } from './style';
import MenuIcon from '@mui/icons-material/Menu';
import DevicesIcon from '@mui/icons-material/Devices';
import { Link, useLocation } from 'react-router-dom';
import SpeedIcon from '@mui/icons-material/Speed';
import { NavLink } from 'react-router-dom';
import DescriptionIcon from '@mui/icons-material/Description';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import IconButton from '@mui/material/IconButton';
import Logo from '../../assets/img/logo2.gif';
import SettingsIcon from '@mui/icons-material/Settings';
import Divider from '@mui/material/Divider';
export default function MenuSidebar() {
  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
    useProSidebar();

  const location = useLocation();

  return (
    <SidebarContainer>
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: 'rgb(255, 255, 255)',
          },
        }}
      >
        <Menu
          menuItemStyles={{
            icon: ({ active, open }) => ({
              scale: active ? '1.1' : '1.0',
              color: '#4d4d4d',
            }),
            button: ({ level, active, disabled }) => {
              ///menu interno
              if (level === 1)
                return {
                  color: '#4d4d4d',
                  fontWeight: active ? 'bold' : 'normal',
                  backgroundColor: active ? '#f5df4ea6' : 'rgb(255, 255, 255)',
                  fontSize: '12px',
                  '&:hover': {
                    backgroundColor: '#f5df4e57',
                  },
                };

              //menu externo
              if (level === 0)
                return {
                  color: '#4d4d4d',
                  fontSize: '14px',
                  backgroundColor: active ? '#f5df4ea6' : 'rgb(255, 255, 255)',
                  fontWeight: active ? 'bold' : 'normal',
                  '&:hover': {
                    backgroundColor: '#f5df4e57',
                  },
                };
            },
          }}
        >
          <ButtonColapseContainer
            style={{ backgroundColor: '#F5DE41', height: 64 }}
            iscollapsed={`${collapsed}`}
          >
            {!collapsed ? (
              <img
                style={{ marginRight: '15px' }}
                width={'150px'}
                src={Logo}
                alt="Logo"
              />
            ) : (
              ''
            )}

            {collapsed ? (
              <IconButton
                size="large"
                edge="end"
                aria-label="menu"
                sx={{ mr: 2 }}
                color="primary"
                onClick={() => collapseSidebar()}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <IconButton
                disableFocusRipple
                aria-label="delete"
                size="large"
                sx={{ mr: 2 }}
                color="primary"
                onClick={() => collapseSidebar()}
              >
                <ArrowBackIosNewIcon fontSize="small" />
              </IconButton>
            )}
          </ButtonColapseContainer>
          <MenuItem
            style={{
              margin: '10px 10px 0px 10px',
              padding: 12,
              borderRadius: 10,
            }}
            active={location.pathname.startsWith('/dashboard')}
            component={<Link to={'/dashboard'} />}
            icon={<SpeedIcon />}
          >
            Dashboard
          </MenuItem>
          <SubMenu
            style={{
              margin: '10px 10px 0px 10px',
              padding: 12,
              borderRadius: 10,
            }}
            icon={<DevicesIcon />}
            label="Ativos"
          >
            <MenuItem
              style={{
                margin: '10px 10px 0px 10px',
                borderRadius: 10,
              }}
              active={location.pathname.startsWith('/workstation')}
              component={<NavLink to={'/workstation'} />}
            >
              Estação de trabalho
            </MenuItem>
            <MenuItem
              style={{
                margin: '10px 10px 0px 10px',
                borderRadius: 10,
              }}
              active={location.pathname.startsWith('/printer')}
              component={<NavLink to={'/printer'} />}
            >
              Impressora
            </MenuItem>
            <MenuItem
              style={{
                margin: '10px 10px 0px 10px',
                borderRadius: 10,
              }}
              active={location.pathname.startsWith('/mobile')}
              component={<NavLink to={'/mobile'} />}
            >
              Mobile
            </MenuItem>
            <MenuItem
              style={{
                margin: '10px 10px 0px 10px',
                borderRadius: 10,
              }}
              active={location.pathname.startsWith('/nobreak')}
              component={<NavLink to={'/nobreak'} />}
            >
              Nobreak
            </MenuItem>
          </SubMenu>
          <MenuItem
            style={{
              margin: '10px 10px 10px 10px',
              padding: 12,
              borderRadius: 10,
            }}
            icon={<DescriptionIcon />}
            active={location.pathname.startsWith('/license')}
            component={<Link to={'/license'} />}
          >
            Licenças
          </MenuItem>
          <Divider variant="middle" color="gray" />
          <SubMenu
            style={{
              margin: '10px 10px 0px 10px',
              padding: 12,
              borderRadius: 10,
            }}
            icon={<SettingsIcon />}
            label="Configurações"
          >
            <MenuItem
              style={{
                margin: '10px 10px 0px 10px',
                borderRadius: 10,
              }}
              active={location.pathname.startsWith('/register')}
              component={<NavLink to={'/register'} />}
            >
              Cadastro
            </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </SidebarContainer>
  );
}
