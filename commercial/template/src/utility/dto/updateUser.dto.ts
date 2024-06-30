/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-30 21:30:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-30 21:31:28
 * @FilePath       : updateUser.dto.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

export interface UpdateUserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  active: boolean;
}
