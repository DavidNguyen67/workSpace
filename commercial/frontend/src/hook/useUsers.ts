/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-07-04 23:09:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-07 17:58:00
 * @FilePath       : useUsers.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import { useCallback, useEffect, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { UserService } from '../service/user';
import {
  CreateUserDto,
  DeleteUserDto,
  ListUserDto,
  UpdateUserDto,
} from '../utility/dto';
import { QUERY_TAG } from '../utility/enum/queryTag.enum';

/**
 * Custom hook để quản lý các thao tác CRUD cho người dùng.
 *
 * @param {ListUserDto} agrListUser - Tham số truyền vào để lấy danh sách người dùng.
 * @returns {Object} - Trả về các trạng thái và hàm liên quan đến CRUD người dùng.
 */
export function useUsers(this: UserService, agrListUser: ListUserDto) {
  const abortCtrlRef = useRef<AbortController[]>([]);

  /**
   * @Note Abort tất cả các query hoặc mutation đang chạy để ngăn chặn chúng hoàn thành.
   */
  const handleAbortQueriesMutation = useCallback(() => {
    abortCtrlRef.current?.length > 0 &&
      abortCtrlRef.current.forEach((ctrl) => ctrl.abort());
  }, [abortCtrlRef]);

  /**
   * @Note Tạo thêm một signal để đánh dấu api cần huỷ
   */
  const handleCreateNewSignal = useCallback(() => {
    handleAbortQueriesMutation();
    abortCtrlRef.current = [];
    abortCtrlRef.current.push(new AbortController());
  }, [handleAbortQueriesMutation]);

  /**
   * @Note Truy cập vào queryClient để thao tác invalidate query khi cần.
   */
  const queryClient = useQueryClient();

  /**
   * @Note Lấy danh sách người dùng từ server.
   * @returns {Object} - Trả về danh sách người dùng.
   */

  const {
    data: users,
    isLoading: isFetchingUsers,
    isError: isErrorFetchingUsers,
  } = useQuery({
    queryKey: [QUERY_TAG.USER],
    queryFn: () => this.listUsers(agrListUser),
  });

  /**
   * @Note Lấy tổng số lượng người dùng từ server.
   * @returns {number} - Trả về tổng số lượng người dùng.
   */
  const { data: totalUsers } = useQuery({
    queryKey: [QUERY_TAG.COUNT_USER],
    queryFn: this.countUser,
    refetchInterval: 2000,
  });

  /**
   * @Note Thêm người dùng mới.
   * @param {CreateUserDto} payload - Thông tin người dùng cần thêm.
   */
  const { mutate: createUser, isPending: isCreatingUser } = useMutation({
    mutationFn: (payload: CreateUserDto) => {
      handleCreateNewSignal();

      return this.generateUser(payload, {
        signal: abortCtrlRef.current[0].signal,
      });
    },
    onSuccess: (_, body) => {
      // Invalidate và fetch lại query để cập nhật dữ liệu mới.
      message.success(`Thêm ${body.id} thành công`);
      queryClient.invalidateQueries({ queryKey: [QUERY_TAG.COUNT_USER] });
      queryClient.invalidateQueries({ queryKey: [QUERY_TAG.USER] });
    },
    onError: (error, body) => {
      console.log('Check error', error);
      message.error(`Thêm ${body.id} thất bại`);
    },
  });

  /**
   * @Note Cập nhật thông tin người dùng.
   * @param {UpdateUserDto} payload - Thông tin người dùng cần cập nhật.
   */
  const { mutate: updateUser, isPending: isUpdatingUser } = useMutation({
    mutationFn: (payload: UpdateUserDto) => {
      handleCreateNewSignal();

      return this.updateUser(payload, {
        signal: abortCtrlRef.current[0].signal,
      });
    },
    onSuccess: (_, body) => {
      // Invalidate và fetch lại query để cập nhật dữ liệu mới.
      message.success(`Cập nhật ${body.id} thành công`);
      queryClient.invalidateQueries({ queryKey: [QUERY_TAG.USER] });
    },
    onError: (error, body) => {
      console.log('Check error', error);
      message.error(`Cập nhật ${body.id} thất bại`);
    },
  });

  /**
   * @Note Xoá người dùng.
   * @param {DeleteUserDto} payload - Thông tin người dùng cần xoá.
   */
  const { mutate: deleteUser, isPending: isDeletingUser } = useMutation({
    mutationFn: (payload: DeleteUserDto) => {
      handleCreateNewSignal();

      return this.deleteUser(payload, {
        signal: abortCtrlRef.current[0].signal,
      });
    },
    onSuccess: (_, body) => {
      // Invalidate và fetch lại query để cập nhật dữ liệu mới.
      message.success(`Xoá ${body.id} thành công`);
      queryClient.invalidateQueries({ queryKey: [QUERY_TAG.COUNT_USER] });
      queryClient.invalidateQueries({ queryKey: [QUERY_TAG.USER] });
    },
    onError: (error, body) => {
      console.log('Check error', error);
      message.error(`Xoá ${body.id} thất bại`);
    },
  });

  /**
   * @Note Cleanup function để abort tất cả các request đang chạy khi component bị unmount.
   */
  useEffect(() => {
    return () => {
      abortCtrlRef.current?.length > 0 &&
        abortCtrlRef.current.forEach((ctrl) => ctrl.abort());
    };
  }, []);

  return {
    users,
    isFetchingUsers,
    isErrorFetchingUsers,
    totalUsers,
    isCreatingUser,
    isUpdatingUser,
    isDeletingUser,
    createUser,
    updateUser,
    deleteUser,
    handleAbortQueriesMutation,
    isAbortAble: abortCtrlRef.current?.length > 0,
  };
}
