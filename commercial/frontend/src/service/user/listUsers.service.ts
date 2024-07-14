/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-29 21:07:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-11 22:30:26
 * @FilePath       : listUsers.service.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import { UserService } from '.';
import { AxiosRequestConfig } from 'axios';
import { ListUserDto } from '../../utility/dto';
import { UserEntity } from '../../utility/class';
import instance from '../../lib/axios/axios.lib';
import { API_LIST_USER } from '../../utility/constant';

export async function listUsers(
  this: UserService,
  payload: ListUserDto,
  config?: AxiosRequestConfig<unknown>
): Promise<UserEntity[] | null> {
  return instance.get(
    `${import.meta.env.VITE_SPRING_BOOT_BASE_URL + API_LIST_USER}?offset=${
      payload.offset
    }&limit=${payload.limit}`,
    config
  );
}