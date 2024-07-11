import { Button, Popconfirm, Table, TableProps } from 'antd';
import { UserEntity } from '../utility/class';
import { useCallback, useMemo, useState } from 'react';
import userService from '../service/user';
import ModalUpdateUser from './Modal/ModalUpdateUser';
import ModalLogin from './Modal/ModalLogin';

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [isLoginModalVisible, setIsLoginModalVisible] =
    useState<boolean>(false);

  const [selectedUser, setSelectedUser] = useState<UserEntity | null>(null);

  const { users, isFetchingUsers, isCreatingUser, deleteUser, isDeletingUser } =
    userService.useUsers({
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

  const handleShowLoginModal = useCallback(() => {
    setIsLoginModalVisible(true);
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
    [handleDeleteUser, handleSelectUpdateUser, isDeletingUser]
  );

  return (
    <>
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
      <ModalLogin
        isModalVisible={isLoginModalVisible}
        setIsModalVisible={setIsLoginModalVisible}
      />
      <Button onClick={handleShowLoginModal}>Login</Button>
    </>
  );
};

export default Home;
