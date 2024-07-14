/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-07-07 20:50:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-14 12:00:59
 * @FilePath       : KeycloakService.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.database.service;

import lombok.extern.slf4j.Slf4j;

import javax.ws.rs.core.Response;

import org.apache.http.HttpStatus;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.david.server.dto.request.CreateUserKeycloakDto;

@Service
@Slf4j
public class KeycloakService {
  @Value("${keycloak.auth-server-url}")
  private String serverURL;

  @Value("${keycloak.realm}")
  private String realm;

  @Value("${keycloak.resource}")
  private String clientID;

  @Value("${keycloak.credentials.secret}")
  private String clientSecret;

  @Value("${keycloak.credentials.secret}")
  private String secret;

  @Value("${admin-user}")
  private String userName;

  @Value("${admin-password}")
  private String password;

  public void createUser(CreateUserKeycloakDto createUserKeycloakDto) {
    UserRepresentation user = new UserRepresentation();

    user.setEnabled(true);
    user.setUsername(createUserKeycloakDto.getUsername());
    user.setFirstName(createUserKeycloakDto.getFirstName());
    user.setLastName(createUserKeycloakDto.getLastName());
    user.setEmail(createUserKeycloakDto.getEmail());

    log.info("Start create");
    Response response = getKeycloakResource().realm(realm).users().create(user);
    log.info("Create done");

    if (response.getStatus() == HttpStatus.SC_CREATED) {
      log.info("Created an user successfully");
      String userId = CreatedResponseUtil.getCreatedId(response);

      CredentialRepresentation passwordCred = new CredentialRepresentation();
      passwordCred.setTemporary(false);
      passwordCred.setType(CredentialRepresentation.PASSWORD);
      passwordCred.setValue(createUserKeycloakDto.getPassword());

      UserResource userResource = getKeycloakResource().realm(realm).users().get(userId);
      userResource.resetPassword(passwordCred);
    } else {
      log.error("Failed to create user. Status: {} Response: {}", response.getStatus(), response.getStatusInfo());
      throw new RuntimeException("Failed to create user");
    }
  }

  public Keycloak getKeycloakResource() {
    return Keycloak.getInstance(serverURL, realm, userName, password, clientID, clientSecret);
  }

}