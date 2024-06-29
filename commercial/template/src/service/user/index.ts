/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-29 19:30:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-29 21:26:34
 * @FilePath       : index.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import { generateUser } from './generateUser.service';
import { listUsers } from './listUsers.service';

export class UserService {
  public readonly generateUser = generateUser;

  public readonly listUsers = listUsers;
}

const userService = new UserService();

export default userService;
