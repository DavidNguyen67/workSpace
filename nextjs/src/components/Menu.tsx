'use client';

import React, { useState } from 'react';
import {
  AppstoreOutlined,
  LoginOutlined,
  MailOutlined,
  SettingOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Link from 'next/link';

const items: MenuProps['items'] = [
  {
    label: 'Navigation One',
    key: 'mail',
    icon: <MailOutlined />,
  },
  {
    label: 'Navigation Two',
    key: 'app',
    icon: <AppstoreOutlined />,
    disabled: true,
  },
  {
    label: 'Setting',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'Account',
        children: [
          {
            label: <Link href="/register">Register</Link>,
            key: 'Register',
            icon: <LoginOutlined />,
          },
          {
            label: <Link href="/login">Login</Link>,
            key: 'Login',
            icon: <UserAddOutlined />,
          },
        ],
      },
    ],
  },
];

const Header: React.FC = () => {
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
