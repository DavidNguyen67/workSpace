/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-29 19:32:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-30 22:19:16
 * @FilePath       : updateUser.service.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import { UserService } from '.';
import { AxiosRequestConfig } from 'axios';
import instance from '@/config/axios.config';
import { API_UPDATE_USER } from '@/utility/constant';
import { UpdateUserDto } from '@/utility/dto/updateUser.dto';

export async function updateUser(
  this: UserService,
  payload: UpdateUserDto,
  config?: AxiosRequestConfig<any>
): Promise<string | null> {
  return await instance.put(API_UPDATE_USER, payload, config);
}
