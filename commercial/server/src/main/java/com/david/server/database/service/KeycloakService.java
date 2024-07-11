/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-07-07 20:50:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-11 21:12:18
 * @FilePath       : KeycloakService.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.database.service;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.representations.AccessTokenResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class KeycloakService {
  @Value("${spring.security.oauth2.client.provider.keycloak.issuer-uri}")
  private String authServerUrl;

  @Value("${keycloak.realm}")
  private String realm;

  @Value("${spring.security.oauth2.client.registration.keycloak.client-id}")
  private String clientId;

  public AccessTokenResponse login(String username, String password) {
    log.info("Check authServerUrl: {}", authServerUrl);
    log.info("Check realm: {}", realm);
    log.info("Check clientId: {}", clientId);
    log.info("Check username: {}", username);
    log.info("Check password: {}", password);

    log.info("Start login");

    Keycloak keycloak = KeycloakBuilder.builder()
        .serverUrl(authServerUrl)
        .realm(realm)
        .clientId(clientId)
        .username(username)
        .password(password)
        .grantType("password")
        .build();

    return keycloak.tokenManager().getAccessToken();
  }
}
