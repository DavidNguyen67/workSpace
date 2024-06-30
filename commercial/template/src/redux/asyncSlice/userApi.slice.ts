/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-29 17:44:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-30 11:53:05
 * @FilePath       : userApi.slice.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import axiosBaseQuery from '@/config/axiosBaseQuery.config';
import userService from '@/service/user';
import { UserEntity } from '@/utility/class';
import { CreateUserDto } from '@/utility/dto';
import { ListUserDto } from '@/utility/dto/listUser.dto';
import { QUERY_TAG } from '@/utility/enum/queryTag.enum';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  baseQuery: axiosBaseQuery(),
  tagTypes: [QUERY_TAG.USER, QUERY_TAG.COUNT_USER],
  endpoints: (build) => ({
    // query<ReturnType, ArgType>
    getUsers: build.query<UserEntity[] | null, ListUserDto>({
      queryFn: async (payload, _queryApi, _extraOptions, baseQuery) => {
        const data = await userService.listUsers(payload);
        return { data };
      },
      providesTags: (result, error, arg) =>
        result && result?.length > 0
          ? [
              ...result.map(({ id }) => ({
                type: QUERY_TAG.USER as const,
                id,
              })),
              QUERY_TAG.USER,
            ]
          : [QUERY_TAG.USER],
    }),
    countUsers: build.query<number | null, undefined>({
      queryFn: async (_, _queryApi, _extraOptions, baseQuery) => {
        const data = await userService.countUser();
        return { data };
      },
      providesTags: (result, error, arg) => [QUERY_TAG.COUNT_USER],
    }),
    // mutation<ResultType, QueryArg>
    registerUses: build.mutation<string | null, CreateUserDto>({
      queryFn: async (payload, _queryApi, _extraOptions, baseQuery) => {
        const response = await userService.generateUser(payload);
        return { data: response };
      },
      invalidatesTags: [QUERY_TAG.USER, QUERY_TAG.COUNT_USER],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUsersQuery, useRegisterUsesMutation, useCountUsersQuery } =
  userApi;
