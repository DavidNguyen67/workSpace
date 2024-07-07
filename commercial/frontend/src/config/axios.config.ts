/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-29 19:36:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-07 17:56:47
 * @FilePath       : axios.config.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import { AxiosError } from 'axios';
import instance from '../lib/axios.lib';

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
  function (error: AxiosError) {
    console.log(error);

    return Promise.reject({
      message: 'Oops! Something went wrong while setting up the request',
    });
    // if (response) {
    //   const { message } = response.data;
    //   const status = response.status;
    //   return Promise.reject({
    //     message,
    //     status,
    //   });
    // } else if (request) {
    //   // Request sent but no response received
    //   return Promise.reject({
    //     message: error.message,
    //   });
    // } else {
    //   // Something happened in setting up the request that triggered an Error
    //   return Promise.reject({
    //     message: 'Oops! Something went wrong while setting up the request',
    //   });
    // }
  }
);

export default instance;
