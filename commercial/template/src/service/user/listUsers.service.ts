/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-29 21:07:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-29 22:33:34
 * @FilePath       : listUsers.service.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import { UserEntity } from '@/utility/class';
import { UserService } from '.';
import instance from '@/config/axios.config';
import { API_LIST_USER } from '@/utility/constant';
import { AxiosRequestConfig } from 'axios';
import { ListUserDto } from '@/utility/dto/listUser.dto';

export async function listUsers(
  this: UserService,
  payload: ListUserDto,
  config?: AxiosRequestConfig<any>
): Promise<UserEntity[] | null> {
  return instance.get(
    `${API_LIST_USER}?offset=${payload.offset}&skip=${payload.skip}`,
    config
  );
}
