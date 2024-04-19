'use client';

import { store } from '@/redux/store/index.store';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Provider } from 'react-redux';

export default function Wrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AntdRegistry>
      <Provider store={store}>
        <main>{children}</main>
      </Provider>
    </AntdRegistry>
  );
}
