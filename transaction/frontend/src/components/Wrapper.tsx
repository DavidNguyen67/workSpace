'use client';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

interface WrapperProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {},
});

const Wrapper = ({ children }: Readonly<WrapperProps>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AntdRegistry>{children}</AntdRegistry>
    </QueryClientProvider>
  );
};

export default Wrapper;
