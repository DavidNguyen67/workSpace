/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-07-11 23:19:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-14 17:22:47
 * @FilePath       : KeycloakConfig.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.config;

import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KeycloakConfig {
  @Value("${keycloak.auth-server-url}")
  private String serverURL;

  @Value("${keycloak.realm}")
  private String realm;

  @Value("${keycloak.resource}")
  private String clientID;

  @Value("${keycloak.credentials.secret}")
  private String clientSecret;

  @Value("${admin-user}")
  private String userName;

  @Value("${admin-password}")
  private String password;

  @Bean
  public Keycloak keycloak() {
    return KeycloakBuilder.builder()
        .realm(realm)
        .serverUrl(serverURL)
        .username(userName)
        .password(password)
        .clientId(clientID)
        .clientSecret(clientSecret)
        .grantType(OAuth2Constants.CLIENT_CREDENTIALS)
        .build();
  }

}
