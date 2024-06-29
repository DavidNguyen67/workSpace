/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-29 19:32:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-29 21:28:26
 * @FilePath       : generateUser.service.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import { CreateUserDto } from '@/utility/dto';
import { UserService } from '.';
import { AxiosRequestConfig } from 'axios';
import instance from '@/config/axios.config';
import { API_REGISTER_USER } from '@/utility/constant';

export async function generateUser(
  this: UserService,
  payload: CreateUserDto,
  config?: AxiosRequestConfig<any>
): Promise<string | null> {
  return await instance.post(API_REGISTER_USER, payload, config);
}
