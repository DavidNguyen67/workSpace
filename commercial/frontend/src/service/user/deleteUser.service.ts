/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-29 19:32:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-11 22:30:15
 * @FilePath       : deleteUser.service.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import { UserService } from '.';
import { AxiosRequestConfig } from 'axios';
import { DeleteUserDto } from '../../utility/dto';
import instance from '../../lib/axios/axios.lib';
import { API_DELETE_USER } from '../../utility/constant';

export async function deleteUser(
  this: UserService,
  payload: DeleteUserDto,
  config?: AxiosRequestConfig<unknown>
): Promise<number | null> {
  return await instance.delete(
    `${import.meta.env.VITE_SPRING_BOOT_BASE_URL + API_DELETE_USER}?id=${
      payload.id
    }`,
    config
  );
}
