/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 23:05:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-01 09:51:57
 * @FilePath       : ProductsEntity.java
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
@Table(name = "products")
@Data
@EqualsAndHashCode(callSuper = true)
public class ProductsEntity extends BaseEntity {
  @Column(nullable = false)
  private String sku;

  @Column(nullable = false)
  private String name;

  @Column
  private String description;

  @Column(name = "product_status_id", nullable = false)
  private UUID productStatusId;

  @Column(name = "regular_price", columnDefinition = "double default 0.0")
  private Double regularPrice;

  @Column(name = "discount_price", columnDefinition = "double default 0.0")
  private Double discountPrice;

  @Column(columnDefinition = "int default 0")
  private Integer quantity;

  @Column(columnDefinition = "boolean default false")
  private Boolean taxable;

}
