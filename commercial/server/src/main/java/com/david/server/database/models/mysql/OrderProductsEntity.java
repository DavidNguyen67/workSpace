/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 22:15:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-29 13:18:46
 * @FilePath       : OrderProductsEntity.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.database.models.mysql;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Entity
@Table(name = "order_products")
@Data
@EqualsAndHashCode(callSuper = true)
public class OrderProductsEntity extends BaseEntity {
  @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @JoinColumn(name = "order_id") // thông qua khóa ngoại order_id
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  private SalesOrdersEntity salesOrders;

  @Column(nullable = false)
  private String sku;

  @Column(nullable = false)
  private String name;

  @Column
  private String description;

  @Column(nullable = false)
  private Double price;

  @Column(nullable = false)
  private Integer quantity;

  @Column(nullable = false)
  private Integer subtotal;
}
