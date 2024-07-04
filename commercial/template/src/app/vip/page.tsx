'use client';
import useUser from '@/hook/useUser';
import React from 'react';

const Vip = () => {
  const { users } = useUser({
    limit: 30,
    offset: 0,
  });

  return <>{JSON.stringify(users)}</>;
};

export default Vip;
