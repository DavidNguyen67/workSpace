/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 15:42:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-22 18:00:08
 * @CopyRight      : Con chù chù 🥴🥴
**/

package com.david.server.database.services.mysql;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.david.server.database.repositories.mysql.UsersRepository;

@Service
public class UsersService {
  @Autowired
  private UsersRepository usersRepository;

}
