/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 15:42:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-29 14:54:26
 * @FilePath       : UsersService.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.database.services.mysql;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
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
    usersRepository.registerUser(createUserRequestDto.getId(), createUserRequestDto.getEmail(),
        createUserRequestDto.getFirstName(), createUserRequestDto.getLastName());

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
