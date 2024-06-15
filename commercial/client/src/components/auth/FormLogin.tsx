'use client';
import React, { useCallback } from 'react';
import { Button, Divider, Form, Input, Space, Typography } from 'antd';
import { signInWithPopup } from 'firebase/auth';
import Icon from '@ant-design/icons';
import { auth, gitProvider, googleProvider } from '@/config/firebase.config';
import GoogleSvg from '@/utilities/assets/svg/Google.svg';
import GithubSvg from '@/utilities/assets/svg/Github.svg';
import { isMobilePhone } from 'validator';
import { setToken } from '@/redux/slices/user.slice';
import { useAppDispatch } from '@/redux/stores';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;

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
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormLogin = ({ setIsVisible }: Readonly<FormLoginProps>) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const onFinish = useCallback((values: any) => {
    console.log('Success:', values);
  }, []);

  const onFinishFailed = useCallback((errorInfo: any) => {
    console.log('Failed:', errorInfo);
  }, []);

  const handleLoginByGoogle = useCallback(() => {
    signInWithPopup(auth, googleProvider)
      .then((result: any) => {
        dispatch(
          setToken({
            accessToken: result.user?.accessToken,
            refreshToken: result?._tokenResponse?.refreshToken,
          })
        );
        router.push('/profile');
        setIsVisible(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch, router, setIsVisible]);

  const handleLoginByGithub = useCallback(() => {
    signInWithPopup(auth, gitProvider)
      .then((result: any) => {
        dispatch(
          setToken({
            accessToken: result.user?.accessToken,
            refreshToken: result?._tokenResponse?.refreshToken,
          })
        );
        router.push('/profile');
        setIsVisible(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch, router, setIsVisible]);

  return (
    <>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Title level={2}>
          Xin chào, <br />
          Đăng nhập hoặc Tạo tài khoản
        </Title>

        <Form.Item<FieldType>
          label="Số điện thoại"
          name="phoneNumber"
          rules={[
            { required: true, message: 'Vui lòng nhập số điện thoại!' },
            {
              validator: (_, value) => {
                if (isMobilePhone(value)) {
                  return Promise.resolve();
                }
                return Promise.reject('Vui lòng nhập số điện thoại hợp lệ!');
              },
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
          >
            Tiếp tục
          </Button>
        </Form.Item>
      </Form>

      <Divider>Hoặc</Divider>

      <Space
        direction="vertical"
        style={{ width: '100%' }}
      >
        <Button
          icon={<GoogleIcon />}
          block
          size="large"
          onClick={handleLoginByGoogle}
        >
          Đăng nhập bằng Google
        </Button>
        <Button
          icon={<GithubIcon />}
          block
          size="large"
          onClick={handleLoginByGithub}
        >
          Đăng nhập bằng Github
        </Button>
      </Space>

      <Divider />
      <Text type="secondary">
        Bằng việc tiếp tục, bạn đã đọc và đồng ý với điều khoản sử dụng và Chính
        sách bảo mật thông tin cá nhân của Tik
      </Text>
    </>
  );
};

export default FormLogin;
