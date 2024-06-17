package com.david.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.david.server.dao.CustomerDAO;
import com.david.server.repository.CustomerRepository;

@SpringBootApplication
public class CustomerService implements CommandLineRunner {
  @Autowired
  private CustomerRepository repository;

  public static void main(String[] args) {
    SpringApplication.run(CustomerService.class, args);
  }

  @Override
  public void run(String... args) throws Exception {

    repository.deleteAll();

    // save a couple of customers
    repository.save(new CustomerDAO("Alice", "Smith"));
    repository.save(new CustomerDAO("Bob", "Smith"));

    // fetch all customers
    System.out.println("Customers found with findAll():");
    System.out.println("-------------------------------");
    for (CustomerDAO customer : repository.findAll()) {
      System.out.println(customer);
    }
    System.out.println();

    // fetch an individual customer
    System.out.println("Customer found with findByFirstName('Alice'):");
    System.out.println("--------------------------------");
    System.out.println(repository.findByFirstName("Alice"));

    System.out.println("Customers found with findByLastName('Smith'):");
    System.out.println("--------------------------------");
    for (CustomerDAO customer : repository.findByLastName("Smith")) {
      System.out.println(customer);
    }

  }
}
