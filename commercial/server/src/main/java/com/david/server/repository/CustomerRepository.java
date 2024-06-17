/*
 * @file            src/main/java/com/david/server/repository/CustomerRepository.java
 * @author          David Nguyễn <139251794+DavidNguyen67@users.noreply.github.com>
 * @createTime      2024-06-17 20:55:51
 * @lastModified    2024-06-17 20:59:38
 * Copyright ©Quân đẹp trai All rights reserved
*/

package com.david.server.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.david.server.dao.CustomerDAO;

public interface CustomerRepository extends MongoRepository<CustomerDAO, String> {
  public CustomerDAO findByFirstName(String firstName);

  public List<CustomerDAO> findByLastName(String lastName);
}
