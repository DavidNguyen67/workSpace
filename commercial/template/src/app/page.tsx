'use client';
import {
  useCountUsersQuery,
  useGetUsersQuery,
  useRegisterUsesMutation,
} from '@/redux/asyncSlice/userApi.slice';
import { CreateUserDto } from '@/utility/dto';
import { Button, Table, TableColumnsType, TableProps } from 'antd';
import React, { useCallback, useMemo } from 'react';
import { faker } from '@faker-js/faker';
import { UserEntity } from '@/utility/class';

const Home = () => {
  const { data } = useGetUsersQuery({
    offset: 0,
    limit: 30,
  });
  const { data: count } = useCountUsersQuery(undefined, {
    pollingInterval: 3000,
  });

  // Define the columns for the table
  const columns: TableProps<UserEntity>['columns'] = useMemo(
    () => [
      {
        title: '#',
        dataIndex: 'index',
        render: (text, record, index) => index + 1,
        width: 15, // Thiết lập chiều rộng cho cột số thứ tự
        align: 'center',
        fixed: 'left',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        width: 200, // Thiết lập chiều rộng cho cột email
      },
      {
        title: 'Name',
        dataIndex: 'name',
        render: (text, record) => `${record.firstName} ${record.lastName}`,
        width: 150, // Thiết lập chiều rộng cho cột tên
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

  console.log(count);

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
    </>
  );
};

export default Home;
