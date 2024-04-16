import axios from 'axios';
import { BASE_URL_API } from '../constants/constant-api';

const instance = axios.create({
  baseURL: BASE_URL_API,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data ?? response;
  },
  function (error) {
    return error.response ?? error;
  }
);

export default instance;
