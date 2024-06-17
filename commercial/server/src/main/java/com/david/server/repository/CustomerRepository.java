package com.david.server.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.david.server.dao.CustomerDAO;

public interface CustomerRepository extends MongoRepository<CustomerDAO, String> {
  public CustomerDAO findByFirstName(String firstName);

  public List<CustomerDAO> findByLastName(String lastName);
}
