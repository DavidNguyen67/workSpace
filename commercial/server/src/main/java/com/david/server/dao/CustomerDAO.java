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
