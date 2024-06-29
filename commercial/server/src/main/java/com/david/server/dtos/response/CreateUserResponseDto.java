/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-29 09:57:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-29 09:58:00
 * @FilePath       : CreateUserResponseDto.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.dtos.response;

import lombok.Data;

@Data
public class CreateUserResponseDto {
  private String accessToken;

  private String refreshToken;
}
