/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-07-05 22:26:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-06 11:04:35
 * @FilePath       : axios.lib.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import { API_TIME_OUT } from '@/utility/constant';
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SPRING_BOOT_BASE_URL,
  timeout: API_TIME_OUT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default instance;
