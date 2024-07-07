/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-29 19:41:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-29 19:43:42
 * @FilePath       : createUser.dto.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

export interface CreateUserDto {
  id: string;

  email: string;

  firstName: string;

  lastName: string;

  active?: boolean;
}
