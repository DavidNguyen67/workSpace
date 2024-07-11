/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-29 19:32:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-11 22:30:22
 * @FilePath       : generateUser.service.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import { UserService } from '.';
import { AxiosRequestConfig } from 'axios';
import { CreateUserDto } from '../../utility/dto';
import { API_REGISTER_USER } from '../../utility/constant';
import instance from '../../lib/axios/axios.lib';

export async function generateUser(
  this: UserService,
  payload: CreateUserDto,
  config?: AxiosRequestConfig<unknown>
): Promise<number | null> {
  return await instance.post(
    import.meta.env.VITE_SPRING_BOOT_BASE_URL + API_REGISTER_USER,
    payload,
    config
  );
}
