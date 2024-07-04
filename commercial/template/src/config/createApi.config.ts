/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-07-02 21:13:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-02 21:14:15
 * @FilePath       : createApi.config.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import { buildCreateApi, coreModule } from '@reduxjs/toolkit/query';
import { reactHooksModule } from '@reduxjs/toolkit/query/react';

const configuredCreateApi = buildCreateApi(
  coreModule(),
  reactHooksModule({ unstable__sideEffectsInRender: false })
);

export default configuredCreateApi;
