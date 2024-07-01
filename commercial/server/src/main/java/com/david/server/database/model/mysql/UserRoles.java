/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-07-01 09:33:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-01 09:53:45
 * @FilePath       : UserRoles.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.database.model.mysql;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "user_roles")
@Data
@EqualsAndHashCode(callSuper = true)
public class UserRoles extends BaseEntity {
  @Column(name = "user_id")
  private UUID userId;

  @Column(name = "role_id")
  private UUID roleId;
}
