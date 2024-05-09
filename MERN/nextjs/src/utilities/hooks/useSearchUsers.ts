'use client';

import { useCallback, useEffect, useState } from 'react';

const useSearchUsers = (
  allOfUsers: User[],
  searchText: string,
  blacklistIds?: string[]
): { filteredUsers: User[] } => {
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const handleSearch = useCallback(() => {
    if (allOfUsers?.length > 0)
      setFilteredUsers(
        allOfUsers.filter((item) => {
          if (
            item.username.includes(searchText) ||
            item.email.includes(searchText)
          ) {
            return item;
          }
        })
      );
  }, [searchText, allOfUsers]);

  useEffect(() => {
    handleSearch();
  }, [searchText]);

  return {
    filteredUsers: filteredUsers.filter((item) => {
      if (blacklistIds && blacklistIds.includes(item._id)) return;
      return item;
    }),
  };
};

export default useSearchUsers;
