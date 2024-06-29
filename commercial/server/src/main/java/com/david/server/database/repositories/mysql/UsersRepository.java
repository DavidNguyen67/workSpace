/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 15:40:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-29 14:51:43
 * @FilePath       : UsersRepository.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.database.repositories.mysql;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.david.server.database.models.mysql.UsersEntity;

import jakarta.transaction.Transactional;

@Repository
public interface UsersRepository extends JpaRepository<UsersEntity, String> {

  @Modifying
  @Query(value = "INSERT INTO users (id, email, firstName, lastName) VALUES (:id, :email, :firstName, :lastName)", nativeQuery = true)
  @Transactional
  void registerUser(@Param("id") String id, @Param("email") String email, @Param("firstName") String firstName,
      @Param("lastName") String lastName);

  @Query(value = "SELECT * FROM users WHERE email LIKE :email", nativeQuery = true)
  UsersEntity findUserByEmail(@Param("email") String email);

}
