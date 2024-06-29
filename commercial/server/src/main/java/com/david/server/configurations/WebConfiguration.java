/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-29 21:16:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-29 21:16:21
 * @FilePath       : WebConfiguration.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.configurations;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfiguration implements WebMvcConfigurer {
  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**");
  }
}
