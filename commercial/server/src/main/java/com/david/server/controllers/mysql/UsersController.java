/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 19:30:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-23 00:42:01
 * @CopyRight      : Con chù chù 🥴🥴
**/

package com.david.server.controllers.mysql;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.david.server.database.services.mysql.RolesService;
import com.david.server.database.services.mysql.UsersService;

/**
 * REST controller for managing User entities.
 * This controller provides endpoints to interact with user data.
 */
@RestController
@RequestMapping("users")
public class UsersController {

  /**
   * The service used to manage user data.
   */
  @Autowired
  private UsersService usersService;
  @Autowired
  private RolesService rolesService;

  /**
   * Endpoint to get a list of users.
   *
   * @return A JSON array of user names.
   */
  @GetMapping
  public String list() {
    return "[\"Joe\", \"Peter\"]";
  }
}
