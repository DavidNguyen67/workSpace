/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 22:15:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-01 23:16:52
 * @FilePath       : OrderProductsEntity.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.database.model.mysql;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "order_products")
@Data
@EqualsAndHashCode(callSuper = true)
public class OrderProductsEntity extends BaseEntity {
  @Column(name = "order_id")
  private String orderId;

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
