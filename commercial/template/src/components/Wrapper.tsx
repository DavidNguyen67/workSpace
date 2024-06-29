'use client';
import { AppStore, makeStore } from '@/redux';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { useRef } from 'react';
import { Provider } from 'react-redux';

interface WrapperProps {
  children: React.ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <AntdRegistry>{children}</AntdRegistry>
    </Provider>
  );
}
