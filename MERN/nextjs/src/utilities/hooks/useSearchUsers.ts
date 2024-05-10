'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Hook tùy chỉnh để tìm kiếm người dùng trong một danh sách.
 * @param {User[]} allOfUsers Mảng chứa tất cả người dùng cần tìm kiếm.
 * @param {string} searchText Chuỗi tìm kiếm.
 * @param {string[]} blacklistIds Mảng chứa các id của người dùng cần loại trừ khỏi kết quả tìm kiếm.
 * @returns {Object} Một đối tượng chứa danh sách người dùng đã lọc dựa trên kết quả tìm kiếm và danh sách id cần loại trừ.
 */
const useSearchUsers = (
  allOfUsers: User[],
  searchText: string,
  blacklistIds?: string[]
): { filteredUsers: User[] } => {
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  // Hàm xử lý tìm kiếm người dùng
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
    // Kích hoạt hàm xử lý tìm kiếm khi searchText thay đổi
    handleSearch();
  }, [searchText]);

  // Lọc người dùng theo blacklistIds nếu có
  return {
    filteredUsers: filteredUsers.filter((item) => {
      if (blacklistIds && blacklistIds.includes(item._id)) return;
      return item;
    }),
  };
};

export default useSearchUsers;
