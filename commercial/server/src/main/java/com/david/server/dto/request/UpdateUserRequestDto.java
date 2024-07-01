/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-30 21:35:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-01 22:22:47
 * @FilePath       : UpdateUserRequestDto.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateUserRequestDto {
  @NotEmpty
  @Email
  private String email;

  @NotEmpty
  private String firstName;

  @NotEmpty
  private String lastName;

  @NotNull
  private Boolean active;
}
