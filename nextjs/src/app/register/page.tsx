'use client';
import React, { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, Typography, notification } from 'antd';
import { IUserRegister } from '@/utilities/interfaces/user.interface';
import { registerUser } from '@/services/user.service';
import { v4 } from 'uuid';
import validator from 'validator';
import { HttpStatusCode } from 'axios';
import { useRouter } from 'next/navigation';

const Register: React.FC = () => {
  const [form] = Form.useForm<IUserRegister>();
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const onFinish: FormProps<IUserRegister>['onFinish'] = async (values) => {
    if (!validator.isAlpha(values.name)) {
      api.error({
        message: 'Name is not have number',
        placement: 'topRight',
      });
      return;
    }
    if (!validator.isEmail(values.email)) {
      api.error({
        message: "That's is an invalid email",
        placement: 'topRight',
      });
      return;
    }
    if (!validator.isStrongPassword(values.password)) {
      api.error({
        message: 'Password is not strong enough',
        placement: 'topRight',
      });
      return;
    }
    if (!(values.passwordConfirm === values.password)) {
      api.error({
        message: 'Password confirm is not the same',
        placement: 'topRight',
      });
      return;
    }

    setIsLoading(true);
    const response: ResponseCustom = await registerUser({
      ...values,
      id: v4(),
    });
    const { statusCode, message } = response;
    if (statusCode === HttpStatusCode.Created) {
      api.success({ message, placement: 'topRight' });
      form.resetFields();
      router.push('/login');
    }
    api.error({ message, placement: 'topRight' });
    setIsLoading(false);
  };

  const onFinishFailed: FormProps<IUserRegister>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      disabled={isLoading}
      form={form}
    >
      {contextHolder}
      <Form.Item<IUserRegister>
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<IUserRegister>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<IUserRegister>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<IUserRegister>
        label="Re enter Password"
        name="passwordConfirm"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
