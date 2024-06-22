/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 15:47:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-22 19:01:27
 * @CopyRight      : Con chù chù 🥴🥴
**/

package com.david.server.database.services.mysql;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.david.server.database.repositories.mysql.RolesRepository;

@Service
public class RolesService {
  @Autowired
  private RolesRepository rolesRepository;

}
