/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 15:07:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-01 09:38:16
 * @FilePath       : RolesEntity.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.database.model.mysql;

import lombok.Data;
import lombok.EqualsAndHashCode;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "roles")
@Data
@EqualsAndHashCode(callSuper = true)
public class RolesEntity extends BaseEntity {
  @Column(nullable = false)
  private String name;

}
