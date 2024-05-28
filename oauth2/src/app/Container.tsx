'use client';
import React, { useMemo, useState } from 'react';
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, Input, Typography } from 'antd';
import Link from 'next/link';
import ModalAuth from '@/components/modal/ModalCommon';
import FormLogin from '@/components/auth/FormLogin';

const { Title, Text } = Typography;
const { Header, Content, Sider } = Layout;

const App = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [toggleModal, setToggleModal] = useState<boolean>(false);

  const rightMenuItems: MenuProps['items'] = useMemo(
    () => [
      {
        key: 'home',
        icon: <HomeOutlined />,
        label: 'Home',
      },
      {
        key: 'account',
        icon: <UserOutlined />,
        label: (
          <Text
            onClick={() => setToggleModal(!toggleModal)}
            style={{ color: 'white' }}
          >
            Account
          </Text>
        ),
      },
      {
        key: 'cart',
        icon: <ShoppingCartOutlined />,
        label: 'Cart',
      },
    ],
    []
  );

  const items2: MenuProps['items'] = useMemo(
    () =>
      [UserOutlined, LaptopOutlined, NotificationOutlined].map(
        (icon, index) => {
          const key = String(index + 1);

          return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: `subnav ${key}`,

            children: new Array(4).fill(null).map((_, j) => {
              const subKey = index * 4 + j + 1;
              return {
                key: subKey,
                label: `option${subKey}`,
              };
            }),
          };
        }
      ),
    []
  );

  return (
    <Layout style={{ height: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
        }}
      >
        <Title style={{ margin: '0' }}>
          <Link href="/">Tiki</Link>
        </Title>
        <Input.Search
          placeholder="Search products"
          style={{ flex: 1, maxWidth: 600, margin: '0 auto' }}
        />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['home']}
          items={rightMenuItems}
          style={{ display: 'flex' }}
        />
      </Header>
      <Layout>
        <Sider
          style={{
            background: colorBgContainer,
            position: 'sticky',
            top: 64,
            height: 'calc(100vh - 64px)',
          }}
          width={200}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
            items={items2}
          />
        </Sider>
        <Content
          style={{
            padding: '0 24px',
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
      <ModalAuth
        title="Xin chào, Đăng nhập hoặc Tạo tài khoản"
        content={<FormLogin />}
        toggleModal={toggleModal}
        setToggleModal={setToggleModal}
      />
    </Layout>
  );
};

export default App;
