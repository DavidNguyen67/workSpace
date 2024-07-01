/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 14:56:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-01 23:23:31
 * @FilePath       : UsersEntity.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.database.model.mysql;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "users")
@Data
@EqualsAndHashCode(callSuper = true)
public class UsersEntity extends BaseEntity {

  @Column(unique = true)
  private String email;

  @Column(name = "first_name", nullable = false, unique = false)
  private String firstName;

  @Column(name = "last_name", nullable = false, unique = false)
  private String lastName;

  @Column(columnDefinition = "boolean default true")
  private Boolean active;

}
