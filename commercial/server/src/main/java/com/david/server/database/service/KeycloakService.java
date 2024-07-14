/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-07-07 20:50:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-14 19:52:59
 * @FilePath       : KeycloakService.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.database.service;

import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.ws.rs.core.Response;

import org.apache.http.HttpStatus;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.david.server.dto.request.CreateUserKeycloakDto;

@Service
@Slf4j
public class KeycloakService {

  @Value("${keycloak.realm}")
  private String realm;

  private Keycloak keycloak;

  public KeycloakService(Keycloak keycloak) {
    this.keycloak = keycloak;
  }

  public void createUser(CreateUserKeycloakDto createUserKeycloakDto) {
    log.info("Step 1");

    UserRepresentation user = new UserRepresentation();
    user.setEnabled(true);
    user.setEmail(createUserKeycloakDto.getEmail());
    user.setFirstName(createUserKeycloakDto.getFirstName());
    user.setLastName(createUserKeycloakDto.getLastName());
    user.setEmailVerified(false);

    CredentialRepresentation credentialRepresentation = new CredentialRepresentation();
    credentialRepresentation.setValue(createUserKeycloakDto.getPassword());
    credentialRepresentation.setTemporary(false);
    credentialRepresentation.setType(CredentialRepresentation.PASSWORD);

    List<CredentialRepresentation> list = new ArrayList<>();
    list.add(credentialRepresentation);
    user.setCredentials(list);

    log.info("Step 2");

    UsersResource usersResource = getUsersResource();

    log.info("Step 3");

    Response response = usersResource.create(user);

    log.info("Step 4");

    if (Objects.equals(HttpStatus.SC_CREATED, response.getStatus())) {
      log.info("Created");
    } else {
      log.info("Failed");
    }

  }

  private UsersResource getUsersResource() {
    RealmResource realm1 = keycloak.realm(realm);
    return realm1.users();
  }

}