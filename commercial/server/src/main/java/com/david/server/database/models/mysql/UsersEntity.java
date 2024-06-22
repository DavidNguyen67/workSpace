/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 14:56:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-22 17:55:41
 * @CopyRight      : Con chù chù 🥴🥴
**/

package com.david.server.database.models.mysql;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.util.*;

@Entity
@Table(name = "users")
@Data
@EqualsAndHashCode(callSuper = true)
public class UsersEntity extends BaseEntity {
  @Column(unique = true)
  private String email;

  @Column(unique = true)
  private String firstName;

  @Column(unique = true)
  private String lastName;

  @Column()
  private boolean active = true;

  @ManyToMany(cascade = { CascadeType.ALL })
  @JoinTable(name = "user_roles", joinColumns = { @JoinColumn(name = "user_id") }, inverseJoinColumns = {
      @JoinColumn(name = "role_id") })
  Set<RolesEntity> roles = new HashSet<>();
}
