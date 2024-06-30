/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-29 19:32:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-30 11:41:08
 * @FilePath       : countUser.service.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import { CreateUserDto } from '@/utility/dto';
import { UserService } from '.';
import { AxiosRequestConfig } from 'axios';
import instance from '@/config/axios.config';
import { API_COUNT_USER } from '@/utility/constant';

export async function countUser(
  this: UserService,
  config?: AxiosRequestConfig<any>
): Promise<number | null> {
  return await instance.get(API_COUNT_USER, config);
}
