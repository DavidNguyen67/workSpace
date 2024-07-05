'use client';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { useMemo } from 'react';
import React from 'react';
import Container from './Container';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from '@/lib/keycloak.lib';

interface WrapperProps {
  children: React.ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5000,
            gcTime: 5000,
            retry: (failureCount, error) => {
              return failureCount < 5;
            },
          },
          mutations: {
            retry(failureCount, error) {
              return failureCount < 3;
            },
          },
        },
      }),
    []
  );

  return (
    // <ReactKeycloakProvider authClient={keycloak}>
    <QueryClientProvider client={queryClient}>
      <AntdRegistry>
        <Container>{children}</Container>
      </AntdRegistry>
    </QueryClientProvider>
    // </ReactKeycloakProvider>
  );
}
