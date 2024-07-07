/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-07-05 22:26:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-07 17:56:22
 * @FilePath       : axios.lib.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import axios from 'axios';
import { API_TIME_OUT } from '../utility/constant';

const instance = axios.create({
  baseURL: import.meta.env.VITE_SPRING_BOOT_BASE_URL,
  timeout: API_TIME_OUT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default instance;
