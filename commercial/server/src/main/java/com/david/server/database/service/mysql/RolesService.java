/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 15:47:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-01 09:30:59
 * @FilePath       : RolesService.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.database.service.mysql;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.david.server.database.repository.mysql.RolesRepository;

@Service
public class RolesService {
  @Autowired
  private RolesRepository rolesRepository;

}
