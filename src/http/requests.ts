import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { getAuthData } from '../utils/LocalStorage';

//export const BASE_URL = 'http://localhost:8080';
export const BASE_URL = 'http://10.0.5.36:8080';
export const CLIENT_ID = 'snmpmanager';
export const CLIENT_ID_SECRET = 'snmpmanager123';

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

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // if (error.response.status === 401) {
    //   window.location.href = '/login';
    // }

    if (error.response.status === 403) {
      window.location.href = '/dashboard';
    }

    return Promise.reject(error);
  }
);
