/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-07-07 20:50:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-12 23:23:13
 * @FilePath       : KeycloakService.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.database.service;

import lombok.extern.slf4j.Slf4j;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
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

  public Integer registerUser(CreateUserKeycloakDto createUserKeycloakDto) {
    Keycloak adminKeycloak = getAdminKeycloak();
    CredentialRepresentation cr = new CredentialRepresentation();
    cr.setType(OAuth2Constants.PASSWORD);
    cr.setValue(createUserKeycloakDto.getPassword());

    UserRepresentation userRepresentation = new UserRepresentation();
    userRepresentation.setUsername(createUserKeycloakDto.getUsername());
    userRepresentation.setCredentials(Collections.singletonList(cr));
    userRepresentation.setEnabled(true);

    adminKeycloak.realm(realm).users().create(userRepresentation);
    List<UserRepresentation> userList = adminKeycloak.realm(realm).users().search(createUserKeycloakDto.getUsername())
        .stream()
        .filter(userRep -> userRep.getUsername().equals(createUserKeycloakDto.getUsername()))
        .collect(Collectors.toList());
    userRepresentation = userList.get(0);
    log.info("User with id: " + userRepresentation.getId() + " created");

    // UsersResource usersResource =
    // this.keycloakAdminClient.realm(this.realm).users();
    // CredentialRepresentation credentialRepresentation =
    // createPasswordCredentials(createUserKeycloakDto.getPassword());

    // UserRepresentation user = new UserRepresentation();
    // user.setUsername(createUserKeycloakDto.getUsername());
    // user.setEmail(createUserKeycloakDto.getEmail());
    // user.setFirstName(createUserKeycloakDto.getFirstName());
    // user.setLastName(createUserKeycloakDto.getLastName());
    // user.singleAttribute("phoneNumber", createUserKeycloakDto.getPhoneNumber());
    // user.setCredentials(Collections.singletonList(credentialRepresentation));

    // log.info("Check this.realm: {}", this.realm);

    // log.info("Check value username: {}, email: {}, firstName: {}, lastName: {},
    // phoneNumber: {}",
    // user.getUsername(), user.getEmail(), user.getFirstName(), user.getLastName(),
    // user.firstAttribute("phoneNumber"));

    // try (Response response = usersResource.create(user)) {
    // if (response.getStatus() == HttpStatus.SC_CREATED) {
    // System.out.println("Created");
    // return 1;
    // } else {
    // System.out.println(response.getStatus());
    // return 0;
    // }
    // } catch (Exception e) {
    // throw new InternalError(e);
    // }
    return 1;
  }

  private Keycloak getAdminKeycloak() {
    return KeycloakBuilder.builder().serverUrl(serverURL)
        .realm(realm)
        .clientId(clientID)
        .username(userName)
        .password(password)
        .grantType("password")
        .clientSecret(secret)
        .resteasyClient(
            new ResteasyClientBuilder()
                .connectionPoolSize(10).build())
        .build();
  }
}