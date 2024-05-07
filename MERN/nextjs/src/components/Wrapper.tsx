'use client';
import theme from '@/configs/theme.config';
import store from '@/utilities/redux/store/index.store';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';

export default function Wrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </Provider>
  );
}
