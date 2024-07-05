/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-29 10:40:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-05 20:13:11
 * @FilePath       : UsersController.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.controller.mysql;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("users")
public class UsersController {
  @Autowired
  private UsersService usersService;

  @GetMapping
  public String list() {
    return "[\"Joe\", \"Peter\"]";
  }

  @PostMapping("register")
  public Integer registerUser(@Valid @RequestBody CreateUserRequestDto createUserRequestDto) {
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
  public Integer deleteUser(@RequestParam("id") String _id) {
    DeleteUserRequestDto deleteUserRequestDto = new DeleteUserRequestDto(_id);
    return this.usersService.deleteUser(deleteUserRequestDto);
  }

  @PutMapping("update/{id}")
  public Integer updateUser(@PathVariable("id") String _id,
      @Valid @RequestBody UpdateUserRequestDto updateUserRequestDto) {
    return this.usersService.updateUser(_id, updateUserRequestDto);
  }
}
