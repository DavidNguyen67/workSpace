/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-07-05 22:45:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-05 22:46:35
 * @FilePath       : keycloak.lib.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import keycloakConfig from '@/config/keycloak.config';
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
