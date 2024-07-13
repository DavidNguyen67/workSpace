/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-07-07 20:50:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-13 14:11:32
 * @FilePath       : KeycloakService.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.database.service;

import lombok.extern.slf4j.Slf4j;

import javax.ws.rs.core.Response;

import org.apache.http.HttpStatus;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.david.server.dto.request.CreateUserKeycloakDto;
import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.admin.client.KeycloakBuilder;

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
    UserRepresentation userRepresentation = new UserRepresentation();

    userRepresentation.setUsername(createUserKeycloakDto.getUsername());
    userRepresentation.setFirstName(createUserKeycloakDto.getFirstName());
    userRepresentation.setLastName(createUserKeycloakDto.getLastName());
    userRepresentation.setEmail(createUserKeycloakDto.getEmail());

    log.info("Start create");
    Response response = getRealm().users().create(userRepresentation);
    log.info("Create done");

    if (response.getStatus() == HttpStatus.SC_CREATED) {
      log.info("Created an user successfully");
      String userId = CreatedResponseUtil.getCreatedId(response);

      // Set password
      CredentialRepresentation passwordCred = new CredentialRepresentation();
      passwordCred.setTemporary(false);
      passwordCred.setType(CredentialRepresentation.PASSWORD);
      passwordCred.setValue(createUserKeycloakDto.getPassword());

      UserResource userResource = getRealm().users().get(userId);
      userResource.resetPassword(passwordCred);
    } else {
      log.error("Failed to create user. Status: {} Response: {}", response.getStatus(), response.getStatusInfo());
      throw new RuntimeException("Failed to create user");
    }
  }

  public Keycloak getAdminKeycloakUser() {
    return KeycloakBuilder
        .builder()
        .serverUrl(serverURL)
        .realm(realm)
        .username(userName)
        .password(password)
        .clientId(clientID)
        .clientSecret(clientSecret)
        .resteasyClient(new ResteasyClientBuilder().connectionPoolSize(20).build())
        .build();
  }

  public RealmResource getRealm() {
    return getAdminKeycloakUser().realm(realm);
  }
}