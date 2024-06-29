/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 15:42:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-29 17:39:31
 * @FilePath       : UsersService.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.database.services.mysql;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.david.server.database.models.mysql.UsersEntity;
import com.david.server.database.repositories.mysql.UsersRepository;
import com.david.server.dtos.request.CreateUserRequestDto;
import com.david.server.dtos.request.LoginUserRequestDto;
import com.david.server.dtos.response.CreateUserResponseDto;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UsersService {
  @Autowired
  private UsersRepository usersRepository;

  public String registerUser(CreateUserRequestDto createUserRequestDto) {
    try {
      usersRepository.registerUser(createUserRequestDto.getId(), createUserRequestDto.getEmail(),
          createUserRequestDto.getFirstName(), createUserRequestDto.getLastName());
    } catch (Exception e) {
      // TODO: handle exception
      log.error("We got an error: {}", e.getMessage());
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
    }

    return "User registered successfully";
  }

  public CreateUserResponseDto loginUser(LoginUserRequestDto loginUserRequestDto) {
    UsersEntity user = usersRepository.findUserByEmail(loginUserRequestDto.getEmail());

    if (user == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND,
          "User not found with your email");
    }

    CreateUserResponseDto response = new CreateUserResponseDto();
    response.setAccessToken(user.getEmail());
    response.setRefreshToken(user.getEmail());

    return response;
  }
}
