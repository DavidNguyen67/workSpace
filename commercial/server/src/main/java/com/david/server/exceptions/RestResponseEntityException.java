/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-29 15:01:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-29 15:03:27
 * @FilePath       : RestResponseEntityException.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.exceptions;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

public class RestResponseEntityException extends ResponseEntityExceptionHandler {
  @ExceptionHandler(value = { IllegalArgumentException.class, IllegalStateException.class })
  protected ResponseEntity<Object> handleConflict(
      RuntimeException ex, WebRequest request) {
    String bodyOfResponse = "This should be application specific";
    return handleExceptionInternal(ex, bodyOfResponse,
        new HttpHeaders(), HttpStatus.CONFLICT, request);
  }

  @ExceptionHandler({ AccessDeniedException.class })
  public ResponseEntity<Object> handleAccessDeniedException(
      Exception ex, WebRequest request) {
    return new ResponseEntity<Object>(
        "Access denied message here", new HttpHeaders(), HttpStatus.FORBIDDEN);
  }
}
