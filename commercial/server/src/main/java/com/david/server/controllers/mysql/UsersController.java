/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-29 10:40:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-29 11:49:24
 * @FilePath       : UsersController.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.controllers.mysql;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.david.server.database.services.mysql.UsersService;
import com.david.server.dtos.request.CreateUserRequestDto;
import com.david.server.dtos.request.LoginUserRequestDto;
import com.david.server.dtos.response.CreateUserResponseDto;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@Slf4j
@RequestMapping("users")
public class UsersController {
  @Autowired
  private UsersService usersService;

  @GetMapping
  public String list() {
    log.trace("A TRACE Message");
    log.debug("A DEBUG Message");
    log.info("An INFO Message");
    log.warn("A WARN Message");
    log.error("An ERROR Message");
    return "[\"Joe\", \"Peter\"]";
  }

  @PostMapping("register")
  public String registerUser(@Valid @RequestBody CreateUserRequestDto createUserRequestDto) {
    return this.usersService.registerUser(createUserRequestDto);
  }

  @PostMapping("login")
  public CreateUserResponseDto loginUser(@Valid @RequestBody LoginUserRequestDto loginUserRequestDto) {
    return this.usersService.loginUser(loginUserRequestDto);
  }
}
