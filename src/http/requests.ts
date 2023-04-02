import axios from 'axios';
import qs from 'qs';

export const BASE_URL = 'http://localhost:8080';

export const CLIENT_ID = 'snmpmanager';

export const CLIENT_ID_SECRET = 'snmpmanager123';

type LoginResponse = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  userFirstName: string;
  userId: number;
};

type LoginData = {
  username: string;
  password: string;
};

export const requestBackendLogin = (loginData: LoginData) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_ID_SECRET),
  };

  const data = qs.stringify({
    ...loginData,
    grant_type: 'password',
  });

  return axios({
    method: 'POST',
    baseURL: BASE_URL,
    url: '/oauth/token',
    headers,
    data,
  });
};

export function saveAuthData(obj: LoginResponse) {
  localStorage.setItem('authData', JSON.stringify(obj))
}

export function getAuthData() {
  const str = localStorage.getItem('authData') ?? "{}"
  return JSON.parse(str) as LoginResponse
}

