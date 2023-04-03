import styled from 'styled-components';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';

import Badge from '@mui/material/Badge';

import NotificationsIcon from '@mui/icons-material/Notifications';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { theme } from '../../style/Theme';
import { black } from 'material-ui/styles/colors';
import { TokenData } from 'types/TokenData';
import { useEffect, useState } from 'react';
import { getTokenData, isAuthenticated, removeAuthData } from '../../http/requests';
import { useNavigate } from 'react-router-dom';

export type AuthData = {
  authenticated: boolean;
  tokenData?: TokenData;
};

export default function Header() {

  const navigate = useNavigate();

  const [authData, setAuthData] = useState<AuthData>({
    authenticated: false,
  });


  const handleLoginClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthData({
      authenticated: false
    });
    navigate('/login')
    //history.replace('/');
  }

  useEffect(() => {
    if (isAuthenticated()) {
      //se estiver autenticado, armazena os dados do token
      setAuthData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthData({
        authenticated: false,
      });
    }
  }, []);


  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    removeAuthData();
    setAuthData({
      authenticated: false
    });
    navigate('/login')
    //history.replace('/');
    setAnchorEl(null);
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: `${theme.colors.white}`, boxShadow: 'none' }} position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: 'black' }}
          >Estações de Trabalho</Typography>
          <div>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              style={{ color: `${theme.colors.black}`}}
            >
              <Badge badgeContent={7} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              style={{ color: `${theme.colors.black}`}}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Box>{authData.tokenData?.user_name}</Box>
              <MenuItem>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Sair</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export const Wrapper = styled.div`
  height: 50px;
  margin-bottom: 10px;
  width: 100%;
  background-color: #2b2222;
`;
