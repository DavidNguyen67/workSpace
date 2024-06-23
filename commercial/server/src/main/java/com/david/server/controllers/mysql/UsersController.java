/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 19:30:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-23 18:03:53
 * @CopyRight      : Con chù chù 🥴🥴
**/

package com.david.server.controllers.mysql;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller for managing User entities.
 * This controller provides endpoints to interact with user data.
 */
@RestController()
@RequestMapping("users")
public class UsersController {
  @GetMapping
  public String list() {
    return "[\"Joe\", \"Peter\"]";
  }
}
