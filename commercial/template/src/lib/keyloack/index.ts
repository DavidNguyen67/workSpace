/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-07-05 16:51:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-05 16:58:58
 * @FilePath       : index.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import Keycloak from 'keycloak-js';

const keycloakClient = new Keycloak({
  url: 'http://keycloak-server/auth',
  realm: 'myrealm',
  clientId: process.env.NEXT_PUBLIC_KEYCLOAC_CLIENT_ID || '',
});

export default keycloakClient;
