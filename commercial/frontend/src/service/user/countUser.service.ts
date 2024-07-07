/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-29 19:32:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-07 18:03:54
 * @FilePath       : countUser.service.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import { UserService } from '.';
import { AxiosRequestConfig } from 'axios';
import { API_COUNT_USER } from '../../utility/constant';
import instance from '../../lib/axios.lib';

export async function countUser(
  this: UserService,
  config?: AxiosRequestConfig<unknown>
): Promise<number | null> {
  return await instance.get(API_COUNT_USER, config);
}
