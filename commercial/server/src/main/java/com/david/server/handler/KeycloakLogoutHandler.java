/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-07-06 18:07:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-06 18:23:51
 * @FilePath       : KeycloakLogoutHandler.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.handler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.web.client.RestTemplate;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class KeycloakLogoutHandler extends SecurityContextLogoutHandler {
  private final Logger log = LoggerFactory.getLogger(this.getClass());
  private final RestTemplate restTemplate;

  public KeycloakLogoutHandler(RestTemplate restTemplate) {
    this.restTemplate = restTemplate;
  }

  @Override
  public void logout(HttpServletRequest request, HttpServletResponse response,
      Authentication authentication) {
    super.logout(request, response, authentication);

    propagateLogoutToKeycloak((OidcUser) authentication.getPrincipal());
  }

  private void propagateLogoutToKeycloak(OidcUser user) {

    String endSessionEndpoint = user.getIssuer() + "/protocol/openid-connect/logout";

    UriComponentsBuilder builder = UriComponentsBuilder //
        .fromUriString(endSessionEndpoint) //
        .queryParam("id_token_hint", user.getIdToken().getTokenValue());

    ResponseEntity<String> logoutResponse = restTemplate.getForEntity(builder.toUriString(), String.class);
    if (logoutResponse.getStatusCode().is2xxSuccessful()) {
      log.info("Successfulley logged out in Keycloak");
    } else {
      log.info("Could not propagate logout to Keycloak");
    }
  }
}
