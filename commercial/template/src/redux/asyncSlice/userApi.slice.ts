/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-29 17:44:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-01 23:48:13
 * @FilePath       : userApi.slice.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import axiosBaseQuery from '@/config/axiosBaseQuery.config';
import userService from '@/service/user';
import { UserEntity } from '@/utility/class';
import { CreateUserDto, DeleteUserDto } from '@/utility/dto';
import { ListUserDto } from '@/utility/dto/listUser.dto';
import { UpdateUserDto } from '@/utility/dto/updateUser.dto';
import { QUERY_TAG } from '@/utility/enum/queryTag.enum';
import { createApi } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  baseQuery: axiosBaseQuery(),
  tagTypes: [QUERY_TAG.USER, QUERY_TAG.COUNT_USER],
  endpoints: (build) => ({
    getUsers: build.query<UserEntity[] | null, ListUserDto>({
      queryFn: async (payload, _queryApi, _extraOptions, baseQuery) => {
        const { signal } = _queryApi;

        try {
          const data = await userService.listUsers(payload, { signal });
          return { data };
        } catch (error) {
          return { error };
        }
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
        try {
          const data = await userService.countUser({});
          return { data };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (result, error, arg) => [QUERY_TAG.COUNT_USER],
    }),
    registerUses: build.mutation<number | null, CreateUserDto>({
      queryFn: async (payload, _queryApi, _extraOptions, baseQuery) => {
        const { signal } = _queryApi;

        try {
          const data = await userService.generateUser(payload, { signal });
          return { data };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: [QUERY_TAG.USER, QUERY_TAG.COUNT_USER],
    }),
    deleteUser: build.mutation<number | null, DeleteUserDto>({
      queryFn: async (payload, _queryApi, _extraOptions, baseQuery) => {
        const { signal } = _queryApi;

        try {
          const data = await userService.deleteUser(payload, { signal });
          return { data };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: [QUERY_TAG.USER, QUERY_TAG.COUNT_USER],
    }),
    updateUser: build.mutation<number | null, UpdateUserDto>({
      queryFn: async (payload, _queryApi, _extraOptions, baseQuery) => {
        const { signal } = _queryApi;

        try {
          const data = await userService.updateUser(payload, { signal });
          return { data };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: [QUERY_TAG.USER, QUERY_TAG.COUNT_USER],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUsersQuery,
  useRegisterUsesMutation,
  useCountUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApi;
