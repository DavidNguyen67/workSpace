/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-07-06 18:55:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-11 21:06:53
 * @FilePath       : SecurityConfig.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import com.david.server.handler.KeycloakLogoutHandler;

import static org.springframework.security.config.Customizer.withDefaults;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

  private final KeycloakLogoutHandler keycloakLogoutHandler;

  SecurityConfig(KeycloakLogoutHandler keycloakLogoutHandler) {
    this.keycloakLogoutHandler = keycloakLogoutHandler;
  }

  @SuppressWarnings({ "deprecation" })
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .cors(withDefaults())
        .csrf(csrf -> csrf.disable())

        .authorizeRequests(requests -> requests
            .requestMatchers(HttpMethod.OPTIONS, "/users/count").permitAll()
            .requestMatchers(HttpMethod.OPTIONS, "/users/list").permitAll()
            .requestMatchers(HttpMethod.OPTIONS, "/users/login").permitAll()
            .requestMatchers(HttpMethod.OPTIONS, "/users/register").permitAll()
            .anyRequest().permitAll())
        .httpBasic(withDefaults());

    http.oauth2ResourceServer((oauth2) -> oauth2
        .jwt(Customizer.withDefaults()));
    http.oauth2Login(Customizer.withDefaults())
        .logout(logout -> logout.addLogoutHandler(keycloakLogoutHandler).logoutSuccessUrl("/"));

    return http.build();

  }

}
