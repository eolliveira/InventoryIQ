import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import jwtDecode from 'jwt-decode';
import { TokenData } from 'types/TokenData';

export const BASE_URL = 'http://localhost:8080';

export const CLIENT_ID = 'snmpmanager';

export const CLIENT_ID_SECRET = 'snmpmanager123';


type LoginResponse = {
  access_token: string;
  expires_in: string;
  scope: string;
  token_type: string;
  userFirstName: string;
  userId: string;
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

export const requestBackend = (config: AxiosRequestConfig) => {
  const headers = config.withCredentials
    ? {
        ...config.headers,
        Authorization: 'Bearer ' + getAuthData().access_token,
      }
    : config.headers;

  return axios({ ...config, baseURL: BASE_URL, headers });
};

export function saveAuthData(obj: LoginResponse) {
  localStorage.setItem('authData', JSON.stringify(obj));
}

export function getAuthData() {
  return JSON.parse(localStorage.getItem('authData') ?? '{}') as LoginResponse;
}

export const removeAuthData = () => {
  localStorage.removeItem('authData');
};


export const getTokenData = (): TokenData | undefined => {
  try {
    return jwtDecode(getAuthData().access_token) as TokenData;
  } catch (error) {
    return undefined;
  }
};

//função que identifica se o usuário esta autênticado
export const isAuthenticated = (): boolean => {
  const tokenData = getTokenData();
  return tokenData && tokenData?.exp * 1000 > Date.now() ? true : false;
};


/////

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    //redireciona para tela de login
    if (error.response.status === 401 || 403) {
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);
