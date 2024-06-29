/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 15:42:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-29 10:53:33
 * @FilePath       : UsersService.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.database.services.mysql;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.david.server.database.models.mysql.UsersEntity;
import com.david.server.database.repositories.mysql.UsersRepository;
import com.david.server.dtos.request.CreateUserRequestDto;
import com.david.server.dtos.request.LoginUserRequestDto;
import com.david.server.dtos.response.CreateUserResponseDto;

@Service
public class UsersService {
  @Autowired
  private UsersRepository usersRepository;

  public String registerUser(CreateUserRequestDto createUserRequestDto) {
    usersRepository.registerUser(createUserRequestDto.getId(), createUserRequestDto.getEmail(),
        createUserRequestDto.getFirstName(), createUserRequestDto.getLastName());

    return "Oke";
  }

  public CreateUserResponseDto loginUser(LoginUserRequestDto loginUserRequestDto) {
    UsersEntity user = usersRepository.loginUser(loginUserRequestDto.getEmail());

    CreateUserResponseDto response = new CreateUserResponseDto();
    response.setAccessToken(user.getEmail());
    response.setRefreshToken(user.getEmail());

    return response;
  }
}
