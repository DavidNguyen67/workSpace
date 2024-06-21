'use client';
import React, { useRef } from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Provider } from 'react-redux';
import { AppStore, makeStore } from '@/redux/stores';

const Wrapper = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return (
    <AntdRegistry>
      <Provider store={storeRef.current}>{children}</Provider>
    </AntdRegistry>
  );
};

export default Wrapper;
