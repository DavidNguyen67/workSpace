/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-07-05 22:26:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-11 22:32:31
 * @FilePath       : axios.lib.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import axios from 'axios';
import { API_TIME_OUT } from '../../utility/constant';

const instance = axios.create({
  timeout: API_TIME_OUT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default instance;
