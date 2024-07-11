/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-29 19:32:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-11 22:30:34
 * @FilePath       : updateUser.service.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import { UserService } from '.';
import { AxiosRequestConfig } from 'axios';
import { UpdateUserDto } from '../../utility/dto';
import { API_UPDATE_USER } from '../../utility/constant';
import instance from '../../lib/axios/axios.lib';

export async function updateUser(
  this: UserService,
  payload: UpdateUserDto,
  config?: AxiosRequestConfig<unknown>
): Promise<number | null> {
  return await instance.put(
    `${import.meta.env.VITE_SPRING_BOOT_BASE_URL + API_UPDATE_USER}/${
      payload.id
    }`,
    payload,
    config
  );
}
