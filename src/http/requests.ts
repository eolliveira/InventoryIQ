import axios, { AxiosRequestConfig } from 'axios';
import { getAuthData } from '../utils/LocalStorage';

export const BASE_URL = 'http://roratushelpdesk.ajrorato.ind.br:8084';

type LoginData = {
  login: string;
  password: string;
};

export const requestBackendLogin = (loginData: LoginData) => {
  return axios({
    method: 'POST',
    baseURL: BASE_URL,
    url: '/auth/login',
    data: loginData
  });
};

export const requestBackend = (config: AxiosRequestConfig) => {
  const headers = config.withCredentials
    ? {
        ...config.headers,
        Authorization: 'Bearer ' + getAuthData().token,
      }
    : config.headers;

  return axios({ ...config, baseURL: BASE_URL, headers });
};

axios.interceptors.response.use(
  function (response) {
    return response;
  },

  function (error) {
    if (error.response.status === 401) { window.location.href = '/login' }
    if (error.response.status === 403) { window.location.href = '/forbidden '}
    return Promise.reject(error);
  }
);