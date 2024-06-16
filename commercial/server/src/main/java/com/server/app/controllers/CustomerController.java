package com.server.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.server.app.entity.Customer;
import com.server.app.reposistories.CustomerRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/customers")
public class CustomerController {
  @Autowired
  private CustomerRepository customerRepository;

  // Create a new Customer
  @PostMapping
  public Customer createCustomer(@RequestBody Customer customer) {
    return customerRepository.save(customer);
  }

  // Get all Customers
  @GetMapping
  public List<Customer> getAllCustomers() {
    return customerRepository.findAll();
  }

  // Get a Customer by ID
  @GetMapping("/{id}")
  public Optional<Customer> getCustomerById(@PathVariable String id) {
    return customerRepository.findById(id);
  }

  // Delete a Customer
  @DeleteMapping("/{id}")
  public void deleteCustomer(@PathVariable String id) {
    customerRepository.deleteById(id);
  }
}
