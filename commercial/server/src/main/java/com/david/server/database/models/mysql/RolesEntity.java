/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 15:07:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-22 17:54:51
 * @CopyRight      : Con chù chù 🥴🥴
**/

package com.david.server.database.models.mysql;

import lombok.Data;
import lombok.EqualsAndHashCode;
import java.util.*;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;

@Entity
@Table(name = "roles")
@Data
@EqualsAndHashCode(callSuper = true)
public class RolesEntity extends BaseEntity {
  @Column(nullable = false)
  private String name;

  @ManyToMany(cascade = { CascadeType.ALL })
  @JoinTable(name = "user_roles", joinColumns = { @JoinColumn(name = "role_id") }, inverseJoinColumns = {
      @JoinColumn(name = "user_id") })
  Set<UsersEntity> users = new HashSet<>();
}
