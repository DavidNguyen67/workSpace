# Hướng Dẫn Xử Lý Lỗi Keycloak và CORS

## Giới thiệu

Khi tích hợp Keycloak vào ứng dụng Spring Boot, bạn có thể gặp vấn đề với CORS (Cross-Origin Resource Sharing). Vấn đề này xảy ra khi frontend và backend chạy trên các domain khác nhau, dẫn đến việc bị chặn các yêu cầu HTTP. Để giải quyết vấn đề này, chúng ta cần cấu hình CORS cho ứng dụng Spring Security.

## Mục tiêu

Hướng dẫn này sẽ giúp bạn xử lý lỗi CORS khi thêm Keycloak vào ứng dụng bằng cách tạo một class cấu hình bảo mật.

## Các bước thực hiện

### 1. Tạo class `SecurityConfig`

Tạo một class mới với tên `SecurityConfig` trong package cấu hình của bạn và thêm annotation `@EnableWebSecurity` và `@Configuration`.

### 2. Cấu hình SecurityFilterChain

Thêm đoạn mã dưới đây vào class `SecurityConfig` để cấu hình bảo mật cho ứng dụng của bạn.

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.preauth.AbstractPreAuthenticatedProcessingFilter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    /*
     * Tên prefix của server bạn nếu có
     * Trong trường hợp này prefix của tôi là `/api/v1` (server.servlet.context-path trong application.properties)
    */
    http
      .authorizeHttpRequests((authorize) -> authorize
          .requestMatchers("/api/v1/*").permitAll()
          .anyRequest().authenticated())
      .csrf(csrf -> csrf.disable())
      .cors(cors -> cors.disable())
      .httpBasic(basic -> basic.disable())
      .sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
      .exceptionHandling((exceptions) -> exceptions
          .authenticationEntryPoint(new BearerTokenAuthenticationEntryPoint())
          .accessDeniedHandler(new BearerTokenAccessDeniedHandler()));

    return http.build();
  }

}
```
