/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-29 19:36:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-30 13:43:14
 * @FilePath       : axios.config.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import { API_TIME_OUT } from '@/utility/constant';
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_SPRING_BOOT,
  timeout: API_TIME_OUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
instance.interceptors.request.use(
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
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data ?? response;
  },
  function (error) {
    const { request, response } = error;
    console.log(error);

    if (response) {
      const { message } = response.data;
      const status = response.status;
      return Promise.reject({
        message,
        status,
      });
    } else if (request) {
      // Request sent but no response received
      return Promise.reject({
        message: error.message,
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject({
        message: 'Oops! Something went wrong while setting up the request',
      });
    }
  }
);

export default instance;
