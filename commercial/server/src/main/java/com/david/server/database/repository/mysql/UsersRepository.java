/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 15:40:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-01 23:40:55
 * @FilePath       : UsersRepository.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.database.repository.mysql;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.david.server.database.model.mysql.UsersEntity;

import jakarta.transaction.Transactional;

@Repository
public interface UsersRepository extends JpaRepository<UsersEntity, String> {

        @Transactional
        @Modifying(clearAutomatically = true, flushAutomatically = true)
        @Query(value = "INSERT INTO users (id, email, first_name, last_name) VALUES (:id, :email, :first_name, :last_name)", nativeQuery = true)
        Integer registerUser(@Param("id") String id, @Param("email") String email,
                        @Param("first_name") String first_name,
                        @Param("last_name") String last_name);

        @Query(value = "SELECT * FROM users WHERE email LIKE :email", nativeQuery = true)
        UsersEntity findUserByEmail(@Param("email") String email);

        @Query(value = "SELECT * FROM users ORDER BY inserted_at ASC LIMIT :_offset, :_limit", nativeQuery = true)
        List<UsersEntity> listUsers(@Param("_limit") Integer _limit, @Param("_offset") Integer _offset);

        @Query(value = "SELECT COUNT(*) FROM users", nativeQuery = true)
        Integer countUsers();

        @Transactional
        @Modifying(clearAutomatically = true, flushAutomatically = true)
        @Query(value = "DELETE FROM users WHERE id = \":_id\"", nativeQuery = true)
        Integer deleteUser(@Param("_id") String _id);

        @Transactional
        @Modifying(clearAutomatically = true, flushAutomatically = true)
        @Query(value = "UPDATE users u SET u.email = :_email, u.first_name = :_first_name, u.last_name = :_last_name, u.active = :_active WHERE id = \":_id\"", nativeQuery = true)
        Integer updateUser(@Param("_email") String _email, @Param("_first_name") String _first_name,
                        @Param("_last_name") String _last_name,
                        @Param("_active") Boolean _active, @Param("_id") String _id);

}
