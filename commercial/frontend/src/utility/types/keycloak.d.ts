/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-07-11 21:51:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-11 22:02:54
 * @FilePath       : keycloak.d.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

type KeycloakResponse = {
  access_token?: string;
  expires_in?: number;
  'not-before-policy'?: number;
  refresh_expires_in?: number;
  refresh_token?: string;
  scope?: string;
  session_state?: string;
  token_type?: string;
};
