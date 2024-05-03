'use client';
import store from '@/utilities/redux/store/index.store';
import { ChakraProvider, Container } from '@chakra-ui/react';
import { Provider } from 'react-redux';

export default function Wrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Container
          maxW="xl"
          centerContent
        >
          {children}
        </Container>
      </ChakraProvider>
    </Provider>
  );
}
