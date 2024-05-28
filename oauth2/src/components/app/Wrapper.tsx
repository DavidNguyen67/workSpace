'use client';
import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';

const Wrapper = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <AntdRegistry>{children}</AntdRegistry>;
};

export default Wrapper;
