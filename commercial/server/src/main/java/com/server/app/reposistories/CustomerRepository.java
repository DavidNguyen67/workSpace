package com.server.app.reposistories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.server.app.entity.Customer;

public interface CustomerRepository extends MongoRepository<Customer, String> {

  public Customer findByFirstName(String firstName);

  public List<Customer> findByLastName(String lastName);

}