/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-07-07 17:33:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-07 17:33:27
 * @FilePath       : keycloak.lib.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import Keycloak from 'keycloak-js';
import keycloakConfig from '../config/keycloak.config';

const authInstance = new Keycloak(keycloakConfig);

export default authInstance;
