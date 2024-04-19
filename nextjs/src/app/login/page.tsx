'use client';
import React, { useEffect } from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { IUserLogin } from '@/utilities/interfaces/user.interface';
import { useAppDispatch, useAppSelector } from '@/redux/store/index.store';
import { connectToServer } from '@/redux/slice/user.slice';
import socketConfig from './../../utilities/configs/socket.config';
import { io } from 'socket.io-client';

const onFinish: FormProps<IUserLogin>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<IUserLogin>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const Login: React.FC = () => {
  // const { socket } = useAppSelector((state) => state.user);
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (!socket)
  //     dispatch(
  //       connectToServer({
  //         url: `${process.env.NEXT_PUBLIC_BASE_URL_WEB_SOCKET}`,
  //         socketConfig,
  //       })
  //     );
  // }, []);

  const socket = io(process.env.NEXT_PUBLIC_BASE_URL_WEB_SOCKET || '');

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<IUserLogin>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<IUserLogin>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<IUserLogin>
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button
          type="primary"
          htmlType="submit"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
