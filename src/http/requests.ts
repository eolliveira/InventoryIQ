import axios, { AxiosRequestConfig } from 'axios';
import { getAuthData } from '../utils/LocalStorage';

export const BASE_URL = 'http://192.168.0.105:8080';
export const VERSION = '1.0'

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
    if (error.response.status === 401) {
      window.location.href = '/login';
      console.log("codigo de resposta 401");
            
    }

    if (error.response.status === 403) {
      //window.location.href = '/dashboard';
      console.log("codigo de resposta 403");
    }

    return Promise.reject(error);
  }
);