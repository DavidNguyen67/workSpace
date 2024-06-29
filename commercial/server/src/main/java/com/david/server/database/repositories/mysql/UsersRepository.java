/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 15:40:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-29 23:04:00
 * @FilePath       : UsersRepository.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.database.repositories.mysql;

import java.util.List;

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
  @Query(value = "INSERT INTO users (id, email, first_name, last_name) VALUES (:id, :email, :first_name, :last_name)", nativeQuery = true)
  @Transactional
  void registerUser(@Param("id") String id, @Param("email") String email, @Param("first_name") String first_name,
      @Param("last_name") String last_name);

  @Query(value = "SELECT * FROM users WHERE email LIKE :email", nativeQuery = true)
  UsersEntity findUserByEmail(@Param("email") String email);

  @Query(value = "SELECT * FROM users LIMIT :limitParam, :offsetParam", nativeQuery = true)
  List<UsersEntity> listUsers(@Param("limitParam") Integer limitParam, @Param("offsetParam") Integer offsetParam);
}
