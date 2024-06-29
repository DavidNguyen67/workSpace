/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-29 09:32:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-29 10:57:05
 * @FilePath       : CreateUserRequestDto.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.dtos.request;

import org.hibernate.validator.constraints.UUID;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class CreateUserRequestDto {
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
}
