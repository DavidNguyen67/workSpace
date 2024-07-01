/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 22:18:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-01 23:17:18
 * @FilePath       : SalesOrdersEntity.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.database.model.mysql;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "sales_orders")
@Data
@EqualsAndHashCode(callSuper = true)
public class SalesOrdersEntity extends BaseEntity {
  @Column(name = "order_date", nullable = false)
  private Timestamp orderDate;

  @Column(nullable = false)
  private Double total;

  @Column(name = "user_id", nullable = false)
  private String userId;

  @Column(name = "session_id", nullable = false)
  private String sessionId;

  @Column(name = "coupon_id", nullable = false)
  private String couponId;

}
