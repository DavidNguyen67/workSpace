'use client';
import { Button, Popconfirm, Table, TableProps } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
import { UserEntity } from '@/utility/class';
import ModalUpdateUser from '@/components/Modal/ModalUpdateUser';
import useUser from '@/hook/useUser';
import { CreateUserDto } from '@/utility/dto';
import { faker } from '@faker-js/faker';

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserEntity | null>(null);

  const {
    users,
    isFetchingUsers,
    createUser,
    isCreatingUser,
    deleteUser,
    isDeletingUser,
    isAbortAble,
    handleAbortQueriesMutation,
  } = useUser({
    limit: 30,
    offset: 0,
  });

  const handleSelectUpdateUser = useCallback((record: UserEntity) => {
    setSelectedUser(record);
    setIsModalVisible(true);
  }, []);

  const handleDeleteUser = useCallback(
    async (record: UserEntity) => {
      try {
        deleteUser(record);
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    },
    [deleteUser]
  );

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
              <Button
                loading={isDeletingUser}
                danger
              >
                Delete
              </Button>
            </Popconfirm>
          </>
        ),
      },
    ],
    []
  );

  const handleGenerateAnUser = useCallback(async () => {
    try {
      const payload: CreateUserDto = {
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        id: faker.string.uuid(),
        lastName: faker.person.lastName(),
      };
      const response = createUser(payload);
      console.log(response);
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  }, [createUser]);

  return (
    <>
      <Button
        type='primary'
        onClick={handleGenerateAnUser}
        loading={isCreatingUser}
      >
        Generate a user
      </Button>
      <Button
        danger
        disabled={!isAbortAble}
        onClick={handleAbortQueriesMutation}
      >
        Abort query
      </Button>
      {users && users?.length > 0 && (
        <>
          <Table
            columns={columns}
            dataSource={users}
            rowKey={'id'}
            loading={isFetchingUsers || isCreatingUser}
            size='small'
            sticky
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
