/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-29 19:32:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-07 18:02:49
 * @FilePath       : loginUser.service.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import { UserService } from '.';
import { AxiosRequestConfig } from 'axios';
import instance from '../../lib/axios.lib';
import { LoginUserDto } from '../../utility/dto';
import { API_LOGIN_USER } from '../../utility/constant';

export async function loginUser(
  this: UserService,
  payload: LoginUserDto,
  config?: AxiosRequestConfig<unknown>
): Promise<number | null> {
  return await instance.post(API_LOGIN_USER, payload, config);
}
