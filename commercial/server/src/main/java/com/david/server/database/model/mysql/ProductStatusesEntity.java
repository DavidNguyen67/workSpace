/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 23:19:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-22 23:36:53
 * @CopyRight      : Con chù chù 🥴🥴
**/

package com.david.server.database.model.mysql;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "product_statuses")
@Data
@EqualsAndHashCode(callSuper = true)
public class ProductStatusesEntity extends BaseEntity {
  @Column(nullable = false)
  private String name;
}
