/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 15:42:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-30 22:42:08
 * @FilePath       : UsersService.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.database.services.mysql;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.david.server.database.models.mysql.UsersEntity;
import com.david.server.database.repositories.mysql.UsersRepository;
import com.david.server.dtos.request.CreateUserRequestDto;
import com.david.server.dtos.request.DeleteUserRequestDto;
import com.david.server.dtos.request.ListUserRequestDto;
import com.david.server.dtos.request.LoginUserRequestDto;
import com.david.server.dtos.request.UpdateUserRequestDto;
import com.david.server.dtos.response.CreateUserResponseDto;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UsersService {
  @Autowired
  private UsersRepository usersRepository;

  public String registerUser(CreateUserRequestDto createUserRequestDto) {
    this.usersRepository.registerUser(createUserRequestDto.getId(), createUserRequestDto.getEmail(),
        createUserRequestDto.getFirstName(), createUserRequestDto.getLastName());

    return "User registered successfully";
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

  public void deleteUser(DeleteUserRequestDto deleteUserRequestDto) {
    this.usersRepository.deleteUser(deleteUserRequestDto.getId());
    log.info("Check id: {}", deleteUserRequestDto.getId());
  }

  public void updateUser(UpdateUserRequestDto updateUserRequestDto) {
    this.usersRepository.updateUser(updateUserRequestDto.getEmail(), updateUserRequestDto.getFirstName(),
        updateUserRequestDto.getLastName(), updateUserRequestDto.getActive(), updateUserRequestDto.getId());
    log.info("Check getId: {}", updateUserRequestDto.getId());
    log.info("Check getEmail: {}", updateUserRequestDto.getEmail());
    log.info("Check getFirstName: {}", updateUserRequestDto.getFirstName());
    log.info("Check getLastName: {}", updateUserRequestDto.getLastName());
    log.info("Check getActive: {}", updateUserRequestDto.getActive());

  }
}
