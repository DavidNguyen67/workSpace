/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 15:42:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-13 13:40:15
 * @FilePath       : UsersService.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.database.service.mysql;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;

import com.david.server.database.model.mysql.UsersEntity;
import com.david.server.database.repository.mysql.UsersRepository;
import com.david.server.database.service.KeycloakService;
import com.david.server.dto.request.CreateUserKeycloakDto;
import com.david.server.dto.request.DeleteUserRequestDto;
import com.david.server.dto.request.ListUserRequestDto;
import com.david.server.dto.request.LoginUserRequestDto;
import com.david.server.dto.request.UpdateUserRequestDto;
import com.david.server.dto.response.CreateUserResponseDto;

@Service
public class UsersService {
  @Autowired
  private UsersRepository usersRepository;

  @Autowired
  private KeycloakService keycloakService;

  public ResponseEntity<String> createUser(@RequestBody CreateUserKeycloakDto createUserKeycloakDto) {
    try {
      keycloakService.createUser(createUserKeycloakDto);
      return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
  }

  public CreateUserResponseDto loginUser(LoginUserRequestDto loginUserRequestDto) {
    UsersEntity user = this.usersRepository.findUserByEmail(loginUserRequestDto.getEmail());

    if (user == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND,
          "User not found with your email");
    }

    CreateUserResponseDto response = new CreateUserResponseDto();
    response.setAccessToken(user.getEmail());
    response.setRefreshToken(user.getEmail());

    return response;
  }

  public List<UsersEntity> listUser(ListUserRequestDto listUserRequestDto) {
    List<UsersEntity> users = this.usersRepository.listUsers(listUserRequestDto.getLimit(),
        listUserRequestDto.getOffset());

    if (users.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND,
          "Users not found");
    }
    return users;
  }

  public Integer countUsers() {
    Integer total = this.usersRepository.countUsers();
    return total;
  }

  public Integer deleteUser(DeleteUserRequestDto deleteUserRequestDto) {
    return this.usersRepository.deleteUser(deleteUserRequestDto.getId());
  }

  public Integer updateUser(String _id, UpdateUserRequestDto updateUserRequestDto) {
    return this.usersRepository.updateUser(updateUserRequestDto.getEmail(), updateUserRequestDto.getFirstName(),
        updateUserRequestDto.getLastName(), updateUserRequestDto.getActive(), _id);

  }
}
