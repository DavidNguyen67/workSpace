/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-29 19:32:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-12 23:31:13
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
    username: payload.username,
    password: payload.password,
    client_id: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
    grant_type: 'password',
    client_secret: import.meta.env.VITE_KEYCLOAK_CLIENT_SECRET,
    ...(payload.refresh_token && { refresh_token: payload.refresh_token }),
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
