'use client';
import {
  useGetUsersQuery,
  useRegisterUsesMutation,
} from '@/redux/asyncSlice/userApi.slice';
import { CreateUserDto } from '@/utility/dto';
import { Button, Pagination, Table, TableProps } from 'antd';
import React, { useCallback, useMemo } from 'react';
import { faker } from '@faker-js/faker';
import { UserEntity } from '@/utility/class';

const Home = () => {
  const { data } = useGetUsersQuery({
    offset: 20,
    skip: 0,
  });
  const columns: TableProps<UserEntity>['columns'] = useMemo(
    () => [
      {
        title: 'email',
        dataIndex: 'email',
      },
      {
        title: 'firstName',
        dataIndex: 'firstName',
      },
      {
        title: 'lastName',
        dataIndex: 'lastName',
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

      const result = await addUser(payload).unwrap();
      console.log('User added:', result);
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  }, [addUser]);

  console.log('data:', data);

  return (
    <>
      <Button
        type='primary'
        onClick={handleGenerateAnUser}
        loading={isLoading}
      >
        Generate a user
      </Button>
      {data && data?.length > 0 && (
        <>
          <Table
            columns={columns}
            dataSource={data}
            rowKey={'email'}
            loading={isLoading}
            size='small'
            sticky
            pagination={{
              defaultPageSize: 5,
              pageSizeOptions: [10, 20, 50, 100],
            }}
          />
        </>
      )}
    </>
  );
};

export default Home;
