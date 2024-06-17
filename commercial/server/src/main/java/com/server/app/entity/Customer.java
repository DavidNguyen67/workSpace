/*
 * @file            commercial/server/src/main/java/com/server/app/entity/Customer.java
 * @author          David Nguyễn <139251794+DavidNguyen67@users.noreply.github.com>
 * @createTime      2024-06-16 23:10:27
 * @lastModified    2024-06-17 19:09:00
 * Copyright ©Facenet All rights reserved
*/

package com.server.app.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Customer {

  @Id
  public String id;

  public String firstName;
  public String lastName;

  public Customer() {
  }

  public Customer(String firstName, String lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  @Override
  public String toString() {
    return String.format(
        "Customer[id=%s, firstName='%s', lastName='%s']",
        id, firstName, lastName);
  }

}