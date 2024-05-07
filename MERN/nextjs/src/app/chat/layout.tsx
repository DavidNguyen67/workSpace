'use client';
import { useAppSelector } from '@/utilities/redux/store/index.store';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { info, token } = useAppSelector((state) => state.user);
  const route = useRouter();

  useEffect(() => {
    if (!(info && token)) {
      route.push('/');
      return;
    }
  }, [info]);

  return <>{children}</>;
}
