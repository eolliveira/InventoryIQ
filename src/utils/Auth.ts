import jwtDecode from 'jwt-decode';
import { getAuthData } from './LocalStorage';
import { TokenData } from 'types/Authentication/TokenData';
import { Role } from 'types/Authentication/Role';

export const getTokenData = (): TokenData | undefined => {
  try {
    return jwtDecode(getAuthData().access_token) as TokenData;
  } catch (error) {
    return undefined;
  }
};

export const isAuthenticated = (): boolean => {
  const tokenData = getTokenData();
  return tokenData && tokenData?.exp * 1000 > Date.now() ? true : false;
};

export const hasAnyHoles = (roles: Role[]): boolean => {
  if (roles.length === 0) return true;

  const tokenData = getTokenData();
  if (tokenData !== undefined)
    return roles.some((role) => tokenData.authorities.includes(role));
  return false;
};
