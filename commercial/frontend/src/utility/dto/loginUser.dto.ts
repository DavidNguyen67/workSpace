/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-07-04 23:44:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-12 23:28:33
 * @FilePath       : loginUser.dto.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

export interface LoginUserDto {
  client_id?: string;
  username: string;
  password: string;
  grant_type: 'password' | 'refresh_token' | 'authorization_code';
  refresh_token?: string;
  client_secret?: string;
}