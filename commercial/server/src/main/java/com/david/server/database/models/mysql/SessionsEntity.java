/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 22:02:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-22 22:53:13
 * @CopyRight      : Con chù chù 🥴🥴
**/

package com.david.server.database.models.mysql;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "sessions")
@Data
@EqualsAndHashCode(callSuper = true)
public class SessionsEntity extends BaseEntity {
  @Column
  private String data;
}
