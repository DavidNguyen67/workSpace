/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-29 19:32:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-01 23:48:32
 * @FilePath       : deleteUser.service.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import { DeleteUserDto } from '@/utility/dto';
import { UserService } from '.';
import { AxiosRequestConfig } from 'axios';
import instance from '@/config/axios.config';
import { API_DELETE_USER } from '@/utility/constant';

export async function deleteUser(
  this: UserService,
  payload: DeleteUserDto,
  config?: AxiosRequestConfig<any>
): Promise<number | null> {
  return await instance.delete(`${API_DELETE_USER}?id=${payload.id}`, config);
}
