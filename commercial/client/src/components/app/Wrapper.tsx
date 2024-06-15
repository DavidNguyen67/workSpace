'use client';
import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Provider } from 'react-redux';
import { store } from '@/redux/stores';

const Wrapper = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <AntdRegistry>
      <Provider store={store}>{children}</Provider>
    </AntdRegistry>
  );
};

export default Wrapper;
