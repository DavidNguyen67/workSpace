/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-29 10:40:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-01 09:28:29
 * @FilePath       : UsersController.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.controller.mysql;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.david.server.database.model.mysql.UsersEntity;
import com.david.server.database.service.mysql.UsersService;
import com.david.server.dto.request.CreateUserRequestDto;
import com.david.server.dto.request.DeleteUserRequestDto;
import com.david.server.dto.request.ListUserRequestDto;
import com.david.server.dto.request.LoginUserRequestDto;
import com.david.server.dto.request.UpdateUserRequestDto;
import com.david.server.dto.response.CreateUserResponseDto;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

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

  @GetMapping("list")
  public List<UsersEntity> getMethodName(@RequestParam("offset") Integer offset,
      @RequestParam("limit") Integer limit) {
    ListUserRequestDto listUserRequestDto = new ListUserRequestDto(limit, offset);
    return this.usersService.listUser(listUserRequestDto);
  }

  @GetMapping("count")
  public Integer countUsers() {
    return this.usersService.countUsers();
  }

  @DeleteMapping("delete")
  public String deleteUser(@RequestParam("id") UUID _id) {
    DeleteUserRequestDto deleteUserRequestDto = new DeleteUserRequestDto(_id);
    this.usersService.deleteUser(deleteUserRequestDto);
    return "Delete user successfully";
  }

  @PutMapping("update")
  public String updateUser(@Valid @RequestBody UpdateUserRequestDto updateUserRequestDto) {
    this.usersService.updateUser(updateUserRequestDto);
    return "Update user successfully";
  }
}
