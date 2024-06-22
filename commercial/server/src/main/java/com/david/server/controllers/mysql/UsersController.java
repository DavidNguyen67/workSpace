/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 18:13:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-22 18:43:06
 * @CopyRight      : Con chù chù 🥴🥴
**/

package com.david.server.controllers.mysql;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.david.server.database.services.mysql.UsersService;

@RestController(value = "users")
public class UsersController {
  @Autowired
  private UsersService usersService;

  @GetMapping(value = "/")
  public String list() {
    return "[\"Joe\", \"Peter\"]";
  }
}
