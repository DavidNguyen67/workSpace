package com.server.server;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class HelloController {
  @GetMapping("/hello")
  public String requestMethodName() {
    return "hello";
  }

}
