/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-29 19:32:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-04 23:45:22
 * @FilePath       : loginUser.service.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import { UserService } from '.';
import { AxiosRequestConfig } from 'axios';
import instance from '@/config/axios.config';
import { API_LOGIN_USER } from '@/utility/constant';
import { LoginUserDto } from '@/utility/dto/loginUser.dto';

export async function loginUser(
  this: UserService,
  payload: LoginUserDto,
  config?: AxiosRequestConfig<any>
): Promise<number | null> {
  return await instance.post(API_LOGIN_USER, payload, config);
}
