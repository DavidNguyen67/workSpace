/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-29 19:30:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-30 21:33:26
 * @FilePath       : index.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import { countUser } from './countUser.service';
import { deleteUser } from './deleteUser.service';
import { generateUser } from './generateUser.service';
import { listUsers } from './listUsers.service';
import { updateUser } from './updateUser.service';

export class UserService {
  public readonly generateUser = generateUser;

  public readonly listUsers = listUsers;

  public readonly countUser = countUser;

  public readonly deleteUser = deleteUser;

  public readonly updateUser = updateUser;
}

const userService = new UserService();

export default userService;
