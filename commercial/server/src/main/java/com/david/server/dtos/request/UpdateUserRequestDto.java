/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-30 21:35:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-30 22:48:15
 * @FilePath       : UpdateUserRequestDto.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.dtos.request;

import org.hibernate.validator.constraints.UUID;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateUserRequestDto {
  @NotEmpty
  @UUID
  private String id;

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
