/*
 * @file            src/main/java/com/david/server/dao/CustomerDAO.java
 * @author          David Nguyễn <139251794+DavidNguyen67@users.noreply.github.com>
 * @createTime      2024-06-17 20:55:51
 * @lastModified    2024-06-17 20:59:13
 * Copyright ©Quân đẹp trai All rights reserved
*/

package com.david.server.dao;

import org.springframework.data.annotation.Id;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class CustomerDAO {
  @Id
  public String id;

  public String firstName;
  public String lastName;

  public CustomerDAO(String firstName, String lastName) {
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
