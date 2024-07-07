/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-29 19:32:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-07 18:02:28
 * @FilePath       : updateUser.service.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import { UserService } from '.';
import { AxiosRequestConfig } from 'axios';
import { UpdateUserDto } from '../../utility/dto';
import instance from '../../lib/axios.lib';
import { API_UPDATE_USER } from '../../utility/constant';

export async function updateUser(
  this: UserService,
  payload: UpdateUserDto,
  config?: AxiosRequestConfig<unknown>
): Promise<number | null> {
  return await instance.put(
    `${API_UPDATE_USER}/${payload.id}`,
    payload,
    config
  );
}
