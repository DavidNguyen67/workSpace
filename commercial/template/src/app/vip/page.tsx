'use client';
import { useGetUsersQuery } from '@/redux/asyncSlice/userApi.slice';
import React from 'react';

const Vip = () => {
  const { data } = useGetUsersQuery({
    offset: 0,
    limit: 30,
  });

  return <div>{JSON.stringify(data)}</div>;
};

export default Vip;
