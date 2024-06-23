/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-23 18:21:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-23 18:37:55
 * @CopyRight      : Con chù chù 🥴🥴
**/

package com.david.server.utilities.keycloack;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class KeycloakLogoutHandler implements LogoutHandler {
  private static final Logger logger = LoggerFactory.getLogger(KeycloakLogoutHandler.class);

  private final RestTemplate restTemplate;

  @Autowired
  public KeycloakLogoutHandler(RestTemplateBuilder builder) {
    this.restTemplate = builder.build();
  }

  public KeycloakLogoutHandler(RestTemplate restTemplate) {
    this.restTemplate = restTemplate;
  }

  private void logoutFromKeycloak(OidcUser user) {
    String endSessionEndpoint = user.getIssuer() + "/protocol/openid-connect/logout";
    UriComponentsBuilder builder = UriComponentsBuilder
        .fromUriString(endSessionEndpoint)
        .queryParam("id_token_hint", user.getIdToken().getTokenValue());

    ResponseEntity<String> logoutResponse = restTemplate.getForEntity(
        builder.toUriString(), String.class);
    if (logoutResponse.getStatusCode().is2xxSuccessful()) {
      logger.info("Successfulley logged out from Keycloak");
    } else {
      logger.error("Could not propagate logout to Keycloak");
    }
  }

  @Override
  public void logout(HttpServletRequest request, HttpServletResponse response,
      org.springframework.security.core.Authentication auth) {
    logoutFromKeycloak((OidcUser) auth.getPrincipal());
  }

}