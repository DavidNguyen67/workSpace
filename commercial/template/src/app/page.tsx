'use client';
import {
  useCountUsersQuery,
  useDeleteUserMutation,
  useGetUsersQuery,
  useRegisterUsesMutation,
} from '@/redux/asyncSlice/userApi.slice';
import { CreateUserDto } from '@/utility/dto';
import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Table,
  TableProps,
  Checkbox,
} from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { faker } from '@faker-js/faker';
import { UserEntity } from '@/utility/class';
import { API_TIME_POLLING } from '@/utility/constant';
import ModalUpdateUser from '@/components/Modal/ModalUpdateUser';

let promise: any;

const Home = () => {
  const { data } = useGetUsersQuery({
    offset: 0,
    limit: 30,
  });
  const [deleteUser, {}] = useDeleteUserMutation();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserEntity | null>(null);

  const handleDeleteUser = useCallback(
    async (record: UserEntity) => {
      try {
        if (promise) {
          promise.abort();
          promise = null;
        }

        promise = deleteUser({ id: record.id });
        await promise.unwrap();

        console.log('User delete:', promise);
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    },
    [deleteUser]
  );

  const handleSelectUpdateUser = useCallback((record: UserEntity) => {
    setSelectedUser(record);
    setIsModalVisible(true);
  }, []);

  const columns: TableProps<UserEntity>['columns'] = useMemo(
    () => [
      {
        title: '#',
        dataIndex: 'index',
        render: (text, record, index) => index + 1,
        width: 50, // Thiết lập chiều rộng cho cột số thứ tự
        align: 'center',
        fixed: 'left',
      },
      {
        title: 'Email',
        dataIndex: 'email',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        render: (text, record) => `${record.firstName} ${record.lastName}`,
      },
      {
        title: 'Action',
        render: (_, record) => (
          <>
            <Button
              type='primary'
              onClick={() => handleSelectUpdateUser(record)}
              style={{ marginRight: 8 }}
            >
              Cập nhật
            </Button>
            <Popconfirm
              title='Delete the task'
              description='Are you sure to delete this task?'
              onConfirm={() => handleDeleteUser(record)}
              onCancel={() => {}}
              okText='Yes'
              cancelText='No'
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </>
        ),
      },
    ],
    []
  );

  const [addUser, { isLoading, error }] = useRegisterUsesMutation();

  const handleGenerateAnUser = useCallback(async () => {
    try {
      const payload: CreateUserDto = {
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        id: faker.string.uuid(),
        lastName: faker.person.lastName(),
      };

      if (promise) {
        promise.abort();
        promise = null;
      }

      promise = addUser(payload);
      await promise.unwrap();

      console.log('User added:', promise);
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  }, [addUser]);

  const handleAbortQuery = useCallback(() => {
    promise.abort();
    promise = null;
  }, []);

  useEffect(() => {
    return () => {
      if (promise) {
        promise.abort();
        promise = null;
      }
    };
  }, []);

  return (
    <>
      <Button
        type='primary'
        onClick={handleGenerateAnUser}
        // loading={isLoading}
      >
        Generate a user
      </Button>
      <Button
        danger
        disabled={!promise}
        onClick={handleAbortQuery}
      >
        Abort query
      </Button>
      {data && data?.length > 0 && (
        <>
          <Table
            columns={columns}
            dataSource={data}
            rowKey={'id'}
            loading={isLoading}
            size='small'
            sticky
            // pagination={{
            //   defaultPageSize: 5,
            //   pageSizeOptions: [10, 20, 50, 100],
            // }}
            bordered
          />
        </>
      )}
      <ModalUpdateUser
        data={selectedUser}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
};

export default Home;
