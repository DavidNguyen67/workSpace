'use client';
import { ChakraProvider, Container } from '@chakra-ui/react';

export default function Wrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ChakraProvider>
      <Container
        maxW="xl"
        centerContent
      >
        {children}
      </Container>
    </ChakraProvider>
  );
}
