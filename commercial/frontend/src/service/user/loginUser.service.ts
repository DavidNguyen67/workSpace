/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-29 19:32:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-11 22:37:13
 * @FilePath       : loginUser.service.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import { UserService } from '.';
import { AxiosRequestConfig } from 'axios';
import { LoginUserDto } from '../../utility/dto';
import instance from '../../lib/axios/axios.lib';

export async function loginUser(
  this: UserService,
  payload: LoginUserDto,
  config?: AxiosRequestConfig<unknown>
): Promise<KeycloakResponse | null> {
  const params = new URLSearchParams({
    client_id: payload.client_id,
    grant_type: payload.grant_type,
    ...(payload.password && { password: payload.password }),
    ...(payload.refresh_token && { refresh_token: payload.refresh_token }),
    ...(payload.username && { username: payload.username }),
  });

  const response = await instance.post(
    import.meta.env.VITE_KEYCLOAK_URL,
    params,
    {
      ...config,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  return response.data ?? response;
}
