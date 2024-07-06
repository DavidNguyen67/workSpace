'use client';
import userService from '@/service/user';
import React from 'react';

const Vip = () => {
  const { users } = userService.useUsers({
    limit: 30,
    offset: 0,
  });

  return <>{JSON.stringify(users)}</>;
};

export default Vip;
