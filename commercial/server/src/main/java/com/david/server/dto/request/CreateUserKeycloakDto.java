/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-07-12 22:22:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-12 22:35:54
 * @FilePath       : CreateUserKeycloakDto.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.dto.request;

import org.hibernate.validator.constraints.UUID;
import org.keycloak.admin.client.resource.UsersResource;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateUserKeycloakDto {
  @NotEmpty
  @UUID
  private String id;

  @NotEmpty
  private String username;

  @NotEmpty
  @Email
  private String email;

  @NotEmpty
  private String firstName;

  @NotEmpty
  private String lastName;

  @NotEmpty
  private String phoneNumber;

  @NotEmpty
  private String password;

  public UsersResource getKeycloakRoleAsList() {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'getKeycloakRoleAsList'");
  }

}
