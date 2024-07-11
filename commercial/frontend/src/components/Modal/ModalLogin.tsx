import React, { useCallback, useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { LoginUserDto } from '../../utility/dto';
import userService from '../../service/user';
import { useAppDispatch } from '../../lib/redux';
import { setUserToken } from '../../lib/redux/user.slice';

interface ModalLoginProps {
  isModalVisible: boolean;
  setIsModalVisible: (value: React.SetStateAction<boolean>) => void;
}

const ModalLogin: React.FC<ModalLoginProps> = ({
  isModalVisible = false,
  setIsModalVisible = () => {},
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<LoginUserDto>();

  const dispatch = useAppDispatch();

  const handleLogin = useCallback(
    async (values: LoginUserDto) => {
      setLoading(true);
      try {
        const response = await userService.loginUser({
          ...values,
          client_id: 'david',
          grant_type: 'password',
        });

        dispatch(
          setUserToken({
            access_token: response?.access_token,
            refresh_token: response?.refresh_token,
          })
        );

        setIsModalVisible(false); // Đóng modal sau khi đăng nhập thành công
      } catch (error) {
        console.error('Login failed:', error);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, setIsModalVisible]
  );

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  }, [setIsModalVisible]);

  return (
    <Modal
      title='Đăng nhập'
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        form={form}
        layout='vertical'
        name='loginForm'
        onFinish={handleLogin}
      >
        <Form.Item
          name='username'
          label='username'
          rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='password'
          label='Mật khẩu'
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            loading={loading}
            style={{ width: '100%' }}
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalLogin;
