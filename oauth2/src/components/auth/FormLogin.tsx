import { Button, Dropdown, Form, Input, Space, Typography } from 'antd';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, gitProvider } from '@/config/firebase.config';
import React, { useCallback } from 'react';
import GoogleSvg from '@/utilities/assets/svg/Google.svg';
import GithubSvg from '@/utilities/assets/svg/Github.svg';
import Icon from '@ant-design/icons';
import { isMobilePhone } from 'validator';

type FieldType = {
  phoneNumber?: string;
};

type CustomIconComponentProps = Parameters<typeof Icon>[0];

const GoogleIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon
    component={GoogleSvg}
    {...props}
  />
);

const GithubIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon
    component={GithubSvg}
    {...props}
  />
);

interface FormLoginProps {
  title: string;
  toggleModal: boolean;
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function FormLogin({
  setToggleModal,
  title,
  toggleModal,
}: Readonly<FormLoginProps>) {
  const onFinish = useCallback((values: FieldType) => {
    console.log('Success:', values);
  }, []);

  const onFinishFailed = useCallback((errorInfo: any) => {
    console.log('Failed:', errorInfo);
  }, []);

  const handleLoginByGoogle = useCallback(() => {
    signInWithPopup(auth, googleProvider).catch((error) => {
      console.error(error);
    });
  }, []);

  const handleLoginByGithub = useCallback(() => {
    signInWithPopup(auth, gitProvider).catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <>
      <Form
        name="basic"
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Typography.Title level={2}>{title}</Typography.Title>

        <Form.Item<FieldType>
          label="Số điện thoại"
          name="phoneNumber"
          rules={[
            { required: true, message: 'Vui lòng nhập số điện thoại!' },
            // {
            //   validator: (_, value) => {
            //     if (isMobilePhone(value, 'vi-VN')) {
            //       return Promise.resolve();
            //     }
            //     return Promise.reject('Vui lòng nhập số điện thoại hợp lệ!');
            //   },
            // },
          ]}
        >
          <Space >
            <Input />
            <Button
              type="primary"
              htmlType="submit"
            >
              Tiếp tục
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <Typography.Text>
        Bằng việc tiếp tục, bạn đã đọc và đồng ý với điều khoản sử dụng và Chính
        sách bảo mật thông tin cá nhân của Tik
      </Typography.Text>
    </>
  );
}

export default FormLogin;
