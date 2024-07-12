/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-07-11 23:19:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-12 23:04:18
 * @FilePath       : KeycloakConfig.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

// package com.david.server.config;

// import org.keycloak.OAuth2Constants;
// import org.keycloak.adapters.KeycloakConfigResolver;
// import org.keycloak.adapters.springboot.KeycloakSpringBootConfigResolver;
// import org.keycloak.adapters.springsecurity.KeycloakConfiguration;
// import org.keycloak.admin.client.Keycloak;
// import org.keycloak.admin.client.KeycloakBuilder;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;

// @Configuration
// @KeycloakConfiguration
// public class KeycloakConfig {

//   @Value("${keycloak.auth-server-url}")
//   public String serverURL;
//   @Value("${keycloak.realm}")
//   public String realm;
//   @Value("${keycloak.resource}")
//   public String clientID;
//   @Value("${keycloak.credentials.secret}")
//   public String clientSecret;

//   @Bean
//   public Keycloak keycloak() {
//     return KeycloakBuilder.builder()
//         .realm(realm)
//         .serverUrl(serverURL)
//         .clientId(clientID)
//         .clientSecret(clientSecret)
//         .grantType(OAuth2Constants.CLIENT_CREDENTIALS)
//         .build();
//   }

//   @Bean
//   public KeycloakConfigResolver keycloakConfigResolver() {
//     return new KeycloakSpringBootConfigResolver();
//   }
// }
