/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-29 10:58:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-01 09:29:10
 * @FilePath       : GlobalException.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.exception;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import lombok.extern.slf4j.Slf4j;

@ControllerAdvice
@Slf4j
public class GlobalException extends ResponseEntityExceptionHandler {
  @Override
  protected ResponseEntity<Object> handleExceptionInternal(Exception ex, Object obj, HttpHeaders headers,
      HttpStatusCode status, WebRequest request) {
    log.error("Global exception", ex);
    return new ResponseEntity<>("An unexpected error occurred: " +
        ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<Object> handleAllExceptions(Exception ex, WebRequest request) {
    return new ResponseEntity<>("All exceptions: " + ex.getMessage(), new HttpHeaders(),
        HttpStatus.INTERNAL_SERVER_ERROR);
  }

}